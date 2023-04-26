(()=>{"use strict";function t(n){var r="function"==typeof Map?new Map:void 0;return t=function(t){if(null===t||(n=t,-1===Function.toString.call(n).indexOf("[native code]")))return t;var n;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,i)}function i(){return e(t,arguments,c(this).constructor)}return i.prototype=Object.create(t.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),o(i,t)},t(n)}function e(t,n,r){return e=u()?Reflect.construct.bind():function(t,e,n){var r=[null];r.push.apply(r,e);var i=new(Function.bind.apply(t,r));return n&&o(i,n.prototype),i},e.apply(null,arguments)}function n(t){return function(t){if(Array.isArray(t))return p(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||s(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&o(t,e)}function o(t,e){return o=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},o(t,e)}function i(t){var e=u();return function(){var n,r=c(t);if(e){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(t,e){if(e&&("object"===d(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,n)}}function u(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function c(t){return c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},c(t)}function f(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(o=r.key,i=void 0,i=function(t,e){if("object"!==d(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"),"symbol"===d(i)?i:String(i)),r)}var o,i}function l(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function s(t,e){if(t){if("string"==typeof t)return p(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(t,e):void 0}}function p(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function y(){}function h(t){return t()}function b(){return Object.create(null)}function m(t){t.forEach(h)}function v(t){return"function"==typeof t}function g(t,e){return t!=t?e==e:t!==e||t&&"object"===d(t)||"function"==typeof t}function w(t){return 0===Object.keys(t).length}new Set;function $(t,e){t.appendChild(e)}function _(t,e,n){t.insertBefore(e,n||null)}function O(t){t.parentNode&&t.parentNode.removeChild(t)}function S(t){return document.createElement(t)}function j(t){return document.createTextNode(t)}function x(){return j(" ")}function k(t,e,n,r){return t.addEventListener(e,n,r),function(){return t.removeEventListener(e,n,r)}}function E(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}var P;new Map;function A(t){P=t}function T(){if(!P)throw new Error("Function called outside component initialization");return P}var R=[],C=[],M=[],I=[],N=Promise.resolve(),B=!1;function L(){B||(B=!0,N.then(F))}function q(t){M.push(t)}var D=new Set,U=0;function F(){if(0===U){var t=P;do{try{for(;U<R.length;){var e=R[U];U++,A(e),H(e.$$)}}catch(t){throw R.length=0,U=0,t}for(A(null),R.length=0,U=0;C.length;)C.pop()();for(var n=0;n<M.length;n+=1){var r=M[n];D.has(r)||(D.add(r),r())}M.length=0}while(R.length);for(;I.length;)I.pop()();B=!1,D.clear(),A(t)}}function H(t){if(null!==t.fragment){t.update(),m(t.before_update);var e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(q)}}var z=new Set;function V(t,e){t&&t.i&&(z.delete(t),t.i(e))}"undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;new Set([].concat(["allowfullscreen","allowpaymentrequest","async","autofocus","autoplay","checked","controls","default","defer","disabled","formnovalidate","hidden","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","selected"]));function G(t,e){var n,r,o,i=t.$$;null!==i.fragment&&(n=i.after_update,r=[],o=[],M.forEach((function(t){return-1===n.indexOf(t)?r.push(t):o.push(t)})),o.forEach((function(t){return t()})),M=r,m(i.on_destroy),i.fragment&&i.fragment.d(e),i.on_destroy=i.fragment=null,i.ctx=[])}function J(t,e,r,o,i,u,c){var f=arguments.length>7&&void 0!==arguments[7]?arguments[7]:[-1],a=P;A(t);var l=t.$$={fragment:null,ctx:[],props:u,update:y,not_equal:i,bound:b(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:b(),dirty:f,skip_bound:!1,root:e.target||a.$$.root};c&&c(l.root);var s,p=!1;if(l.ctx=r?r(t,e.props||{},(function(e,n){var r=!(arguments.length<=2)&&arguments.length-2?arguments.length<=2?void 0:arguments[2]:n;return l.ctx&&i(l.ctx[e],l.ctx[e]=r)&&(!l.skip_bound&&l.bound[e]&&l.bound[e](r),p&&function(t,e){-1===t.$$.dirty[0]&&(R.push(t),L(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(t,e)),n})):[],l.update(),p=!0,m(l.before_update),l.fragment=!!o&&o(l.ctx),e.target){if(e.hydrate){!0;var d=(s=e.target,Array.from(s.childNodes));l.fragment&&l.fragment.l(d),d.forEach(O)}else l.fragment&&l.fragment.c();e.intro&&V(t.$$.fragment),function(t,e,r,o){var i=t.$$,u=i.fragment,c=i.after_update;u&&u.m(e,r),o||q((function(){var e,r=t.$$.on_mount.map(h).filter(v);t.$$.on_destroy?(e=t.$$.on_destroy).push.apply(e,n(r)):m(r),t.$$.on_mount=[]})),c.forEach(q)}(t,e.target,e.anchor,e.customElement),!1,F()}A(a)}"function"==typeof HTMLElement&&HTMLElement;var K=function(){function t(){f(this,t)}return l(t,[{key:"$destroy",value:function(){G(this,1),this.$destroy=y}},{key:"$on",value:function(t,e){if(!v(e))return y;var n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),function(){var t=n.indexOf(e);-1!==t&&n.splice(t,1)}}},{key:"$set",value:function(t){this.$$set&&!w(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}]),t}();function Q(t){return Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Q(t)}function W(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(o=r.key,i=void 0,i=function(t,e){if("object"!==Q(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!==Q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"),"symbol"===Q(i)?i:String(i)),r)}var o,i}function X(t,e){return X=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},X(t,e)}function Y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=tt(t);if(e){var o=tt(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return function(t,e){if(e&&("object"===Q(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return Z(t)}(this,n)}}function Z(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function tt(t){return tt=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},tt(t)}function et(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i,u,c=[],f=!0,a=!1;try{if(i=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;f=!1}else for(;!(f=(r=i.call(n)).done)&&(c.push(r.value),c.length!==e);f=!0);}catch(t){a=!0,o=t}finally{try{if(!f&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(a)throw o}}return c}}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return nt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return nt(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function nt(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function rt(t){var e;return{c:function(){(e=S("p")).textContent="Loading ..."},m:function(t,n){_(t,e,n)},p:y,d:function(t){t&&O(e)}}}function ot(t){var e,n,r,o,i,u,c,f,a,l,s,p,d;return{c:function(){(e=S("h4")).textContent="Session",n=x(),r=S("div"),o=S("input"),i=x(),(u=S("label")).textContent="Show sidebar in session view",c=x(),f=S("div"),a=S("input"),l=x(),(s=S("label")).textContent='Use "exam mode": answers and comments remain hidden until all questions are answered',E(o,"class","form-check-input"),E(o,"type","checkbox"),E(o,"role","switch"),E(u,"class","form-check-label"),E(u,"for","flexSwitchCheckDefault"),E(r,"class","form-check form-switch"),E(a,"class","form-check-input"),E(a,"type","checkbox"),E(a,"role","switch"),E(s,"class","form-check-label"),E(s,"for","flexSwitchCheckDefault"),E(f,"class","form-check form-switch")},m:function(y,h){_(y,e,h),_(y,n,h),_(y,r,h),$(r,o),o.checked=t[0].session_show_sidebar,$(r,i),$(r,u),_(y,c,h),_(y,f,h),$(f,a),a.checked=t[0].session_exam_mode,$(f,l),$(f,s),p||(d=[k(o,"change",t[1]),k(a,"change",t[2])],p=!0)},p:function(t,e){1&e&&(o.checked=t[0].session_show_sidebar),1&e&&(a.checked=t[0].session_exam_mode)},d:function(t){t&&O(e),t&&O(n),t&&O(r),t&&O(c),t&&O(f),p=!1,m(d)}}}function it(t){var e;function n(t,e){return t[0]?ot:rt}var r=n(t),o=r(t);return{c:function(){o.c(),e=j("")},m:function(t,n){o.m(t,n),_(t,e,n)},p:function(t,i){var u=et(i,1)[0];r===(r=n(t))&&o?o.p(t,u):(o.d(1),(o=r(t))&&(o.c(),o.m(e.parentNode,e)))},i:y,o:y,d:function(t){o.d(t),t&&O(e)}}}function ut(t,e,n){var r,o;return o=function(){axios.get("/api/users/me/settings").then((function(t){n(0,r=t.data)})).catch((function(t){alert(t),console.log(t)}))},T().$$.on_mount.push(o),t.$$.update=function(){1&t.$$.dirty&&r&&(console.debug("update settings",r),axios.put("/api/users/me/settings",r).then((function(t){})).catch((function(t){alert(t)})))},[r,function(){r.session_show_sidebar=this.checked,n(0,r)},function(){r.session_exam_mode=this.checked,n(0,r)}]}new(function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&X(t,e)}(i,t);var e,n,r,o=Y(i);function i(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),J(Z(e=o.call(this)),t,ut,it,g,{}),e}return e=i,n&&W(e.prototype,n),r&&W(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(K))({target:document.getElementById("UserSettingsView")})})();