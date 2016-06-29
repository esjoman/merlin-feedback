# Changelog

## 2.0.1

### Bug fixes
* Fixed an issue in 2.0.0 where `merlinFeedback.default()` had to be called instead of `merlinFeedback()` in mf.js.

## 2.0.0
* Added `useUrlChangeTracker` as an option to initializing `mf` for single-page apps.
* Code refactor and complete type coverage

### Breaking changes
* merlinFeedback main API no longer accepts an `options` object of the shape `{href?: string, referrer?: string, storage?: Storage}`, and instead receives an `options` object of the shape `{useUrlChangeTracker?: boolean}`. (Most users should be unaffected).

## 1.0.0
* Initial release