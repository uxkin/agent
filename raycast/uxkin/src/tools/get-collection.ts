import { withAccessToken } from "@raycast/utils";

import { Collection, callTool, provider } from "../lib/uxkin";

type Input = {
  /**
   * The collection's name or id, as listed by list-collections.
   */
  collection: string;
};

/**
 * Get the saved screens, apps and websites in one of the person's UXKIN collections.
 */
async function tool(input: Input) {
  return callTool<Collection>("get_collection", { collection: input.collection });
}

export default withAccessToken(provider)(tool);
