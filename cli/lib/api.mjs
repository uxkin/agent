import { MCP_URL, UXKIN_URL, accessToken, forgetAccessToken } from "./auth.mjs";
import { UserError } from "./ui.mjs";

export const PLANS_URL = `${UXKIN_URL}/choose-plan?utm_source=cli&utm_medium=terminal&utm_campaign=plan_required`;

let requestId = 0;

async function post(token, name, args) {
  return fetch(MCP_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++requestId, method: "tools/call", params: { name, arguments: args } }),
  });
}

// Calls one of UXKIN's read-only MCP tools and returns its structured result.
export async function callTool(name, args = {}) {
  let response = await post(await accessToken(), name, args);
  if (response.status === 401) {
    await forgetAccessToken();
    response = await post(await accessToken(), name, args);
  }
  if (response.status === 401) throw new UserError("Your UXKIN sign-in expired. Run npx uxkin login.");
  if (response.status === 429) throw new UserError("Too many searches in a short time. Wait a minute and try again.");
  if (!response.ok) throw new UserError(`UXKIN didn't answer (${response.status}). Try again in a moment.`);

  const body = await readBody(response);
  if (body.error) throw new UserError(body.error.message || "UXKIN couldn't run that search.");
  const result = body.result;
  const text = (result?.content || []).map((part) => part.text || "").join("\n");
  if (result?.isError) {
    if (/needs a plan/i.test(text)) {
      throw new UserError(`Searching UXKIN needs a plan (Monthly or Lifetime). Choose one at:\n${PLANS_URL}`);
    }
    throw new UserError(text || "UXKIN couldn't run that search.");
  }
  return result?.structuredContent;
}

// The server may answer as JSON or as a one-message event stream.
async function readBody(response) {
  const text = await response.text();
  if ((response.headers.get("content-type") || "").includes("text/event-stream")) {
    const data = text
      .split("\n")
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim())
      .pop();
    return JSON.parse(data || "{}");
  }
  return JSON.parse(text || "{}");
}
