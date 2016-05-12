type Event = 
 | 'serp'
 | 'click'
 | 'cartAdd'
 | 'purchase';

type Id = string | number;

type FeedbackParams = {
  qid?: Id;
  docids: Array<Id>;
  sid?: Id;
  uid?: Id;
};

type SerpParams = {
  qid?: Id;
  q: string;
  docids: Array<Id>;
};

const SESSION_STORAGE_KEY: string = 'bbqid';
const ERROR_MSG: string = `merlinFeedback takes 4 required arguments: company, environment, instance, preserve.
  company: the name of the company,
  environment: 'dev', 'staging', or 'prod',
  instance: the name of the instance,
  preserve: a boolean that should be false when the user has navigated to a page that is no longer related to the SERP.`;

class MerlinFeedback {
  constructor(company: string, env: string, instance: string, preserve: boolean, browser: boolean) {
    if (!company || !env || !instance || typeof preserve !== 'boolean' || typeof browser !== 'boolean') {
      throw new Error(ERROR_MSG);
    }
    this.url = `https://search-${env}.search.blackbird.am/${company}.${env}.${instance}/feedback`;
    this.browser = browser;
    if (!preserve) {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }
  click(options: FeedbackParams, callback?) {
    this._registerEvent('click', options, callback);
  }
  cartAdd(options: FeedbackParams, callback?) {
    this._registerEvent('cartAdd', options, callback);
  }
  purchase(options: FeedbackParams, callback?) {
    this._registerEvent('purchase', options, callback);
  }
  serp(options: SerpParams, callback?) {
    let qid = this._qid();
    this._registerEvent('serp', {...options, qid}, callback);
  }
  _qid(): string {
    // generates a qid, stores it in sessionStorage under SESSION_STORAGE_KEY, and returns it
    const key = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
    if (this.browser) {
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, key);
    }
    return key;
  }
  _registerEvent(event: Event, options: FeedbackParams | SerpParams, callback?) {
    let xhr = new XMLHttpRequest();
    if (callback) {
      xhr.addEventListener('load', callback);
    }
    if (event === 'serp') {
      xhr.open('POST', `${this.url}/${event}`);
      xhr.send(JSON.stringify(options));
    } else {
      let {qid, docids, sid, uid} = options;
      
      // try to get qid from sessionStorage if no qid and we are in a browser setting
      if (!qid && this.browser) {
        qid = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      }

      // exit early if we still don't have a qid
      if (!qid) {
        return;
      }
      let url = `${this.url}/${event}?qid=${qid}&docids=${docids.join(',')}`;
      if (sid) {
        url += `&sid=${sid}`;
      }
      if (uid) {
        url += `&uid=${uid}`;
      }
      xhr.open('GET', url);
      xhr.send();
    }
  }
}

export default function merlinFeedback(company: string, env: string, instance: string, preserve: boolean, browser?: boolean = true): MerlinFeedback {
  return new MerlinFeedback(company, env, instance, preserve, browser);
}
