import{S as de,i as me,s as re,b as d,g as S,c as f,C as ie,a as y,h as m,n as I,d as v,t as ve,j as qe,l as P,p as R,e as te,r as Me,A as ot,G as Le,q as ge,D as De,f as Ie,x as B,y as oe,w as Q,B as ce,k as fe,m as ae,o as _e,u as be,v as ue,z as we,K as _t}from"./index-B80I9K_4.js";import{e as le,u as ct,d as bt,o as wt}from"./each-DkBj6IvG.js";import{p as J,d as pt}from"./purify.es-DfBF0len.js";import{_ as gt}from"./lodash-D0JQdfhu.js";import{Q as ht}from"./QuestionForm-DCcp0m7G.js";function kt(n){let e,t,s;return{c(){e=d("div"),t=d("p"),s=ve(n[2]),f(t,"class","badge text-dark"),f(e,"class","col-1 border-start-3")},m(i,l){y(i,e,l),m(e,t),m(t,s)},p(i,l){l&4&&qe(s,i[2])},d(i){i&&v(e)}}}function yt(n){let e,t,s,i,l;return{c(){e=d("div"),t=d("p"),s=ve(n[2]),f(t,"class","badge text-dark"),f(e,"class","col-1 border-start-3 cursor-pointer svelte-12xdzqf")},m(r,o){y(r,e,o),m(e,t),m(t,s),i||(l=P(e,"click",n[8]),i=!0)},p(r,o){o&4&&qe(s,r[2])},d(r){r&&v(e),i=!1,l()}}}function vt(n){let e,t,s=J.sanitize(n[0].text)+"";return{c(){e=d("div"),t=d("p"),f(t,"class","p-1"),f(e,"class","col-10")},m(i,l){y(i,e,l),m(e,t),t.innerHTML=s},p(i,l){l&1&&s!==(s=J.sanitize(i[0].text)+"")&&(t.innerHTML=s)},d(i){i&&v(e)}}}function At(n){let e,t,s=J.sanitize(n[0].text)+"",i,l;return{c(){e=d("div"),t=d("p"),f(t,"class","p-1"),f(e,"class","col-10 cursor-pointer svelte-12xdzqf")},m(r,o){y(r,e,o),m(e,t),t.innerHTML=s,i||(l=P(e,"click",n[9]),i=!0)},p(r,o){o&1&&s!==(s=J.sanitize(r[0].text)+"")&&(t.innerHTML=s)},d(r){r&&v(e),i=!1,l()}}}function Ct(n){let e;return{c(){e=d("span"),e.textContent="✓",f(e,"class","text-secondary fw-bold fs-3")},m(t,s){y(t,e,s)},p:I,d(t){t&&v(e)}}}function Lt(n){let e;return{c(){e=d("span"),e.textContent="✗",f(e,"class","text-danger-dark fw-bold fs-3")},m(t,s){y(t,e,s)},p:I,d(t){t&&v(e)}}}function qt(n){let e;return{c(){e=d("span"),e.textContent="⇠",f(e,"class","text-success-dark fw-bold fs-3")},m(t,s){y(t,e,s)},p:I,d(t){t&&v(e)}}}function Mt(n){let e;return{c(){e=d("span"),e.textContent="✓",f(e,"class","text-success-dark fw-bold fs-3")},m(t,s){y(t,e,s)},p:I,d(t){t&&v(e)}}}function St(n){let e,t,s;return{c(){e=d("button"),f(e,"type","button"),f(e,"class","btn-close")},m(i,l){y(i,e,l),t||(s=P(e,"click",R(n[10])),t=!0)},p:I,d(i){i&&v(e),t=!1,s()}}}function je(n){let e,t,s,i,l=J.sanitize(n[0].hint)+"";return{c(){e=d("div"),t=S(),s=d("div"),i=d("p"),f(e,"class","col-1 border-3 border-start border-secondary-subtle"),f(i,"class","p-1"),f(s,"class","col-11")},m(r,o){y(r,e,o),y(r,t,o),y(r,s,o),m(s,i),i.innerHTML=l},p(r,o){o&1&&l!==(l=J.sanitize(r[0].hint)+"")&&(i.innerHTML=l)},d(r){r&&(v(e),v(t),v(s))}}}function Et(n){let e,t,s,i,l,r,o,c;function a(_,T){return!_[3]&&!_[1].isSubmittedAnswer?yt:kt}let u=a(n),b=u(n);function g(_,T){return!_[3]&&!_[1].isSelectedAnswer?At:vt}let w=g(n),p=w(n);function C(_,T){if(!_[3]&&!_[1].isSelectedAnswer)return St;if(!_[5]&&_[1].isCorrectAnswer&&_[1].isSubmittedAnswer)return Mt;if(!_[5]&&_[1].isCorrectAnswer&&!_[1].isSubmittedAnswer&&_[3])return qt;if(!_[5]&&_[1].isSubmittedAnswer)return Lt;if(_[5]&&_[1].isSubmittedAnswer)return Ct}let K=C(n),M=K&&K(n),L=!n[5]&&n[0].hint&&(n[3]||n[1].isSelectedAnswer)&&je(n);return{c(){e=d("div"),b.c(),t=S(),p.c(),s=S(),i=d("div"),M&&M.c(),o=S(),c=d("div"),L&&L.c(),f(i,"class","col-1 ps-1"),f(e,"id",l="answer"+n[0].id),f(e,"class",r="row border-start border-3 m-1 pt-2 "+n[6]+" svelte-12xdzqf"),ie(e,"bg-light",n[5]||!n[3]&&!n[1].isSelectedAnswer&&!n[1].isSubmittedAnswer||n[3]&&!n[1].isSubmittedAnswer&&!n[1].isCorrectAnswer),ie(e,"text-bg-success",!n[7]&&!n[5]&&n[3]&&n[1].isCorrectAnswer),ie(e,"text-bg-danger",!n[7]&&!n[5]&&n[1].isSelectedAnswer&&!n[1].isCorrectAnswer),ie(e,"bg-cancelled",n[7]),f(c,"class","row ms-1 mb-2 me-1")},m(_,T){y(_,e,T),b.m(e,null),m(e,t),p.m(e,null),m(e,s),m(e,i),M&&M.m(i,null),y(_,o,T),y(_,c,T),L&&L.m(c,null)},p(_,[T]){u===(u=a(_))&&b?b.p(_,T):(b.d(1),b=u(_),b&&(b.c(),b.m(e,t))),w===(w=g(_))&&p?p.p(_,T):(p.d(1),p=w(_),p&&(p.c(),p.m(e,s))),K===(K=C(_))&&M?M.p(_,T):(M&&M.d(1),M=K&&K(_),M&&(M.c(),M.m(i,null))),T&1&&l!==(l="answer"+_[0].id)&&f(e,"id",l),T&64&&r!==(r="row border-start border-3 m-1 pt-2 "+_[6]+" svelte-12xdzqf")&&f(e,"class",r),T&106&&ie(e,"bg-light",_[5]||!_[3]&&!_[1].isSelectedAnswer&&!_[1].isSubmittedAnswer||_[3]&&!_[1].isSubmittedAnswer&&!_[1].isCorrectAnswer),T&234&&ie(e,"text-bg-success",!_[7]&&!_[5]&&_[3]&&_[1].isCorrectAnswer),T&226&&ie(e,"text-bg-danger",!_[7]&&!_[5]&&_[1].isSelectedAnswer&&!_[1].isCorrectAnswer),T&192&&ie(e,"bg-cancelled",_[7]),!_[5]&&_[0].hint&&(_[3]||_[1].isSelectedAnswer)?L?L.p(_,T):(L=je(_),L.c(),L.m(c,null)):L&&(L.d(1),L=null)},i:I,o:I,d(_){_&&(v(e),v(o),v(c)),b.d(),p.d(),M&&M.d(),L&&L.d()}}}function Kt(n,e,t){let{answer:s}=e,{answerContext:i}=e,{badgeText:l}=e,{questionIsAnswered:r}=e,{submitAnswer:o}=e,{examMode:c}=e;var a,u;const b=()=>o(s.id),g=()=>o(s.id),w=()=>t(7,u=!u);return n.$$set=p=>{"answer"in p&&t(0,s=p.answer),"answerContext"in p&&t(1,i=p.answerContext),"badgeText"in p&&t(2,l=p.badgeText),"questionIsAnswered"in p&&t(3,r=p.questionIsAnswered),"submitAnswer"in p&&t(4,o=p.submitAnswer),"examMode"in p&&t(5,c=p.examMode)},n.$$.update=()=>{n.$$.dirty&43&&s&&(t(7,u=!1),t(6,a="border-secondary"),c||(r?i.isCorrectAnswer?t(6,a="border-success"):i.isSubmittedAnswer&&t(6,a="border-danger"):i.isSelectedAnswer&&t(6,a="border-danger")))},[s,i,l,r,o,c,a,u,b,g,w]}class Tt extends de{constructor(e){super(),me(this,e,Kt,Et,re,{answer:0,answerContext:1,badgeText:2,questionIsAnswered:3,submitAnswer:4,examMode:5})}}function Ot(n){let e,t,s,i,l;return{c(){e=d("div"),t=d("div"),s=d("button"),s.textContent="Show answer",f(s,"type","button"),f(s,"class","btn btn-warning btn-sm w-100"),f(t,"class","col-md"),f(e,"class","row")},m(r,o){y(r,e,o),m(e,t),m(t,s),i||(l=P(s,"click",R(n[4])),i=!0)},p:I,d(r){r&&v(e),i=!1,l()}}}function Ht(n){let e,t,s=J.sanitize(n[0].text)+"",i,l,r=!n[1]&&Ne(n);return{c(){e=d("div"),t=d("p"),i=S(),r&&r.c(),l=te(),f(t,"class","p-1"),f(e,"class","row border-light border-start border-3 m-1 p-2")},m(o,c){y(o,e,c),m(e,t),t.innerHTML=s,y(o,i,c),r&&r.m(o,c),y(o,l,c)},p(o,c){c&1&&s!==(s=J.sanitize(o[0].text)+"")&&(t.innerHTML=s),o[1]?r&&(r.d(1),r=null):r?r.p(o,c):(r=Ne(o),r.c(),r.m(l.parentNode,l))},d(o){o&&(v(e),v(i),v(l)),r&&r.d(o)}}}function Ne(n){let e,t,s,i,l,r,o,c;return{c(){e=d("div"),t=d("div"),s=d("button"),s.textContent="Ask me again",i=S(),l=d("div"),r=d("button"),r.textContent="I got it!",f(s,"type","button"),f(s,"class","btn btn-danger btn-sm w-100"),f(t,"class","col-md-6 mb-1"),f(r,"type","button"),f(r,"class","btn btn-success btn-sm w-100"),f(l,"class","col-md-6 mb-1"),f(e,"class","row")},m(a,u){y(a,e,u),m(e,t),m(t,s),m(e,i),m(e,l),m(l,r),o||(c=[P(s,"click",R(n[5])),P(r,"click",R(n[6]))],o=!0)},p:I,d(a){a&&v(e),o=!1,Me(c)}}}function zt(n){let e;function t(l,r){return l[3]?Ht:Ot}let s=t(n),i=s(n);return{c(){i.c(),e=te()},m(l,r){i.m(l,r),y(l,e,r)},p(l,[r]){s===(s=t(l))&&i?i.p(l,r):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},i:I,o:I,d(l){l&&v(e),i.d(l)}}}function Dt(n,e,t){let{answer:s}=e,{hasAnswer:i}=e,{submitAnswer:l}=e;var r=!1;function o(){t(3,r=!r)}const c=()=>l(),a=()=>l(s.id);return n.$$set=u=>{"answer"in u&&t(0,s=u.answer),"hasAnswer"in u&&t(1,i=u.hasAnswer),"submitAnswer"in u&&t(2,l=u.submitAnswer)},n.$$.update=()=>{n.$$.dirty&2&&(i?t(3,r=!0):t(3,r=!1))},[s,i,l,r,o,c,a]}class It extends de{constructor(e){super(),me(this,e,Dt,zt,re,{answer:0,hasAnswer:1,submitAnswer:2})}}function Pe(n){let e,t,s,i,l,r,o,c;return{c(){e=d("div"),t=d("div"),s=d("button"),s.textContent="Ask me again",i=S(),l=d("div"),r=d("button"),r.textContent="I got it!",f(s,"type","button"),f(s,"class","btn btn-danger btn-sm w-100"),f(t,"class","col-md-6 mb-1"),f(r,"type","button"),f(r,"class","btn btn-success btn-sm w-100"),f(l,"class","col-md-6 mb-1"),f(e,"class","row")},m(a,u){y(a,e,u),m(e,t),m(t,s),m(e,i),m(e,l),m(l,r),o||(c=[P(s,"click",R(n[2])),P(r,"click",R(n[3]))],o=!0)},p:I,d(a){a&&v(e),o=!1,Me(c)}}}function jt(n){let e,t=!n[0]&&Pe(n);return{c(){t&&t.c(),e=te()},m(s,i){t&&t.m(s,i),y(s,e,i)},p(s,[i]){s[0]?t&&(t.d(1),t=null):t?t.p(s,i):(t=Pe(s),t.c(),t.m(e.parentNode,e))},i:I,o:I,d(s){s&&v(e),t&&t.d(s)}}}function Nt(n,e,t){let{hasAnswer:s}=e,{submitAnswer:i}=e;const l=()=>i(),r=()=>i(-1);return n.$$set=o=>{"hasAnswer"in o&&t(0,s=o.hasAnswer),"submitAnswer"in o&&t(1,i=o.submitAnswer)},[s,i,l,r]}class Pt extends de{constructor(e){super(),me(this,e,Nt,jt,re,{hasAnswer:0,submitAnswer:1})}}const Ee=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Ke(n,e,t,s){n.addEventListener?n.addEventListener(e,t,s):n.attachEvent&&n.attachEvent("on".concat(e),t)}function pe(n,e,t,s){n.removeEventListener?n.removeEventListener(e,t,s):n.detachEvent&&n.detachEvent("on".concat(e),t)}function ft(n,e){const t=e.slice(0,e.length-1);for(let s=0;s<t.length;s++)t[s]=n[t[s].toLowerCase()];return t}function at(n){typeof n!="string"&&(n=""),n=n.replace(/\s/g,"");const e=n.split(",");let t=e.lastIndexOf("");for(;t>=0;)e[t-1]+=",",e.splice(t,1),t=e.lastIndexOf("");return e}function Qt(n,e){const t=n.length>=e.length?n:e,s=n.length>=e.length?e:n;let i=!0;for(let l=0;l<t.length;l++)s.indexOf(t[l])===-1&&(i=!1);return i}const ke={backspace:8,"⌫":8,tab:9,clear:12,enter:13,"↩":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":Ee?173:189,"=":Ee?61:187,";":Ee?59:186,"'":222,"[":219,"]":221,"\\":220},Z={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},Oe={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},U={16:!1,18:!1,17:!1,91:!1},j={};for(let n=1;n<20;n++)ke["f".concat(n)]=111+n;let D=[],he=null,ut="all";const ee=new Map,Ae=n=>ke[n.toLowerCase()]||Z[n.toLowerCase()]||n.toUpperCase().charCodeAt(0),Ut=n=>Object.keys(ke).find(e=>ke[e]===n),Bt=n=>Object.keys(Z).find(e=>Z[e]===n);function dt(n){ut=n||"all"}function ye(){return ut||"all"}function Vt(){return D.slice(0)}function Ft(){return D.map(n=>Ut(n)||Bt(n)||String.fromCharCode(n))}function Gt(){const n=[];return Object.keys(j).forEach(e=>{j[e].forEach(t=>{let{key:s,scope:i,mods:l,shortcut:r}=t;n.push({scope:i,shortcut:r,mods:l,keys:s.split("+").map(o=>Ae(o))})})}),n}function Rt(n){const e=n.target||n.srcElement,{tagName:t}=e;let s=!0;const i=t==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(e.type);return(e.isContentEditable||(i||t==="TEXTAREA"||t==="SELECT")&&!e.readOnly)&&(s=!1),s}function Jt(n){return typeof n=="string"&&(n=Ae(n)),D.indexOf(n)!==-1}function Wt(n,e){let t,s;n||(n=ye());for(const i in j)if(Object.prototype.hasOwnProperty.call(j,i))for(t=j[i],s=0;s<t.length;)t[s].scope===n?t.splice(s,1).forEach(r=>{let{element:o}=r;return He(o)}):s++;ye()===n&&dt(e||"all")}function Xt(n){let e=n.keyCode||n.which||n.charCode;const t=D.indexOf(e);if(t>=0&&D.splice(t,1),n.key&&n.key.toLowerCase()==="meta"&&D.splice(0,D.length),(e===93||e===224)&&(e=91),e in U){U[e]=!1;for(const s in Z)Z[s]===e&&(Y[s]=!1)}}function mt(n){if(typeof n>"u")Object.keys(j).forEach(i=>{Array.isArray(j[i])&&j[i].forEach(l=>Ce(l)),delete j[i]}),He(null);else if(Array.isArray(n))n.forEach(i=>{i.key&&Ce(i)});else if(typeof n=="object")n.key&&Ce(n);else if(typeof n=="string"){for(var e=arguments.length,t=new Array(e>1?e-1:0),s=1;s<e;s++)t[s-1]=arguments[s];let[i,l]=t;typeof i=="function"&&(l=i,i=""),Ce({key:n,scope:i,method:l,splitKey:"+"})}}const Ce=n=>{let{key:e,scope:t,method:s,splitKey:i="+"}=n;at(e).forEach(r=>{const o=r.split(i),c=o.length,a=o[c-1],u=a==="*"?"*":Ae(a);if(!j[u])return;t||(t=ye());const b=c>1?ft(Z,o):[],g=[];j[u]=j[u].filter(w=>{const C=(s?w.method===s:!0)&&w.scope===t&&Qt(w.mods,b);return C&&g.push(w.element),!C}),g.forEach(w=>He(w))})};function Qe(n,e,t,s){if(e.element!==s)return;let i;if(e.scope===t||e.scope==="all"){i=e.mods.length>0;for(const l in U)Object.prototype.hasOwnProperty.call(U,l)&&(!U[l]&&e.mods.indexOf(+l)>-1||U[l]&&e.mods.indexOf(+l)===-1)&&(i=!1);(e.mods.length===0&&!U[16]&&!U[18]&&!U[17]&&!U[91]||i||e.shortcut==="*")&&(e.keys=[],e.keys=e.keys.concat(D),e.method(n,e)===!1&&(n.preventDefault?n.preventDefault():n.returnValue=!1,n.stopPropagation&&n.stopPropagation(),n.cancelBubble&&(n.cancelBubble=!0)))}}function Ue(n,e){const t=j["*"];let s=n.keyCode||n.which||n.charCode;if(!Y.filter.call(this,n))return;if((s===93||s===224)&&(s=91),D.indexOf(s)===-1&&s!==229&&D.push(s),["ctrlKey","altKey","shiftKey","metaKey"].forEach(o=>{const c=Oe[o];n[o]&&D.indexOf(c)===-1?D.push(c):!n[o]&&D.indexOf(c)>-1?D.splice(D.indexOf(c),1):o==="metaKey"&&n[o]&&D.length===3&&(n.ctrlKey||n.shiftKey||n.altKey||(D=D.slice(D.indexOf(c))))}),s in U){U[s]=!0;for(const o in Z)Z[o]===s&&(Y[o]=!0);if(!t)return}for(const o in U)Object.prototype.hasOwnProperty.call(U,o)&&(U[o]=n[Oe[o]]);n.getModifierState&&!(n.altKey&&!n.ctrlKey)&&n.getModifierState("AltGraph")&&(D.indexOf(17)===-1&&D.push(17),D.indexOf(18)===-1&&D.push(18),U[17]=!0,U[18]=!0);const i=ye();if(t)for(let o=0;o<t.length;o++)t[o].scope===i&&(n.type==="keydown"&&t[o].keydown||n.type==="keyup"&&t[o].keyup)&&Qe(n,t[o],i,e);if(!(s in j))return;const l=j[s],r=l.length;for(let o=0;o<r;o++)if((n.type==="keydown"&&l[o].keydown||n.type==="keyup"&&l[o].keyup)&&l[o].key){const c=l[o],{splitKey:a}=c,u=c.key.split(a),b=[];for(let g=0;g<u.length;g++)b.push(Ae(u[g]));b.sort().join("")===D.sort().join("")&&Qe(n,c,i,e)}}function Y(n,e,t){D=[];const s=at(n);let i=[],l="all",r=document,o=0,c=!1,a=!0,u="+",b=!1,g=!1;for(t===void 0&&typeof e=="function"&&(t=e),Object.prototype.toString.call(e)==="[object Object]"&&(e.scope&&(l=e.scope),e.element&&(r=e.element),e.keyup&&(c=e.keyup),e.keydown!==void 0&&(a=e.keydown),e.capture!==void 0&&(b=e.capture),typeof e.splitKey=="string"&&(u=e.splitKey),e.single===!0&&(g=!0)),typeof e=="string"&&(l=e),g&&mt(n,l);o<s.length;o++)n=s[o].split(u),i=[],n.length>1&&(i=ft(Z,n)),n=n[n.length-1],n=n==="*"?"*":Ae(n),n in j||(j[n]=[]),j[n].push({keyup:c,keydown:a,scope:l,mods:i,shortcut:s[o],method:t,key:s[o],splitKey:u,element:r});if(typeof r<"u"&&window){if(!ee.has(r)){const w=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;return Ue(C,r)},p=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;Ue(C,r),Xt(C)};ee.set(r,{keydownListener:w,keyupListenr:p,capture:b}),Ke(r,"keydown",w,b),Ke(r,"keyup",p,b)}if(!he){const w=()=>{D=[]};he={listener:w,capture:b},Ke(window,"focus",w,b)}}}function Yt(n){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"all";Object.keys(j).forEach(t=>{j[t].filter(i=>i.scope===e&&i.shortcut===n).forEach(i=>{i&&i.method&&i.method()})})}function He(n){const e=Object.values(j).flat();if(e.findIndex(s=>{let{element:i}=s;return i===n})<0){const{keydownListener:s,keyupListenr:i,capture:l}=ee.get(n)||{};s&&i&&(pe(n,"keyup",i,l),pe(n,"keydown",s,l),ee.delete(n))}if((e.length<=0||ee.size<=0)&&(Object.keys(ee).forEach(i=>{const{keydownListener:l,keyupListenr:r,capture:o}=ee.get(i)||{};l&&r&&(pe(i,"keyup",r,o),pe(i,"keydown",l,o),ee.delete(i))}),ee.clear(),Object.keys(j).forEach(i=>delete j[i]),he)){const{listener:i,capture:l}=he;pe(window,"focus",i,l),he=null}}const Te={getPressedKeyString:Ft,setScope:dt,getScope:ye,deleteScope:Wt,getPressedKeyCodes:Vt,getAllKeyCodes:Gt,isPressed:Jt,filter:Rt,trigger:Yt,unbind:mt,keyMap:ke,modifier:Z,modifierMap:Oe};for(const n in Te)Object.prototype.hasOwnProperty.call(Te,n)&&(Y[n]=Te[n]);if(typeof window<"u"){const n=window.hotkeys;Y.noConflict=e=>(e&&window.hotkeys===Y&&(window.hotkeys=n),Y),window.hotkeys=Y}function Be(n,e,t){const s=n.slice();return s[7]=e[t],s}function Zt(n){let e,t,s,i,l,r,o,c,a;return{c(){e=d("div"),t=d("p"),s=d("button"),i=S(),l=d("div"),r=d("img"),f(s,"type","button"),f(s,"class","btn-close"),f(t,"class","bg-white text-end"),f(r,"class","img-fluid border border-5 border-white"),Le(r.src,o="/"+n[2].path)||f(r,"src",o),f(r,"alt",""),f(l,"class","text-center"),f(e,"class","img-fullscreen svelte-z0la5k")},m(u,b){y(u,e,b),m(e,t),m(t,s),m(e,i),m(e,l),m(l,r),c||(a=[P(s,"click",R(n[5])),P(e,"click",n[3])],c=!0)},p(u,b){b&4&&!Le(r.src,o="/"+u[2].path)&&f(r,"src",o)},d(u){u&&v(e),c=!1,Me(a)}}}function xt(n){let e,t,s=[],i=new Map,l=le(n[0]);const r=o=>o[7].id;for(let o=0;o<l.length;o+=1){let c=Be(n,l,o),a=r(c);i.set(a,s[o]=Ve(a,c))}return{c(){e=d("div"),t=d("div");for(let o=0;o<s.length;o+=1)s[o].c();f(t,"class","row row-cols-1 row-cols-sm-3 g-4"),f(e,"class","col-lg")},m(o,c){y(o,e,c),m(e,t);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(t,null)},p(o,c){c&9&&(l=le(o[0]),s=ct(s,c,r,1,o,l,i,t,bt,Ve,null,Be))},d(o){o&&v(e);for(let c=0;c<s.length;c+=1)s[c].d()}}}function Ve(n,e){let t,s,i,l,r,o,c;function a(){return e[4](e[7])}return{key:n,first:null,c(){t=d("div"),s=d("div"),i=d("img"),r=S(),Le(i.src,l="/"+e[7].path)||f(i,"src",l),f(i,"class","card-img-top"),f(i,"alt",""),f(s,"class","card"),ge(s,"max-width","18rem"),ge(s,"cursor","pointer"),f(t,"class","col"),this.first=t},m(u,b){y(u,t,b),m(t,s),m(s,i),m(t,r),o||(c=P(i,"click",a),o=!0)},p(u,b){e=u,b&1&&!Le(i.src,l="/"+e[7].path)&&f(i,"src",l)},d(u){u&&v(t),o=!1,c()}}}function $t(n){let e;function t(l,r){return l[1]?Zt:xt}let s=t(n),i=s(n);return{c(){i.c(),e=te()},m(l,r){i.m(l,r),y(l,e,r)},p(l,[r]){s===(s=t(l))&&i?i.p(l,r):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},i:I,o:I,d(l){l&&v(e),i.d(l)}}}function en(n,e,t){let{images:s=[]}=e;var i=!1,l;ot(()=>{Y("esc","images",function(u,b){i&&t(1,i=!1)})});var r;function o(u){r&&r.cancel(),r=pt(()=>{t(1,i=!i),t(2,l=s.find(b=>b.id===u))},100,{maxWait:200}),r()}const c=u=>o(u.id),a=()=>t(1,i=!i);return n.$$set=u=>{"images"in u&&t(0,s=u.images)},n.$$.update=()=>{n.$$.dirty&2&&(i?Y.setScope("images"):Y.setScope("questions"))},[s,i,l,o,c,a]}class tn extends de{constructor(e){super(),me(this,e,en,$t,re,{images:0})}}function Fe(n,e,t){const s=n.slice();return s[12]=e[t],s}function Ge(n,e,t){const s=n.slice();return s[12]=e[t],s}function Re(n){let e,t,s,i=n[12].name+"",l,r,o,c,a,u,b;function g(){return n[7](n[12])}return{c(){e=d("div"),t=d("div"),s=d("a"),l=ve(i),o=S(),c=d("div"),a=d("button"),a.textContent="Add",f(s,"href",r="/decks/"+n[12].id),f(s,"class","link-dark"),f(t,"class","col-9 text-overflow svelte-1gfmo48"),f(a,"class","btn btn-sm btn-primary float-end"),f(c,"class","col-3 d-grid gap-4"),f(e,"class","row mb-1")},m(w,p){y(w,e,p),m(e,t),m(t,s),m(s,l),m(e,o),m(e,c),m(c,a),u||(b=P(a,"click",R(g)),u=!0)},p(w,p){n=w,p&2&&i!==(i=n[12].name+"")&&qe(l,i),p&2&&r!==(r="/decks/"+n[12].id)&&f(s,"href",r)},d(w){w&&v(e),u=!1,b()}}}function Je(n){let e;return{c(){e=d("hr")},m(t,s){y(t,e,s)},d(t){t&&v(e)}}}function We(n){let e,t,s,i=n[12].name+"",l,r,o,c,a,u,b;function g(){return n[8](n[12])}return{c(){e=d("div"),t=d("div"),s=d("a"),l=ve(i),o=S(),c=d("div"),a=d("button"),a.textContent="Remove",f(s,"href",r="/decks/"+n[12].id),f(s,"class","link-dark"),f(t,"class","col-9 text-overflow svelte-1gfmo48"),f(a,"class","btn btn-sm btn-outline-secondary float-end"),f(c,"class","col-3 d-grid gap-4"),f(e,"class","row mb-1")},m(w,p){y(w,e,p),m(e,t),m(t,s),m(s,l),m(e,o),m(e,c),m(c,a),u||(b=P(a,"click",R(g)),u=!0)},p(w,p){n=w,p&1&&i!==(i=n[12].name+"")&&qe(l,i),p&1&&r!==(r="/decks/"+n[12].id)&&f(s,"href",r)},d(w){w&&v(e),u=!1,b()}}}function Xe(n){let e;return{c(){e=d("p"),e.textContent="You don't have any decks yet."},m(t,s){y(t,e,s)},d(t){t&&v(e)}}}function nn(n){let e,t,s,i,l,r,o,c,a,u,b,g,w,p,C,K,M,L,_,T,x,$,h=le(n[1]),O=[];for(let k=0;k<h.length;k+=1)O[k]=Re(Ge(n,h,k));let N=n[1].length>0&&n[0].length>0&&Je(),W=le(n[0]),E=[];for(let k=0;k<W.length;k+=1)E[k]=We(Fe(n,W,k));let z=n[1].length===0&&n[0].length===0&&Xe();return{c(){e=d("button"),e.innerHTML='<i class="bi bi-collection"></i> Add to deck',t=S(),s=d("div"),i=d("div"),i.innerHTML='<h5 id="offcanvasAddToDeckLabel">Add question to deck</h5> <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>',l=S(),r=d("div");for(let k=0;k<O.length;k+=1)O[k].c();o=S(),N&&N.c(),c=S();for(let k=0;k<E.length;k+=1)E[k].c();a=S(),z&&z.c(),u=S(),b=d("hr"),g=S(),w=d("div"),p=d("div"),C=d("p"),C.textContent="Create new deck:",K=S(),M=d("div"),L=d("input"),_=S(),T=d("button"),T.textContent="Create deck and add question",f(e,"class","btn btn-outline-secondary btn-sm"),f(e,"type","button"),f(e,"data-bs-toggle","offcanvas"),f(e,"data-bs-target","#offcanvasAddToDeck"),f(e,"aria-controls","offcanvasAddToDeck"),f(i,"class","offcanvas-header"),f(L,"type","text"),f(L,"class","form-control"),f(L,"id","name"),f(L,"name","name"),f(L,"placeholder","My new deck ..."),f(M,"class","mb-3"),f(T,"class","btn btn-sm btn-primary"),f(p,"class","col"),f(w,"class","row"),f(r,"class","offcanvas-body"),f(s,"class","offcanvas offcanvas-end"),f(s,"tabindex","-1"),f(s,"id","offcanvasAddToDeck"),f(s,"aria-labelledby","offcanvasAddToDeckLabel")},m(k,H){y(k,e,H),y(k,t,H),y(k,s,H),m(s,i),m(s,l),m(s,r);for(let A=0;A<O.length;A+=1)O[A]&&O[A].m(r,null);m(r,o),N&&N.m(r,null),m(r,c);for(let A=0;A<E.length;A+=1)E[A]&&E[A].m(r,null);m(r,a),z&&z.m(r,null),m(r,u),m(r,b),m(r,g),m(r,w),m(w,p),m(p,C),m(p,K),m(p,M),m(M,L),De(L,n[2]),m(p,_),m(p,T),x||($=[P(L,"input",n[9]),P(T,"click",R(n[10]))],x=!0)},p(k,[H]){if(H&10){h=le(k[1]);let A;for(A=0;A<h.length;A+=1){const ne=Ge(k,h,A);O[A]?O[A].p(ne,H):(O[A]=Re(ne),O[A].c(),O[A].m(r,o))}for(;A<O.length;A+=1)O[A].d(1);O.length=h.length}if(k[1].length>0&&k[0].length>0?N||(N=Je(),N.c(),N.m(r,c)):N&&(N.d(1),N=null),H&17){W=le(k[0]);let A;for(A=0;A<W.length;A+=1){const ne=Fe(k,W,A);E[A]?E[A].p(ne,H):(E[A]=We(ne),E[A].c(),E[A].m(r,a))}for(;A<E.length;A+=1)E[A].d(1);E.length=W.length}k[1].length===0&&k[0].length===0?z||(z=Xe(),z.c(),z.m(r,u)):z&&(z.d(1),z=null),H&4&&L.value!==k[2]&&De(L,k[2])},i:I,o:I,d(k){k&&(v(e),v(t),v(s)),Ie(O,k),N&&N.d(),Ie(E,k),z&&z.d(),x=!1,Me($)}}}function sn(n,e,t){let{questionId:s}=e,i=[],l=[],r="";ot(()=>{const C=document.getElementById("offcanvasAddToDeck");C.addEventListener("show.bs.offcanvas",K=>{o()}),C.addEventListener("hidden.bs.offcanvas",K=>{t(0,i=[]),t(1,l=[])})});function o(){axios.get("/api/decks/withquestionids").then(function(C){var K=C.data;K.forEach(M=>{M.questions.some(L=>L.id===s)?t(0,i=[...i,{id:M.id,name:M.name}]):t(1,l=[...l,{id:M.id,name:M.name}])})}).catch(function(C){console.log(C),alert(C)})}function c(C){axios.post("/api/decks/"+C+"/addquestion",{question_id:s}).then(function(K){const M=l.find(L=>L.id===C);t(0,i=[...i,M]),t(1,l=l.filter(L=>L.id!==C))}).catch(function(K){alert(K)})}function a(C){axios.post("/api/decks/"+C+"/removequestion",{question_id:s}).then(function(K){const M=i.find(L=>L.id===C);t(1,l=[...l,M]),t(0,i=i.filter(L=>L.id!==C))}).catch(function(K){alert(K)})}function u(){r&&axios.post("/api/decks",{name:r}).then(function(C){const K=C.data;t(1,l=[...l,K]),c(K.id),t(2,r="")}).catch(function(C){alert(C)})}const b=C=>c(C.id),g=C=>a(C.id);function w(){r=this.value,t(2,r)}const p=()=>u();return n.$$set=C=>{"questionId"in C&&t(6,s=C.questionId)},[i,l,r,c,a,u,s,b,g,w,p]}class ln extends de{constructor(e){super(),me(this,e,sn,nn,re,{questionId:6})}}function Ye(n,e,t){const s=n.slice();return s[20]=e[t],s[21]=e,s[22]=t,s}function rn(n){let e;return{c(){e=d("p"),e.textContent="Loading ..."},m(t,s){y(t,e,s)},p:I,i:I,o:I,d(t){t&&v(e)}}}function on(n){let e,t,s,i,l;const r=[fn,cn],o=[];function c(u,b){return u[7]?0:1}e=c(n),t=o[e]=r[e](n);let a=!n[1].isAnswered&&!n[3]&&n[0].type!=="card"&&rt(n);return{c(){t.c(),s=S(),a&&a.c(),i=te()},m(u,b){o[e].m(u,b),y(u,s,b),a&&a.m(u,b),y(u,i,b),l=!0},p(u,b){let g=e;e=c(u),e===g?o[e].p(u,b):(ce(),B(o[g],1,1,()=>{o[g]=null}),oe(),t=o[e],t?t.p(u,b):(t=o[e]=r[e](u),t.c()),Q(t,1),t.m(s.parentNode,s)),!u[1].isAnswered&&!u[3]&&u[0].type!=="card"?a?a.p(u,b):(a=rt(u),a.c(),a.m(i.parentNode,i)):a&&(a.d(1),a=null)},i(u){l||(Q(t),l=!0)},o(u){B(t),l=!1},d(u){u&&(v(s),v(i)),o[e].d(u),a&&a.d(u)}}}function cn(n){let e,t,s,i,l,r,o,c,a,u,b,g,w,p,C=n[0].id,K,M,L,_,T,x,$,h,O,N,W,E=n[0].is_invalid&&Ze(),z=n[0].needs_review&&xe(),k=n[0].text&&$e(n),H=n[0].images&&n[0].images.length>0&&et(n),A=!n[3]&&n[0].hint&&tt(n);const ne=[_n,mn,dn],se=[];function ze(q,V){return q[0].type==="mc"?0:q[0].answers.length===0?1:2}c=ze(n),a=se[c]=ne[c](n);let F=!n[3]&&n[1].isAnswered&&n[0].comment&&st(n),G=n[1].isAnswered&&it(n),X=lt(n);return{c(){e=d("div"),E&&E.c(),t=S(),z&&z.c(),s=S(),i=d("div"),k&&k.c(),l=S(),H&&H.c(),r=S(),A&&A.c(),o=S(),a.c(),u=S(),F&&F.c(),b=S(),g=d("div"),w=d("div"),G&&G.c(),p=S(),X.c(),K=S(),M=d("button"),M.innerHTML='<i class="bi bi-pencil"></i> Edit',L=S(),_=d("a"),T=ve("Link "),x=d("i"),f(i,"class","row border-start border-3 border-dark m-1 mb-3 pt-2"),f(M,"type","button"),f(M,"class","btn btn-outline-secondary btn-sm ms-1"),f(x,"class","bi bi-box-arrow-up-right"),f(_,"class","btn btn-sm btn-outline-secondary ms-1"),f(_,"href",$="/questions/"+n[0].id),f(_,"target","_blank"),f(_,"role","button"),f(w,"class","d-flex justify-content-end"),f(g,"class","row mt-1 mb-1 pt-2"),f(e,"id",h="question"+n[0].id)},m(q,V){y(q,e,V),E&&E.m(e,null),m(e,t),z&&z.m(e,null),m(e,s),m(e,i),k&&k.m(i,null),m(i,l),H&&H.m(i,null),m(e,r),A&&A.m(e,null),m(e,o),se[c].m(e,null),m(e,u),F&&F.m(e,null),m(e,b),m(e,g),m(g,w),G&&G.m(w,null),m(w,p),X.m(w,null),m(w,K),m(w,M),m(w,L),m(w,_),m(_,T),m(_,x),O=!0,N||(W=P(M,"click",R(n[9])),N=!0)},p(q,V){q[0].is_invalid?E||(E=Ze(),E.c(),E.m(e,t)):E&&(E.d(1),E=null),q[0].needs_review?z||(z=xe(),z.c(),z.m(e,s)):z&&(z.d(1),z=null),q[0].text?k?k.p(q,V):(k=$e(q),k.c(),k.m(i,l)):k&&(k.d(1),k=null),q[0].images&&q[0].images.length>0?H?(H.p(q,V),V&1&&Q(H,1)):(H=et(q),H.c(),Q(H,1),H.m(i,null)):H&&(ce(),B(H,1,1,()=>{H=null}),oe()),!q[3]&&q[0].hint?A?A.p(q,V):(A=tt(q),A.c(),A.m(e,o)):A&&(A.d(1),A=null);let Se=c;c=ze(q),c===Se?se[c].p(q,V):(ce(),B(se[Se],1,1,()=>{se[Se]=null}),oe(),a=se[c],a?a.p(q,V):(a=se[c]=ne[c](q),a.c()),Q(a,1),a.m(e,u)),!q[3]&&q[1].isAnswered&&q[0].comment?F?F.p(q,V):(F=st(q),F.c(),F.m(e,b)):F&&(F.d(1),F=null),q[1].isAnswered?G?G.p(q,V):(G=it(q),G.c(),G.m(w,p)):G&&(G.d(1),G=null),V&1&&re(C,C=q[0].id)?(ce(),B(X,1,1,I),oe(),X=lt(q),X.c(),Q(X,1),X.m(w,K)):X.p(q,V),(!O||V&1&&$!==($="/questions/"+q[0].id))&&f(_,"href",$),(!O||V&1&&h!==(h="question"+q[0].id))&&f(e,"id",h)},i(q){O||(Q(H),Q(a),Q(X),O=!0)},o(q){B(H),B(a),B(X),O=!1},d(q){q&&v(e),E&&E.d(),z&&z.d(),k&&k.d(),H&&H.d(),A&&A.d(),se[c].d(),F&&F.d(),G&&G.d(),X.d(q),N=!1,W()}}}function fn(n){let e,t,s,i;function l(o){n[12](o)}let r={toggleEditor:n[9]};return n[0]!==void 0&&(r.question=n[0]),t=new ht({props:r}),fe.push(()=>ae(t,"question",l)),{c(){e=d("div"),_e(t.$$.fragment),f(e,"class","pt-1 pb-3 border-dark"),ge(e,"border-top","dotted"),ge(e,"border-bottom","dotted"),ge(e,"border-width","1px")},m(o,c){y(o,e,c),be(t,e,null),i=!0},p(o,c){const a={};!s&&c&1&&(s=!0,a.question=o[0],ue(()=>s=!1)),t.$set(a)},i(o){i||(Q(t.$$.fragment,o),i=!0)},o(o){B(t.$$.fragment,o),i=!1},d(o){o&&v(e),we(t)}}}function Ze(n){let e;return{c(){e=d("div"),e.innerHTML='<div class="col"><div class="alert alert-light" role="alert"><i class="bi bi-cone-striped"></i> <strong>Question is marked invalid</strong> and safe to skip!</div></div>',f(e,"class","row")},m(t,s){y(t,e,s)},d(t){t&&v(e)}}}function xe(n){let e;return{c(){e=d("div"),e.innerHTML='<div class="col"><div class="alert alert-light" role="alert"><i class="bi bi-eraser-fill"></i> <strong>Question needs review</strong> - Please review the question and answer choices and make sure they are correct and clear. Afterwards, remove the &quot;Needs review&quot; flag.</div></div>',f(e,"class","row")},m(t,s){y(t,e,s)},d(t){t&&v(e)}}}function $e(n){let e,t,s=J.sanitize(n[0].text)+"";return{c(){e=d("div"),t=d("p"),f(t,"id","questionText"),f(e,"class","col-lg")},m(i,l){y(i,e,l),m(e,t),t.innerHTML=s},p(i,l){l&1&&s!==(s=J.sanitize(i[0].text)+"")&&(t.innerHTML=s)},d(i){i&&v(e)}}}function et(n){let e,t,s;function i(r){n[13](r)}let l={};return n[0].images!==void 0&&(l.images=n[0].images),e=new tn({props:l}),fe.push(()=>ae(e,"images",i)),{c(){_e(e.$$.fragment)},m(r,o){be(e,r,o),s=!0},p(r,o){const c={};!t&&o&1&&(t=!0,c.images=r[0].images,ue(()=>t=!1)),e.$set(c)},i(r){s||(Q(e.$$.fragment,r),s=!0)},o(r){B(e.$$.fragment,r),s=!1},d(r){we(e,r)}}}function tt(n){let e;function t(l,r){return l[8]?un:an}let s=t(n),i=s(n);return{c(){i.c(),e=te()},m(l,r){i.m(l,r),y(l,e,r)},p(l,r){s===(s=t(l))&&i?i.p(l,r):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},d(l){l&&v(e),i.d(l)}}}function an(n){let e,t,s;return{c(){e=d("button"),e.innerHTML='<i class="bi bi-question"></i> Show hint',f(e,"type","button"),f(e,"class","btn btn-outline-secondary btn-sm mb-3")},m(i,l){y(i,e,l),t||(s=P(e,"click",R(n[14])),t=!0)},p:I,d(i){i&&v(e),t=!1,s()}}}function un(n){let e,t,s=J.sanitize(n[0].hint)+"";return{c(){e=d("div"),t=d("p"),f(e,"class","row border-start border-3 border-secondary-subtle m-1 mt-3 mb-3")},m(i,l){y(i,e,l),m(e,t),t.innerHTML=s},p(i,l){l&1&&s!==(s=J.sanitize(i[0].hint)+"")&&(t.innerHTML=s)},d(i){i&&v(e)}}}function dn(n){let e,t,s;function i(r){n[18](r)}let l={submitAnswer:n[5],hasAnswer:!!n[4]};return n[0].answers[0]!==void 0&&(l.answer=n[0].answers[0]),e=new It({props:l}),fe.push(()=>ae(e,"answer",i)),{c(){_e(e.$$.fragment)},m(r,o){be(e,r,o),s=!0},p(r,o){const c={};o&32&&(c.submitAnswer=r[5]),o&16&&(c.hasAnswer=!!r[4]),!t&&o&1&&(t=!0,c.answer=r[0].answers[0],ue(()=>t=!1)),e.$set(c)},i(r){s||(Q(e.$$.fragment,r),s=!0)},o(r){B(e.$$.fragment,r),s=!1},d(r){we(e,r)}}}function mn(n){let e,t;return e=new Pt({props:{submitAnswer:n[5],hasAnswer:!!n[4]}}),{c(){_e(e.$$.fragment)},m(s,i){be(e,s,i),t=!0},p(s,i){const l={};i&32&&(l.submitAnswer=s[5]),i&16&&(l.hasAnswer=!!s[4]),e.$set(l)},i(s){t||(Q(e.$$.fragment,s),t=!0)},o(s){B(e.$$.fragment,s),t=!1},d(s){we(e,s)}}}function _n(n){let e=[],t=new Map,s,i,l=le(n[0].answers);const r=o=>o[20].id;for(let o=0;o<l.length;o+=1){let c=Ye(n,l,o),a=r(c);t.set(a,e[o]=nt(a,c))}return{c(){for(let o=0;o<e.length;o+=1)e[o].c();s=te()},m(o,c){for(let a=0;a<e.length;a+=1)e[a]&&e[a].m(o,c);y(o,s,c),i=!0},p(o,c){c&43&&(l=le(o[0].answers),ce(),e=ct(e,c,r,1,o,l,t,s.parentNode,wt,nt,s,Ye),oe())},i(o){if(!i){for(let c=0;c<l.length;c+=1)Q(e[c]);i=!0}},o(o){for(let c=0;c<e.length;c+=1)B(e[c]);i=!1},d(o){o&&v(s);for(let c=0;c<e.length;c+=1)e[c].d(o)}}}function nt(n,e){let t,s,i,l,r,o;function c(g){e[15](g,e[20],e[21],e[22])}function a(g){e[16](g,e[20])}function u(g){e[17](g)}let b={submitAnswer:e[5],questionIsAnswered:e[1].isAnswered,badgeText:"ABCDEFGHIJKLMN".charAt(e[22])};return e[20]!==void 0&&(b.answer=e[20]),e[1].answerContext[e[20].id]!==void 0&&(b.answerContext=e[1].answerContext[e[20].id]),e[3]!==void 0&&(b.examMode=e[3]),s=new Tt({props:b}),fe.push(()=>ae(s,"answer",c)),fe.push(()=>ae(s,"answerContext",a)),fe.push(()=>ae(s,"examMode",u)),{key:n,first:null,c(){t=te(),_e(s.$$.fragment),this.first=t},m(g,w){y(g,t,w),be(s,g,w),o=!0},p(g,w){e=g;const p={};w&32&&(p.submitAnswer=e[5]),w&2&&(p.questionIsAnswered=e[1].isAnswered),w&1&&(p.badgeText="ABCDEFGHIJKLMN".charAt(e[22])),!i&&w&1&&(i=!0,p.answer=e[20],ue(()=>i=!1)),!l&&w&3&&(l=!0,p.answerContext=e[1].answerContext[e[20].id],ue(()=>l=!1)),!r&&w&8&&(r=!0,p.examMode=e[3],ue(()=>r=!1)),s.$set(p)},i(g){o||(Q(s.$$.fragment,g),o=!0)},o(g){B(s.$$.fragment,g),o=!1},d(g){g&&v(t),we(s,g)}}}function st(n){let e,t,s,i=J.sanitize(n[0].comment)+"";return{c(){e=d("div"),t=d("div"),s=d("div"),f(s,"class","alert alert-light"),f(s,"role","alert"),f(t,"class","col"),f(e,"class","row")},m(l,r){y(l,e,r),m(e,t),m(t,s),s.innerHTML=i},p(l,r){r&1&&i!==(i=J.sanitize(l[0].comment)+"")&&(s.innerHTML=i)},d(l){l&&v(e)}}}function it(n){let e,t,s;return{c(){e=d("button"),e.innerHTML='<i class="bi bi-arrow-counterclockwise"></i> Reset',f(e,"type","button"),f(e,"class","btn btn-outline-secondary btn-sm me-1")},m(i,l){y(i,e,l),t||(s=P(e,"click",R(function(){_t(n[6])&&n[6].apply(this,arguments)})),t=!0)},p(i,l){n=i},d(i){i&&v(e),t=!1,s()}}}function lt(n){let e,t;return e=new ln({props:{questionId:n[0].id}}),{c(){_e(e.$$.fragment)},m(s,i){be(e,s,i),t=!0},p(s,i){const l={};i&1&&(l.questionId=s[0].id),e.$set(l)},i(s){t||(Q(e.$$.fragment,s),t=!0)},o(s){B(e.$$.fragment,s),t=!1},d(s){we(e,s)}}}function rt(n){let e,t,s,i;return{c(){e=d("div"),t=d("button"),t.textContent="→ Show answer",f(t,"type","button"),f(t,"class","btn btn-outline-secondary btn-sm"),f(e,"class","mt-3")},m(l,r){y(l,e,r),m(e,t),s||(i=P(t,"click",R(n[19])),s=!0)},p:I,d(l){l&&v(e),s=!1,i()}}}function bn(n){let e,t,s,i;const l=[on,rn],r=[];function o(c,a){return c[0]?0:1}return e=o(n),t=r[e]=l[e](n),{c(){t.c(),s=te()},m(c,a){r[e].m(c,a),y(c,s,a),i=!0},p(c,[a]){let u=e;e=o(c),e===u?r[e].p(c,a):(ce(),B(r[u],1,1,()=>{r[u]=null}),oe(),t=r[e],t?t.p(c,a):(t=r[e]=l[e](c),t.c()),Q(t,1),t.m(s.parentNode,s))},i(c){i||(Q(t),i=!0)},o(c){B(t),i=!1},d(c){c&&v(s),r[e].d(c)}}}function wn(n){const e=n.target;!e.classList.contains("bg-danger-subtle")&&!e.classList.contains("bg-warning-subtle")&&!e.classList.contains("bg-success-subtle")?e.classList.add("bg-success-subtle"):e.classList.contains("bg-success-subtle")?(e.classList.remove("bg-success-subtle"),e.classList.add("bg-danger-subtle")):e.classList.contains("bg-danger-subtle")?(e.classList.remove("bg-danger-subtle"),e.classList.add("bg-warning-subtle")):e.classList.contains("bg-warning-subtle")&&e.classList.remove("bg-warning-subtle")}function pn(n,e,t){let{question:s}=e,{questionContext:i}=e,{helpUsed:l}=e,{answerChoice:r}=e,{submitAnswer:o}=e,{deleteAnswer:c}=e,{examMode:a}=e,{updateCurrentQuestionData:u}=e,{settingsShuffleAnswers:b}=e;var g=!1,w=i.isAnswered;function p(){const h=!g;h&&u?u().then(()=>{t(7,g=h)}):t(7,g=h)}function C(h){s=h,t(0,s),t(11,b),t(1,i)}function K(h){n.$$.not_equal(s.images,h)&&(s.images=h,t(0,s),t(11,b),t(1,i))}const M=()=>{t(8,w=!0),t(2,l=!0)};function L(h,O,N,W){N[W]=h,t(0,s),t(11,b),t(1,i)}function _(h,O){n.$$.not_equal(i.answerContext[O.id],h)&&(i.answerContext[O.id]=h,t(1,i))}function T(h){a=h,t(3,a)}function x(h){n.$$.not_equal(s.answers[0],h)&&(s.answers[0]=h,t(0,s),t(11,b),t(1,i))}const $=()=>o();return n.$$set=h=>{"question"in h&&t(0,s=h.question),"questionContext"in h&&t(1,i=h.questionContext),"helpUsed"in h&&t(2,l=h.helpUsed),"answerChoice"in h&&t(4,r=h.answerChoice),"submitAnswer"in h&&t(5,o=h.submitAnswer),"deleteAnswer"in h&&t(6,c=h.deleteAnswer),"examMode"in h&&t(3,a=h.examMode),"updateCurrentQuestionData"in h&&t(10,u=h.updateCurrentQuestionData),"settingsShuffleAnswers"in h&&t(11,b=h.settingsShuffleAnswers)},n.$$.update=()=>{n.$$.dirty&2051&&s&&s.type==="mc"&&b&&!Object.values(i.answerContext).some(h=>h.isSelectedAnswer)&&t(0,s.answers=gt.shuffle(s.answers),s),n.$$.dirty&3&&(t(8,w=i.isAnswered),t(2,l=i.isAnswered)),n.$$.dirty&1&&(()=>{var h=document.querySelectorAll("#questionText li");[].map.call(h,function(O){O.addEventListener("click",wn,!1)})})()},[s,i,l,a,r,o,c,g,w,p,u,b,C,K,M,L,_,T,x,$]}class An extends de{constructor(e){super(),me(this,e,pn,bn,re,{question:0,questionContext:1,helpUsed:2,answerChoice:4,submitAnswer:5,deleteAnswer:6,examMode:3,updateCurrentQuestionData:10,settingsShuffleAnswers:11})}}export{An as S,Y as h};
