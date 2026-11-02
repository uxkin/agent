import { Action, ActionPanel, Keyboard, Grid, Icon, List } from "@raycast/api";
import { useCachedPromise, withAccessToken } from "@raycast/utils";

import { ErrorState } from "./lib/states";
import { Collection, CollectionSummary, UXKIN_URL, callTool, provider } from "./lib/uxkin";

function CollectionGrid({ collection }: { collection: CollectionSummary }) {
  const { data, isLoading, error } = useCachedPromise(
    (id: string) => callTool<Collection>("get_collection", { collection: id }),
    [collection.id],
    { onError: () => undefined },
  );

  return (
    <Grid columns={5} aspectRatio="9/16" fit={Grid.Fit.Fill} isLoading={isLoading} navigationTitle={collection.name}>
      {error ? (
        <ErrorState error={error} view={Grid} />
      ) : (
        <>
          {data && data.items.length === 0 ? (
            <Grid.EmptyView icon={Icon.Bookmark} title="This Collection Is Empty" />
          ) : null}
          {(data?.items ?? []).map((item) => (
            <Grid.Item
              key={`${item.type}-${item.id}`}
              content={item.image ? { source: item.image } : Icon.Image}
              title={item.title}
              subtitle={item.subtitle}
              actions={
                <ActionPanel>
                  <Action.OpenInBrowser title="Open on UXKIN" url={item.href} />
                  <Action.CopyToClipboard
                    title="Copy Link"
                    content={item.href}
                    shortcut={Keyboard.Shortcut.Common.Copy}
                  />
                </ActionPanel>
              }
            />
          ))}
        </>
      )}
    </Grid>
  );
}

function MyCollections() {
  const { data, isLoading, error } = useCachedPromise(
    () => callTool<{ collections: CollectionSummary[] }>("list_collections"),
    [],
    { onError: () => undefined },
  );
  const collections = data?.collections ?? [];

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Filter your collections">
      {error ? (
        <ErrorState error={error} view={List} />
      ) : data && collections.length === 0 ? (
        <List.EmptyView
          icon={Icon.Bookmark}
          title="No Collections Yet"
          description="Save screens, apps and websites into collections on uxkin.com and they show up here."
          actions={
            <ActionPanel>
              <Action.OpenInBrowser title="Open UXKIN" url={UXKIN_URL} />
            </ActionPanel>
          }
        />
      ) : (
        collections.map((collection) => (
          <List.Item
            key={collection.id}
            icon={Icon.Bookmark}
            title={collection.name}
            accessories={[
              { text: `${collection.itemCount} ${collection.itemCount === 1 ? "item" : "items"}` },
              { date: new Date(collection.updatedAt), tooltip: "Last updated" },
            ]}
            actions={
              <ActionPanel>
                <Action.Push
                  title="Show Collection"
                  icon={Icon.AppWindowGrid3x3}
                  target={<CollectionGrid collection={collection} />}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}

export default withAccessToken(provider)(MyCollections);
