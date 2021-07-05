import RSS from "rss";
import deprecate from "./deprecate";
import { buildITunesCategories } from "./build-itunes-categories";
import durationFormat from "./duration-format";
import { FeedOptions } from "./types/feed-options";
import { Feed } from "./types/feed";
import { Item } from "./types/item";
import { ItemOptions } from "./types/item-options";

export default class Podcast {
  feedOptions: Feed;
  items: Item[] = [];

  constructor(options: FeedOptions, items?: ReadonlyArray<ItemOptions>) {
    this.feedOptions = this.init(options, items);
  }

  init(options: FeedOptions, items?: ReadonlyArray<ItemOptions>) {
    const feedOptions: Feed = {
      ...options,
      title: options.title || "Untitled Podcast Feed",
      description: options.description || "",
      feedUrl: options.feedUrl || "",
      siteUrl: options.siteUrl || "",
      generator: options.generator || "Podcast for Node",
      customElements: options.customElements || [],
      customNamespaces: {
        itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
        ...options.customNamespaces,
      },
    };

    if (options.itunesAuthor || options.author) {
      feedOptions.customElements.push({
        "itunes:author": options.itunesAuthor || options.author,
      });
    }

    if (options.itunesSubtitle) {
      feedOptions.customElements.push({
        "itunes:subtitle": options.itunesSubtitle,
      });
    }

    if (options.itunesSummary || options.description) {
      feedOptions.customElements.push({
        "itunes:summary": options.itunesSummary || options.description,
      });
    }

    if (options.itunesType) {
      feedOptions.customElements.push({
        "itunes:type": options.itunesType,
      });
    }

    feedOptions.itunesOwner = options.itunesOwner || {
      name: options.author || "",
      email: "",
    };
    feedOptions.customElements.push({
      "itunes:owner": [
        { "itunes:name": feedOptions.itunesOwner.name },
        { "itunes:email": feedOptions.itunesOwner.email },
      ],
    });

    feedOptions.customElements.push({
      "itunes:explicit": options.itunesExplicit || false ? "Yes" : "No",
    });

    if (options.itunesCategory) {
      // [{text:String, subcats:[{text:String, subcats:Array}]}]
      const categories = buildITunesCategories(options.itunesCategory);
      categories.forEach((category) => {
        feedOptions.customElements = feedOptions.customElements || [];
        feedOptions.customElements.push(category);
      });
    }

    if (options.itunesImage || options.imageUrl) {
      feedOptions.customElements.push({
        "itunes:image": {
          _attr: {
            href: options.itunesImage || options.imageUrl,
          },
        },
      });
    }

    this.items = [];
    const initialItems = items || [];
    initialItems.forEach((item) => this.addItem(item));

    return feedOptions;
  }

  addItem(itemOptions: ItemOptions): void {
    const item: ItemOptions = { ...itemOptions };
    item.customElements = item.customElements || [];
    if (itemOptions.content) {
      item.customElements.push({
        "content:encoded": {
          _cdata: itemOptions.content,
        },
      });
    }

    if (itemOptions.itunesAuthor || itemOptions.author) {
      item.customElements.push({
        "itunes:author": itemOptions.itunesAuthor || itemOptions.author,
      });
    }
    if (itemOptions.itunesSubtitle) {
      item.customElements.push({
        "itunes:subtitle": itemOptions.itunesSubtitle,
      });
    }
    if (itemOptions.itunesSummary || itemOptions.description) {
      item.customElements.push({
        "itunes:summary": itemOptions.itunesSummary || itemOptions.description,
      });
    }
    item.customElements.push({
      "itunes:explicit": itemOptions.itunesExplicit || false ? "Yes" : "No",
    });
    if (itemOptions.itunesDuration) {
      item.customElements.push({
        "itunes:duration": durationFormat(itemOptions.itunesDuration),
      });
    }
    if (itemOptions.itunesKeywords) {
      deprecate({ name: "itunesKeywords", type: "option" });
      item.customElements.push({
        "itunes:keywords": itemOptions.itunesKeywords,
      });
    }
    if (itemOptions.itunesImage || itemOptions.imageUrl) {
      item.customElements.push({
        "itunes:image": {
          _attr: {
            href: itemOptions.itunesImage || itemOptions.imageUrl,
          },
        },
      });
    }
    if (itemOptions.itunesSeason)
      item.customElements.push({ "itunes:season": itemOptions.itunesSeason });
    if (itemOptions.itunesEpisode)
      item.customElements.push({ "itunes:episode": itemOptions.itunesEpisode });
    if (itemOptions.itunesTitle)
      item.customElements.push({ "itunes:title": itemOptions.itunesTitle });
    if (itemOptions.itunesEpisodeType) {
      item.customElements.push({
        "itunes:episodeType": itemOptions.itunesEpisodeType,
      });
    }
    if (itemOptions.itunesNewFeedUrl) {
      item.customElements.push({
        "itunes:new-feed-url": itemOptions.itunesNewFeedUrl,
      });
    }
    this.items.push(item as Item);
    return;
  }

  buildXml(options: { indent: string }) {
    const rss = new RSS({
      ...this.feedOptions,
      feed_url: this.feedOptions.feedUrl,
      site_url: this.feedOptions.siteUrl,
      custom_elements: this.feedOptions.customElements,
      custom_namespaces: this.feedOptions.customNamespaces,
    });
    this.items.forEach((item) =>
      rss.item({
        ...item,
        custom_elements: item.customElements,
      })
    );
    return rss.xml(options);
  }
}
