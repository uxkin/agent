import { withAccessToken } from "@raycast/utils";

import { CollectionSummary, callTool, provider } from "../lib/uxkin";

/**
 * List the collections the person saved on UXKIN, with how many items each holds.
 */
async function tool() {
  return callTool<{ count: number; collections: CollectionSummary[] }>("list_collections");
}

export default withAccessToken(provider)(tool);
