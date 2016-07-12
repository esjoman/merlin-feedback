// @flow

import Cart from './Cart.js';
import UrlChangeTracker from './UrlChangeTracker.js';

type Id = string | number;

type SerpRegex = RegExp | (url: string) => boolean;

type Event = 'serp' | 'click' | 'cart_add' | 'purchase';

type FeedbackParams = {
  qid?: Id;
  q?: string; // for serp calls
  docids?: Array<Id>;
  numfound?: number;
  start?: number;
  num?: number;
  uid?: Id;
  sid?: Id;
};

type CartObj = {
  [key: Id]: Array<Id>;
};

type HandleUrlChanged = (currentHref: ?string) => void;

type FallbackOptions = {
  mode: string;
  url: string;
};

const POSSIBLE_PARAMS: Array<string> = ['qid', 'q', 'numfound', 'docids', 'uid', 'sid', 'num', 'start'];

export default class MerlinFeedback {
  url: string;
  serpRegex: SerpRegex;
  storage: Storage;
  cart: Cart;
  previousHref: string;
  currentHref: string;
  handleUrlChanged: HandleUrlChanged;
  urlChangeTracker: ?UrlChangeTracker;
  fallback: ?FallbackOptions;
  useFallback: ?boolean;

  constructor(url: string, serpRegex: SerpRegex, storage: Storage, storageKey: string, useUrlChangeTracker: boolean, fallback: ?FallbackOptions) {
    this.url = url;
    this.serpRegex = serpRegex;
    this.storage = storage;
    this.cart = new Cart(storage, storageKey);
    this.previousHref = window.location.referrer;
    this.currentHref = window.location.href;
    if (useUrlChangeTracker) {
      this.handleUrlChanged = this.handleUrlChanged.bind(this);
      this.urlChangeTracker = new UrlChangeTracker(this.handleUrlChanged);
    }
    if (fallback) {
      this.fallback = fallback;
      this.useFallback = false;
    }
  }

  serp(options: FeedbackParams = {}): ?Promise<Response> {
    if (!isSerp(this.serpRegex, this.currentHref)) return null;
    const qid: Id = options.qid || generateNewQid();
    this.storage.setItem(this.currentHref, qid.toString());
    return this._registerEvent('serp', {...options, qid});
  }

  click(options: FeedbackParams = {}): ?Promise<Response> {
    const qid: ?Id = options.qid || this.storage.getItem(this.currentHref);
    if (!qid) return null; // return if no qid passed in, and none found in localStorage for current href
    return this._registerEvent('click', {...options, qid});
  }

  cartAdd({docids = [], ...options}: FeedbackParams = {}): ?Promise<Response> {
    const qid: ?Id = options.qid || this.storage.getItem(this.previousHref);
    if (!qid) return null; // return if no qid passed in, and none found in localStorage for the previous page
    this.cart.add(qid, docids);
    return this._registerEvent('cart_add', {...options, qid, docids});
  }

  cartRemove() {
    // not implemented
  }

  purchase(options: FeedbackParams = {}): Promise<Response | Array<Response>> {
    if (options.docids) {
      // use options if provided docids
      return this._registerEvent('purchase', options);
    }
    // otherwise get it from cart
    const cartObj: CartObj = this.cart.get();
    const qids: Array<string> = Object.keys(cartObj);
    const purchaseEvents: Array<Promise<Response>> = qids.map((qid: Id) => this._registerEvent('purchase', {
      ...options,
      qid,
      docids: cartObj[qid]
    }));
    return Promise.all(purchaseEvents);
  }

  handleUrlChanged(href: string = window.location.href) {
    if (href === this.currentHref) return; // no-op if the url is the same as the current one
    this.previousHref = this.currentHref;
    this.currentHref = href;
  }

  _registerEvent(event: Event, options: FeedbackParams): Promise<Response> {
    const url: string = addToUrl(`${this.url}/${event}`, options, POSSIBLE_PARAMS);
    return this._fetchWithFallback(url);
  }

  // based on merlin.js's merlinRequest, but slightly different because here:
  // 404s, 500s, etc. are successful requests
  _fetchWithFallback(url: string): Promise<Response> {
    // simply fetch if no fallback is specified
    if (!this.fallback) return fetch(url);

    // if we're already in fallback mode, skip straight to that
    if (this.useFallback && this.fallback.mode === 'proxy') {
      const fallbackUrl = this.fallback.url;
      const fallbackUrlWithoutTrailingSlash = fallbackUrl.slice(-1) === '/' ? fallbackUrl.slice(0, -1) : fallbackUrl;
      return fetch(`${fallbackUrlWithoutTrailingSlash}/${url}`);
    }

    // otherwise try a fetch, falling into fallback mode as necessary
    return fetch(url).catch(() => {
      this.useFallback = true;
      return this._fetchWithFallback(url);
    });
  }
}

function addToUrl(url: string, options: FeedbackParams, params: Array<string>): string {
  return params.reduce((acc, curr, i) => {
    const char: string = i === 0 ? '?' : '&';
    return options[curr] ? `${acc}${char}${curr}=${options[curr]}` : acc;
  }, url);
}

function generateNewQid(): string {
  return '_xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function isSerp(serpRegex: SerpRegex, href: string): boolean {
  return serpRegex instanceof RegExp ? serpRegex.test(href) : serpRegex(href);
}
