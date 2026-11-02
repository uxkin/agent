import { LocalStorage, OAuth } from "@raycast/api";
import { OAuthService, getAccessToken } from "@raycast/utils";

export const UXKIN_URL = "https://uxkin.com";
// The extension's own address on the UXKIN MCP server: the same server
// as uxkin.com/mcp, so UXKIN can tell which accounts use Raycast.
const MCP_URL = `${UXKIN_URL}/mcp/raycast`;
const REDIRECT_URI = "https://raycast.com/redirect?packageName=Extension";
const CLIENT_ID_KEY = "uxkin-oauth-client-id";

export const PLANS_URL = `${UXKIN_URL}/choose-plan?utm_source=raycast&utm_medium=extension&utm_campaign=plan_required`;

const client = new OAuth.PKCEClient({
  redirectMethod: OAuth.RedirectMethod.Web,
  providerName: "UXKIN",
  providerIcon: "extension-icon.png",
  description: "Connect your UXKIN account to search real app screens, user journeys and design systems.",
});

// UXKIN registers each app that signs in (OAuth Dynamic Client
// Registration), so there is no client ID to configure. The ID is kept
// for later sign-ins.
async function registeredClientId(): Promise<string> {
  const saved = await LocalStorage.getItem<string>(CLIENT_ID_KEY);
  if (saved) return saved;
  const response = await fetch(`${UXKIN_URL}/api/oauth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: "Raycast",
      client_uri: "https://www.raycast.com",
      redirect_uris: [REDIRECT_URI],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    }),
  });
  if (!response.ok) throw new Error(`UXKIN sign-in isn't available right now (${response.status}). Try again later.`);
  const { client_id: clientId } = (await response.json()) as { client_id?: string };
  if (!clientId) throw new Error("UXKIN sign-in isn't available right now. Try again later.");
  await LocalStorage.setItem(CLIENT_ID_KEY, clientId);
  return clientId;
}

async function serviceFor(clientId: string) {
  return new OAuthService({
    client,
    clientId,
    scope: "uxkin",
    authorizeUrl: `${UXKIN_URL}/oauth/authorize`,
    tokenUrl: `${UXKIN_URL}/api/oauth/token`,
    refreshTokenUrl: `${UXKIN_URL}/api/oauth/token`,
    bodyEncoding: "url-encoded",
    extraParameters: { resource: MCP_URL },
  });
}

export const provider = {
  authorize: async () => {
    const clientId = await registeredClientId();
    try {
      return await (await serviceFor(clientId)).authorize();
    } catch (error) {
      // A registration UXKIN no longer knows: register again and sign in once more.
      if (String(error).includes("invalid_client")) {
        await LocalStorage.removeItem(CLIENT_ID_KEY);
        await client.removeTokens();
        return (await serviceFor(await registeredClientId())).authorize();
      }
      throw error;
    }
  },
};

export class PlanRequiredError extends Error {
  constructor() {
    super("Searching UXKIN needs a plan (Monthly or Lifetime).");
    this.name = "PlanRequiredError";
  }
}

type ToolResponse = {
  result?: {
    content?: { type: string; text?: string }[];
    structuredContent?: unknown;
    isError?: boolean;
  };
  error?: { message?: string };
};

let requestId = 0;

// Calls one of UXKIN's MCP tools (read-only) and returns its structured result.
export async function callTool<T>(name: string, args: Record<string, unknown> = {}): Promise<T> {
  const { token } = getAccessToken();
  const response = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++requestId, method: "tools/call", params: { name, arguments: args } }),
  });
  if (response.status === 401) {
    await client.removeTokens();
    throw new Error("Your UXKIN sign-in expired. Open the command again to sign in.");
  }
  if (response.status === 429) throw new Error("Too many searches in a short time. Wait a minute and try again.");
  if (!response.ok) throw new Error(`UXKIN didn't answer (${response.status}). Try again in a moment.`);

  const body = (await response.json()) as ToolResponse;
  if (body.error) throw new Error(body.error.message || "UXKIN couldn't run that search.");
  const result = body.result;
  const text = (result?.content || []).map((part) => part.text || "").join("\n");
  if (result?.isError) {
    if (/needs a plan/i.test(text)) throw new PlanRequiredError();
    throw new Error(text || "UXKIN couldn't run that search.");
  }
  return result?.structuredContent as T;
}

export type Reference = {
  type: "app" | "journey" | "screen" | "web";
  id: string;
  appId?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  href: string;
  position?: number;
  context?: string[];
};

export type Journey = {
  id: string;
  name: string;
  app: { id: string; name: string; description: string; href: string };
  href: string;
  screenCount: number;
  screens: { position: number; id: string; image: string; href: string }[];
};

export type DesignSystem = {
  id: string;
  name: string;
  summary: string;
  theme: string;
  colors: { name: string; value: string; role: string }[];
  fonts: string[];
  components: string[];
  designMarkdown?: string;
  href: string;
};

export type CollectionSummary = { id: string; name: string; itemCount: number; updatedAt: string };

export type Collection = {
  id: string;
  name: string;
  count: number;
  items: {
    type: string;
    id: string;
    title: string;
    subtitle?: string;
    image?: string;
    href: string;
    savedAt: string;
  }[];
};
