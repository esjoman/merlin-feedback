/* @flow */
/* global fetch */

import 'core-js/fn/object/entries.js';

type Event = 
 | 'serp'
 | 'click'
 | 'cart_add'
 | 'purchase';

type Id = string | number;

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

type SerpRegex = RegExp | (url: string) => boolean;

type ExtraOptions = {
  href: string;
  referrer: string;
  storage: Storage
};

const ERROR_MSG: string = `merlinFeedback takes 4 required arguments: company, environment, instance, serpRegex.
  company: the name of the company,
  environment: 'dev', 'staging', or 'prod',
  instance: the name of the instance,
  serpRegex: a function or regex that returns truthy for SERP urls.`;

const SERP_ERROR_MSG: string = `merlinFeedback's 4th argument must be a RegExp or a function that returns truthy for SERP urls.`

const POSSIBLE_PARAMS: Array<string> = ['qid', 'q', 'numfound', 'docids', 'uid', 'sid', 'num', 'start'];

const BB_CART: string = 'bbcart';

function addToUrl(url: string, options: FeedbackParams, params: Array<string>): string {
  return params.reduce((acc, curr, i) => {
    let char = i === 0 ? '?' : '&';
    return options[curr] ? `${acc}${char}${curr}=${options[curr]}` : acc;
  }, url);
}

function buildUrl(company: string, env: string, instance: string): string {
  if (!company || !env || !instance) throw new Error(ERROR_MSG);
  return `https://search-${env}.search.blackbird.am/v1/${company}.${env}.${instance}/products/feedback`;
}

function generateNewQid(): string {
  return '_xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function addOrPush(object, key, values) {
  let existing = object[key];
  return existing ? [...existing, ...values] : values;
}

function isSerp(serpRegex: SerpRegex, href: string): boolean {
  if (serpRegex instanceof RegExp) return serpRegex.test(href);
  if (typeof serpRegex === 'function') return serpRegex(href);
  throw new Error(SERP_ERROR_MSG);
}

export class Cart {
  constructor(storage = window.localStorage: Storage, key = BB_CART) {
    this.storage = storage;
    this.key = key;
  }
  add(qid: Id, docids: Array<Id>) {
    let cart: Object = this.get();
    this.set({...cart, [qid]: addOrPush(cart, qid, docids)});
  }
  remove() {
    // not implemented
  }
  get(): Object {
    let cartString: string = this.storage.getItem(this.key) || '';
    let qidDocidTuple: [string, string] = cartString.split('###');
    return qidDocidTuple.reduce((acc, curr) => {
      if (!curr) return acc;
      let [qid: string, docidsString: string] = curr.split(':');
      let docids: Array<string> = docidsString.split(',');
      return {...acc, [qid]: addOrPush(acc, qid, docids)};
    }, {});
  }
  set(currentCart: Object) {
    let cartString = Object.entries(currentCart).map(([qid, docids]) => `${qid}:${docids.join(',')}`).join('###');
    this.storage.setItem(this.key, cartString);
  }
}

export class MerlinFeedback {
  constructor(company: string, env: string, instance: string, serpRegex: SerpRegex, {href, referrer, storage}) {
    this.url = buildUrl(company, env, instance); // validate and build feedback url
    this.isSerp = isSerp(serpRegex, href); // check whether href is a serp
    this.href = href;
    this.referrer = referrer;
    this.storage = storage;
    this.cart = new Cart(this.storage);
  }
  serp(options: FeedbackParams = {}): Promise<Response> {
    if (!this.isSerp) return;
    let qid = options.qid || generateNewQid();
    this.storage.setItem(this.href, qid);
    return this._registerEvent('serp', {...options, qid});
  }
  click(options: FeedbackParams = {}): Promise<Response> {
    let qid: ?string = options.qid || this.storage.getItem(this.href);
    if (!qid) return; // return if no qid passed in, and none found in localStorage for current href
    return this._registerEvent('click', {...options, qid});
  }
  cartAdd({docids = [], ...options} = {}: FeedbackParams): Promise<Response> {
    let qid: ?string = options.qid || this.storage.getItem(this.referrer);
    if (!qid) return; // return if no qid passed in, and none found in localStorage for the previous page
    this.cart.add(qid, docids);
    return this._registerEvent('cart_add', {...options, qid, docids});
  }
  cartRemove() {
    // not implemented
  }
  purchase(options = {}: FeedbackParams): Promise<Response> | Promise<Array<Response>> {
    if (options.docids) {
      // use options if provided docids
      return this._registerEvent('purchase', options);
    }
    // otherwise get it from cart
    return Promise.all(Object.entries(this.cart.get()).map(([qid, docids]) => {
      return this._registerEvent('purchase', {...options, qid, docids});
    }));
  }
  _registerEvent(event: Event, options: FeedbackParams): Promise<Response> {
    let url = addToUrl(`${this.url}/${event}`, options, POSSIBLE_PARAMS);
    return fetch(url);
  }
}

export function init(
  company: string,
  env: string,
  instance: string,
  serpRegex: SerpRegex,
  {
    href = window.location.href,
    referrer = window.location.referrer,
    storage = window.localStorage
  }: ExtraOptions = {}
): MerlinFeedback {
  return new MerlinFeedback(company, env, instance, serpRegex, {href, referrer, storage});
}
