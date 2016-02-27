# Podcast RSS for Node [![Build Status](https://travis-ci.org/maxnowack/node-podcast.svg)](https://travis-ci.org/maxnowack/node-podcast)

> Fast and simple Podcast RSS generator/builder for Node projects. Supports enclosures and GeoRSS.

## Install

    $ npm install podcast

## Usage

### Create a new feed

```js
var Podcast = require('podcast');

var feed = new Podcast(feedOptions);
```

#### `feedOptions`

 * `title` **string** Title of your site or feed
 * `description` _optional_ **string** A short description of the feed.
 * `generator` _optional_  **string** Feed generator.
 * `feed_url` **url string** Url to the rss feed.
 * `site_url` **url string** Url to the site that the feed is for.
 * `image_url` _optional_  **url string* Small image for feed readers to use.
 * `docs` _optional_ **url string** Url to documentation on this feed.
 * `author` **string** Who owns this feed.
 * `managingEditor` _optional_ **string** Who manages content in this feed.
 * `webMaster` _optional_ **string** Who manages feed availability and technical support.
 * `copyright` _optional_ **string** Copyright information for this feed.
 * `language` _optional_ **string**  The language of the content of this feed.
 * `categories` _optional_ **array of strings**  One or more categories this feed belongs to.
 * `pubDate` _optional_ **Date object or date string** The publication date for content in the feed
 * `ttl` _optional_ **integer** Number of minutes feed can be cached before refreshing from source.
 * `itunesAuthor` _optional_  **string** (iTunes specific) author of the podcast
 * `itunesSubtitle` _optional_  **string** (iTunes specific) subtitle for iTunes listing
 * `itunesSummary` _optional_  **string** (iTunes specific) summary for iTunes listing
 * `itunesOwner` _optional_ **object** (iTunes specific) owner of the podcast ( {name:String, email:String} )
 * `itunesExplicit` _optional_ **boolean** (iTunes specific) specifies if the podcast contains explicit content
 * `itunesCategory` _optional_ **array of objects** (iTunes specific) Categories for iTunes ( [{text:String, subcats:[{text:String, subcats:Array}]}] )
 * `itunesImage` _optional_ **string** (iTunes specific) link to an image for the podcast

### Add items to a feed

An item can be used for a blog entry, project update, log entry, etc.  Your RSS feed
an have any number of items. Most feeds use 20 or fewer items.

```js
feed.item(itemOptions);
```

#### itemOptions

 * `title` **string** Title of this particular item.
 * `description` **string** Content for the item.  Can contain html but link and image urls must be absolute path including hostname.
 * `url` **url string** Url to the item. This could be a blog entry.
 * `guid` **unique string** A unique string feed readers use to know if an item is new or has already been seen.
 If you use a guid never change it.  If you don't provide a guid then your item urls must
 be unique.
 * `categories` _optional_ **array of strings** If provided, each array item will be added as a category element
 * `author` _optional_  **string**  If included it is the name of the item's creator.
 If not provided the item author will be the same as the feed author.  This is typical
 except on multi-author blogs.
 * `date` **Date object or date string** The date and time of when the item was created.  Feed
 readers use this to determine the sort order. Some readers will also use it to determine
 if the content should be presented as unread.
 * `lat` _optional_ **number** The latitude coordinate of the item.
 * `long` _optional_ **number** The longitude coordinate of the item.
 * `enclosure` _optional_ **object** Attach a multimedia file to this item.
    * `url` **string** Url to the related file.
    * `file` _optional_ **string** Path to the related file on the filesystem. Used to fill out size and mime
    information.
    * `size` _optional_ **number** Number of bytes in the file. The length field will defualt to 0 if the
    `size` or `file` fields have not been set.
    * `type` _optional_ **string** Mime type of the file. Will be guessed from the url if this parameter is
    not set.
 * `itunesAuthor` _optional_  **string** (iTunes specific) author of the podcast
 * `itunesExplicit` _optional_ **boolean** (iTunes specific) specifies if the podcast contains explicit content
 * `itunesSubtitle` _optional_  **string** (iTunes specific) subtitle for iTunes listing
 * `itunesSummary` _optional_  **string** (iTunes specific) summary for iTunes listing
 * `itunesDuration` _optional_ **number** (iTunes specific) duration of the podcast item in seconds
 * `itunesKeywords` _optional_ **array of string** (iTunes specific) keywords of the podcast
 * `itunesImage` _optional_ **string** (iTunes specific) link to an image for the item

#### Feed XML

```js
var xml = feed.xml(indent);
```

This returns the XML as a string.

`indent` _optional_ **string** What to use as a tab. Defaults to no tabs (compressed).
 For example you can use `'\t'` for tab character, or `'  '` for two-space tabs.

## Example Usage

```js
var Podcast = require('podcast');

/* lets create an rss feed */
var feed = new Podcast({
    title: 'title',
    description: 'description',
    feed_url: 'http://example.com/rss.xml',
    site_url: 'http://example.com',
    image_url: 'http://example.com/icon.png',
    docs: 'http://example.com/rss/docs.html',
    author: 'Dylan Greene',
    managingEditor: 'Dylan Greene',
    webMaster: 'Dylan Greene',
    copyright: '2013 Dylan Greene',
    language: 'en',
    categories: ['Category 1','Category 2','Category 3'],
    pubDate: 'May 20, 2012 04:00:00 GMT',
    ttl: '60',
    itunesAuthor: 'Max Nowack',
    itunesSubtitle: 'I am a sub title',
    itunesSummary: 'I am a summary',
    itunesOwner: { name: 'Max Nowack', email:'max@unsou.de' },
    itunesExplicit: false,
    itunesCategory: {
        "text": "Entertainment",
        "subcats": [{
          "text": "Television"
        }]
    },
    itunesImage: 'http://link.to/image.png'
});

/* loop over data and add to feed */
feed.item({
    title:  'item title',
    description: 'use this for the content. It can include html.',
    url: 'http://example.com/article4?this&that', // link to the item
    guid: '1123', // optional - defaults to url
    categories: ['Category 1','Category 2','Category 3','Category 4'], // optional - array of item categories
    author: 'Guest Author', // optional - defaults to feed author property
    date: 'May 27, 2012', // any format that js Date can parse.
    lat: 33.417974, //optional latitude field for GeoRSS
    long: -111.933231, //optional longitude field for GeoRSS
    enclosure : {url:'...', file:'path-to-file'}, // optional enclosure
    itunesAuthor: 'Max Nowack',
    itunesExplicit: false,
    itunesSubtitle: 'I am a sub title',
    itunesSummary: 'I am a summary',
    itunesDuration: 12345,
    itunesKeywords: ['javascript','podcast']
});

// cache the xml to send to clients
var xml = feed.xml();
```

## Tests

Tests included use Mocha. Use `npm test` to run the tests.

    $ npm test

## Notes
 * You do not need to escape anything. This module will escape characters when necessary.
 * This module is very fast but you might as well cache the output of xml() and serve
 it until something changes.

# History

I started this module over two years ago (April 2011) because there weren't any Node modules
for creating RSS. Besides these [25 modules](https://npmjs.org/browse/depended/rss)
I would love to know what other projects are using it.

# Contributing

Contributions to the project are welcome. Feel free to fork and improve.
I do my best accept pull requests in a timely manor, especially when tests and updated docs
are included.

# License

(The MIT License)

Copyright (c) 2011-2013 Dylan Greene <dylang@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
