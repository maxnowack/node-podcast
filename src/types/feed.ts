import { FeedITunes } from "./feed-itunes";
import { FeedNamespace } from "./feed-namespace";
import { FeedCustomElement } from "./feed-custom-element";
export interface Feed extends FeedITunes {
  feedUrl: string;
  siteUrl: string;
  imageUrl?: string;
  title: string;
  description?: string;
  generator?: string;
  docs?: string;
  author?: string;
  managingEditor?: string;
  webMaster?: string;
  copyright?: string;
  language?: string;
  categories?: string[];
  pubDate?: Date | string;
  ttl?: number;
  geoRSS?: boolean;
  customNamespaces: FeedNamespace;
  customElements: FeedCustomElement[];
}
