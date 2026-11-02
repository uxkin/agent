import { withAccessToken } from "@raycast/utils";

import { Reference, callTool, provider } from "../lib/uxkin";

type Input = {
  /**
   * What to find, in a few words: a flow or screen type ("cancel subscription", "paywall", "empty state", "settings"), an app category ("meditation app"), an app name ("Duolingo"), or a combination ("onboarding for a meditation app").
   */
  query: string;
  /**
   * How many results to return, from 1 to 50. Defaults to 12.
   */
  limit?: number;
};

/**
 * Search UXKIN's library of real iOS app screens, user journeys and websites. Each result has a type (app, journey, screen, web), an image and a link to it on uxkin.com.
 */
async function tool(input: Input) {
  return callTool<{ count: number; results: Reference[] }>("find_ui_references", {
    query: input.query,
    limit: input.limit ?? 12,
  });
}

export default withAccessToken(provider)(tool);
