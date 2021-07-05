import { ItemEnclosure } from "./item-enclosure";
export interface Item {
  title: string;
  description: string;
  url: string;
  guid: string;
  categories?: string[];
  author?: string;
  date: Date | string;
  lat?: number;
  long?: number;
  enclosure?: ItemEnclosure;
  content?: string;
  imageUrl?: string;
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
