/*
 Documentation coming soon.
*/

var XML        = require('xml'),
    mime       = require('mime'),
    fs         = require('fs');

function Podcast (options, items) {
    options = options || {};

    feed.title          = options.title || 'Untitled Podcast Feed';
    feed.description    = options.description || '';
    feed.generator      = options.generator || 'Podcast for Node';
    feed.feed_url       = options.feed_url;
    feed.site_url       = options.site_url;
    feed.image_url      = options.image_url;
    feed.author         = options.author;
    feed.categories     = options.categories;
    feed.pubDate        = options.pubDate;
    feed.docs           = options.docs;
    feed.copyright      = options.copyright;
    feed.language       = options.language;
    feed.managingEditor = options.managingEditor;
    feed.webMaster      = options.webMaster;
    feed.ttl            = options.ttl;
    feed.geoRSS         = options.geoRSS || false;

    feed.custom_namespaces = {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    };

    options.itunesOwner = options.itunesOwner || {"name":options.author || "","email":""};

    feed.custom_elements = [
      {'itunes:author':    options.itunesAuthor || options.author},
      {'itunes:subtitle':  options.itunesSubtitle},
      {'itunes:summary':   options.itunesSummary || options.description},
      {'itunes:owner':     [{'itunes:name':options.itunesOwner.name},{'itunes:email':options.itunesOwner.email}]}, // {name:String, email:String}
      {'itunes:explicit':  (options.itunesExplicit || false) ? 'Yes' : 'No'},
      {'itunes:category':  buildiTunesCategories(options.itunesCategory || options.categories)}, // [{text:String, subcats:[{name:String, subcat:Array}]}]
      {'itunes:image': {
        _attr: {
          href: options.itunesImage || options.image_url
        }
      }}
    ]

    this.items = [];

    this.item = function (options) {
        options = options || {};
        var item = {
            title:          options.title || 'No title',
            description:    options.description || '',
            url:            options.url,
            guid:           options.guid,
            categories:     options.categories || [],
            author:         options.author,
            date:           options.date,
            lat:            options.lat,
            long:           options.long,
            enclosure:      options.enclosure || false,
            custom_elements: [
              {'itunes:author':    options.itunesAuthor || options.author},
              {'itunes:subtitle':  options.itunesSubtitle},
              {'itunes:summary':   options.itunesSummary || options.description},
              {'itunes:explicit':  (options.itunesExplicit || false) ? 'Yes' : 'No'},
              {'itunes:duration':  options.itunesDuration},
              {'itunes:keywords':  options.itunesKeywords},
            ]
        };

        this.items.push(item);
        return this;
    };

    items.forEach(function(item){
      this.item(item));
    });

    rss = new RSS(feed, items);

    this.xml = function(indent) {
      return rss.xml(indent);
    }
}

function buildiTunesCategories(categories)
{
    var arr = [];
    if(Array.isArray(categories))
    {
        for(var i=0; i<categories.length;i++)
        {
            if(categories[i].subcats)
            {
                arr.push({'itunes:category': [{ _attr: {text: categories[i].text }},buildiTunesCategories(categories[i].subcats)]});
            }
            else
            {
                arr.push({'itunes:category': { _attr: {text: categories[i].text }}});
            }
        }
    }
    return arr;
}

module.exports = Podcast;
