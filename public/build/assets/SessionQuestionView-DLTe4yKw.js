import{S as pe,i as ge,s as ue,b as d,g as S,c,C as se,a as v,h as m,n as I,d as A,t as he,j as qe,l as U,p as J,e as le,r as Oe,A as rt,G as Le,q as me,D as De,f as Ie,x as B,y as re,w as Q,B as oe,k as fe,m as ce,o as ke,u as ye,v as ae,z as ve,K as mt}from"./index-QDwHr63R.js";import{e as ie,u as ot,d as _t,o as bt}from"./each-Co9F6xS6.js";import{p as R,d as wt}from"./purify.es-Bsp1aOW5.js";import{_ as pt}from"./lodash-D0JQdfhu.js";import{Q as gt}from"./QuestionForm-CpIHyT6I.js";function ht(n){let e,t,s;return{c(){e=d("div"),t=d("p"),s=he(n[2]),c(t,"class","badge text-dark"),c(e,"class","col-1 border-start-3")},m(i,l){v(i,e,l),m(e,t),m(t,s)},p(i,l){l&4&&qe(s,i[2])},d(i){i&&A(e)}}}function kt(n){let e,t,s,i,l;return{c(){e=d("div"),t=d("p"),s=he(n[2]),c(t,"class","badge text-dark"),c(e,"class","col-1 border-start-3 cursor-pointer svelte-12xdzqf")},m(r,o){v(r,e,o),m(e,t),m(t,s),i||(l=U(e,"click",n[8]),i=!0)},p(r,o){o&4&&qe(s,r[2])},d(r){r&&A(e),i=!1,l()}}}function yt(n){let e,t,s=R.sanitize(n[0].text)+"";return{c(){e=d("div"),t=d("p"),c(t,"class","p-1"),c(e,"class","col-10")},m(i,l){v(i,e,l),m(e,t),t.innerHTML=s},p(i,l){l&1&&s!==(s=R.sanitize(i[0].text)+"")&&(t.innerHTML=s)},d(i){i&&A(e)}}}function vt(n){let e,t,s=R.sanitize(n[0].text)+"",i,l;return{c(){e=d("div"),t=d("p"),c(t,"class","p-1"),c(e,"class","col-10 cursor-pointer svelte-12xdzqf")},m(r,o){v(r,e,o),m(e,t),t.innerHTML=s,i||(l=U(e,"click",n[9]),i=!0)},p(r,o){o&1&&s!==(s=R.sanitize(r[0].text)+"")&&(t.innerHTML=s)},d(r){r&&A(e),i=!1,l()}}}function At(n){let e;return{c(){e=d("span"),e.textContent="✓",c(e,"class","text-secondary fw-bold fs-3")},m(t,s){v(t,e,s)},p:I,d(t){t&&A(e)}}}function Ct(n){let e;return{c(){e=d("span"),e.textContent="✗",c(e,"class","text-danger-dark fw-bold fs-3")},m(t,s){v(t,e,s)},p:I,d(t){t&&A(e)}}}function Lt(n){let e;return{c(){e=d("span"),e.textContent="⇠",c(e,"class","text-success-dark fw-bold fs-3")},m(t,s){v(t,e,s)},p:I,d(t){t&&A(e)}}}function qt(n){let e;return{c(){e=d("span"),e.textContent="✓",c(e,"class","text-success-dark fw-bold fs-3")},m(t,s){v(t,e,s)},p:I,d(t){t&&A(e)}}}function Mt(n){let e,t,s;return{c(){e=d("button"),c(e,"type","button"),c(e,"class","btn-close")},m(i,l){v(i,e,l),t||(s=U(e,"click",J(n[10])),t=!0)},p:I,d(i){i&&A(e),t=!1,s()}}}function je(n){let e,t,s,i,l=R.sanitize(n[0].hint)+"";return{c(){e=d("div"),t=S(),s=d("div"),i=d("p"),c(e,"class","col-1 border-3 border-start border-secondary-subtle"),c(i,"class","p-1"),c(s,"class","col-11")},m(r,o){v(r,e,o),v(r,t,o),v(r,s,o),m(s,i),i.innerHTML=l},p(r,o){o&1&&l!==(l=R.sanitize(r[0].hint)+"")&&(i.innerHTML=l)},d(r){r&&(A(e),A(t),A(s))}}}function St(n){let e,t,s,i,l,r,o,f;function a(_,K){return!_[3]&&!_[1].isSubmittedAnswer?kt:ht}let u=a(n),b=u(n);function g(_,K){return!_[3]&&!_[1].isSelectedAnswer?vt:yt}let w=g(n),p=w(n);function C(_,K){if(!_[3]&&!_[1].isSelectedAnswer)return Mt;if(!_[5]&&_[1].isCorrectAnswer&&_[1].isSubmittedAnswer)return qt;if(!_[5]&&_[1].isCorrectAnswer&&!_[1].isSubmittedAnswer&&_[3])return Lt;if(!_[5]&&_[1].isSubmittedAnswer)return Ct;if(_[5]&&_[1].isSubmittedAnswer)return At}let T=C(n),M=T&&T(n),L=!n[5]&&n[0].hint&&(n[3]||n[1].isSelectedAnswer)&&je(n);return{c(){e=d("div"),b.c(),t=S(),p.c(),s=S(),i=d("div"),M&&M.c(),o=S(),f=d("div"),L&&L.c(),c(i,"class","col-1 ps-1"),c(e,"id",l="answer"+n[0].id),c(e,"class",r="row border-start border-3 m-1 pt-2 "+n[6]+" svelte-12xdzqf"),se(e,"bg-light",n[5]||!n[3]&&!n[1].isSelectedAnswer&&!n[1].isSubmittedAnswer||n[3]&&!n[1].isSubmittedAnswer&&!n[1].isCorrectAnswer),se(e,"text-bg-success",!n[7]&&!n[5]&&n[3]&&n[1].isCorrectAnswer),se(e,"text-bg-danger",!n[7]&&!n[5]&&n[1].isSelectedAnswer&&!n[1].isCorrectAnswer),se(e,"bg-cancelled",n[7]),c(f,"class","row ms-1 mb-2 me-1")},m(_,K){v(_,e,K),b.m(e,null),m(e,t),p.m(e,null),m(e,s),m(e,i),M&&M.m(i,null),v(_,o,K),v(_,f,K),L&&L.m(f,null)},p(_,[K]){u===(u=a(_))&&b?b.p(_,K):(b.d(1),b=u(_),b&&(b.c(),b.m(e,t))),w===(w=g(_))&&p?p.p(_,K):(p.d(1),p=w(_),p&&(p.c(),p.m(e,s))),T===(T=C(_))&&M?M.p(_,K):(M&&M.d(1),M=T&&T(_),M&&(M.c(),M.m(i,null))),K&1&&l!==(l="answer"+_[0].id)&&c(e,"id",l),K&64&&r!==(r="row border-start border-3 m-1 pt-2 "+_[6]+" svelte-12xdzqf")&&c(e,"class",r),K&106&&se(e,"bg-light",_[5]||!_[3]&&!_[1].isSelectedAnswer&&!_[1].isSubmittedAnswer||_[3]&&!_[1].isSubmittedAnswer&&!_[1].isCorrectAnswer),K&234&&se(e,"text-bg-success",!_[7]&&!_[5]&&_[3]&&_[1].isCorrectAnswer),K&226&&se(e,"text-bg-danger",!_[7]&&!_[5]&&_[1].isSelectedAnswer&&!_[1].isCorrectAnswer),K&192&&se(e,"bg-cancelled",_[7]),!_[5]&&_[0].hint&&(_[3]||_[1].isSelectedAnswer)?L?L.p(_,K):(L=je(_),L.c(),L.m(f,null)):L&&(L.d(1),L=null)},i:I,o:I,d(_){_&&(A(e),A(o),A(f)),b.d(),p.d(),M&&M.d(),L&&L.d()}}}function Et(n,e,t){let{answer:s}=e,{answerContext:i}=e,{badgeText:l}=e,{questionIsAnswered:r}=e,{submitAnswer:o}=e,{examMode:f}=e;var a,u;const b=()=>o(s.id),g=()=>o(s.id),w=()=>t(7,u=!u);return n.$$set=p=>{"answer"in p&&t(0,s=p.answer),"answerContext"in p&&t(1,i=p.answerContext),"badgeText"in p&&t(2,l=p.badgeText),"questionIsAnswered"in p&&t(3,r=p.questionIsAnswered),"submitAnswer"in p&&t(4,o=p.submitAnswer),"examMode"in p&&t(5,f=p.examMode)},n.$$.update=()=>{n.$$.dirty&43&&s&&(t(7,u=!1),t(6,a="border-secondary"),f||(r?i.isCorrectAnswer?t(6,a="border-success"):i.isSubmittedAnswer&&t(6,a="border-danger"):i.isSelectedAnswer&&t(6,a="border-danger")))},[s,i,l,r,o,f,a,u,b,g,w]}class Tt extends pe{constructor(e){super(),ge(this,e,Et,St,ue,{answer:0,answerContext:1,badgeText:2,questionIsAnswered:3,submitAnswer:4,examMode:5})}}function Kt(n){let e,t,s,i,l;return{c(){e=d("div"),t=d("div"),s=d("button"),s.textContent="Show answer",c(s,"type","button"),c(s,"class","btn btn-warning btn-sm w-100"),c(t,"class","col-md-6 offset-md-3"),c(e,"class","row")},m(r,o){v(r,e,o),m(e,t),m(t,s),i||(l=U(s,"click",J(n[4])),i=!0)},p:I,d(r){r&&A(e),i=!1,l()}}}function Ot(n){let e,t,s=R.sanitize(n[0].text)+"",i,l,r=!n[1]&&Ne(n);return{c(){e=d("div"),t=d("p"),i=S(),r&&r.c(),l=le(),c(t,"class","p-1"),c(e,"class","row border-light border-start border-3 m-1 p-2")},m(o,f){v(o,e,f),m(e,t),t.innerHTML=s,v(o,i,f),r&&r.m(o,f),v(o,l,f)},p(o,f){f&1&&s!==(s=R.sanitize(o[0].text)+"")&&(t.innerHTML=s),o[1]?r&&(r.d(1),r=null):r?r.p(o,f):(r=Ne(o),r.c(),r.m(l.parentNode,l))},d(o){o&&(A(e),A(i),A(l)),r&&r.d(o)}}}function Ne(n){let e,t,s,i,l,r,o,f;return{c(){e=d("div"),t=d("div"),s=d("button"),s.textContent="Ask me again",i=S(),l=d("div"),r=d("button"),r.textContent="I got it!",c(s,"type","button"),c(s,"class","btn btn-danger btn-sm w-100"),c(t,"class","col-md-6 mb-1"),c(r,"type","button"),c(r,"class","btn btn-success btn-sm w-100"),c(l,"class","col-md-6 mb-1"),c(e,"class","row")},m(a,u){v(a,e,u),m(e,t),m(t,s),m(e,i),m(e,l),m(l,r),o||(f=[U(s,"click",J(n[5])),U(r,"click",J(n[6]))],o=!0)},p:I,d(a){a&&A(e),o=!1,Oe(f)}}}function Ht(n){let e;function t(l,r){return l[3]?Ot:Kt}let s=t(n),i=s(n);return{c(){i.c(),e=le()},m(l,r){i.m(l,r),v(l,e,r)},p(l,[r]){s===(s=t(l))&&i?i.p(l,r):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},i:I,o:I,d(l){l&&A(e),i.d(l)}}}function zt(n,e,t){let{answer:s}=e,{hasAnswer:i}=e,{submitAnswer:l}=e;var r=!1;function o(){t(3,r=!r)}const f=()=>l(),a=()=>l(s.id);return n.$$set=u=>{"answer"in u&&t(0,s=u.answer),"hasAnswer"in u&&t(1,i=u.hasAnswer),"submitAnswer"in u&&t(2,l=u.submitAnswer)},n.$$.update=()=>{n.$$.dirty&2&&(i?t(3,r=!0):t(3,r=!1))},[s,i,l,r,o,f,a]}class Dt extends pe{constructor(e){super(),ge(this,e,zt,Ht,ue,{answer:0,hasAnswer:1,submitAnswer:2})}}const Se=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Ee(n,e,t,s){n.addEventListener?n.addEventListener(e,t,s):n.attachEvent&&n.attachEvent("on".concat(e),t)}function de(n,e,t,s){n.removeEventListener?n.removeEventListener(e,t,s):n.detachEvent&&n.detachEvent("on".concat(e),t)}function ft(n,e){const t=e.slice(0,e.length-1);for(let s=0;s<t.length;s++)t[s]=n[t[s].toLowerCase()];return t}function ct(n){typeof n!="string"&&(n=""),n=n.replace(/\s/g,"");const e=n.split(",");let t=e.lastIndexOf("");for(;t>=0;)e[t-1]+=",",e.splice(t,1),t=e.lastIndexOf("");return e}function It(n,e){const t=n.length>=e.length?n:e,s=n.length>=e.length?e:n;let i=!0;for(let l=0;l<t.length;l++)s.indexOf(t[l])===-1&&(i=!1);return i}const be={backspace:8,"⌫":8,tab:9,clear:12,enter:13,"↩":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":Se?173:189,"=":Se?61:187,";":Se?59:186,"'":222,"[":219,"]":221,"\\":220},Z={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},Ke={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},P={16:!1,18:!1,17:!1,91:!1},j={};for(let n=1;n<20;n++)be["f".concat(n)]=111+n;let D=[],_e=null,at="all";const ee=new Map,Ae=n=>be[n.toLowerCase()]||Z[n.toLowerCase()]||n.toUpperCase().charCodeAt(0),jt=n=>Object.keys(be).find(e=>be[e]===n),Nt=n=>Object.keys(Z).find(e=>Z[e]===n);function ut(n){at=n||"all"}function we(){return at||"all"}function Pt(){return D.slice(0)}function Qt(){return D.map(n=>jt(n)||Nt(n)||String.fromCharCode(n))}function Ut(){const n=[];return Object.keys(j).forEach(e=>{j[e].forEach(t=>{let{key:s,scope:i,mods:l,shortcut:r}=t;n.push({scope:i,shortcut:r,mods:l,keys:s.split("+").map(o=>Ae(o))})})}),n}function Bt(n){const e=n.target||n.srcElement,{tagName:t}=e;let s=!0;const i=t==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(e.type);return(e.isContentEditable||(i||t==="TEXTAREA"||t==="SELECT")&&!e.readOnly)&&(s=!1),s}function Ft(n){return typeof n=="string"&&(n=Ae(n)),D.indexOf(n)!==-1}function Vt(n,e){let t,s;n||(n=we());for(const i in j)if(Object.prototype.hasOwnProperty.call(j,i))for(t=j[i],s=0;s<t.length;)t[s].scope===n?t.splice(s,1).forEach(r=>{let{element:o}=r;return He(o)}):s++;we()===n&&ut(e||"all")}function Gt(n){let e=n.keyCode||n.which||n.charCode;const t=D.indexOf(e);if(t>=0&&D.splice(t,1),n.key&&n.key.toLowerCase()==="meta"&&D.splice(0,D.length),(e===93||e===224)&&(e=91),e in P){P[e]=!1;for(const s in Z)Z[s]===e&&(Y[s]=!1)}}function dt(n){if(typeof n>"u")Object.keys(j).forEach(i=>{Array.isArray(j[i])&&j[i].forEach(l=>Ce(l)),delete j[i]}),He(null);else if(Array.isArray(n))n.forEach(i=>{i.key&&Ce(i)});else if(typeof n=="object")n.key&&Ce(n);else if(typeof n=="string"){for(var e=arguments.length,t=new Array(e>1?e-1:0),s=1;s<e;s++)t[s-1]=arguments[s];let[i,l]=t;typeof i=="function"&&(l=i,i=""),Ce({key:n,scope:i,method:l,splitKey:"+"})}}const Ce=n=>{let{key:e,scope:t,method:s,splitKey:i="+"}=n;ct(e).forEach(r=>{const o=r.split(i),f=o.length,a=o[f-1],u=a==="*"?"*":Ae(a);if(!j[u])return;t||(t=we());const b=f>1?ft(Z,o):[],g=[];j[u]=j[u].filter(w=>{const C=(s?w.method===s:!0)&&w.scope===t&&It(w.mods,b);return C&&g.push(w.element),!C}),g.forEach(w=>He(w))})};function Pe(n,e,t,s){if(e.element!==s)return;let i;if(e.scope===t||e.scope==="all"){i=e.mods.length>0;for(const l in P)Object.prototype.hasOwnProperty.call(P,l)&&(!P[l]&&e.mods.indexOf(+l)>-1||P[l]&&e.mods.indexOf(+l)===-1)&&(i=!1);(e.mods.length===0&&!P[16]&&!P[18]&&!P[17]&&!P[91]||i||e.shortcut==="*")&&(e.keys=[],e.keys=e.keys.concat(D),e.method(n,e)===!1&&(n.preventDefault?n.preventDefault():n.returnValue=!1,n.stopPropagation&&n.stopPropagation(),n.cancelBubble&&(n.cancelBubble=!0)))}}function Qe(n,e){const t=j["*"];let s=n.keyCode||n.which||n.charCode;if(!Y.filter.call(this,n))return;if((s===93||s===224)&&(s=91),D.indexOf(s)===-1&&s!==229&&D.push(s),["ctrlKey","altKey","shiftKey","metaKey"].forEach(o=>{const f=Ke[o];n[o]&&D.indexOf(f)===-1?D.push(f):!n[o]&&D.indexOf(f)>-1?D.splice(D.indexOf(f),1):o==="metaKey"&&n[o]&&D.length===3&&(n.ctrlKey||n.shiftKey||n.altKey||(D=D.slice(D.indexOf(f))))}),s in P){P[s]=!0;for(const o in Z)Z[o]===s&&(Y[o]=!0);if(!t)return}for(const o in P)Object.prototype.hasOwnProperty.call(P,o)&&(P[o]=n[Ke[o]]);n.getModifierState&&!(n.altKey&&!n.ctrlKey)&&n.getModifierState("AltGraph")&&(D.indexOf(17)===-1&&D.push(17),D.indexOf(18)===-1&&D.push(18),P[17]=!0,P[18]=!0);const i=we();if(t)for(let o=0;o<t.length;o++)t[o].scope===i&&(n.type==="keydown"&&t[o].keydown||n.type==="keyup"&&t[o].keyup)&&Pe(n,t[o],i,e);if(!(s in j))return;const l=j[s],r=l.length;for(let o=0;o<r;o++)if((n.type==="keydown"&&l[o].keydown||n.type==="keyup"&&l[o].keyup)&&l[o].key){const f=l[o],{splitKey:a}=f,u=f.key.split(a),b=[];for(let g=0;g<u.length;g++)b.push(Ae(u[g]));b.sort().join("")===D.sort().join("")&&Pe(n,f,i,e)}}function Y(n,e,t){D=[];const s=ct(n);let i=[],l="all",r=document,o=0,f=!1,a=!0,u="+",b=!1,g=!1;for(t===void 0&&typeof e=="function"&&(t=e),Object.prototype.toString.call(e)==="[object Object]"&&(e.scope&&(l=e.scope),e.element&&(r=e.element),e.keyup&&(f=e.keyup),e.keydown!==void 0&&(a=e.keydown),e.capture!==void 0&&(b=e.capture),typeof e.splitKey=="string"&&(u=e.splitKey),e.single===!0&&(g=!0)),typeof e=="string"&&(l=e),g&&dt(n,l);o<s.length;o++)n=s[o].split(u),i=[],n.length>1&&(i=ft(Z,n)),n=n[n.length-1],n=n==="*"?"*":Ae(n),n in j||(j[n]=[]),j[n].push({keyup:f,keydown:a,scope:l,mods:i,shortcut:s[o],method:t,key:s[o],splitKey:u,element:r});if(typeof r<"u"&&window){if(!ee.has(r)){const w=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;return Qe(C,r)},p=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;Qe(C,r),Gt(C)};ee.set(r,{keydownListener:w,keyupListenr:p,capture:b}),Ee(r,"keydown",w,b),Ee(r,"keyup",p,b)}if(!_e){const w=()=>{D=[]};_e={listener:w,capture:b},Ee(window,"focus",w,b)}}}function Rt(n){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"all";Object.keys(j).forEach(t=>{j[t].filter(i=>i.scope===e&&i.shortcut===n).forEach(i=>{i&&i.method&&i.method()})})}function He(n){const e=Object.values(j).flat();if(e.findIndex(s=>{let{element:i}=s;return i===n})<0){const{keydownListener:s,keyupListenr:i,capture:l}=ee.get(n)||{};s&&i&&(de(n,"keyup",i,l),de(n,"keydown",s,l),ee.delete(n))}if((e.length<=0||ee.size<=0)&&(Object.keys(ee).forEach(i=>{const{keydownListener:l,keyupListenr:r,capture:o}=ee.get(i)||{};l&&r&&(de(i,"keyup",r,o),de(i,"keydown",l,o),ee.delete(i))}),ee.clear(),Object.keys(j).forEach(i=>delete j[i]),_e)){const{listener:i,capture:l}=_e;de(window,"focus",i,l),_e=null}}const Te={getPressedKeyString:Qt,setScope:ut,getScope:we,deleteScope:Vt,getPressedKeyCodes:Pt,getAllKeyCodes:Ut,isPressed:Ft,filter:Bt,trigger:Rt,unbind:dt,keyMap:be,modifier:Z,modifierMap:Ke};for(const n in Te)Object.prototype.hasOwnProperty.call(Te,n)&&(Y[n]=Te[n]);if(typeof window<"u"){const n=window.hotkeys;Y.noConflict=e=>(e&&window.hotkeys===Y&&(window.hotkeys=n),Y),window.hotkeys=Y}function Ue(n,e,t){const s=n.slice();return s[7]=e[t],s}function Jt(n){let e,t,s,i,l,r,o,f,a;return{c(){e=d("div"),t=d("p"),s=d("button"),i=S(),l=d("div"),r=d("img"),c(s,"type","button"),c(s,"class","btn-close"),c(t,"class","bg-white text-end"),c(r,"class","img-fluid border border-5 border-white"),Le(r.src,o="/"+n[2].path)||c(r,"src",o),c(r,"alt",""),c(l,"class","text-center"),c(e,"class","img-fullscreen svelte-z0la5k")},m(u,b){v(u,e,b),m(e,t),m(t,s),m(e,i),m(e,l),m(l,r),f||(a=[U(s,"click",J(n[5])),U(e,"click",n[3])],f=!0)},p(u,b){b&4&&!Le(r.src,o="/"+u[2].path)&&c(r,"src",o)},d(u){u&&A(e),f=!1,Oe(a)}}}function Wt(n){let e,t,s=[],i=new Map,l=ie(n[0]);const r=o=>o[7].id;for(let o=0;o<l.length;o+=1){let f=Ue(n,l,o),a=r(f);i.set(a,s[o]=Be(a,f))}return{c(){e=d("div"),t=d("div");for(let o=0;o<s.length;o+=1)s[o].c();c(t,"class","row row-cols-1 row-cols-sm-3 g-4"),c(e,"class","col-lg")},m(o,f){v(o,e,f),m(e,t);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(t,null)},p(o,f){f&9&&(l=ie(o[0]),s=ot(s,f,r,1,o,l,i,t,_t,Be,null,Ue))},d(o){o&&A(e);for(let f=0;f<s.length;f+=1)s[f].d()}}}function Be(n,e){let t,s,i,l,r,o,f;function a(){return e[4](e[7])}return{key:n,first:null,c(){t=d("div"),s=d("div"),i=d("img"),r=S(),Le(i.src,l="/"+e[7].path)||c(i,"src",l),c(i,"class","card-img-top"),c(i,"alt",""),c(s,"class","card"),me(s,"max-width","18rem"),me(s,"cursor","pointer"),c(t,"class","col"),this.first=t},m(u,b){v(u,t,b),m(t,s),m(s,i),m(t,r),o||(f=U(i,"click",a),o=!0)},p(u,b){e=u,b&1&&!Le(i.src,l="/"+e[7].path)&&c(i,"src",l)},d(u){u&&A(t),o=!1,f()}}}function Xt(n){let e;function t(l,r){return l[1]?Jt:Wt}let s=t(n),i=s(n);return{c(){i.c(),e=le()},m(l,r){i.m(l,r),v(l,e,r)},p(l,[r]){s===(s=t(l))&&i?i.p(l,r):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},i:I,o:I,d(l){l&&A(e),i.d(l)}}}function Yt(n,e,t){let{images:s=[]}=e;var i=!1,l;rt(()=>{Y("esc","images",function(u,b){i&&t(1,i=!1)})});var r;function o(u){r&&r.cancel(),r=wt(()=>{t(1,i=!i),t(2,l=s.find(b=>b.id===u))},100,{maxWait:200}),r()}const f=u=>o(u.id),a=()=>t(1,i=!i);return n.$$set=u=>{"images"in u&&t(0,s=u.images)},n.$$.update=()=>{n.$$.dirty&2&&(i?Y.setScope("images"):Y.setScope("questions"))},[s,i,l,o,f,a]}class Zt extends pe{constructor(e){super(),ge(this,e,Yt,Xt,ue,{images:0})}}function Fe(n,e,t){const s=n.slice();return s[12]=e[t],s}function Ve(n,e,t){const s=n.slice();return s[12]=e[t],s}function Ge(n){let e,t,s,i=n[12].name+"",l,r,o,f,a,u,b;function g(){return n[7](n[12])}return{c(){e=d("div"),t=d("div"),s=d("a"),l=he(i),o=S(),f=d("div"),a=d("button"),a.textContent="Add",c(s,"href",r="/decks/"+n[12].id),c(t,"class","col-9 text-overflow svelte-1gfmo48"),c(a,"class","btn btn-sm btn-primary float-end"),c(f,"class","col-3 d-grid gap-4"),c(e,"class","row mb-1")},m(w,p){v(w,e,p),m(e,t),m(t,s),m(s,l),m(e,o),m(e,f),m(f,a),u||(b=U(a,"click",J(g)),u=!0)},p(w,p){n=w,p&2&&i!==(i=n[12].name+"")&&qe(l,i),p&2&&r!==(r="/decks/"+n[12].id)&&c(s,"href",r)},d(w){w&&A(e),u=!1,b()}}}function Re(n){let e;return{c(){e=d("hr")},m(t,s){v(t,e,s)},d(t){t&&A(e)}}}function Je(n){let e,t,s,i=n[12].name+"",l,r,o,f,a,u,b;function g(){return n[8](n[12])}return{c(){e=d("div"),t=d("div"),s=d("a"),l=he(i),o=S(),f=d("div"),a=d("button"),a.textContent="Remove",c(s,"href",r="/decks/"+n[12].id),c(t,"class","col-9 text-overflow svelte-1gfmo48"),c(a,"class","btn btn-sm btn-outline-dark float-end"),c(f,"class","col-3 d-grid gap-4"),c(e,"class","row mb-1")},m(w,p){v(w,e,p),m(e,t),m(t,s),m(s,l),m(e,o),m(e,f),m(f,a),u||(b=U(a,"click",J(g)),u=!0)},p(w,p){n=w,p&1&&i!==(i=n[12].name+"")&&qe(l,i),p&1&&r!==(r="/decks/"+n[12].id)&&c(s,"href",r)},d(w){w&&A(e),u=!1,b()}}}function We(n){let e;return{c(){e=d("p"),e.textContent="You don't have any decks yet."},m(t,s){v(t,e,s)},d(t){t&&A(e)}}}function xt(n){let e,t,s,i,l,r,o,f,a,u,b,g,w,p,C,T,M,L,_,K,x,$,h=ie(n[1]),O=[];for(let k=0;k<h.length;k+=1)O[k]=Ge(Ve(n,h,k));let N=n[1].length>0&&n[0].length>0&&Re(),W=ie(n[0]),E=[];for(let k=0;k<W.length;k+=1)E[k]=Je(Fe(n,W,k));let z=n[1].length===0&&n[0].length===0&&We();return{c(){e=d("button"),e.innerHTML='<i class="bi bi-collection"></i> Add to deck',t=S(),s=d("div"),i=d("div"),i.innerHTML='<h5 id="offcanvasAddToDeckLabel">Add question to deck</h5> <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>',l=S(),r=d("div");for(let k=0;k<O.length;k+=1)O[k].c();o=S(),N&&N.c(),f=S();for(let k=0;k<E.length;k+=1)E[k].c();a=S(),z&&z.c(),u=S(),b=d("hr"),g=S(),w=d("div"),p=d("div"),C=d("p"),C.textContent="Create new deck:",T=S(),M=d("div"),L=d("input"),_=S(),K=d("button"),K.textContent="Create deck and add question",c(e,"class","btn btn-outline-secondary btn-sm"),c(e,"type","button"),c(e,"data-bs-toggle","offcanvas"),c(e,"data-bs-target","#offcanvasAddToDeck"),c(e,"aria-controls","offcanvasAddToDeck"),c(i,"class","offcanvas-header"),c(L,"type","text"),c(L,"class","form-control"),c(L,"id","name"),c(L,"name","name"),c(L,"placeholder","My new deck ..."),c(M,"class","mb-3"),c(K,"class","btn btn-sm btn-primary"),c(p,"class","col"),c(w,"class","row"),c(r,"class","offcanvas-body"),c(s,"class","offcanvas offcanvas-end"),c(s,"tabindex","-1"),c(s,"id","offcanvasAddToDeck"),c(s,"aria-labelledby","offcanvasAddToDeckLabel")},m(k,H){v(k,e,H),v(k,t,H),v(k,s,H),m(s,i),m(s,l),m(s,r);for(let y=0;y<O.length;y+=1)O[y]&&O[y].m(r,null);m(r,o),N&&N.m(r,null),m(r,f);for(let y=0;y<E.length;y+=1)E[y]&&E[y].m(r,null);m(r,a),z&&z.m(r,null),m(r,u),m(r,b),m(r,g),m(r,w),m(w,p),m(p,C),m(p,T),m(p,M),m(M,L),De(L,n[2]),m(p,_),m(p,K),x||($=[U(L,"input",n[9]),U(K,"click",J(n[10]))],x=!0)},p(k,[H]){if(H&10){h=ie(k[1]);let y;for(y=0;y<h.length;y+=1){const te=Ve(k,h,y);O[y]?O[y].p(te,H):(O[y]=Ge(te),O[y].c(),O[y].m(r,o))}for(;y<O.length;y+=1)O[y].d(1);O.length=h.length}if(k[1].length>0&&k[0].length>0?N||(N=Re(),N.c(),N.m(r,f)):N&&(N.d(1),N=null),H&17){W=ie(k[0]);let y;for(y=0;y<W.length;y+=1){const te=Fe(k,W,y);E[y]?E[y].p(te,H):(E[y]=Je(te),E[y].c(),E[y].m(r,a))}for(;y<E.length;y+=1)E[y].d(1);E.length=W.length}k[1].length===0&&k[0].length===0?z||(z=We(),z.c(),z.m(r,u)):z&&(z.d(1),z=null),H&4&&L.value!==k[2]&&De(L,k[2])},i:I,o:I,d(k){k&&(A(e),A(t),A(s)),Ie(O,k),N&&N.d(),Ie(E,k),z&&z.d(),x=!1,Oe($)}}}function $t(n,e,t){let{questionId:s}=e,i=[],l=[],r="";rt(()=>{const C=document.getElementById("offcanvasAddToDeck");C.addEventListener("show.bs.offcanvas",T=>{o()}),C.addEventListener("hidden.bs.offcanvas",T=>{t(0,i=[]),t(1,l=[])})});function o(){axios.get("/api/decks/withquestionids").then(function(C){var T=C.data;T.forEach(M=>{M.questions.some(L=>L.id===s)?t(0,i=[...i,{id:M.id,name:M.name}]):t(1,l=[...l,{id:M.id,name:M.name}])})}).catch(function(C){console.log(C),alert(C)})}function f(C){axios.post("/api/decks/"+C+"/addquestion",{question_id:s}).then(function(T){const M=l.find(L=>L.id===C);t(0,i=[...i,M]),t(1,l=l.filter(L=>L.id!==C))}).catch(function(T){alert(T)})}function a(C){axios.post("/api/decks/"+C+"/removequestion",{question_id:s}).then(function(T){const M=i.find(L=>L.id===C);t(1,l=[...l,M]),t(0,i=i.filter(L=>L.id!==C))}).catch(function(T){alert(T)})}function u(){r&&axios.post("/api/decks",{name:r}).then(function(C){const T=C.data;t(1,l=[...l,T]),f(T.id),t(2,r="")}).catch(function(C){alert(C)})}const b=C=>f(C.id),g=C=>a(C.id);function w(){r=this.value,t(2,r)}const p=()=>u();return n.$$set=C=>{"questionId"in C&&t(6,s=C.questionId)},[i,l,r,f,a,u,s,b,g,w,p]}class en extends pe{constructor(e){super(),ge(this,e,$t,xt,ue,{questionId:6})}}function Xe(n,e,t){const s=n.slice();return s[20]=e[t],s[21]=e,s[22]=t,s}function tn(n){let e;return{c(){e=d("p"),e.textContent="Loading ..."},m(t,s){v(t,e,s)},p:I,i:I,o:I,d(t){t&&A(e)}}}function nn(n){let e,t,s,i,l;const r=[ln,sn],o=[];function f(u,b){return u[7]?0:1}e=f(n),t=o[e]=r[e](n);let a=!n[1].isAnswered&&!n[3]&&n[0].type!=="card"&&lt(n);return{c(){t.c(),s=S(),a&&a.c(),i=le()},m(u,b){o[e].m(u,b),v(u,s,b),a&&a.m(u,b),v(u,i,b),l=!0},p(u,b){let g=e;e=f(u),e===g?o[e].p(u,b):(oe(),B(o[g],1,1,()=>{o[g]=null}),re(),t=o[e],t?t.p(u,b):(t=o[e]=r[e](u),t.c()),Q(t,1),t.m(s.parentNode,s)),!u[1].isAnswered&&!u[3]&&u[0].type!=="card"?a?a.p(u,b):(a=lt(u),a.c(),a.m(i.parentNode,i)):a&&(a.d(1),a=null)},i(u){l||(Q(t),l=!0)},o(u){B(t),l=!1},d(u){u&&(A(s),A(i)),o[e].d(u),a&&a.d(u)}}}function sn(n){let e,t,s,i,l,r,o,f,a,u,b,g,w,p,C=n[0].id,T,M,L,_,K,x,$,h,O,N,W,E=n[0].is_invalid&&Ye(),z=n[0].needs_review&&Ze(),k=n[0].text&&xe(n),H=n[0].images&&n[0].images.length>0&&$e(n),y=!n[3]&&n[0].hint&&et(n);const te=[an,cn,fn],ne=[];function ze(q,F){return q[0].type==="mc"?0:q[0].answers.length===0?1:2}f=ze(n),a=ne[f]=te[f](n);let V=!n[3]&&n[1].isAnswered&&n[0].comment&&nt(n),G=n[1].isAnswered&&st(n),X=it(n);return{c(){e=d("div"),E&&E.c(),t=S(),z&&z.c(),s=S(),i=d("div"),k&&k.c(),l=S(),H&&H.c(),r=S(),y&&y.c(),o=S(),a.c(),u=S(),V&&V.c(),b=S(),g=d("div"),w=d("div"),G&&G.c(),p=S(),X.c(),T=S(),M=d("button"),M.innerHTML='<i class="bi bi-pencil"></i> Edit',L=S(),_=d("a"),K=he("Link "),x=d("i"),c(i,"class","row border-start border-3 border-dark m-1 mb-3 pt-2"),c(M,"type","button"),c(M,"class","btn btn-outline-secondary btn-sm ms-1"),c(x,"class","bi bi-box-arrow-up-right"),c(_,"class","btn btn-sm btn-outline-secondary ms-1"),c(_,"href",$="/questions/"+n[0].id),c(_,"target","_blank"),c(_,"role","button"),c(w,"class","d-flex justify-content-end"),c(g,"class","row mt-1 mb-1 pt-2"),c(e,"id",h="question"+n[0].id)},m(q,F){v(q,e,F),E&&E.m(e,null),m(e,t),z&&z.m(e,null),m(e,s),m(e,i),k&&k.m(i,null),m(i,l),H&&H.m(i,null),m(e,r),y&&y.m(e,null),m(e,o),ne[f].m(e,null),m(e,u),V&&V.m(e,null),m(e,b),m(e,g),m(g,w),G&&G.m(w,null),m(w,p),X.m(w,null),m(w,T),m(w,M),m(w,L),m(w,_),m(_,K),m(_,x),O=!0,N||(W=U(M,"click",J(n[9])),N=!0)},p(q,F){q[0].is_invalid?E||(E=Ye(),E.c(),E.m(e,t)):E&&(E.d(1),E=null),q[0].needs_review?z||(z=Ze(),z.c(),z.m(e,s)):z&&(z.d(1),z=null),q[0].text?k?k.p(q,F):(k=xe(q),k.c(),k.m(i,l)):k&&(k.d(1),k=null),q[0].images&&q[0].images.length>0?H?(H.p(q,F),F&1&&Q(H,1)):(H=$e(q),H.c(),Q(H,1),H.m(i,null)):H&&(oe(),B(H,1,1,()=>{H=null}),re()),!q[3]&&q[0].hint?y?y.p(q,F):(y=et(q),y.c(),y.m(e,o)):y&&(y.d(1),y=null);let Me=f;f=ze(q),f===Me?ne[f].p(q,F):(oe(),B(ne[Me],1,1,()=>{ne[Me]=null}),re(),a=ne[f],a?a.p(q,F):(a=ne[f]=te[f](q),a.c()),Q(a,1),a.m(e,u)),!q[3]&&q[1].isAnswered&&q[0].comment?V?V.p(q,F):(V=nt(q),V.c(),V.m(e,b)):V&&(V.d(1),V=null),q[1].isAnswered?G?G.p(q,F):(G=st(q),G.c(),G.m(w,p)):G&&(G.d(1),G=null),F&1&&ue(C,C=q[0].id)?(oe(),B(X,1,1,I),re(),X=it(q),X.c(),Q(X,1),X.m(w,T)):X.p(q,F),(!O||F&1&&$!==($="/questions/"+q[0].id))&&c(_,"href",$),(!O||F&1&&h!==(h="question"+q[0].id))&&c(e,"id",h)},i(q){O||(Q(H),Q(a),Q(X),O=!0)},o(q){B(H),B(a),B(X),O=!1},d(q){q&&A(e),E&&E.d(),z&&z.d(),k&&k.d(),H&&H.d(),y&&y.d(),ne[f].d(),V&&V.d(),G&&G.d(),X.d(q),N=!1,W()}}}function ln(n){let e,t,s,i;function l(o){n[12](o)}let r={toggleEditor:n[9]};return n[0]!==void 0&&(r.question=n[0]),t=new gt({props:r}),fe.push(()=>ce(t,"question",l)),{c(){e=d("div"),ke(t.$$.fragment),c(e,"class","pt-1 pb-3 border-dark"),me(e,"border-top","dotted"),me(e,"border-bottom","dotted"),me(e,"border-width","1px")},m(o,f){v(o,e,f),ye(t,e,null),i=!0},p(o,f){const a={};!s&&f&1&&(s=!0,a.question=o[0],ae(()=>s=!1)),t.$set(a)},i(o){i||(Q(t.$$.fragment,o),i=!0)},o(o){B(t.$$.fragment,o),i=!1},d(o){o&&A(e),ve(t)}}}function Ye(n){let e;return{c(){e=d("div"),e.innerHTML='<div class="col"><div class="alert alert-light" role="alert"><i class="bi bi-cone-striped"></i> <strong>Question is marked invalid</strong> and safe to skip!</div></div>',c(e,"class","row")},m(t,s){v(t,e,s)},d(t){t&&A(e)}}}function Ze(n){let e;return{c(){e=d("div"),e.innerHTML='<div class="col"><div class="alert alert-light" role="alert"><i class="bi bi-eraser-fill"></i> <strong>Question needs review</strong> - Please review the question and answer choices and make sure they are correct and clear. Afterwards, remove the &quot;Needs review&quot; flag.</div></div>',c(e,"class","row")},m(t,s){v(t,e,s)},d(t){t&&A(e)}}}function xe(n){let e,t,s=R.sanitize(n[0].text)+"";return{c(){e=d("div"),t=d("p"),c(t,"id","questionText"),c(e,"class","col-lg")},m(i,l){v(i,e,l),m(e,t),t.innerHTML=s},p(i,l){l&1&&s!==(s=R.sanitize(i[0].text)+"")&&(t.innerHTML=s)},d(i){i&&A(e)}}}function $e(n){let e,t,s;function i(r){n[13](r)}let l={};return n[0].images!==void 0&&(l.images=n[0].images),e=new Zt({props:l}),fe.push(()=>ce(e,"images",i)),{c(){ke(e.$$.fragment)},m(r,o){ye(e,r,o),s=!0},p(r,o){const f={};!t&&o&1&&(t=!0,f.images=r[0].images,ae(()=>t=!1)),e.$set(f)},i(r){s||(Q(e.$$.fragment,r),s=!0)},o(r){B(e.$$.fragment,r),s=!1},d(r){ve(e,r)}}}function et(n){let e;function t(l,r){return l[8]?on:rn}let s=t(n),i=s(n);return{c(){i.c(),e=le()},m(l,r){i.m(l,r),v(l,e,r)},p(l,r){s===(s=t(l))&&i?i.p(l,r):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},d(l){l&&A(e),i.d(l)}}}function rn(n){let e,t,s;return{c(){e=d("button"),e.innerHTML='<i class="bi bi-question"></i> Show hint',c(e,"type","button"),c(e,"class","btn btn-outline-secondary btn-sm mb-3")},m(i,l){v(i,e,l),t||(s=U(e,"click",J(n[14])),t=!0)},p:I,d(i){i&&A(e),t=!1,s()}}}function on(n){let e,t,s=R.sanitize(n[0].hint)+"";return{c(){e=d("div"),t=d("p"),c(e,"class","row border-start border-3 border-secondary-subtle m-1 mt-3 mb-3")},m(i,l){v(i,e,l),m(e,t),t.innerHTML=s},p(i,l){l&1&&s!==(s=R.sanitize(i[0].hint)+"")&&(t.innerHTML=s)},d(i){i&&A(e)}}}function fn(n){let e,t,s;function i(r){n[18](r)}let l={submitAnswer:n[5],hasAnswer:!!n[4]};return n[0].answers[0]!==void 0&&(l.answer=n[0].answers[0]),e=new Dt({props:l}),fe.push(()=>ce(e,"answer",i)),{c(){ke(e.$$.fragment)},m(r,o){ye(e,r,o),s=!0},p(r,o){const f={};o&32&&(f.submitAnswer=r[5]),o&16&&(f.hasAnswer=!!r[4]),!t&&o&1&&(t=!0,f.answer=r[0].answers[0],ae(()=>t=!1)),e.$set(f)},i(r){s||(Q(e.$$.fragment,r),s=!0)},o(r){B(e.$$.fragment,r),s=!1},d(r){ve(e,r)}}}function cn(n){let e;return{c(){e=d("div"),e.textContent="This questions doesn't have any answer.",c(e,"class","alert alert-light"),c(e,"role","alert")},m(t,s){v(t,e,s)},p:I,i:I,o:I,d(t){t&&A(e)}}}function an(n){let e=[],t=new Map,s,i,l=ie(n[0].answers);const r=o=>o[20].id;for(let o=0;o<l.length;o+=1){let f=Xe(n,l,o),a=r(f);t.set(a,e[o]=tt(a,f))}return{c(){for(let o=0;o<e.length;o+=1)e[o].c();s=le()},m(o,f){for(let a=0;a<e.length;a+=1)e[a]&&e[a].m(o,f);v(o,s,f),i=!0},p(o,f){f&43&&(l=ie(o[0].answers),oe(),e=ot(e,f,r,1,o,l,t,s.parentNode,bt,tt,s,Xe),re())},i(o){if(!i){for(let f=0;f<l.length;f+=1)Q(e[f]);i=!0}},o(o){for(let f=0;f<e.length;f+=1)B(e[f]);i=!1},d(o){o&&A(s);for(let f=0;f<e.length;f+=1)e[f].d(o)}}}function tt(n,e){let t,s,i,l,r,o;function f(g){e[15](g,e[20],e[21],e[22])}function a(g){e[16](g,e[20])}function u(g){e[17](g)}let b={submitAnswer:e[5],questionIsAnswered:e[1].isAnswered,badgeText:"ABCDEFGHIJKLMN".charAt(e[22])};return e[20]!==void 0&&(b.answer=e[20]),e[1].answerContext[e[20].id]!==void 0&&(b.answerContext=e[1].answerContext[e[20].id]),e[3]!==void 0&&(b.examMode=e[3]),s=new Tt({props:b}),fe.push(()=>ce(s,"answer",f)),fe.push(()=>ce(s,"answerContext",a)),fe.push(()=>ce(s,"examMode",u)),{key:n,first:null,c(){t=le(),ke(s.$$.fragment),this.first=t},m(g,w){v(g,t,w),ye(s,g,w),o=!0},p(g,w){e=g;const p={};w&32&&(p.submitAnswer=e[5]),w&2&&(p.questionIsAnswered=e[1].isAnswered),w&1&&(p.badgeText="ABCDEFGHIJKLMN".charAt(e[22])),!i&&w&1&&(i=!0,p.answer=e[20],ae(()=>i=!1)),!l&&w&3&&(l=!0,p.answerContext=e[1].answerContext[e[20].id],ae(()=>l=!1)),!r&&w&8&&(r=!0,p.examMode=e[3],ae(()=>r=!1)),s.$set(p)},i(g){o||(Q(s.$$.fragment,g),o=!0)},o(g){B(s.$$.fragment,g),o=!1},d(g){g&&A(t),ve(s,g)}}}function nt(n){let e,t,s,i=R.sanitize(n[0].comment)+"";return{c(){e=d("div"),t=d("div"),s=d("div"),c(s,"class","alert alert-light"),c(s,"role","alert"),c(t,"class","col"),c(e,"class","row")},m(l,r){v(l,e,r),m(e,t),m(t,s),s.innerHTML=i},p(l,r){r&1&&i!==(i=R.sanitize(l[0].comment)+"")&&(s.innerHTML=i)},d(l){l&&A(e)}}}function st(n){let e,t,s;return{c(){e=d("button"),e.innerHTML='<i class="bi bi-arrow-counterclockwise"></i> Reset',c(e,"type","button"),c(e,"class","btn btn-outline-secondary btn-sm me-1")},m(i,l){v(i,e,l),t||(s=U(e,"click",J(function(){mt(n[6])&&n[6].apply(this,arguments)})),t=!0)},p(i,l){n=i},d(i){i&&A(e),t=!1,s()}}}function it(n){let e,t;return e=new en({props:{questionId:n[0].id}}),{c(){ke(e.$$.fragment)},m(s,i){ye(e,s,i),t=!0},p(s,i){const l={};i&1&&(l.questionId=s[0].id),e.$set(l)},i(s){t||(Q(e.$$.fragment,s),t=!0)},o(s){B(e.$$.fragment,s),t=!1},d(s){ve(e,s)}}}function lt(n){let e,t,s,i;return{c(){e=d("div"),t=d("button"),t.textContent="→ Show answer",c(t,"type","button"),c(t,"class","btn btn-outline-secondary btn-sm"),c(e,"class","mt-3")},m(l,r){v(l,e,r),m(e,t),s||(i=U(t,"click",J(n[19])),s=!0)},p:I,d(l){l&&A(e),s=!1,i()}}}function un(n){let e,t,s,i;const l=[nn,tn],r=[];function o(f,a){return f[0]?0:1}return e=o(n),t=r[e]=l[e](n),{c(){t.c(),s=le()},m(f,a){r[e].m(f,a),v(f,s,a),i=!0},p(f,[a]){let u=e;e=o(f),e===u?r[e].p(f,a):(oe(),B(r[u],1,1,()=>{r[u]=null}),re(),t=r[e],t?t.p(f,a):(t=r[e]=l[e](f),t.c()),Q(t,1),t.m(s.parentNode,s))},i(f){i||(Q(t),i=!0)},o(f){B(t),i=!1},d(f){f&&A(s),r[e].d(f)}}}function dn(n){const e=n.target;!e.classList.contains("bg-danger-subtle")&&!e.classList.contains("bg-warning-subtle")&&!e.classList.contains("bg-success-subtle")?e.classList.add("bg-success-subtle"):e.classList.contains("bg-success-subtle")?(e.classList.remove("bg-success-subtle"),e.classList.add("bg-danger-subtle")):e.classList.contains("bg-danger-subtle")?(e.classList.remove("bg-danger-subtle"),e.classList.add("bg-warning-subtle")):e.classList.contains("bg-warning-subtle")&&e.classList.remove("bg-warning-subtle")}function mn(n,e,t){let{question:s}=e,{questionContext:i}=e,{helpUsed:l}=e,{answerChoice:r}=e,{submitAnswer:o}=e,{deleteAnswer:f}=e,{examMode:a}=e,{updateCurrentQuestionData:u}=e,{settingsShuffleAnswers:b}=e;var g=!1,w=i.isAnswered;function p(){const h=!g;h&&u?u().then(()=>{t(7,g=h)}):t(7,g=h)}function C(h){s=h,t(0,s),t(11,b),t(1,i)}function T(h){n.$$.not_equal(s.images,h)&&(s.images=h,t(0,s),t(11,b),t(1,i))}const M=()=>{t(8,w=!0),t(2,l=!0)};function L(h,O,N,W){N[W]=h,t(0,s),t(11,b),t(1,i)}function _(h,O){n.$$.not_equal(i.answerContext[O.id],h)&&(i.answerContext[O.id]=h,t(1,i))}function K(h){a=h,t(3,a)}function x(h){n.$$.not_equal(s.answers[0],h)&&(s.answers[0]=h,t(0,s),t(11,b),t(1,i))}const $=()=>o("");return n.$$set=h=>{"question"in h&&t(0,s=h.question),"questionContext"in h&&t(1,i=h.questionContext),"helpUsed"in h&&t(2,l=h.helpUsed),"answerChoice"in h&&t(4,r=h.answerChoice),"submitAnswer"in h&&t(5,o=h.submitAnswer),"deleteAnswer"in h&&t(6,f=h.deleteAnswer),"examMode"in h&&t(3,a=h.examMode),"updateCurrentQuestionData"in h&&t(10,u=h.updateCurrentQuestionData),"settingsShuffleAnswers"in h&&t(11,b=h.settingsShuffleAnswers)},n.$$.update=()=>{n.$$.dirty&2051&&s&&s.type==="mc"&&b&&!Object.values(i.answerContext).some(h=>h.isSelectedAnswer)&&t(0,s.answers=pt.shuffle(s.answers),s),n.$$.dirty&3&&(t(8,w=i.isAnswered),t(2,l=i.isAnswered)),n.$$.dirty&1&&(()=>{var h=document.querySelectorAll("#questionText li");[].map.call(h,function(O){O.addEventListener("click",dn,!1)})})()},[s,i,l,a,r,o,f,g,w,p,u,b,C,T,M,L,_,K,x,$]}class hn extends pe{constructor(e){super(),ge(this,e,mn,un,ue,{question:0,questionContext:1,helpUsed:2,answerChoice:4,submitAnswer:5,deleteAnswer:6,examMode:3,updateCurrentQuestionData:10,settingsShuffleAnswers:11})}}export{hn as S,Y as h};
