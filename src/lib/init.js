// @flow

import MerlinFeedback from './MerlinFeedback.js';

type SerpRegex = RegExp | (url: string) => boolean;

type FallbackOptions = {
  mode: string;
  url?: string;
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

  let url = `https://search-${env}.search.blackbird.am/v1/${company}.${env}.${instance}/products/feedback`;

  // prepend fallback url if fallback mode is 'proxy'
  if (fallback && fallback.mode === 'proxy') {
    const fallbackUrl = fallback.url;
    if (!fallbackUrl) throw new Error(FALLBACK_URL_MISSING);
    const fallbackUrlWithoutTrailingSlash = fallbackUrl.slice(-1) === '/' ? fallbackUrl.slice(0, -1) : fallbackUrl;
    url = `${fallbackUrlWithoutTrailingSlash}/${url}`;
  }

  return new MerlinFeedback(url, serpRegex, window.localStorage, BB_CART, useUrlChangeTracker);
}
