import { withAccessToken } from "@raycast/utils";

import { DesignSystem, callTool, provider } from "../lib/uxkin";

type Input = {
  /**
   * What to find: an industry ("fintech", "dev tools"), a theme ("dark", "light"), a brand color ("green"), a style ("minimal black and white", "serif"), a font ("Inter") or a site name, or a combination ("dark fintech").
   */
  query: string;
  /**
   * How many design systems to return, from 1 to 25. Defaults to 6.
   */
  limit?: number;
};

/**
 * Search design systems taken from real websites: colors with their roles, typography and components for each result, and the complete DESIGN.md for the top result. To get one site's DESIGN.md, search for its name.
 */
async function tool(input: Input) {
  return callTool<{ count: number; results: DesignSystem[] }>("find_ui_materials", {
    query: input.query,
    limit: input.limit ?? 6,
  });
}

export default withAccessToken(provider)(tool);
