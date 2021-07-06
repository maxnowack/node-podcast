export interface FeedItunesCategoryTransformed {
  _attr?: { text: string };
  "itunes:category"?:
    | FeedItunesCategoryTransformed[]
    | FeedItunesCategoryTransformed;
}
