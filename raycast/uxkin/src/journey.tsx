import { Action, ActionPanel, Keyboard, Grid } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";

import { ErrorState } from "./lib/states";
import { Journey, callTool } from "./lib/uxkin";

// Every screen of one journey, in order.
export function JourneyGrid({ journeyId, appId }: { journeyId: string; appId?: string }) {
  const { data, isLoading, error } = useCachedPromise(
    (id: string, app?: string) => callTool<Journey>("get_journey", { journey_id: id, ...(app ? { app_id: app } : {}) }),
    [journeyId, appId],
    { onError: () => undefined },
  );

  return (
    <Grid
      columns={5}
      aspectRatio="9/16"
      fit={Grid.Fit.Fill}
      isLoading={isLoading}
      navigationTitle={data ? `${data.app.name}: ${data.name}` : "Journey"}
    >
      {error ? (
        <ErrorState error={error} view={Grid} />
      ) : (
        (data?.screens ?? []).map((screen) => (
          <Grid.Item
            key={screen.id}
            content={{ source: screen.image }}
            title={`Step ${screen.position} of ${data?.screenCount ?? ""}`}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser title="Open on UXKIN" url={screen.href} />
                {data ? <Action.OpenInBrowser title="Open Whole Journey on UXKIN" url={data.href} /> : null}
                <Action.CopyToClipboard
                  title="Copy Link"
                  content={screen.href}
                  shortcut={Keyboard.Shortcut.Common.Copy}
                />
                <Action.CopyToClipboard
                  title="Copy Image Link"
                  content={screen.image}
                  shortcut={Keyboard.Shortcut.Common.CopyName}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </Grid>
  );
}
