# Standalone Feedback Library

The Feedback API allows you improve search relevance by communicating certain events of importance, such as how a certain search led to a purchase. To aid in implementing it we've developed a standalone library. To use the library, all you have to do is drop in a script tag, and with some minimal configuration you should be all set to send feedback events.

Alongside [merlin.js](https://github.com/blackbirdtech/merlin.js), this [merlin-feedback](https://github.com/blackbirdtech/merlin-feedback) for the browser with just the feedback features that you can use even when you are powering your own search. This feedback helps us get past the cold start problem. Using `mf.js` will load the script asynchronously so your pageload times are not impacted. Without the `fetch` and `Promise` polyfills, the library weighs in at an easy-to-digest 5.2K.

## Quickstart

Using the feedback library with a [jQuery](https://jquery.com/) enabled site would be as easy as having this code block on every page:

```html
<script src="https://cdn.rawgit.com/blackbirdtech/merlin-feedback/e967659e85d8863103810063526bfa7836e18793/dist/mf.js"></script>
<script>
  var $NUMFOUND = $('#product-count');
  var $PRODUCTS = $('.grid-item');
  var $ADD_TO_CART = $('#add-to-cart');
  var $FINISH_CHECKOUT = $('#finish-checkout');

  var QARGS = window.location.search  // '?keyword=dress&num=40'
    .slice(1)                         // 'keyword=dress&num=40'
    .split('&')                       // ['keyword=dress', 'num=40']
    .reduce(function (acc, kv) {      // {keyword: 'dress', num: '40'}
      var tuple = kv.split('=');
      acc[tuple[0]] = tuple[1];
      return acc;
    }, {});

  merlinFeedback(function() {
    var mf = merlinFeedback.init('blackbird', 'dev', 'whiskey', /search/);
    // .serp() will be a no-op unless the current URL matches the serp regex (the
    // 4th argument in the merlinFeedback call)
    mf.serp({
      q: QARGS.keyword,
      numfound: $NUMFOUND.val(),
      docids: $PRODUCTS.map(function(_, product) { return product.id })
    });
    $PRODUCT_SELECTOR.on('click', function (e) {
      mf.click({docids: [$(this).attr('data-id')]});
    });
    $ADD_TO_CART.on('click', function (e) {
      mf.cartAdd({docids: [$(this).attr('data-id')]});
    });
    $FINISH_CHECKOUT.on('click', function (e) {
      mf.purchase();
    });
  });
</script>
```

## Overview
merlin-feedback was primarily created for use on server-driven (not single page apps) to aid in quickly implementing the Merlin Feedback API. We first instantiate an instance of a feedback engine by calling `merlinFeedback.init(company, environment, instance, serpRegex)`.

```js
var mf = merlinFeedback('blackbird', 'dev', 'whiskey');
```

Once we have done this, merlin-feedback can be used in one of two scenarios:

### Scenario #1: To collect feedback on a site that *is not* running Blackbird search

On websites that are currently powered by inhouse search, you must call the `.serp()` method with `docids`, `numfound`, and `q`, where `docids` is an array of all the IDs of documents returned for a given search (on that page), `numfound` is the total number of results returned, and `q` is the query for that search. It would look something like this:

```js
mf.serp({
  q: 'red dress',
  docids: [93854, 45930, 49598, 29384, 89222],
  numfound: 25
});
```

This notifies our backend that the search for 'red dress' led to 25 results, with 5 of them showing up on the first page.

### Scenario #2: To collect feedback on a site that *is* running Blackbird search

In cases where you are already using our search, all you need to provide to the `.serp()` call is the `qid` returned in the response body of the search request, JSON that looks like this:

```js
{
  q: "dress",
  num: 5,
  start: 0,
  results: {
    numfound: 25,
    hits: [],
    facets: {
      enums: { },
      histograms: { },
      ranges: { }
    }
  },
  qid: "XqIgw7LDcJuowpcS"
}
```

All you would have to do is simply make the `.serp()` call with the returned `qid`, or in this case, `"XqIgw7LDcJuowpcS"`:

```js
mf.serp({qid: 'XqIgw7LDcJuowpcS'});
```

## Setting up event handlers: click, cartAdd, and purchase

Once you've got the `.serp()` calls set up, the next thing to do is to wire up event listeners on any DOM elements to fire the appropriate events. merlin-feedback will know when to associate the event with a query if it is valid by determining whether the user came from a SERP. merlin-feedback uses `localStorage` to store this information. More on this in the API Reference below.

## Conditional Builds

merlin-feedback relies on [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) being present in the browser. To optimize for the lowest page-load times, we provide `mf.js` which will automatically detect whether they are present and load polyfills for any missing features as necessary. The catch is that the script is asynchronous, so you must wrap your code as shown below:

```js
merlinFeedback(function (){
  var mf = merlinFeedback.init(...);
  // etc...
});
```

## API Reference

The API is the same as in merlin.js with some exceptions. Because we are not providing the search results, our engine needs a way of knowing which queries led to which results. For this, we expose an additional method, [`.serp()`](#merlinfeedbackprototypeserpoptions). We can use this method once a page has loaded.


### [`merlinFeedback.init(company, environment, instance, serpRegex)`](#merlinfeedbackcompany-environment-instance-serpregex)

Gives you a reference to a MerlinFeedback instance which you can use to make subsequent feedback API calls.

> When calling either [`.click()`](#merlinfeedbackprototypeclickoptions), [`.cartAdd()`](#merlinfeedbackprototypecartaddoptions), or [`.purchase()`](#merlinfeedbackprototypepurchaseoptions), we use the qid stored in localStorage by default.

#### Arguments
1. `company` *(string)*: The company ID, typically the company name in all lowercase.
2. `environment` *(string)*: The level of the instance: 'dev', 'staging', or 'prod'.
3. `instance` *(string)*: The name of the instance.
4. `serpRegex` *(RegExp | Function)*: A regular expression or function that the current URL can be tested truthy for on SERPs.

#### Returns
*(MerlinFeedback)*: An object with [`.serp()`](#merlinfeedbackprototypeserpoptions), [`.click()`](#merlinfeedbackprototypeclickoptions), [`.cartAdd()`](#merlinfeedbackprototypecartaddoptions), and [`.purchase()`](#merlinfeedbackprototypepurchaseoptions) methods.

#### Example
```js
  var mf = merlinFeedback.init('blackbird', 'dev', 'my_instance', /search/);
```

## [`MerlinFeedback.prototype.serp(options)`](#merlinfeedbackprototypeserpoptions)
Generates and/or records a new query ID (qid), and records a serp event.

#### Arguments
1. `options` *(Object)*: [`.serp()`](#merlinfeedbackprototypeserpoptions) can be called one of two ways depending on whether search is being done by Blackbird. If it is, simply call the method with options taking the form `{qid}`. Otherwise, call it with the the query, number of documents returned, and the documents that are showing on the page with form `{q, numfound, docids}`.

#### Examples

When using Blackbird search:

```js
mf.serp({qid: 'CM1G4qZWbgVa7Nav'});
```

Otherwise, call it with {q, numfound, docids} as the `options`:

```js
mf.serp({
  q: 'dress',
  numfound: 2093,
  docids: [34893, 34894, 35023, ..., 35038]
});
```

## [`MerlinFeedback.prototype.click(options)`](#merlinfeedbackprototypeclickoptions)
Records a click event.

#### Arguments
1. `options` *(Object)*: Options for a `click` event must include `docids`, an array containing the ID of the item being clicked. By default, the library will grab `qid` from `localStorage`. However you can pass in your own `qid` as well.

#### Example
```js
mf.click({docids: [34894]});
```

## [`MerlinFeedback.prototype.cartAdd(options)`](#merlinfeedbackprototypecartaddoptions)
Records an add-to-cart event.

#### Arguments
1. `options` *(Object)*: Options for a `cartAdd` event must include `docids`, an array containing the ID of the item being clicked. By default, the library will grab `qid` from `localStorage` based on `document.referrer`. However you can pass in your own `qid` as well.

#### Example
```js
mf.cartAdd({docids: [34894]});
```

## [`MerlinFeedback.prototype.purchase([options])`](#merlinfeedbackprototypepurchaseoptions)

#### Arguments
[`options`] *(Object)*: You may optionally specify `options` to pass a `qid` and `docids`.

#### Example
```js
mf.purchase();
```
