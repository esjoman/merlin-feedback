import MerlinFeedback from './MerlinFeedback.js';

type SerpRegex = RegExp | (url: string) => boolean;

const ERROR_MSG: string = `merlinFeedback takes 4 required arguments: company, environment, instance, serpRegex.
  company: the name of the company,
  environment: 'dev', 'staging', or 'prod',
  instance: the name of the instance,
  serpRegex: a function or regex that returns truthy for SERP urls.`;

const SERP_ERROR_MSG: string = `merlinFeedback's 4th argument must be a RegExp or a function that returns truthy for SERP urls.`

const BB_CART: string = 'bbcart';

export default function init(company: string, env: string, instance: string, serpRegex: SerpRegex): MerlinFeedback {
  // validate input
  if (!company || !env || !instance) throw new Error(ERROR_MSG);
  if (!(serpRegex instanceof RegExp || typeof serpRegex === 'function')) throw new Error(SERP_ERROR_MSG);

  const url = `https://search-${env}.search.blackbird.am/v1/${company}.${env}.${instance}/products/feedback`;
  return new MerlinFeedback(url, serpRegex, window.localStorage, BB_CART);
}
