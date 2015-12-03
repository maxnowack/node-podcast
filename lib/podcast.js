/*
 Documentation coming soon.
*/

var RSS        = require('rss');

function Podcast (options, items) {
    options = options || {};

    this.title          = options.title || 'Untitled Podcast Feed';
    this.description    = options.description || '';
    this.generator      = options.generator || 'Podcast for Node';
    this.feed_url       = options.feed_url;
    this.site_url       = options.site_url;
    this.image_url      = options.image_url;
    this.author         = options.author;
    this.categories     = options.categories;
    this.pubDate        = options.pubDate;
    this.docs           = options.docs;
    this.copyright      = options.copyright;
    this.language       = options.language;
    this.managingEditor = options.managingEditor;
    this.webMaster      = options.webMaster;
    this.ttl            = options.ttl;
    this.geoRSS         = options.geoRSS || false;

    this.custom_namespaces = {
      'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
    };

    options.itunesOwner = options.itunesOwner || {"name":options.author || "","email":""};

    this.custom_elements = [];

    if(options.itunesAuthor || options.author) this.custom_elements.push({'itunes:author':    options.itunesAuthor || options.author});
    if(options.itunesSubtitle) this.custom_elements.push({'itunes:subtitle':  options.itunesSubtitle});
    if(options.itunesSummary || options.description) this.custom_elements.push({'itunes:summary':   options.itunesSummary || options.description});
    if(options.itunesOwner) this.custom_elements.push({'itunes:owner':     [{'itunes:name':options.itunesOwner.name},{'itunes:email':options.itunesOwner.email}]}); // {name:String, email:String}
    this.custom_elements.push({'itunes:explicit':  (options.itunesExplicit || false) ? 'Yes' : 'No'});

    if(options.itunesCategory) {
      var self = this;
      var categories = buildiTunesCategories(options.itunesCategory); // [{text:String, subcats:[{text:String, subcats:Array}]}]
      categories.forEach(function(category){
        self.custom_elements.push(category);
      });
    }

    if(options.itunesImage || options.image_url) this.custom_elements.push({'itunes:image': {
      _attr: {
        href: options.itunesImage || options.image_url
      }
    }});

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
            custom_elements: []
        };

        if(options.itunesAuthor || options.author) item.custom_elements.push({'itunes:author':    options.itunesAuthor || options.author});
        if(options.itunesSubtitle) item.custom_elements.push({'itunes:subtitle':  options.itunesSubtitle});
        if(options.itunesSummary || options.description) item.custom_elements.push({'itunes:summary':   options.itunesSummary || options.description});
        item.custom_elements.push({'itunes:explicit':  (options.itunesExplicit || false) ? 'Yes' : 'No'});
        if(options.itunesDuration) item.custom_elements.push({'itunes:duration':  options.itunesDuration});
        if(options.itunesKeywords) item.custom_elements.push({'itunes:keywords':  options.itunesKeywords});
        if(options.itunesImage || options.image_url) item.custom_elements.push({'itunes:image': {
          _attr: {
            href: options.itunesImage || options.image_url
          }
        }});

        this.items.push(item);
        return this;
    };

    this.items.forEach(function(item){
      this.item(item);
    });

    this.xml = function(indent) {
      var rss = new RSS(this, this.items);
      return rss.xml(indent);
    }
}

function buildiTunesCategories(categories)
{
    var arr = [];
    if(Array.isArray(categories))
    {
        categories.forEach(function(category){
          if(category.subcats)
          {
              var elements = [
                { _attr: {text: category.text }}
              ];
              var cats = buildiTunesCategories(category.subcats);
              cats.forEach(function(cat){
                elements.push(cat);
              });
              arr.push({'itunes:category': elements});
          }
          else
          {
              arr.push({'itunes:category': { _attr: {text: category.text }}});
          }
        });
    }
    return arr;
}

module.exports = Podcast;
