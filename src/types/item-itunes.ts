export interface ItemITunes {
  itunesAuthor?: string;
  itunesExplicit?: boolean;
  itunesSubtitle?: string;
  itunesSummary?: string;
  itunesDuration?: number | string;
  itunesImage?: string;
  itunesSeason?: number;
  itunesEpisode?: number;
  itunesTitle?: string;
  itunesNewFeedUrl?: string;
  itunesKeywords?: string;
  itunesEpisodeType?: "full" | "trailer" | "bonus";
  customElements?: any[];
}
