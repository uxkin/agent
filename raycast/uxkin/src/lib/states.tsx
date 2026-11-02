import { Action, ActionPanel, Grid, Icon, List } from "@raycast/api";

import { PLANS_URL, PlanRequiredError, UXKIN_URL } from "./uxkin";

type View = typeof Grid | typeof List;

// What a search shows when it can't show results: the account needs a
// plan, or the search failed.
export function ErrorState({ error, view }: { error: Error; view: View }) {
  const EmptyView = view.EmptyView;
  if (error instanceof PlanRequiredError) {
    return (
      <EmptyView
        icon={Icon.Lock}
        title="Searching Needs a UXKIN Plan"
        description="You're signed in. Choose Monthly or Lifetime on uxkin.com and searches work right away."
        actions={
          <ActionPanel>
            <Action.OpenInBrowser title="Choose a Plan" url={PLANS_URL} />
          </ActionPanel>
        }
      />
    );
  }
  return (
    <EmptyView
      icon={Icon.Warning}
      title="Couldn't Reach UXKIN"
      description={error.message}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser title="Open UXKIN" url={UXKIN_URL} />
        </ActionPanel>
      }
    />
  );
}
