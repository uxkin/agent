import { Action, ActionPanel, Keyboard, Clipboard, Icon, List, Toast, showToast } from "@raycast/api";
import { showFailureToast, useCachedPromise, withAccessToken } from "@raycast/utils";
import { useState } from "react";

import { ErrorState } from "./lib/states";
import { DesignSystem, callTool, provider } from "./lib/uxkin";

const SUGGESTIONS = "Try dark fintech, developer tools, wellness light warm, serif editorial, or a site's name.";

function detailOf(system: DesignSystem) {
  const colors = system.colors
    .map((color) => `| ${color.name} | \`${color.value}\` | ${color.role.replace(/\|/g, "/")} |`)
    .join("\n");
  return [
    `## ${system.name}`,
    system.summary,
    `**Theme:** ${system.theme}`,
    `**Fonts:** ${system.fonts.join(", ") || "Not listed"}`,
    "| Color | Value | Role |\n|---|---|---|\n" + colors,
    `**Components:** ${system.components.join(", ") || "Not listed"}`,
  ].join("\n\n");
}

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function cssVariables(system: DesignSystem) {
  const lines = system.colors.map((color) => `  --color-${slug(color.name)}: ${color.value}; /* ${color.role} */`);
  return `:root {\n${lines.join("\n")}\n}`;
}

// Only the top search result carries its DESIGN.md, so searching for the
// site's name returns it.
async function copyDesignMarkdown(system: DesignSystem) {
  const toast = await showToast({ style: Toast.Style.Animated, title: "Getting DESIGN.md" });
  try {
    let markdown = system.designMarkdown;
    if (!markdown) {
      const found = await callTool<{ results: DesignSystem[] }>("find_ui_materials", { query: system.name, limit: 5 });
      markdown = found?.results?.find((result) => result.id === system.id)?.designMarkdown;
    }
    if (!markdown) {
      toast.style = Toast.Style.Failure;
      toast.title = "DESIGN.md isn't available for this one";
      toast.message = "Open it on UXKIN instead.";
      return;
    }
    await Clipboard.copy(markdown);
    toast.style = Toast.Style.Success;
    toast.title = "Copied DESIGN.md";
  } catch (error) {
    await toast.hide();
    await showFailureToast(error, { title: "Couldn't get DESIGN.md" });
  }
}

function SearchDesignSystems() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useCachedPromise(
    async (text: string) => {
      const result = await callTool<{ results: DesignSystem[] }>("find_ui_materials", { query: text, limit: 12 });
      return result?.results ?? [];
    },
    [query.trim()],
    // The list shows errors itself, so no toast.
    { execute: query.trim().length > 0, keepPreviousData: true, onError: () => undefined },
  );

  const results = query.trim() ? (data ?? []) : [];

  return (
    <List
      isLoading={isLoading}
      isShowingDetail={results.length > 0}
      throttle
      searchBarPlaceholder="Search design systems from real websites"
      onSearchTextChange={setQuery}
    >
      {error && query.trim() ? (
        <ErrorState error={error} view={List} />
      ) : results.length === 0 ? (
        <List.EmptyView
          icon={Icon.Swatch}
          title={query.trim() && !isLoading ? "No Design Systems Found" : "Search Design Systems"}
          description={query.trim() && !isLoading ? "Try an industry, a theme or a brand color." : SUGGESTIONS}
        />
      ) : (
        results.map((system) => (
          <List.Item
            key={system.id}
            icon={{ source: Icon.CircleFilled, tintColor: system.colors[0]?.value }}
            title={system.name}
            accessories={[{ tag: system.theme }]}
            detail={<List.Item.Detail markdown={detailOf(system)} />}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser title="Open on UXKIN" url={system.href} />
                <Action
                  title="Copy DESIGN.md"
                  icon={Icon.Document}
                  shortcut={{
                    macOS: { modifiers: ["cmd", "shift"], key: "d" },
                    Windows: { modifiers: ["ctrl", "shift"], key: "d" },
                  }}
                  onAction={() => copyDesignMarkdown(system)}
                />
                <Action.CopyToClipboard
                  title="Copy Colors as CSS Variables"
                  content={cssVariables(system)}
                  shortcut={{
                    macOS: { modifiers: ["cmd", "shift"], key: "v" },
                    Windows: { modifiers: ["ctrl", "shift"], key: "v" },
                  }}
                />
                <Action.CopyToClipboard
                  title="Copy Link"
                  content={system.href}
                  shortcut={Keyboard.Shortcut.Common.Copy}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}

export default withAccessToken(provider)(SearchDesignSystems);
