// @flow

// based on https://github.com/googleanalytics/autotrack/blob/master/lib/plugins/url-change-tracker.js

import {isObject} from '../utils/index.js';

type HandleUrlChanged = (currentHref: ?string) => void;

const {history, addEventListener, removeEventListener} = window;

export default class UrlChangeTracker {
  originalPushState: (state: any, title: string, url: string) => void;
  originalReplaceState: (state: any, title: string, url: string) => void;
  update: () => void;
  handleUrlChanged: HandleUrlChanged;

  constructor(handleUrlChanged: HandleUrlChanged) {
    // feature detect to prevent errors in unsupporting browsers
    if (!history.pushState || !addEventListener) return;

    this.update = this.update.bind(this);
    this.handleUrlChanged = handleUrlChanged;

    // override pushState
    this.originalPushState = history.pushState;
    history.pushState = function (state, title) {
      if(isObject(state) && title) state.title = title;
      this.originalPushState.apply(history, arguments);
      this.update();
    }.bind(this);

    // override replaceState
    this.originalReplaceState = history.replaceState;
    history.replaceState = function (state, title) {
      if(isObject(state) && title) state.title = title;
      this.originalReplaceState.apply(history, arguments);
      this.update();
    }.bind(this);

    // listen for popstate event
    addEventListener('popstate', this.update);
  }

  update() {
    // call update logic async to ensure user callbacks happen first
    setTimeout(() => {
      this.handleUrlChanged();
    }, 0);
  }

  remove() {
    removeEventListener('popstate', this.update);
    history.replaceState = this.originalReplaceState;
    history.pushState = this.originalPushState;
  }
}