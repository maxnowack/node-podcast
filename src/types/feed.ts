import { FeedItunesCategory } from "./feed-itunes-category";
import { FeedItunesOwner } from "./feed-itunes-owner";
import { FeedItunesType } from "./feed-itunes-type";

export interface Feed {
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
  itunesAuthor?: string;
  itunesSubtitle?: string;
  itunesSummary?: string;
  itunesOwner?: FeedItunesOwner;
  itunesExplicit?: boolean;
  itunesCategory?: FeedItunesCategory[];
  itunesImage?: string;
  itunesType?: FeedItunesType;
  customNamespaces: {
    [key: string]: any;
  };
  customElements: any[];
}
