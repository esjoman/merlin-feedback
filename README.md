# Standalone Feedback Library

Alongside [merlin.js](https://github.com/blackbirdtech/merlin.js), we provide a smaller [merlin-feedback](https://github.com/blackbirdtech/merlin-feedback) for the browser with just the feedback features that you can use even when you are powering your own search. This feedback helps us get past the cold start problem.

## Quickstart

Using the feedback library with a [jQuery](https://jquery.com/) enabled site would be as easy as having this code block on every page:

```html
<script src="merlin-feedback.js"></script>
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

  var mf = merlinFeedback('blackbird', 'dev', 'whiskey', /search/);
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
</script>
```

## API Reference

The API is the same as in merlin.js with some exceptions. Because we are not providing the search results, our engine needs a way of knowing which queries led to which results. For this, we expose a [`.serp()`](#merlinfeedbackprototypeserpoptions) method. We can use this method once a page has loaded.


### [`merlinFeedback(company, environment, instance, serpRegex)`](#merlinfeedbackcompany-environment-instance-serpregex)

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
  var mf = merlinFeedback('blackbird', 'dev', 'my_instance', /search/);
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
