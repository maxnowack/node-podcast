import {
  Podcast,
  Item,
  FeedOptions
} from '..';

const owner = "Team Nerdwelten";

const feedOptions: FeedOptions = {
  title: "Nerdwelten Podcast",
  language: "de-DE",
  feedUrl: "https://anchor.fm/s/130413bc/podcast/rss",
  siteUrl: "https://nerdweltenpodcast.com",
  author: owner,
  itunesOwner: {
    email: "hartmut.hessdoerfer@t-online.de",
    name: owner,
  },
  copyright: owner,
  description: 'Beim Nerdwelten Podcast beschäftigen sich Hardy Heßdörfer, Daniel Cloutier und Ben Dibbert mit den nerdigen Dingen dieser Welt, meist aber sprechen sie über Retrospiele, immer wieder gibt es aber auch Interviews, Musikepisoden oder "Durchgeblättert" Folgen.',
  imageUrl: "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded/3090343/3090343-1579851307831-fb83a18260fd6.jpg",
  itunesExplicit: false,
  itunesType: "episodic",
  itunesCategory: [{
    text: "Leisure",
    subcats: [{
      text: "Video Games"
    }]
  }],
};

const item: Item = {
  title: "Folge 35: Interview mit Claude Moyse",
  description: "In der letzten Folge zur Seiken Densetsu Reihe habt ihr schon einen kleinen Ausschnitt gehört, hier nun das komplette Interview mit Claude Moyse, der lange Zeit für Nintendo gearbeitet hat und vielen besonders durch seine Arbeit beim Nintendo Club Magazin und zahlreiche Übersetzungen von Spielen für Nintendo-Plattformen (z.B. Kirby’s Adventure, Plok, Secret of Mana, Link’s Awakening…) in Erinnerung geblieben ist. Er berichtet rund um seine Zeit bei Nintendo, die Umstände, die er in Japan für seine Übersetzungen vorfand und erzählt auch die ein oder andere schöne Anekdote.",
  author: owner,
  url: "https://nerdweltenpodcast.wordpress.com/?p=269",
  guid: "http://nerdweltenpodcast.wordpress.com/?p=269",
  date: "Fri, 24 May 2019 09:00:46 GMT",
  enclosure: {
    url: "https://anchor.fm/s/130413bc/podcast/play/9910868/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-0-24%2F44928620-48000-2-325f2cd9a69a6f5c.mp3",
    size: 41779540,
    type: "audio/mpeg"
  },
  imageUrl: "https://i2.wp.com/nerdweltenpodcast.com/wp-content/uploads/2019/05/secret-of-mana-lindenstrac39fe.jpg?resize=406%2C354&ssl=1",
  itunesExplicit: false,
  itunesDuration: 3207,
  pscChapters: {
    version: '1.2',
    chapter: [
      {
        start: 0,
        title: "Intro"
      },
      {
        start: 24,
        title: "Vorstellung Claude Moyse"
      },
      {
        start: "00:05:47",
        title: "Was war deine Hauptaufgabe?"
      }
    ]
  }
};

const feed = new Podcast(feedOptions);
feed.addItem(item);

console.log(feed.buildXml({indent: "  "}));