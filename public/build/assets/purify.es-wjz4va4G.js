import{c as ge,g as tn}from"./_commonjsHelpers-Cpj98o6Y.js";function nn(n){var o=typeof n;return n!=null&&(o=="object"||o=="function")}var xt=nn,on=typeof ge=="object"&&ge&&ge.Object===Object&&ge,rn=on,an=rn,sn=typeof self=="object"&&self&&self.Object===Object&&self,ln=an||sn||Function("return this")(),Pt=ln,cn=Pt,fn=function(){return cn.Date.now()},un=fn,mn=/\s/;function pn(n){for(var o=n.length;o--&&mn.test(n.charAt(o)););return o}var dn=pn,_n=dn,Tn=/^\s+/;function gn(n){return n&&n.slice(0,_n(n)+1).replace(Tn,"")}var hn=gn,En=Pt,An=En.Symbol,kt=An,Et=kt,Ut=Object.prototype,Sn=Ut.hasOwnProperty,bn=Ut.toString,re=Et?Et.toStringTag:void 0;function yn(n){var o=Sn.call(n,re),a=n[re];try{n[re]=void 0;var s=!0}catch{}var f=bn.call(n);return s&&(o?n[re]=a:delete n[re]),f}var On=yn,Rn=Object.prototype,Ln=Rn.toString;function Nn(n){return Ln.call(n)}var In=Nn,At=kt,Dn=On,Cn=In,Mn="[object Null]",vn="[object Undefined]",St=At?At.toStringTag:void 0;function wn(n){return n==null?n===void 0?vn:Mn:St&&St in Object(n)?Dn(n):Cn(n)}var xn=wn;function Pn(n){return n!=null&&typeof n=="object"}var kn=Pn,Un=xn,Fn=kn,Hn="[object Symbol]";function Gn(n){return typeof n=="symbol"||Fn(n)&&Un(n)==Hn}var Wn=Gn,zn=hn,bt=xt,jn=Wn,yt=NaN,Bn=/^[-+]0x[0-9a-f]+$/i,$n=/^0b[01]+$/i,Yn=/^0o[0-7]+$/i,Xn=parseInt;function Vn(n){if(typeof n=="number")return n;if(jn(n))return yt;if(bt(n)){var o=typeof n.valueOf=="function"?n.valueOf():n;n=bt(o)?o+"":o}if(typeof n!="string")return n===0?n:+n;n=zn(n);var a=$n.test(n);return a||Yn.test(n)?Xn(n.slice(2),a?2:8):Bn.test(n)?yt:+n}var qn=Vn,Kn=xt,ke=un,Ot=qn,Zn="Expected a function",Jn=Math.max,Qn=Math.min;function eo(n,o,a){var s,f,A,N,h,v,C=0,ce=!1,H=!1,ee=!0;if(typeof n!="function")throw new TypeError(Zn);o=Ot(o)||0,Kn(a)&&(ce=!!a.leading,H="maxWait"in a,A=H?Jn(Ot(a.maxWait)||0,o):A,ee="trailing"in a?!!a.trailing:ee);function U(u){var w=s,z=f;return s=f=void 0,C=u,N=n.apply(z,w),N}function Y(u){return C=u,h=setTimeout(X,o),ce?U(u):N}function be(u){var w=u-v,z=u-C,ue=o-w;return H?Qn(ue,A-z):ue}function fe(u){var w=u-v,z=u-C;return v===void 0||w>=o||w<0||H&&z>=A}function X(){var u=ke();if(fe(u))return F(u);h=setTimeout(X,be(u))}function F(u){return h=void 0,ee&&s?U(u):(s=f=void 0,N)}function T(){h!==void 0&&clearTimeout(h),C=0,s=v=f=h=void 0}function G(){return h===void 0?N:F(ke())}function W(){var u=ke(),w=fe(u);if(s=arguments,f=this,v=u,w){if(h===void 0)return Y(v);if(H)return clearTimeout(h),h=setTimeout(X,o),U(v)}return h===void 0&&(h=setTimeout(X,o)),N}return W.cancel=T,W.flush=G,W}var to=eo;const yo=tn(to);/*! @license DOMPurify 3.1.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.3/LICENSE */const{entries:Ft,setPrototypeOf:Rt,isFrozen:no,getPrototypeOf:oo,getOwnPropertyDescriptor:io}=Object;let{freeze:y,seal:D,create:Ht}=Object,{apply:ze,construct:je}=typeof Reflect<"u"&&Reflect;y||(y=function(o){return o});D||(D=function(o){return o});ze||(ze=function(o,a,s){return o.apply(a,s)});je||(je=function(o,a){return new o(...a)});const he=L(Array.prototype.forEach),Lt=L(Array.prototype.pop),ae=L(Array.prototype.push),Se=L(String.prototype.toLowerCase),Ue=L(String.prototype.toString),Nt=L(String.prototype.match),se=L(String.prototype.replace),ro=L(String.prototype.indexOf),ao=L(String.prototype.trim),M=L(Object.prototype.hasOwnProperty),b=L(RegExp.prototype.test),le=so(TypeError),It=L(Number.isNaN);function L(n){return function(o){for(var a=arguments.length,s=new Array(a>1?a-1:0),f=1;f<a;f++)s[f-1]=arguments[f];return ze(n,o,s)}}function so(n){return function(){for(var o=arguments.length,a=new Array(o),s=0;s<o;s++)a[s]=arguments[s];return je(n,a)}}function c(n,o){let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Se;Rt&&Rt(n,null);let s=o.length;for(;s--;){let f=o[s];if(typeof f=="string"){const A=a(f);A!==f&&(no(o)||(o[s]=A),f=A)}n[f]=!0}return n}function lo(n){for(let o=0;o<n.length;o++)M(n,o)||(n[o]=null);return n}function $(n){const o=Ht(null);for(const[a,s]of Ft(n))M(n,a)&&(Array.isArray(s)?o[a]=lo(s):s&&typeof s=="object"&&s.constructor===Object?o[a]=$(s):o[a]=s);return o}function Ee(n,o){for(;n!==null;){const s=io(n,o);if(s){if(s.get)return L(s.get);if(typeof s.value=="function")return L(s.value)}n=oo(n)}function a(){return null}return a}const Dt=y(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Fe=y(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),He=y(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),co=y(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ge=y(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),fo=y(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ct=y(["#text"]),Mt=y(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),We=y(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vt=y(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ae=y(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),uo=D(/\{\{[\w\W]*|[\w\W]*\}\}/gm),mo=D(/<%[\w\W]*|[\w\W]*%>/gm),po=D(/\${[\w\W]*}/gm),_o=D(/^data-[\-\w.\u00B7-\uFFFF]/),To=D(/^aria-[\-\w]+$/),Gt=D(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),go=D(/^(?:\w+script|data):/i),ho=D(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wt=D(/^html$/i),Eo=D(/^[a-z][.\w]*(-[.\w]+)+$/i);var wt=Object.freeze({__proto__:null,MUSTACHE_EXPR:uo,ERB_EXPR:mo,TMPLIT_EXPR:po,DATA_ATTR:_o,ARIA_ATTR:To,IS_ALLOWED_URI:Gt,IS_SCRIPT_OR_DATA:go,ATTR_WHITESPACE:ho,DOCTYPE_NAME:Wt,CUSTOM_ELEMENT:Eo});const B={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ao=function(){return typeof window>"u"?null:window},So=function(o,a){if(typeof o!="object"||typeof o.createPolicy!="function")return null;let s=null;const f="data-tt-policy-suffix";a&&a.hasAttribute(f)&&(s=a.getAttribute(f));const A="dompurify"+(s?"#"+s:"");try{return o.createPolicy(A,{createHTML(N){return N},createScriptURL(N){return N}})}catch{return console.warn("TrustedTypes policy "+A+" could not be created."),null}};function zt(){let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ao();const o=r=>zt(r);if(o.version="3.1.3",o.removed=[],!n||!n.document||n.document.nodeType!==B.document)return o.isSupported=!1,o;let{document:a}=n;const s=a,f=s.currentScript,{DocumentFragment:A,HTMLTemplateElement:N,Node:h,Element:v,NodeFilter:C,NamedNodeMap:ce=n.NamedNodeMap||n.MozNamedAttrMap,HTMLFormElement:H,DOMParser:ee,trustedTypes:U}=n,Y=v.prototype,be=Ee(Y,"cloneNode"),fe=Ee(Y,"nextSibling"),X=Ee(Y,"childNodes"),F=Ee(Y,"parentNode");if(typeof N=="function"){const r=a.createElement("template");r.content&&r.content.ownerDocument&&(a=r.content.ownerDocument)}let T,G="";const{implementation:W,createNodeIterator:u,createDocumentFragment:w,getElementsByTagName:z}=a,{importNode:ue}=s;let x={};o.isSupported=typeof Ft=="function"&&typeof F=="function"&&W&&W.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ye,ERB_EXPR:Oe,TMPLIT_EXPR:Re,DATA_ATTR:jt,ARIA_ATTR:Bt,IS_SCRIPT_OR_DATA:$t,ATTR_WHITESPACE:Be,CUSTOM_ELEMENT:Yt}=wt;let{IS_ALLOWED_URI:$e}=wt,p=null;const Ye=c({},[...Dt,...Fe,...He,...Ge,...Ct]);let d=null;const Xe=c({},[...Mt,...We,...vt,...Ae]);let m=Object.seal(Ht(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),te=null,Le=null,Ve=!0,Ne=!0,qe=!1,Ke=!0,V=!1,Ie=!0,j=!1,De=!1,Ce=!1,q=!1,me=!1,pe=!1,Ze=!0,Je=!1;const Xt="user-content-";let Me=!0,ne=!1,K={},Z=null;const Qe=c({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let et=null;const tt=c({},["audio","video","img","source","image","track"]);let ve=null;const nt=c({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),de="http://www.w3.org/1998/Math/MathML",_e="http://www.w3.org/2000/svg",P="http://www.w3.org/1999/xhtml";let J=P,we=!1,xe=null;const Vt=c({},[de,_e,P],Ue);let oe=null;const qt=["application/xhtml+xml","text/html"],Kt="text/html";let _=null,Q=null;const ot=255,Zt=a.createElement("form"),it=function(e){return e instanceof RegExp||e instanceof Function},Pe=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Q&&Q===e)){if((!e||typeof e!="object")&&(e={}),e=$(e),oe=qt.indexOf(e.PARSER_MEDIA_TYPE)===-1?Kt:e.PARSER_MEDIA_TYPE,_=oe==="application/xhtml+xml"?Ue:Se,p=M(e,"ALLOWED_TAGS")?c({},e.ALLOWED_TAGS,_):Ye,d=M(e,"ALLOWED_ATTR")?c({},e.ALLOWED_ATTR,_):Xe,xe=M(e,"ALLOWED_NAMESPACES")?c({},e.ALLOWED_NAMESPACES,Ue):Vt,ve=M(e,"ADD_URI_SAFE_ATTR")?c($(nt),e.ADD_URI_SAFE_ATTR,_):nt,et=M(e,"ADD_DATA_URI_TAGS")?c($(tt),e.ADD_DATA_URI_TAGS,_):tt,Z=M(e,"FORBID_CONTENTS")?c({},e.FORBID_CONTENTS,_):Qe,te=M(e,"FORBID_TAGS")?c({},e.FORBID_TAGS,_):{},Le=M(e,"FORBID_ATTR")?c({},e.FORBID_ATTR,_):{},K=M(e,"USE_PROFILES")?e.USE_PROFILES:!1,Ve=e.ALLOW_ARIA_ATTR!==!1,Ne=e.ALLOW_DATA_ATTR!==!1,qe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ke=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,V=e.SAFE_FOR_TEMPLATES||!1,Ie=e.SAFE_FOR_XML!==!1,j=e.WHOLE_DOCUMENT||!1,q=e.RETURN_DOM||!1,me=e.RETURN_DOM_FRAGMENT||!1,pe=e.RETURN_TRUSTED_TYPE||!1,Ce=e.FORCE_BODY||!1,Ze=e.SANITIZE_DOM!==!1,Je=e.SANITIZE_NAMED_PROPS||!1,Me=e.KEEP_CONTENT!==!1,ne=e.IN_PLACE||!1,$e=e.ALLOWED_URI_REGEXP||Gt,J=e.NAMESPACE||P,m=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&it(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(m.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&it(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(m.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(m.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),V&&(Ne=!1),me&&(q=!0),K&&(p=c({},Ct),d=[],K.html===!0&&(c(p,Dt),c(d,Mt)),K.svg===!0&&(c(p,Fe),c(d,We),c(d,Ae)),K.svgFilters===!0&&(c(p,He),c(d,We),c(d,Ae)),K.mathMl===!0&&(c(p,Ge),c(d,vt),c(d,Ae))),e.ADD_TAGS&&(p===Ye&&(p=$(p)),c(p,e.ADD_TAGS,_)),e.ADD_ATTR&&(d===Xe&&(d=$(d)),c(d,e.ADD_ATTR,_)),e.ADD_URI_SAFE_ATTR&&c(ve,e.ADD_URI_SAFE_ATTR,_),e.FORBID_CONTENTS&&(Z===Qe&&(Z=$(Z)),c(Z,e.FORBID_CONTENTS,_)),Me&&(p["#text"]=!0),j&&c(p,["html","head","body"]),p.table&&(c(p,["tbody"]),delete te.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw le('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw le('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');T=e.TRUSTED_TYPES_POLICY,G=T.createHTML("")}else T===void 0&&(T=So(U,f)),T!==null&&typeof G=="string"&&(G=T.createHTML(""));y&&y(e),Q=e}},rt=c({},["mi","mo","mn","ms","mtext"]),at=c({},["foreignobject","annotation-xml"]),Jt=c({},["title","style","font","a","script"]),st=c({},[...Fe,...He,...co]),lt=c({},[...Ge,...fo]),Qt=function(e){let t=F(e);(!t||!t.tagName)&&(t={namespaceURI:J,tagName:"template"});const i=Se(e.tagName),l=Se(t.tagName);return xe[e.namespaceURI]?e.namespaceURI===_e?t.namespaceURI===P?i==="svg":t.namespaceURI===de?i==="svg"&&(l==="annotation-xml"||rt[l]):!!st[i]:e.namespaceURI===de?t.namespaceURI===P?i==="math":t.namespaceURI===_e?i==="math"&&at[l]:!!lt[i]:e.namespaceURI===P?t.namespaceURI===_e&&!at[l]||t.namespaceURI===de&&!rt[l]?!1:!lt[i]&&(Jt[i]||!st[i]):!!(oe==="application/xhtml+xml"&&xe[e.namespaceURI]):!1},I=function(e){ae(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch{e.remove()}},Te=function(e,t){try{ae(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch{ae(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!d[e])if(q||me)try{I(t)}catch{}else try{t.setAttribute(e,"")}catch{}},ct=function(e){let t=null,i=null;if(Ce)e="<remove></remove>"+e;else{const g=Nt(e,/^[\r\n\t ]+/);i=g&&g[0]}oe==="application/xhtml+xml"&&J===P&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const l=T?T.createHTML(e):e;if(J===P)try{t=new ee().parseFromString(l,oe)}catch{}if(!t||!t.documentElement){t=W.createDocument(J,"template",null);try{t.documentElement.innerHTML=we?G:l}catch{}}const E=t.body||t.documentElement;return e&&i&&E.insertBefore(a.createTextNode(i),E.childNodes[0]||null),J===P?z.call(t,j?"html":"body")[0]:j?t.documentElement:E},ft=function(e){return u.call(e.ownerDocument||e,e,C.SHOW_ELEMENT|C.SHOW_COMMENT|C.SHOW_TEXT|C.SHOW_PROCESSING_INSTRUCTION|C.SHOW_CDATA_SECTION,null)},ut=function(e){return e instanceof H&&(typeof e.__depth<"u"&&typeof e.__depth!="number"||typeof e.__removalCount<"u"&&typeof e.__removalCount!="number"||typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof ce)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},mt=function(e){return typeof h=="function"&&e instanceof h},k=function(e,t,i){x[e]&&he(x[e],l=>{l.call(o,t,i,Q)})},pt=function(e){let t=null;if(k("beforeSanitizeElements",e,null),ut(e))return I(e),!0;const i=_(e.nodeName);if(k("uponSanitizeElement",e,{tagName:i,allowedTags:p}),e.hasChildNodes()&&!mt(e.firstElementChild)&&b(/<[/\w]/g,e.innerHTML)&&b(/<[/\w]/g,e.textContent)||e.nodeType===B.progressingInstruction||Ie&&e.nodeType===B.comment&&b(/<[/\w]/g,e.data))return I(e),!0;if(!p[i]||te[i]){if(!te[i]&&_t(i)&&(m.tagNameCheck instanceof RegExp&&b(m.tagNameCheck,i)||m.tagNameCheck instanceof Function&&m.tagNameCheck(i)))return!1;if(Me&&!Z[i]){const l=F(e)||e.parentNode,E=X(e)||e.childNodes;if(E&&l){const g=E.length;for(let O=g-1;O>=0;--O){const R=be(E[O],!0);R.__removalCount=(e.__removalCount||0)+1,l.insertBefore(R,fe(e))}}}return I(e),!0}return e instanceof v&&!Qt(e)||(i==="noscript"||i==="noembed"||i==="noframes")&&b(/<\/no(script|embed|frames)/i,e.innerHTML)?(I(e),!0):(V&&e.nodeType===B.text&&(t=e.textContent,he([ye,Oe,Re],l=>{t=se(t,l," ")}),e.textContent!==t&&(ae(o.removed,{element:e.cloneNode()}),e.textContent=t)),k("afterSanitizeElements",e,null),!1)},dt=function(e,t,i){if(Ze&&(t==="id"||t==="name")&&(i in a||i in Zt||i==="__depth"||i==="__removalCount"))return!1;if(!(Ne&&!Le[t]&&b(jt,t))){if(!(Ve&&b(Bt,t))){if(!d[t]||Le[t]){if(!(_t(e)&&(m.tagNameCheck instanceof RegExp&&b(m.tagNameCheck,e)||m.tagNameCheck instanceof Function&&m.tagNameCheck(e))&&(m.attributeNameCheck instanceof RegExp&&b(m.attributeNameCheck,t)||m.attributeNameCheck instanceof Function&&m.attributeNameCheck(t))||t==="is"&&m.allowCustomizedBuiltInElements&&(m.tagNameCheck instanceof RegExp&&b(m.tagNameCheck,i)||m.tagNameCheck instanceof Function&&m.tagNameCheck(i))))return!1}else if(!ve[t]){if(!b($e,se(i,Be,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&ro(i,"data:")===0&&et[e])){if(!(qe&&!b($t,se(i,Be,"")))){if(i)return!1}}}}}}return!0},_t=function(e){return e!=="annotation-xml"&&Nt(e,Yt)},Tt=function(e){k("beforeSanitizeAttributes",e,null);const{attributes:t}=e;if(!t)return;const i={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:d};let l=t.length;for(;l--;){const E=t[l],{name:g,namespaceURI:O,value:R}=E,ie=_(g);let S=g==="value"?R:ao(R);if(i.attrName=ie,i.attrValue=S,i.keepAttr=!0,i.forceKeepAttr=void 0,k("uponSanitizeAttribute",e,i),S=i.attrValue,i.forceKeepAttr||(Te(g,e),!i.keepAttr))continue;if(!Ke&&b(/\/>/i,S)){Te(g,e);continue}if(Ie&&b(/((--!?|])>)|<\/(style|title)/i,S)){Te(g,e);continue}V&&he([ye,Oe,Re],ht=>{S=se(S,ht," ")});const gt=_(e.nodeName);if(dt(gt,ie,S)){if(Je&&(ie==="id"||ie==="name")&&(Te(g,e),S=Xt+S),T&&typeof U=="object"&&typeof U.getAttributeType=="function"&&!O)switch(U.getAttributeType(gt,ie)){case"TrustedHTML":{S=T.createHTML(S);break}case"TrustedScriptURL":{S=T.createScriptURL(S);break}}try{O?e.setAttributeNS(O,g,S):e.setAttribute(g,S),ut(e)?I(e):Lt(o.removed)}catch{}}}k("afterSanitizeAttributes",e,null)},en=function r(e){let t=null;const i=ft(e);for(k("beforeSanitizeShadowDOM",e,null);t=i.nextNode();){if(k("uponSanitizeShadowNode",t,null),pt(t))continue;const l=F(t);t.nodeType===B.element&&(l&&l.__depth?t.__depth=(t.__removalCount||0)+l.__depth+1:t.__depth=1),(t.__depth>=ot||t.__depth<0||It(t.__depth))&&I(t),t.content instanceof A&&(t.content.__depth=t.__depth,r(t.content)),Tt(t)}k("afterSanitizeShadowDOM",e,null)};return o.sanitize=function(r){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=null,i=null,l=null,E=null;if(we=!r,we&&(r="<!-->"),typeof r!="string"&&!mt(r))if(typeof r.toString=="function"){if(r=r.toString(),typeof r!="string")throw le("dirty is not a string, aborting")}else throw le("toString is not a function");if(!o.isSupported)return r;if(De||Pe(e),o.removed=[],typeof r=="string"&&(ne=!1),ne){if(r.nodeName){const R=_(r.nodeName);if(!p[R]||te[R])throw le("root node is forbidden and cannot be sanitized in-place")}}else if(r instanceof h)t=ct("<!---->"),i=t.ownerDocument.importNode(r,!0),i.nodeType===B.element&&i.nodeName==="BODY"||i.nodeName==="HTML"?t=i:t.appendChild(i);else{if(!q&&!V&&!j&&r.indexOf("<")===-1)return T&&pe?T.createHTML(r):r;if(t=ct(r),!t)return q?null:pe?G:""}t&&Ce&&I(t.firstChild);const g=ft(ne?r:t);for(;l=g.nextNode();){if(pt(l))continue;const R=F(l);l.nodeType===B.element&&(R&&R.__depth?l.__depth=(l.__removalCount||0)+R.__depth+1:l.__depth=1),(l.__depth>=ot||l.__depth<0||It(l.__depth))&&I(l),l.content instanceof A&&(l.content.__depth=l.__depth,en(l.content)),Tt(l)}if(ne)return r;if(q){if(me)for(E=w.call(t.ownerDocument);t.firstChild;)E.appendChild(t.firstChild);else E=t;return(d.shadowroot||d.shadowrootmode)&&(E=ue.call(s,E,!0)),E}let O=j?t.outerHTML:t.innerHTML;return j&&p["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&b(Wt,t.ownerDocument.doctype.name)&&(O="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+O),V&&he([ye,Oe,Re],R=>{O=se(O,R," ")}),T&&pe?T.createHTML(O):O},o.setConfig=function(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Pe(r),De=!0},o.clearConfig=function(){Q=null,De=!1},o.isValidAttribute=function(r,e,t){Q||Pe({});const i=_(r),l=_(e);return dt(i,l,t)},o.addHook=function(r,e){typeof e=="function"&&(x[r]=x[r]||[],ae(x[r],e))},o.removeHook=function(r){if(x[r])return Lt(x[r])},o.removeHooks=function(r){x[r]&&(x[r]=[])},o.removeAllHooks=function(){x={}},o}var Oo=zt();export{yo as d,Oo as p};
