// @flow

import MerlinFeedback from './MerlinFeedback.js';

type SerpRegex = RegExp | (url: string) => boolean;

type FallbackOptions = {mode: string; url?: string};

type MerlinFeedbackOptions = {
  useUrlChangeTracker: boolean;
  fallback?: FallbackOptions
};

const ERROR_MSG: string = `merlinFeedback takes 4 required arguments: company, environment, instance, serpRegex.
  company: the name of the company,
  environment: 'dev', 'staging', or 'prod',
  instance: the name of the instance,
  serpRegex: a function or regex that returns truthy for SERP urls.`;

const SERP_ERROR_MSG: string = `merlinFeedback's 4th argument must be a RegExp or a function that returns truthy for SERP urls.`;

const BB_CART: string = 'bbcart';

export default function init(
  company: string, env: string, instance: string,
  serpRegex: SerpRegex, options: MerlinFeedbackOptions = {useUrlChangeTracker: false}
): MerlinFeedback {
  // validate input
  if (!company || !env || !instance) throw new Error(ERROR_MSG);
  if (!(serpRegex instanceof RegExp || typeof serpRegex === 'function')) throw new Error(SERP_ERROR_MSG);

  const {useUrlChangeTracker, fallback} = options;
  let url = `https://search-${env}.search.blackbird.am/v1/${company}.${env}.${instance}/products/feedback`;

  if (fallback && fallback.mode === 'proxy' && fallback.url) {
    const fallbackUrl = fallback.url;
    url = `${fallbackUrl.endsWith('/') ? fallbackUrl.slice(0, -1) : fallbackUrl}/${url}`;
  }

  return new MerlinFeedback(url, serpRegex, window.localStorage, BB_CART, useUrlChangeTracker);
}
