import RSS from 'rss';
import deprecate from './deprecate';
import buildiTunesCategories from './buildiTunesCategories';

export default class Podcast {
  constructor(options, items) {
    this.init(options, items);
  }

  init(options = {}, items) {
    this.feedOptions = {};
    this.feedOptions.title = options.title || 'Untitled Podcast Feed';
    this.feedOptions.description = options.description || '';
    this.feedOptions.generator = options.generator || 'Podcast for Node';
    this.feedOptions.feed_url = options.feed_url || options.feedUrl;
    this.feedOptions.site_url = options.site_url || options.siteUrl;
    this.feedOptions.image_url = options.image_url || options.imageUrl;
    this.feedOptions.author = options.author;
    this.feedOptions.categories = options.categories;
    this.feedOptions.pubDate = options.pubDate;
    this.feedOptions.docs = options.docs;
    this.feedOptions.copyright = options.copyright;
    this.feedOptions.language = options.language;
    this.feedOptions.managingEditor = options.managingEditor;
    this.feedOptions.webMaster = options.webMaster;
    this.feedOptions.ttl = options.ttl;
    this.feedOptions.geoRSS = options.geoRSS || false;

    this.feedOptions.custom_elements = options.customElements || [];
    this.feedOptions.custom_namespaces = Object.assign({
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
    }, options.customNamespaces);

    if (options.itunesAuthor || options.author) {
      this.feedOptions.custom_elements.push({ 'itunes:author': options.itunesAuthor || options.author });
    }

    if (options.itunesSubtitle) {
      this.feedOptions.custom_elements.push({ 'itunes:subtitle': options.itunesSubtitle });
    }

    if (options.itunesSummary || options.description) {
      this.feedOptions.custom_elements.push({ 'itunes:summary': options.itunesSummary || options.description });
    }

    if (options.itunesType) {
      this.feedOptions.custom_elements.push({ 'itunes:type': options.itunesType });
    }

    this.feedOptions.itunesOwner = options.itunesOwner || { name: options.author || '', email: '' };
    this.feedOptions.custom_elements.push({
      'itunes:owner': [
        { 'itunes:name': this.feedOptions.itunesOwner.name },
        { 'itunes:email': this.feedOptions.itunesOwner.email },
      ],
    });

    this.feedOptions.custom_elements.push({ 'itunes:explicit': (options.itunesExplicit || false) ? 'Yes' : 'No' });

    if (options.itunesCategory) {
      // [{text:String, subcats:[{text:String, subcats:Array}]}]
      const categories = buildiTunesCategories(options.itunesCategory);
      categories.forEach((category) => {
        this.feedOptions.custom_elements.push(category);
      });
    }

    if (options.itunesImage || options.image_url || options.imageUrl) {
      this.feedOptions.custom_elements.push({
        'itunes:image': {
          _attr: {
            href: options.itunesImage || options.image_url || options.imageUrl,
          },
        },
      });
    }

    this.items = items || [];
    this.items.forEach(item => this.addItem(item));
  }

  addItem(itemOptions = {}) {
    const item = {
      title: itemOptions.title || 'No title',
      description: itemOptions.description || '',
      url: itemOptions.url,
      guid: itemOptions.guid,
      categories: itemOptions.categories || [],
      author: itemOptions.author,
      date: itemOptions.date,
      lat: itemOptions.lat,
      long: itemOptions.long,
      enclosure: itemOptions.enclosure || false,
      custom_elements: itemOptions.customElements || [],
    };

    if (itemOptions.content) {
      item.custom_elements.push({
        'content:encoded': {
          _cdata: itemOptions.content,
        },
      });
    }

    if (itemOptions.itunesAuthor || itemOptions.author) item.custom_elements.push({ 'itunes:author': itemOptions.itunesAuthor || itemOptions.author });
    if (itemOptions.itunesSubtitle) item.custom_elements.push({ 'itunes:subtitle': itemOptions.itunesSubtitle });
    if (itemOptions.itunesSummary || itemOptions.description) item.custom_elements.push({ 'itunes:summary': itemOptions.itunesSummary || itemOptions.description });
    item.custom_elements.push({ 'itunes:explicit': (itemOptions.itunesExplicit || false) ? 'Yes' : 'No' });
    if (itemOptions.itunesDuration) item.custom_elements.push({ 'itunes:duration': itemOptions.itunesDuration });
    if (itemOptions.itunesKeywords) item.custom_elements.push({ 'itunes:keywords': itemOptions.itunesKeywords });
    if (itemOptions.itunesImage || itemOptions.image_url || itemOptions.imageUrl) {
      item.custom_elements.push({
        'itunes:image': {
          _attr: {
            href: itemOptions.itunesImage || itemOptions.image_url || itemOptions.imageUrl,
          },
        },
      });
    }
    if (itemOptions.itunesSeason) item.custom_elements.push({ 'itunes:season': itemOptions.itunesSeason });
    if (itemOptions.itunesEpisode) item.custom_elements.push({ 'itunes:episode': itemOptions.itunesEpisode });
    if (itemOptions.itunesTitle) item.custom_elements.push({ 'itunes:title': itemOptions.itunesTitle });
    if (itemOptions.itunesEpisodeType) item.custom_elements.push({ 'itunes:episodeType': itemOptions.itunesEpisodeType });

    this.items.push(item);
    return this;
  }

  buildXml(indent) {
    const rss = new RSS(this.feedOptions);
    this.items.forEach(item => rss.item(item));
    return rss.xml(indent);
  }

  /**
 * @deprecated Since version 1.0.0
 */
  item(...args) {
    deprecate({
      type: 'Method',
      name: 'item',
      version: '1.0.0',
      alternative: 'addItem',
    });
    return this.addItem(...args);
  }

  /**
 * @deprecated Since version 1.0.0
 */
  xml(...args) {
    deprecate({
      type: 'Method',
      name: 'xml',
      version: '1.0.0',
      alternative: 'buildXml',
    });
    return this.buildXml(...args);
  }
}

module.exports = Podcast;
