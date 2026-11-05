import { createHash, randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, readFile, rm, writeFile, chmod } from "node:fs/promises";
import { createServer } from "node:http";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

import { UserError, dim } from "./ui.mjs";

export const UXKIN_URL = (process.env.UXKIN_URL || "https://uxkin.com").replace(/\/+$/, "");
// The CLI's own address on the UXKIN MCP server: the same server as
// uxkin.com/mcp, so UXKIN can tell which accounts came from the CLI.
export const MCP_URL = `${UXKIN_URL}/mcp/cli`;

const CLIENT_NAME = "UXKIN CLI";
const SIGN_IN_MINUTES = 10;

function configDir() {
  if (process.env.UXKIN_CONFIG_DIR) return process.env.UXKIN_CONFIG_DIR;
  if (process.platform === "win32") return join(process.env.APPDATA || join(homedir(), "AppData", "Roaming"), "uxkin");
  return join(process.env.XDG_CONFIG_HOME || join(homedir(), ".config"), "uxkin");
}

export const CREDENTIALS_FILE = join(configDir(), "credentials.json");

async function readCredentials() {
  try {
    const saved = JSON.parse(await readFile(CREDENTIALS_FILE, "utf8"));
    // Sign-ins made against another server (UXKIN_URL) don't count here.
    return saved.server === UXKIN_URL ? saved : null;
  } catch {
    return null;
  }
}

// Only this user can read the file: it holds the sign-in tokens.
async function saveCredentials(credentials) {
  await mkdir(dirname(CREDENTIALS_FILE), { recursive: true, mode: 0o700 });
  await writeFile(CREDENTIALS_FILE, `${JSON.stringify({ ...credentials, server: UXKIN_URL }, null, 2)}\n`, { mode: 0o600 });
  await chmod(CREDENTIALS_FILE, 0o600).catch(() => undefined);
}

export async function signOut() {
  const had = await readCredentials();
  await rm(CREDENTIALS_FILE, { force: true });
  return Boolean(had);
}

export async function isSignedIn() {
  return Boolean((await readCredentials())?.refresh_token);
}

const base64url = (buffer) => buffer.toString("base64url");

// UXKIN registers each app that signs in (OAuth Dynamic Client
// Registration). Local addresses match on any port, so one registration
// covers every sign-in.
async function registerClient(redirectUri) {
  const response = await fetch(`${UXKIN_URL}/api/oauth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: CLIENT_NAME,
      client_uri: "https://uxkin.com",
      redirect_uris: [redirectUri],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.client_id) {
    throw new UserError(`UXKIN sign-in isn't available right now (${response.status}). Try again later.`);
  }
  return body.client_id;
}

async function tokenRequest(params) {
  const response = await fetch(`${UXKIN_URL}/api/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ ...params, resource: MCP_URL }).toString(),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.access_token) {
    const error = new Error(body.error_description || body.error || `Sign-in failed (${response.status}).`);
    error.code = body.error;
    throw error;
  }
  return {
    access_token: body.access_token,
    refresh_token: body.refresh_token,
    expires_at: Date.now() + (Number(body.expires_in) || 3600) * 1000,
  };
}

function openBrowser(url) {
  const [command, args] =
    process.platform === "darwin"
      ? ["open", [url]]
      : process.platform === "win32"
        ? ["rundll32", ["url.dll,FileProtocolHandler", url]]
        : ["xdg-open", [url]];
  try {
    const child = spawn(command, args, { stdio: "ignore", detached: true });
    child.on("error", () => undefined);
    child.unref();
  } catch {
    // The link is printed as well, so it can be opened by hand.
  }
}

const page = (title, text) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · UXKIN</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#FBFAF7;color:#141414;font:17px/1.5 system-ui,-apple-system,sans-serif}
main{max-width:420px;margin:16px;padding:32px;border:2px solid #141414;border-radius:24px;background:#fff;box-shadow:8px 8px 0 #141414}
h1{margin:0 0 8px;font-size:26px;letter-spacing:-.02em}p{margin:0;color:#141414cc}</style></head>
<body><main><h1>${title}</h1><p>${text}</p></main></body></html>`;

// Signs in through the browser: UXKIN's own sign-in and connect pages,
// the same ones every plugin uses. The CLI only receives tokens back on
// a local address; it never sees the password.
export async function signIn() {
  const verifier = base64url(randomBytes(32));
  const challenge = base64url(createHash("sha256").update(verifier).digest());
  const state = base64url(randomBytes(16));

  let finish;
  const result = new Promise((resolve, reject) => (finish = { resolve, reject }));

  const server = createServer((request, response) => {
    const url = new URL(request.url || "/", "http://127.0.0.1");
    if (url.pathname !== "/callback") {
      response.writeHead(404).end();
      return;
    }
    const error = url.searchParams.get("error");
    const code = url.searchParams.get("code");
    if (url.searchParams.get("state") !== state || (!code && !error)) {
      response.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
      response.end(page("Something went wrong", "This sign-in link didn't match. Run <b>npx uxkin login</b> again."));
      return;
    }
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    if (error) {
      response.end(page("Not connected", "You can close this tab and go back to the terminal."));
      finish.reject(new UserError(error === "access_denied" ? "Sign-in was cancelled." : `Sign-in failed: ${url.searchParams.get("error_description") || error}`));
    } else {
      response.end(page("You're signed in", "You can close this tab and go back to the terminal."));
      finish.resolve(code);
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const redirectUri = `http://127.0.0.1:${server.address().port}/callback`;
  const timer = setTimeout(
    () => finish.reject(new UserError(`Sign-in timed out after ${SIGN_IN_MINUTES} minutes. Run npx uxkin login to try again.`)),
    SIGN_IN_MINUTES * 60 * 1000,
  );

  try {
    // A fresh registration each time: UXKIN removes registrations
    // nobody finished signing in with, so a saved one could be gone.
    const clientId = await registerClient(redirectUri);
    const authorizeUrl = `${UXKIN_URL}/oauth/authorize?${new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      code_challenge: challenge,
      code_challenge_method: "S256",
      state,
      scope: "uxkin",
      resource: MCP_URL,
    })}`;

    console.log("Opening your browser to sign in to UXKIN…");
    console.log(dim(`If it doesn't open, go to:\n${authorizeUrl}\n`));
    openBrowser(authorizeUrl);

    const code = await result;
    const tokens = await tokenRequest({
      grant_type: "authorization_code",
      code,
      code_verifier: verifier,
      client_id: clientId,
      redirect_uri: redirectUri,
    });
    await saveCredentials({ client_id: clientId, ...tokens });
  } finally {
    clearTimeout(timer);
    server.close();
  }
}

// A valid access token, refreshed when it has (nearly) run out.
// Signs in through the browser when there is no usable sign-in.
export async function accessToken({ interactive = true } = {}) {
  const saved = await readCredentials();
  if (saved?.access_token && saved.expires_at > Date.now() + 60_000) return saved.access_token;
  if (saved?.refresh_token) {
    try {
      const tokens = await tokenRequest({ grant_type: "refresh_token", refresh_token: saved.refresh_token, client_id: saved.client_id });
      await saveCredentials({ client_id: saved.client_id, ...tokens });
      return tokens.access_token;
    } catch (error) {
      if (!["invalid_grant", "invalid_client"].includes(error.code)) throw error;
      // The sign-in was disconnected or expired: start over.
      await signOut();
    }
  }
  if (!interactive) throw new UserError("You're not signed in. Run npx uxkin login first.");
  await signIn();
  return (await readCredentials()).access_token;
}

export async function forgetAccessToken() {
  const saved = await readCredentials();
  if (saved) await saveCredentials({ ...saved, access_token: undefined, expires_at: 0 });
}
