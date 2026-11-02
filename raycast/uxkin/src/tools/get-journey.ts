import { withAccessToken } from "@raycast/utils";

import { Journey, callTool, provider } from "../lib/uxkin";

type Input = {
  /**
   * The id of a result of type journey from find-ui-references.
   */
  journeyId: string;
  /**
   * The appId of that same result, if it has one.
   */
  appId?: string;
};

/**
 * Get every screen of one user journey, in order, with each step's image and link on uxkin.com.
 */
async function tool(input: Input) {
  return callTool<Journey>("get_journey", {
    journey_id: input.journeyId,
    ...(input.appId ? { app_id: input.appId } : {}),
  });
}

export default withAccessToken(provider)(tool);
