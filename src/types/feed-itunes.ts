import { FeedItunesCategory } from "./feed-itunes-category";
import { ItunesExplicit } from "./itunes-explicit";
import { FeedItunesOwner } from "./feed-itunes-owner";
import { FeedItunesType } from "./feed-itunes-type";

export interface FeedITunes {
  itunesAuthor?: string;
  itunesSubtitle?: string;
  itunesSummary?: string;
  itunesOwner?: FeedItunesOwner;
  itunesExplicit?: ItunesExplicit;
  itunesCategory?: FeedItunesCategory[];
  itunesImage?: string;
  itunesType?: FeedItunesType;
}
