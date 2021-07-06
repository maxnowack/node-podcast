import { FeedItunesCategory } from "./feed-itunes-category";
import { FeedItunesOwner } from "./feed-itunes-owner";
import { FeedItunesType } from "./feed-itunes-type";

export interface FeedITunes {
  itunesAuthor?: string;
  itunesSubtitle?: string;
  itunesSummary?: string;
  itunesOwner?: FeedItunesOwner;
  itunesExplicit?: boolean;
  itunesCategory?: FeedItunesCategory[];
  itunesImage?: string;
  itunesType?: FeedItunesType;
}
