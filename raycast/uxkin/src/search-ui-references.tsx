import { Action, ActionPanel, Keyboard, Grid, Icon } from "@raycast/api";
import { useCachedPromise, withAccessToken } from "@raycast/utils";
import { useState } from "react";

import { JourneyGrid } from "./journey";
import { ErrorState } from "./lib/states";
import { Reference, callTool, provider } from "./lib/uxkin";

const SUGGESTIONS = "Try paywall, onboarding, delete account, settings, empty state, or an app name like Duolingo.";

// Grid cells show the app or site on the first line and what it is on the second.
function titleOf(reference: Reference) {
  return reference.type === "journey" ? reference.subtitle || reference.title : reference.title;
}

function subtitleOf(reference: Reference) {
  if (reference.type === "journey") return [reference.title, reference.description].filter(Boolean).join(" · ");
  if (reference.type === "screen") return (reference.context ?? []).join(", ") || reference.subtitle || "Screen";
  if (reference.type === "web") return "Website";
  return "App";
}

function SearchUIReferences() {
  const [query, setQuery] = useState("");
  const { data, isLoading, error } = useCachedPromise(
    async (text: string) => {
      const result = await callTool<{ results: Reference[] }>("find_ui_references", { query: text, limit: 30 });
      return result?.results ?? [];
    },
    [query.trim()],
    // The grid shows errors itself, so no toast.
    { execute: query.trim().length > 0, keepPreviousData: true, onError: () => undefined },
  );

  const results = query.trim() ? (data ?? []) : [];

  return (
    <Grid
      columns={5}
      aspectRatio="9/16"
      fit={Grid.Fit.Fill}
      isLoading={isLoading}
      throttle
      searchBarPlaceholder="Search real app screens, journeys and websites"
      onSearchTextChange={setQuery}
    >
      {error && query.trim() ? (
        <ErrorState error={error} view={Grid} />
      ) : results.length === 0 ? (
        <Grid.EmptyView
          icon={Icon.MagnifyingGlass}
          title={query.trim() && !isLoading ? "No References Found" : "Search Real UI"}
          description={
            query.trim() && !isLoading ? "Try other words, for example a flow name or an app category." : SUGGESTIONS
          }
        />
      ) : (
        results.map((reference) => (
          <Grid.Item
            key={`${reference.type}-${reference.id}`}
            content={reference.image ? { source: reference.image } : Icon.Image}
            title={titleOf(reference)}
            subtitle={subtitleOf(reference)}
            actions={
              <ActionPanel>
                {reference.type === "journey" ? (
                  <Action.Push
                    title="Show Journey"
                    icon={Icon.List}
                    target={<JourneyGrid journeyId={reference.id} appId={reference.appId} />}
                  />
                ) : null}
                <Action.OpenInBrowser title="Open on UXKIN" url={reference.href} />
                <Action.CopyToClipboard
                  title="Copy Link"
                  content={reference.href}
                  shortcut={Keyboard.Shortcut.Common.Copy}
                />
                {reference.image ? (
                  <Action.CopyToClipboard
                    title="Copy Image Link"
                    content={reference.image}
                    shortcut={Keyboard.Shortcut.Common.CopyName}
                  />
                ) : null}
              </ActionPanel>
            }
          />
        ))
      )}
    </Grid>
  );
}

export default withAccessToken(provider)(SearchUIReferences);
