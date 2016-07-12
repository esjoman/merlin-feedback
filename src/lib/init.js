// @flow

import MerlinFeedback from './MerlinFeedback.js';

type SerpRegex = RegExp | (url: string) => boolean;

type FallbackOptions = {
  mode: string;
  url: string;
};

type MerlinFeedbackOptions = {
  useUrlChangeTracker: boolean;
  fallback: ?FallbackOptions;
};

const ERROR_MSG: string = `merlinFeedback takes 4 required arguments: company, environment, instance, serpRegex.
  company: the name of the company,
  environment: 'dev', 'staging', or 'prod',
  instance: the name of the instance,
  serpRegex: a function or regex that returns truthy for SERP urls.`;

const SERP_ERROR_MSG: string = `merlinFeedback's 4th argument must be a RegExp or a function that returns truthy for SERP urls.`;

const AVAILABLE_FALLBACK_MODES: string = 'Currently, the only available `fallback.mode` is `\'proxy\'`.';

const FALLBACK_URL_MISSING: string = 'Using `fallback.mode === \'proxy\'` requires a `fallback.url` which will be prepended to the feedback request.';

const BB_CART: string = 'bbcart';

export default function init(
  company: string, env: string, instance: string,
  serpRegex: SerpRegex,
  // options
  {useUrlChangeTracker = false, fallback = null}: MerlinFeedbackOptions = {}
): MerlinFeedback {
  // validate input
  if (!company || !env || !instance) throw new Error(ERROR_MSG);
  if (!(serpRegex instanceof RegExp || typeof serpRegex === 'function')) throw new Error(SERP_ERROR_MSG);
  if (fallback) {
    const fallbackMode = fallback.mode;
    if (fallbackMode !== 'proxy') throw new Error(AVAILABLE_FALLBACK_MODES);
    if (fallbackMode === 'proxy' && !fallback.url) throw new Error(FALLBACK_URL_MISSING);
  }

  let url = `https://search-${env}.search.blackbird.am/v1/${company}.${env}.${instance}/products/feedback`;
  return new MerlinFeedback(url, serpRegex, window.localStorage, BB_CART, useUrlChangeTracker, fallback);
}
