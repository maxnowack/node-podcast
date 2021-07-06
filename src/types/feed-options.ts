import { Feed } from "./feed";
import { FeedNamespaceOptions } from "./feed-namespace-options";

export interface FeedOptions extends Partial<Feed> {
  namespaces?: FeedNamespaceOptions;
}
