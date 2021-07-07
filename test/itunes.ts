import test from "ava";
import { includeFolder } from "./utils/include-folder";
import mockdate from "mockdate";
import { Podcast, FeedNamespaceOptions } from "../src/index";
import { FeedOptions } from "../src/types/feed-options";
import { ItemOptions } from "../src/types/item-options";

const expectedOutput = includeFolder(
  `${__dirname}/expectedOutput/itunes`,
  /.*\.xml$/
);

const namespaces: FeedNamespaceOptions = {
  iTunes: true,
  podcast: false,
  simpleChapters: false,
};

// Dates in XML files will always be this value.
mockdate.set("Wed, 10 Dec 2014 19:04:57 GMT");

test("podcast", (t) => {
  const feed = new Podcast({
    namespaces,
    title: "title",
    description: "description",
    feedUrl: "http://example.com/rss.xml",
    siteUrl: "http://example.com",
    author: "Dylan Greene",
    pubDate: "May 20, 2012 04:00:00 GMT",
    language: "en",
    ttl: 60,
    itunesSubtitle: "A show about everything",
    itunesAuthor: "John Doe",
    itunesSummary:
      "All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store",
    itunesOwner: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything.jpg",
    itunesType: "episodic",
    itunesCategory: [
      {
        text: "Technology",
        subcats: [
          {
            text: "Software",
            subcats: [
              {
                text: "node.js",
              },
            ],
          },
        ],
      },
    ],
  });

  feed.addItem({
    title: "item 1",
    description: "description 1",
    url: "http://example.com/article1",
    date: "May 24, 2012 04:00:00 GMT",
    itunesAuthor: "John Doe",
    itunesSubtitle: "A short primer on table spices",
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg",
    itunesDuration: 424,
    itunesEpisode: 1,
    itunesSeason: 1,
    itunesTitle: "itunes item 1",
    itunesEpisodeType: "full",
  });

  t.is(feed.buildXml({ indent: "  " }), expectedOutput.podcast.trim());
});
test("podcast with new feed url", (t) => {
  const feed = new Podcast({
    namespaces,
    title: "title",
    description: "description",
    feedUrl: "http://example.com/rss.xml",
    siteUrl: "http://example.com",
    author: "Dylan Greene",
    pubDate: "May 20, 2012 04:00:00 GMT",
    language: "en",
    ttl: 60,
    itunesSubtitle: "A show about everything",
    itunesAuthor: "John Doe",
    itunesSummary:
      "All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store",
    itunesOwner: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything.jpg",
    itunesType: "episodic",
    itunesCategory: [
      {
        text: "Technology",
        subcats: [
          {
            text: "Software",
            subcats: [
              {
                text: "node.js",
              },
            ],
          },
        ],
      },
    ],
  });

  feed.addItem({
    title: "item 1",
    description: "description 1",
    url: "http://example.com/article1",
    date: "May 24, 2012 04:00:00 GMT",
    itunesAuthor: "John Doe",
    itunesSubtitle: "A short primer on table spices",
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg",
    itunesDuration: "7:04",
    itunesEpisode: 1,
    itunesSeason: 1,
    itunesTitle: "itunes item 1",
    itunesEpisodeType: "full",
    itunesNewFeedUrl: "https://newlocation.com/example.rss",
  });

  t.is(
    feed.buildXml({ indent: "  " }),
    expectedOutput.podcastWithNewFeedUrl.trim()
  );
});
test("podcast using contructor with items", (t) => {
  const feedInfo: FeedOptions = {
    namespaces,
    title: "title",
    description: "description",
    feedUrl: "http://example.com/rss.xml",
    siteUrl: "http://example.com",
    author: "Dylan Greene",
    pubDate: "May 20, 2012 04:00:00 GMT",
    language: "en",
    ttl: 60,
    itunesSubtitle: "A show about everything",
    itunesAuthor: "John Doe",
    itunesSummary:
      "All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store",
    itunesOwner: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything.jpg",
    itunesType: "episodic",
    itunesCategory: [
      {
        text: "Technology",
        subcats: [
          {
            text: "Software",
            subcats: [
              {
                text: "node.js",
              },
            ],
          },
        ],
      },
    ],
  };
  const item: ItemOptions = {
    title: "item 1",
    description: "description 1",
    url: "http://example.com/article1",
    date: "May 24, 2012 04:00:00 GMT",
    itunesAuthor: "John Doe",
    itunesSubtitle: "A short primer on table spices",
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg",
    itunesDuration: 424,
    itunesEpisode: 1,
    itunesSeason: 1,
    itunesTitle: "itunes item 1",
    itunesEpisodeType: "full",
  };
  const feed = new Podcast(feedInfo, [item]);

  t.is(feed.buildXml({ indent: "  " }), expectedOutput.podcast.trim());
});

test("preformatted duration", (t) => {
  const feed = new Podcast({
    namespaces,
    title: "title",
    description: "description",
    feedUrl: "http://example.com/rss.xml",
    siteUrl: "http://example.com",
    author: "Dylan Greene",
    pubDate: "May 20, 2012 04:00:00 GMT",
    language: "en",
    ttl: 60,
    itunesSubtitle: "A show about everything",
    itunesAuthor: "John Doe",
    itunesSummary:
      "All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store",
    itunesOwner: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything.jpg",
    itunesType: "episodic",
    itunesCategory: [
      {
        text: "Technology",
        subcats: [
          {
            text: "Software",
            subcats: [
              {
                text: "node.js",
              },
            ],
          },
        ],
      },
    ],
  });

  feed.addItem({
    title: "item 1",
    description: "description 1",
    url: "http://example.com/article1",
    date: "May 24, 2012 04:00:00 GMT",
    itunesAuthor: "John Doe",
    itunesSubtitle: "A short primer on table spices",
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg",
    itunesDuration: "7:04",
    itunesEpisode: 1,
    itunesSeason: 1,
    itunesTitle: "itunes item 1",
    itunesEpisodeType: "full",
  });

  t.is(
    feed.buildXml({ indent: "  " }),
    expectedOutput.preformattedDuration.trim()
  );
});

test("html content", (t) => {
  const feed = new Podcast({
    namespaces,
    title: "title",
    description: "description",
    feedUrl: "http://example.com/rss.xml",
    siteUrl: "http://example.com",
    author: "Dylan Greene",
    pubDate: "May 20, 2012 04:00:00 GMT",
    language: "en",
    ttl: 60,
    itunesSubtitle: "A show about everything",
    itunesAuthor: "John Doe",
    itunesSummary:
      "All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store",
    itunesOwner: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything.jpg",
    itunesType: "episodic",
    itunesCategory: [
      {
        text: "Technology",
        subcats: [
          {
            text: "Software",
            subcats: [
              {
                text: "node.js",
              },
            ],
          },
        ],
      },
    ],
  });

  feed.addItem({
    title: "item 1",
    description: "description 1",
    url: "http://example.com/article1",
    date: "May 24, 2012 04:00:00 GMT",
    content: '<a href="https://www,google.de">Google</a>',
    itunesAuthor: "John Doe",
    itunesSubtitle: "A short primer on table spices",
    itunesImage:
      "http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg",
    itunesDuration: 424,
    itunesEpisode: 1,
    itunesSeason: 1,
    itunesTitle: "itunes item 1",
    itunesEpisodeType: "full",
  });

  t.is(feed.buildXml({ indent: "  " }), expectedOutput.htmlContent.trim());
});
