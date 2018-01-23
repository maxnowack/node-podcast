import test from 'ava';
import includeFolder from 'include-folder';
import mockdate from 'mockdate';
import Podcast from '..';

const expectedOutput = includeFolder(`${__dirname}/expectedOutput`, /.*\.xml$/);

// Dates in XML files will always be this value.
mockdate.set('Wed, 10 Dec 2014 19:04:57 GMT');

test('empty feed', (t) => {
  const feed = new Podcast();
  t.is(feed.buildXml({ indent: '  ' }), expectedOutput.default.trim());
  feed.addItem();
  t.is(feed.buildXml({ indent: '  ' }), expectedOutput.defaultOneItem.trim());
});

test('podcast', (t) => {
  const feed = new Podcast({
    title: 'title',
    description: 'description',
    feed_url: 'http://example.com/rss.xml',
    site_url: 'http://example.com',
    author: 'Dylan Greene',
    pubDate: 'May 20, 2012 04:00:00 GMT',
    language: 'en',
    ttl: '60',
    itunesSubtitle: 'A show about everything',
    itunesAuthor: 'John Doe',
    itunesSummary: 'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store',
    itunesOwner: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    itunesImage: 'http://example.com/podcasts/everything/AllAboutEverything.jpg',
    itunesType: 'episodic',
    itunesCategory: [{
      text: 'Technology',
      subcats: [{
        text: 'Software',
        subcats: [{
          text: 'node.js',
        }],
      }],
    }],
  });

  feed.addItem({
    title: 'item 1',
    description: 'description 1',
    url: 'http://example.com/article1',
    date: 'May 24, 2012 04:00:00 GMT',
    itunesAuthor: 'John Doe',
    itunesSubtitle: 'A short primer on table spices',
    itunesImage: 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg',
    itunesDuration: '7:04',
    itunesEpisode: 1,
    itunesSeason: 1,
    itunesTitle: 'itunes item 1',
    itunesEpisodeType: 'full',
  });

  t.is(feed.buildXml({ indent: '  ' }), expectedOutput.podcast.trim());
});
