!function(a){function b(a,b,e){return 4===arguments.length?c.apply(this,arguments):void d(a,{declarative:!0,deps:b,declare:e})}function c(a,b,c,e){d(a,{declarative:!1,deps:b,executingRequire:c,execute:e})}function d(a,b){b.name=a,a in o||(o[a]=b),b.normalizedDeps=b.deps}function e(a,b){if(b[a.groupIndex]=b[a.groupIndex]||[],-1==p.call(b[a.groupIndex],a)){b[a.groupIndex].push(a);for(var c=0,d=a.normalizedDeps.length;d>c;c++){var f=a.normalizedDeps[c],g=o[f];if(g&&!g.evaluated){var h=a.groupIndex+(g.declarative!=a.declarative);if(void 0===g.groupIndex||g.groupIndex<h){if(void 0!==g.groupIndex&&(b[g.groupIndex].splice(p.call(b[g.groupIndex],g),1),0==b[g.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");g.groupIndex=h}e(g,b)}}}}function f(a){var b=o[a];b.groupIndex=0;var c=[];e(b,c);for(var d=!!b.declarative==c.length%2,f=c.length-1;f>=0;f--){for(var g=c[f],i=0;i<g.length;i++){var k=g[i];d?h(k):j(k)}d=!d}}function g(a){return s[a]||(s[a]={name:a,dependencies:[],exports:{},importers:[]})}function h(b){if(!b.module){var c=b.module=g(b.name),d=b.module.exports,e=b.declare.call(a,function(a,b){if(c.locked=!0,"object"==typeof a)for(var e in a)d[e]=a[e];else d[a]=b;for(var f=0,g=c.importers.length;g>f;f++){var h=c.importers[f];if(!h.locked)for(var i=0;i<h.dependencies.length;++i)h.dependencies[i]===c&&h.setters[i](d)}return c.locked=!1,b},{id:b.name});c.setters=e.setters,c.execute=e.execute;for(var f=0,i=b.normalizedDeps.length;i>f;f++){var j,k=b.normalizedDeps[f],l=o[k],m=s[k];m?j=m.exports:l&&!l.declarative?j=l.esModule:l?(h(l),m=l.module,j=m.exports):j=n(k),m&&m.importers?(m.importers.push(c),c.dependencies.push(m)):c.dependencies.push(null),c.setters[f]&&c.setters[f](j)}}}function i(a){var b,c=o[a];if(c)c.declarative?m(a,[]):c.evaluated||j(c),b=c.module.exports;else if(b=n(a),!b)throw new Error("Unable to load dependency "+a+".");return(!c||c.declarative)&&b&&b.__useDefault?b.default:b}function j(b){if(!b.module){var c={},d=b.module={exports:c,id:b.name};if(!b.executingRequire)for(var e=0,f=b.normalizedDeps.length;f>e;e++){var g=b.normalizedDeps[e],h=o[g];h&&j(h)}b.evaluated=!0;var l=b.execute.call(a,function(a){for(var c=0,d=b.deps.length;d>c;c++)if(b.deps[c]==a)return i(b.normalizedDeps[c]);throw new TypeError("Module "+a+" not declared as a dependency.")},c,d);l&&(d.exports=l),c=d.exports,c&&c.__esModule?b.esModule=c:b.esModule=k(c)}}function k(b){var c={};if(("object"==typeof b||"function"==typeof b)&&b!==a)if(q)for(var d in b)"default"!==d&&l(c,b,d);else{var e=b&&b.hasOwnProperty;for(var d in b)"default"===d||e&&!b.hasOwnProperty(d)||(c[d]=b[d])}return c.default=b,r(c,"__useDefault",{value:!0}),c}function l(a,b,c){try{var d;(d=Object.getOwnPropertyDescriptor(b,c))&&r(a,c,d)}catch(d){return a[c]=b[c],!1}}function m(b,c){var d=o[b];if(d&&!d.evaluated&&d.declarative){c.push(b);for(var e=0,f=d.normalizedDeps.length;f>e;e++){var g=d.normalizedDeps[e];-1==p.call(c,g)&&(o[g]?m(g,c):n(g))}d.evaluated||(d.evaluated=!0,d.module.execute.call(a))}}function n(a){if(u[a])return u[a];if("@node/"==a.substr(0,6))return u[a]=k(t(a.substr(6)));var b=o[a];if(!b)throw"Module "+a+" not present.";return f(a),m(a,[]),o[a]=void 0,b.declarative&&r(b.module.exports,"__esModule",{value:!0}),u[a]=b.declarative?b.module.exports:b.esModule}var o={},p=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},q=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(a){q=!1}var r;!function(){try{Object.defineProperty({},"a",{})&&(r=Object.defineProperty)}catch(a){r=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(a){}}}}();var s={},t="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,u={"@empty":{}};return function(a,d,e,f){return function(g){g(function(g){for(var h={_nodeRequire:t,register:b,registerDynamic:c,get:n,set:function(a,b){u[a]=b},newModule:function(a){return a}},i=0;i<d.length;i++)(function(a,b){b&&b.__esModule?u[a]=b:u[a]=k(b)})(d[i],arguments[i]);f(h);var j=n(a[0]);if(a.length>1)for(var i=1;i<a.length;i++)n(a[i]);return e?j.default:j})}}}("undefined"!=typeof self?self:global)(["1"],[],!1,function(a){this.require,this.exports,this.module;!function(b){function c(a,b){for(var c=a.split(".");c.length;)b=b[c.shift()];return b}function d(a){if("string"==typeof a)return c(a,b);if(!(a instanceof Array))throw new Error("Global exports must be a string or array.");for(var d={},e=!0,f=0;f<a.length;f++){var g=c(a[f],b);e&&(d.default=g,e=!1),d[a[f].split(".").pop()]=g}return d}function e(a){if(Object.keys)Object.keys(b).forEach(a);else for(var c in b)i.call(b,c)&&a(c)}function f(a){e(function(c){if(-1==j.call(k,c)){try{var d=b[c]}catch(a){k.push(c)}a(c,d)}})}var g,h=a,i=Object.prototype.hasOwnProperty,j=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},k=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];h.set("@@global-helpers",h.newModule({prepareGlobal:function(a,c,e){var h=b.define;b.define=void 0;var i;if(e){i={};for(var j in e)i[j]=b[j],b[j]=e[j]}return c||(g={},f(function(a,b){g[a]=b})),function(){var a;if(c)a=d(c);else{a={};var e,j;f(function(b,c){g[b]!==c&&"undefined"!=typeof c&&(a[b]=c,"undefined"!=typeof e?j||e===c||(j=!0):e=c)}),a=j?a:e}if(i)for(var k in i)b[k]=i[k];return b.define=h,a}}}))}("undefined"!=typeof self?self:global),a.registerDynamic("2",[],!1,function(b,c,d){var e=a.get("@@global-helpers").prepareGlobal(d.id,null,null);return function(a){!function(a){"use strict";function b(a){if("string"!=typeof a&&(a=String(a)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))throw new TypeError("Invalid character in header field name");return a.toLowerCase()}function c(a){return"string"!=typeof a&&(a=String(a)),a}function d(a){var b={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};return p.iterable&&(b[Symbol.iterator]=function(){return b}),b}function e(a){this.map={},a instanceof e?a.forEach(function(a,b){this.append(b,a)},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function f(a){return a.bodyUsed?Promise.reject(new TypeError("Already read")):void(a.bodyUsed=!0)}function g(a){return new Promise(function(b,c){a.onload=function(){b(a.result)},a.onerror=function(){c(a.error)}})}function h(a){var b=new FileReader;return b.readAsArrayBuffer(a),g(b)}function i(a){var b=new FileReader;return b.readAsText(a),g(b)}function j(){return this.bodyUsed=!1,this._initBody=function(a){if(this._bodyInit=a,"string"==typeof a)this._bodyText=a;else if(p.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(p.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(p.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(a){if(!p.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(a))throw new Error("unsupported BodyInit type")}else this._bodyText="";this.headers.get("content-type")||("string"==typeof a?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):p.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},p.blob?(this.blob=function(){var a=f(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(h)},this.text=function(){var a=f(this);if(a)return a;if(this._bodyBlob)return i(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var a=f(this);return a?a:Promise.resolve(this._bodyText)},p.formData&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}function k(a){var b=a.toUpperCase();return q.indexOf(b)>-1?b:a}function l(a,b){b=b||{};var c=b.body;if(l.prototype.isPrototypeOf(a)){if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url,this.credentials=a.credentials,b.headers||(this.headers=new e(a.headers)),this.method=a.method,this.mode=a.mode,c||(c=a._bodyInit,a.bodyUsed=!0)}else this.url=a;if(this.credentials=b.credentials||this.credentials||"omit",!b.headers&&this.headers||(this.headers=new e(b.headers)),this.method=k(b.method||this.method||"GET"),this.mode=b.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&c)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(c)}function m(a){var b=new FormData;return a.trim().split("&").forEach(function(a){if(a){var c=a.split("="),d=c.shift().replace(/\+/g," "),e=c.join("=").replace(/\+/g," ");b.append(decodeURIComponent(d),decodeURIComponent(e))}}),b}function n(a){var b=new e,c=(a.getAllResponseHeaders()||"").trim().split("\n");return c.forEach(function(a){var c=a.trim().split(":"),d=c.shift().trim(),e=c.join(":").trim();b.append(d,e)}),b}function o(a,b){b||(b={}),this.type="default",this.status=b.status,this.ok=this.status>=200&&this.status<300,this.statusText=b.statusText,this.headers=b.headers instanceof e?b.headers:new e(b.headers),this.url=b.url||"",this._initBody(a)}if(!a.fetch){var p={searchParams:"URLSearchParams"in a,iterable:"Symbol"in a&&"iterator"in Symbol,blob:"FileReader"in a&&"Blob"in a&&function(){try{return new Blob,!0}catch(a){return!1}}(),formData:"FormData"in a,arrayBuffer:"ArrayBuffer"in a};e.prototype.append=function(a,d){a=b(a),d=c(d);var e=this.map[a];e||(e=[],this.map[a]=e),e.push(d)},e.prototype.delete=function(a){delete this.map[b(a)]},e.prototype.get=function(a){var c=this.map[b(a)];return c?c[0]:null},e.prototype.getAll=function(a){return this.map[b(a)]||[]},e.prototype.has=function(a){return this.map.hasOwnProperty(b(a))},e.prototype.set=function(a,d){this.map[b(a)]=[c(d)]},e.prototype.forEach=function(a,b){Object.getOwnPropertyNames(this.map).forEach(function(c){this.map[c].forEach(function(d){a.call(b,d,c,this)},this)},this)},e.prototype.keys=function(){var a=[];return this.forEach(function(b,c){a.push(c)}),d(a)},e.prototype.values=function(){var a=[];return this.forEach(function(b){a.push(b)}),d(a)},e.prototype.entries=function(){var a=[];return this.forEach(function(b,c){a.push([c,b])}),d(a)},p.iterable&&(e.prototype[Symbol.iterator]=e.prototype.entries);var q=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];l.prototype.clone=function(){return new l(this)},j.call(l.prototype),j.call(o.prototype),o.prototype.clone=function(){return new o(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new e(this.headers),url:this.url})},o.error=function(){var a=new o(null,{status:0,statusText:""});return a.type="error",a};var r=[301,302,303,307,308];o.redirect=function(a,b){if(r.indexOf(b)===-1)throw new RangeError("Invalid status code");return new o(null,{status:b,headers:{location:a}})},a.Headers=e,a.Request=l,a.Response=o,a.fetch=function(a,b){return new Promise(function(c,d){function e(){return"responseURL"in g?g.responseURL:/^X-Request-URL:/m.test(g.getAllResponseHeaders())?g.getResponseHeader("X-Request-URL"):void 0}var f;f=l.prototype.isPrototypeOf(a)&&!b?a:new l(a,b);var g=new XMLHttpRequest;g.onload=function(){var a={status:g.status,statusText:g.statusText,headers:n(g),url:e()},b="response"in g?g.response:g.responseText;c(new o(b,a))},g.onerror=function(){d(new TypeError("Network request failed"))},g.ontimeout=function(){d(new TypeError("Network request failed"))},g.open(f.method,f.url,!0),"include"===f.credentials&&(g.withCredentials=!0),"responseType"in g&&p.blob&&(g.responseType="blob"),f.headers.forEach(function(a,b){g.setRequestHeader(b,a)}),g.send("undefined"==typeof f._bodyInit?null:f._bodyInit)})},a.fetch.polyfill=!0}}("undefined"!=typeof self?self:this)}(this),e()}),a.register("1",["2"],function(a,b){"use strict";function c(a,b,c){var d=a[b]||[];return j({},a,n({},b,[].concat(o(d),o(c))))}function d(a){var b=typeof a;return!!a&&("object"==b||"function"==b)}function e(a,b,c){return c.reduce(function(a,c,d){var e=0===d?"?":"&";return b[c]?""+a+e+c+"="+b[c]:a},a)}function f(){return"_xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}function g(a,b){return a instanceof RegExp?a.test(b):a(b)}function h(a,b,c,d){var e=arguments.length<=4||void 0===arguments[4]?{}:arguments[4],f=e.useUrlChangeTracker,g=void 0!==f&&f,h=e.fallback,i=void 0===h?null:h;if(!a||!b||!c)throw new Error(y);if(!(d instanceof RegExp||"function"==typeof d))throw new Error(z);if(i){var j=i.mode;if("proxy"!==j)throw new Error(A);if("proxy"===j&&!i.url)throw new Error(B)}var k="https://search-"+b+".search.blackbird.am/v1/"+a+"."+b+"."+c+"/products/feedback";return new x(k,d,new p(window.localStorage),C,g,i)}var i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;return{setters:[function(a){}],execute:function(){i=function(a,b){var c={};for(var d in a)b.indexOf(d)>=0||Object.prototype.hasOwnProperty.call(a,d)&&(c[d]=a[d]);return c},j=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a},k=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},l=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),m=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h.return&&h.return()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n=function(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a},o=function(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)},a("SafeStorage",p=function(){function a(b){k(this,a),this.storage=b,this.fallback=!1,this._data={}}return l(a,[{key:"getItem",value:function(a){if(this.fallback&&a in this._data)return this._data[a];try{return this.storage.getItem(a)}catch(a){return this.fallback=!0,null}}},{key:"setItem",value:function(a,b){try{this.storage.setItem(a,b)}catch(a){this.fallback=!0}this.fallback&&(this._data[a]=b)}},{key:"removeItem",value:function(a){this.fallback&&delete this._data[a];try{this.storage.removeItem(a)}catch(a){this.fallback=!0}}},{key:"clear",value:function(){this.fallback&&(this._data={});try{this.storage.clear()}catch(a){this.fallback=!0}}}]),a}()),a("Cart",q=function(){function a(b,c){k(this,a),this.storage=b,this.key=c}return l(a,[{key:"add",value:function(a,b){var d=this.get(),e=c(d,a,b);this.set(e)}},{key:"remove",value:function(){}},{key:"get",value:function(){var a=this.storage.getItem(this.key);if(!a)return{};var b=a.split("###");return b.reduce(function(a,b){var c=b.split(":"),d=m(c,2),e=d[0],f=d[1];return j({},a,n({},e,f.split(",")))},{})}},{key:"set",value:function(a){var b=Object.keys(a),c=b.map(function(b){return b+":"+a[b].join(",")}),d=c.join("###");this.storage.setItem(this.key,d)}}]),a}()),r=window,s=r.history,t=r.addEventListener,u=r.removeEventListener,v=function(){function a(b){k(this,a),s.pushState&&t&&(this.update=this.update.bind(this),this.handleUrlChanged=b,this.originalPushState=s.pushState,s.pushState=function(a,b){d(a)&&b&&(a.title=b),this.originalPushState.apply(s,arguments),this.update()}.bind(this),this.originalReplaceState=s.replaceState,s.replaceState=function(a,b){d(a)&&b&&(a.title=b),this.originalReplaceState.apply(s,arguments),this.update()}.bind(this),t("popstate",this.update))}return l(a,[{key:"update",value:function(){var a=this;setTimeout(function(){a.handleUrlChanged()},0)}},{key:"remove",value:function(){u("popstate",this.update),s.replaceState=this.originalReplaceState,s.pushState=this.originalPushState}}]),a}(),w=["qid","q","numfound","docids","uid","sid","num","start"],a("MerlinFeedback",x=function(){function a(b,c,d,e,f,g){k(this,a),this.url=b,this.serpRegex=c,this.storage=d,this.cart=new q(d,e),this.previousHref=window.location.referrer,this.currentHref=window.location.href,f&&(this.handleUrlChanged=this.handleUrlChanged.bind(this),this.urlChangeTracker=new v(this.handleUrlChanged)),g&&(this.fallback=g,this.useFallback=!1)}return l(a,[{key:"serp",value:function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!g(this.serpRegex,this.currentHref))return null;var b=a.qid||f();return this.storage.setItem(this.currentHref,b.toString()),this._registerEvent("serp",j({},a,{qid:b}))}},{key:"click",value:function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b=a.qid||this.storage.getItem(this.currentHref);return b?this._registerEvent("click",j({},a,{qid:b})):null}},{key:"cartAdd",value:function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b=a.docids,c=void 0===b?[]:b,d=i(a,["docids"]),e=d.qid||this.storage.getItem(this.previousHref);return e?(this.cart.add(e,c),this._registerEvent("cart_add",j({},d,{qid:e,docids:c}))):null}},{key:"cartRemove",value:function(){}},{key:"purchase",value:function(){var a=this,b=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(b.docids)return this._registerEvent("purchase",b);var c=this.cart.get(),d=Object.keys(c),e=d.map(function(d){return a._registerEvent("purchase",j({},b,{qid:d,docids:c[d]}))});return Promise.all(e)}},{key:"handleUrlChanged",value:function(){var a=arguments.length<=0||void 0===arguments[0]?window.location.href:arguments[0];a!==this.currentHref&&(this.previousHref=this.currentHref,this.currentHref=a)}},{key:"_registerEvent",value:function(a,b){var c=e(this.url+"/"+a,b,w);return this._fetchWithFallback(c)}},{key:"_fetchWithFallback",value:function(a){var b=this;if(!this.fallback)return fetch(a);if(this.useFallback&&"proxy"===this.fallback.mode){var c=this.fallback.url,d="/"===c.slice(-1)?c.slice(0,-1):c;return fetch(d+"/"+a)}return fetch(a).catch(function(){return b.useFallback=!0,b._fetchWithFallback(a)})}}]),a}()),y="merlinFeedback takes 4 required arguments: company, environment, instance, serpRegex.\n  company: the name of the company,\n  environment: 'dev', 'staging', or 'prod',\n  instance: the name of the instance,\n  serpRegex: a function or regex that returns truthy for SERP urls.",z="merlinFeedback's 4th argument must be a RegExp or a function that returns truthy for SERP urls.",A="Currently, the only available `fallback.mode` is `'proxy'`.",B="Using `fallback.mode === 'proxy'` requires a `fallback.url` which will be prepended to the feedback request.",C="bbcart",a("init",h),a("Cart",q),a("SafeStorage",p),a("MerlinFeedback",x)}}})})(function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof module&&module.exports&&"function"==typeof require?module.exports=a():merlinFeedback=a()});
//# sourceMappingURL=base.js.map