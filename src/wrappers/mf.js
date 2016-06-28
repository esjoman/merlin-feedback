const COMMIT = 'c10e6fc389d33aa9df6e9eed9044f99618333e15';

function cdn(flavor, local) {
  return local ? `dist/${flavor}.js` : `https://cdn.rawgit.com/blackbirdtech/merlin-feedback/${COMMIT}/dist/${flavor}.js`;
}

function load(url, callback) {
  let script = document.createElement('script');
  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState == 'loaded' || script.readyState == 'complete') {
        script.onreadystatechange = null;
        callback(window.merlinFeedback);
      }
    };
    return;
  }
  script.onload = function () {
    callback(window.merlinFeedback);
  };
  script.src = url;
  document.getElementsByTagName('body')[0].appendChild(script);
}

export default function (callback) {
  if (window.Promise && window.fetch) {
    load(cdn('base'), callback);
  } else if (window.Promise) {
    load(cdn('fetch'), callback);
  } else if (window.fetch) {
    load(cdn('promise'), callback);
  } else {
    load(cdn('promise-fetch'), callback);
  }
}
