!function(a){function b(a,b,e){return 4===arguments.length?c.apply(this,arguments):void d(a,{declarative:!0,deps:b,declare:e})}function c(a,b,c,e){d(a,{declarative:!1,deps:b,executingRequire:c,execute:e})}function d(a,b){b.name=a,a in o||(o[a]=b),b.normalizedDeps=b.deps}function e(a,b){if(b[a.groupIndex]=b[a.groupIndex]||[],-1==p.call(b[a.groupIndex],a)){b[a.groupIndex].push(a);for(var c=0,d=a.normalizedDeps.length;d>c;c++){var f=a.normalizedDeps[c],g=o[f];if(g&&!g.evaluated){var h=a.groupIndex+(g.declarative!=a.declarative);if(void 0===g.groupIndex||g.groupIndex<h){if(void 0!==g.groupIndex&&(b[g.groupIndex].splice(p.call(b[g.groupIndex],g),1),0==b[g.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");g.groupIndex=h}e(g,b)}}}}function f(a){var b=o[a];b.groupIndex=0;var c=[];e(b,c);for(var d=!!b.declarative==c.length%2,f=c.length-1;f>=0;f--){for(var g=c[f],i=0;i<g.length;i++){var k=g[i];d?h(k):j(k)}d=!d}}function g(a){return t[a]||(t[a]={name:a,dependencies:[],exports:{},importers:[]})}function h(b){if(!b.module){var c=b.module=g(b.name),d=b.module.exports,e=b.declare.call(a,function(a,b){if(c.locked=!0,"object"==typeof a)for(var e in a)d[e]=a[e];else d[a]=b;for(var f=0,g=c.importers.length;g>f;f++){var h=c.importers[f];if(!h.locked)for(var i=0;i<h.dependencies.length;++i)h.dependencies[i]===c&&h.setters[i](d)}return c.locked=!1,b},b.name);c.setters=e.setters,c.execute=e.execute;for(var f=0,i=b.normalizedDeps.length;i>f;f++){var j,k=b.normalizedDeps[f],l=o[k],m=t[k];m?j=m.exports:l&&!l.declarative?j=l.esModule:l?(h(l),m=l.module,j=m.exports):j=n(k),m&&m.importers?(m.importers.push(c),c.dependencies.push(m)):c.dependencies.push(null),c.setters[f]&&c.setters[f](j)}}}function i(a){var b,c=o[a];if(c)c.declarative?m(a,[]):c.evaluated||j(c),b=c.module.exports;else if(b=n(a),!b)throw new Error("Unable to load dependency "+a+".");return(!c||c.declarative)&&b&&b.__useDefault?b["default"]:b}function j(b){if(!b.module){var c={},d=b.module={exports:c,id:b.name};if(!b.executingRequire)for(var e=0,f=b.normalizedDeps.length;f>e;e++){var g=b.normalizedDeps[e],h=o[g];h&&j(h)}b.evaluated=!0;var l=b.execute.call(a,function(a){for(var c=0,d=b.deps.length;d>c;c++)if(b.deps[c]==a)return i(b.normalizedDeps[c]);throw new TypeError("Module "+a+" not declared as a dependency.")},c,d);l&&(d.exports=l),c=d.exports,c&&c.__esModule?b.esModule=c:b.esModule=k(c)}}function k(b){var c={};if(("object"==typeof b||"function"==typeof b)&&b!==a)if(q)for(var d in b)"default"!==d&&l(c,b,d);else{var e=b&&b.hasOwnProperty;for(var d in b)"default"===d||e&&!b.hasOwnProperty(d)||(c[d]=b[d])}return c["default"]=b,s(c,"__useDefault",{value:!0}),c}function l(a,b,c){try{var d;(d=Object.getOwnPropertyDescriptor(b,c))&&s(a,c,d)}catch(e){return a[c]=b[c],!1}}function m(b,c){var d=o[b];if(d&&!d.evaluated&&d.declarative){c.push(b);for(var e=0,f=d.normalizedDeps.length;f>e;e++){var g=d.normalizedDeps[e];-1==p.call(c,g)&&(o[g]?m(g,c):n(g))}d.evaluated||(d.evaluated=!0,d.module.execute.call(a))}}function n(a){if(v[a])return v[a];if("@node/"==a.substr(0,6))return u(a.substr(6));var b=o[a];if(!b)throw"Module "+a+" not present.";return f(a),m(a,[]),o[a]=void 0,b.declarative&&s(b.module.exports,"__esModule",{value:!0}),v[a]=b.declarative?b.module.exports:b.esModule}var o={},p=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},q=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(r){q=!1}var s;!function(){try{Object.defineProperty({},"a",{})&&(s=Object.defineProperty)}catch(a){s=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}}();var t={},u="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,v={"@empty":{}};return function(a,d,e,f){return function(g){g(function(g){for(var h={_nodeRequire:u,register:b,registerDynamic:c,get:n,set:function(a,b){v[a]=b},newModule:function(a){return a}},i=0;i<d.length;i++)(function(a,b){b&&b.__esModule?v[a]=b:v[a]=k(b)})(d[i],arguments[i]);f(h);var j=n(a[0]);if(a.length>1)for(var i=1;i<a.length;i++)n(a[i]);return e?j["default"]:j})}}}("undefined"!=typeof self?self:global)(["1"],[],!1,function(a){this.require,this.exports,this.module;a.registerDynamic("@system-env",[],!1,function(){return{production:!0,browser:!0,node:!1,dev:!1,"default":!0}}),a.registerDynamic("2",["@system-env"],!0,function(a,b,c){function d(){l=!1,h.length?k=h.concat(k):m=-1,k.length&&e()}function e(){if(!l){var a=setTimeout(d);l=!0;for(var b=k.length;b;){for(h=k,k=[];++m<b;)h&&h[m].run();m=-1,b=k.length}h=null,l=!1,clearTimeout(a)}}function f(a,b){this.fun=a,this.array=b}function g(){}var h,i=a("@system-env").production,j=c.exports={},k=[],l=!1,m=-1;return j.nextTick=function(a){var b=new Array(arguments.length-1);if(arguments.length>1)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];k.push(new f(a,b)),1!==k.length||l||setTimeout(e,0)},f.prototype.run=function(){this.fun.apply(null,this.array)},j.title="browser",j.browser=!0,j.env={NODE_ENV:i?"production":"development"},j.argv=[],j.version="",j.versions={},j.on=g,j.addListener=g,j.once=g,j.off=g,j.removeListener=g,j.removeAllListeners=g,j.emit=g,j.binding=function(a){throw new Error("process.binding is not supported")},j.cwd=function(){return"/"},j.chdir=function(a){throw new Error("process.chdir is not supported")},j.umask=function(){return 0},c.exports}),a.registerDynamic("3",["2"],!0,function(a,b,c){var d,e=a("2"),f=this;return function(){"use strict";function b(a){return"function"==typeof a||"object"==typeof a&&null!==a}function g(a){return"function"==typeof a}function h(a){X=a}function i(a){_=a}function j(){return function(){e.nextTick(o)}}function k(){return function(){W(o)}}function l(){var a=0,b=new ca(o),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function m(){var a=new MessageChannel;return a.port1.onmessage=o,function(){a.port2.postMessage(0)}}function n(){return function(){setTimeout(o,1)}}function o(){for(var a=0;a<$;a+=2){var b=fa[a],c=fa[a+1];b(c),fa[a]=void 0,fa[a+1]=void 0}$=0}function p(){try{var b=a,c=b("vertx");return W=c.runOnLoop||c.runOnContext,k()}catch(d){return n()}}function q(a,b){var c=this,d=new this.constructor(s);void 0===d[ia]&&L(d);var e=c._state;if(e){var f=arguments[e-1];_(function(){I(e,d,f,c._result)})}else E(c,d,a,b);return d}function r(a){var b=this;if(a&&"object"==typeof a&&a.constructor===b)return a;var c=new b(s);return A(c,a),c}function s(){}function t(){return new TypeError("You cannot resolve a promise with itself")}function u(){return new TypeError("A promises callback cannot return that same promise.")}function v(a){try{return a.then}catch(b){return ma.error=b,ma}}function w(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function x(a,b,c){_(function(a){var d=!1,e=w(c,b,function(c){d||(d=!0,b!==c?A(a,c):C(a,c))},function(b){d||(d=!0,D(a,b))},"Settle: "+(a._label||" unknown promise"));!d&&e&&(d=!0,D(a,e))},a)}function y(a,b){b._state===ka?C(a,b._result):b._state===la?D(a,b._result):E(b,void 0,function(b){A(a,b)},function(b){D(a,b)})}function z(a,b,c){b.constructor===a.constructor&&c===ga&&constructor.resolve===ha?y(a,b):c===ma?D(a,ma.error):void 0===c?C(a,b):g(c)?x(a,b,c):C(a,b)}function A(a,c){a===c?D(a,t()):b(c)?z(a,c,v(c)):C(a,c)}function B(a){a._onerror&&a._onerror(a._result),F(a)}function C(a,b){a._state===ja&&(a._result=b,a._state=ka,0!==a._subscribers.length&&_(F,a))}function D(a,b){a._state===ja&&(a._state=la,a._result=b,_(B,a))}function E(a,b,c,d){var e=a._subscribers,f=e.length;a._onerror=null,e[f]=b,e[f+ka]=c,e[f+la]=d,0===f&&a._state&&_(F,a)}function F(a){var b=a._subscribers,c=a._state;if(0!==b.length){for(var d,e,f=a._result,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?I(c,d,e,f):e(f);a._subscribers.length=0}}function G(){this.error=null}function H(a,b){try{return a(b)}catch(c){return na.error=c,na}}function I(a,b,c,d){var e,f,h,i,j=g(c);if(j){if(e=H(c,d),e===na?(i=!0,f=e.error,e=null):h=!0,b===e)return void D(b,u())}else e=d,h=!0;b._state!==ja||(j&&h?A(b,e):i?D(b,f):a===ka?C(b,e):a===la&&D(b,e))}function J(a,b){try{b(function(b){A(a,b)},function(b){D(a,b)})}catch(c){D(a,c)}}function K(){return oa++}function L(a){a[ia]=oa++,a._state=void 0,a._result=void 0,a._subscribers=[]}function M(a){return new ta(this,a).promise}function N(a){var b=this;return new b(Z(a)?function(c,d){for(var e=a.length,f=0;f<e;f++)b.resolve(a[f]).then(c,d)}:function(a,b){b(new TypeError("You must pass an array to race."))})}function O(a){var b=this,c=new b(s);return D(c,a),c}function P(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function Q(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function R(a){this[ia]=K(),this._result=this._state=void 0,this._subscribers=[],s!==a&&("function"!=typeof a&&P(),this instanceof R?J(this,a):Q())}function S(a,b){this._instanceConstructor=a,this.promise=new a(s),this.promise[ia]||L(this.promise),Z(b)?(this._input=b,this.length=b.length,this._remaining=b.length,this._result=new Array(this.length),0===this.length?C(this.promise,this._result):(this.length=this.length||0,this._enumerate(),0===this._remaining&&C(this.promise,this._result))):D(this.promise,T())}function T(){return new Error("Array Methods must be provided an Array")}function U(){var a;if("undefined"!=typeof f)a=f;else if("undefined"!=typeof self)a=self;else try{a=Function("return this")()}catch(b){throw new Error("polyfill failed because global object is unavailable in this environment")}var c=a.Promise;c&&"[object Promise]"===Object.prototype.toString.call(c.resolve())&&!c.cast||(a.Promise=sa)}var V;V=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)};var W,X,Y,Z=V,$=0,_=function(a,b){fa[$]=a,fa[$+1]=b,$+=2,2===$&&(X?X(o):Y())},aa="undefined"!=typeof window?window:void 0,ba=aa||{},ca=ba.MutationObserver||ba.WebKitMutationObserver,da="undefined"==typeof self&&"undefined"!=typeof e&&"[object process]"==={}.toString.call(e),ea="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,fa=new Array(1e3);Y=da?j():ca?l():ea?m():void 0===aa&&"function"==typeof a?p():n();var ga=q,ha=r,ia=Math.random().toString(36).substring(16),ja=void 0,ka=1,la=2,ma=new G,na=new G,oa=0,pa=M,qa=N,ra=O,sa=R;R.all=pa,R.race=qa,R.resolve=ha,R.reject=ra,R._setScheduler=h,R._setAsap=i,R._asap=_,R.prototype={constructor:R,then:ga,"catch":function(a){return this.then(null,a)}};var ta=S;S.prototype._enumerate=function(){for(var a=this.length,b=this._input,c=0;this._state===ja&&c<a;c++)this._eachEntry(b[c],c)},S.prototype._eachEntry=function(a,b){var c=this._instanceConstructor,d=c.resolve;if(d===ha){var e=v(a);if(e===ga&&a._state!==ja)this._settledAt(a._state,b,a._result);else if("function"!=typeof e)this._remaining--,this._result[b]=a;else if(c===sa){var f=new c(s);z(f,a,e),this._willSettleAt(f,b)}else this._willSettleAt(new c(function(b){b(a)}),b)}else this._willSettleAt(d(a),b)},S.prototype._settledAt=function(a,b,c){var d=this.promise;d._state===ja&&(this._remaining--,a===la?D(d,c):this._result[b]=c),0===this._remaining&&C(d,this._result)},S.prototype._willSettleAt=function(a,b){var c=this;E(a,void 0,function(a){c._settledAt(ka,b,a)},function(a){c._settledAt(la,b,a)})};var ua=U,va={Promise:sa,polyfill:ua};"function"==typeof d&&d.amd?d(function(){return va}):"undefined"!=typeof c&&c.exports?c.exports=va:"undefined"!=typeof this&&(this.ES6Promise=va),ua()}.call(this),c.exports}),a.register("1",["3"],function(a,b){"use strict";function c(a,b,c){var d=a[b]||[];return j({},a,n({},b,[].concat(o(d),o(c))))}function d(a){var b=typeof a;return!!a&&("object"==b||"function"==b)}function e(a,b,c){return c.reduce(function(a,c,d){var e=0===d?"?":"&";return b[c]?""+a+e+c+"="+b[c]:a},a)}function f(){return"_xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}function g(a,b){return a instanceof RegExp?a.test(b):a(b)}function h(a,b,c,d){var e=arguments.length<=4||void 0===arguments[4]?{}:arguments[4],f=e.useUrlChangeTracker,g=void 0!==f&&f,h=e.fallback,i=void 0===h?null:h;if(!a||!b||!c)throw new Error(x);if(!(d instanceof RegExp||"function"==typeof d))throw new Error(y);if(i){var j=i.mode;if("proxy"!==j)throw new Error(z);if("proxy"===j&&!i.url)throw new Error(A)}var k="https://search-"+b+".search.blackbird.am/v1/"+a+"."+b+"."+c+"/products/feedback";return new w(k,d,window.localStorage,B,g,i)}var i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B;return{setters:[function(a){}],execute:function(){i=function(a,b){var c={};for(var d in a)b.indexOf(d)>=0||Object.prototype.hasOwnProperty.call(a,d)&&(c[d]=a[d]);return c},j=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a},k=function(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")},l=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),m=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n=function(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a},o=function(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)},a("Cart",p=function(){function a(b,c){k(this,a),this.storage=b,this.key=c}return l(a,[{key:"add",value:function(a,b){var d=this.get(),e=c(d,a,b);this.set(e)}},{key:"remove",value:function(){}},{key:"get",value:function(){var a=this.storage.getItem(this.key);if(!a)return{};var b=a.split("###");return b.reduce(function(a,b){var c=b.split(":"),d=m(c,2),e=d[0],f=d[1];return j({},a,n({},e,f.split(",")))},{})}},{key:"set",value:function(a){var b=Object.keys(a),c=b.map(function(b){return b+":"+a[b].join(",")}),d=c.join("###");this.storage.setItem(this.key,d)}}]),a}()),q=window,r=q.history,s=q.addEventListener,t=q.removeEventListener,u=function(){function a(b){k(this,a),r.pushState&&s&&(this.update=this.update.bind(this),this.handleUrlChanged=b,this.originalPushState=r.pushState,r.pushState=function(a,b){d(a)&&b&&(a.title=b),this.originalPushState.apply(r,arguments),this.update()}.bind(this),this.originalReplaceState=r.replaceState,r.replaceState=function(a,b){d(a)&&b&&(a.title=b),this.originalReplaceState.apply(r,arguments),this.update()}.bind(this),s("popstate",this.update))}return l(a,[{key:"update",value:function(){var a=this;setTimeout(function(){a.handleUrlChanged()},0)}},{key:"remove",value:function(){t("popstate",this.update),r.replaceState=this.originalReplaceState,r.pushState=this.originalPushState}}]),a}(),v=["qid","q","numfound","docids","uid","sid","num","start"],a("MerlinFeedback",w=function(){function a(b,c,d,e,f,g){k(this,a),this.url=b,this.serpRegex=c,this.storage=d,this.cart=new p(d,e),this.previousHref=window.location.referrer,this.currentHref=window.location.href,f&&(this.handleUrlChanged=this.handleUrlChanged.bind(this),this.urlChangeTracker=new u(this.handleUrlChanged)),g&&(this.fallback=g,this.useFallback=!1)}return l(a,[{key:"serp",value:function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(!g(this.serpRegex,this.currentHref))return null;var b=a.qid||f();return this.storage.setItem(this.currentHref,b.toString()),this._registerEvent("serp",j({},a,{qid:b}))}},{key:"click",value:function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b=a.qid||this.storage.getItem(this.currentHref);return b?this._registerEvent("click",j({},a,{qid:b})):null}},{key:"cartAdd",value:function(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b=a.docids,c=void 0===b?[]:b,d=i(a,["docids"]),e=d.qid||this.storage.getItem(this.previousHref);return e?(this.cart.add(e,c),this._registerEvent("cart_add",j({},d,{qid:e,docids:c}))):null}},{key:"cartRemove",value:function(){}},{key:"purchase",value:function(){var a=this,b=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];if(b.docids)return this._registerEvent("purchase",b);var c=this.cart.get(),d=Object.keys(c),e=d.map(function(d){return a._registerEvent("purchase",j({},b,{qid:d,docids:c[d]}))});return Promise.all(e)}},{key:"handleUrlChanged",value:function(){var a=arguments.length<=0||void 0===arguments[0]?window.location.href:arguments[0];a!==this.currentHref&&(this.previousHref=this.currentHref,this.currentHref=a)}},{key:"_registerEvent",value:function(a,b){var c=e(this.url+"/"+a,b,v);return this._fetchWithFallback(c)}},{key:"_fetchWithFallback",value:function(a){var b=this;if(!this.fallback)return fetch(a);if(this.useFallback&&"proxy"===this.fallback.mode){var c=this.fallback.url,d="/"===c.slice(-1)?c.slice(0,-1):c;return fetch(d+"/"+a)}return fetch(a)["catch"](function(){return b.useFallback=!0,b._fetchWithFallback(a)})}}]),a}()),x="merlinFeedback takes 4 required arguments: company, environment, instance, serpRegex.\n  company: the name of the company,\n  environment: 'dev', 'staging', or 'prod',\n  instance: the name of the instance,\n  serpRegex: a function or regex that returns truthy for SERP urls.",y="merlinFeedback's 4th argument must be a RegExp or a function that returns truthy for SERP urls.",z="Currently, the only available `fallback.mode` is `'proxy'`.",A="Using `fallback.mode === 'proxy'` requires a `fallback.url` which will be prepended to the feedback request.",B="bbcart",a("init",h),a("Cart",p),a("MerlinFeedback",w)}}})})(function(a){"function"==typeof define&&define.amd?define([],a):"object"==typeof module&&module.exports&&"function"==typeof require?module.exports=a():merlinFeedback=a()});
//# sourceMappingURL=promise.js.map