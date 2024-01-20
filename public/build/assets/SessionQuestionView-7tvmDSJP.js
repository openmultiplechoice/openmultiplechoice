import{S as be,i as pe,s as ae,b as d,g as S,c as f,G as ne,a as k,h as m,n as z,d as v,t as he,j as Le,l as B,p as X,e as ie,r as Se,D as st,K as Ce,v as Ae,q as ze,f as Te,A as U,B as le,z as P,E as oe,k as re,m as ce,o as ge,x as we,y as fe,C as ke,M as ft}from"./index-CfkxbGBF.js";import{e as se,u as at,d as ut}from"./each-11-GcuRw.js";import{p as J,d as dt}from"./purify.es-WTxncMLc.js";import{Q as _t}from"./QuestionForm-JHzPKPoh.js";function mt(t){let e,n,s;return{c(){e=d("div"),n=d("p"),s=he(t[1]),f(n,"class","badge text-dark"),f(e,"class","col-1 border-start-3")},m(i,o){k(i,e,o),m(e,n),m(n,s)},p(i,o){o&2&&Le(s,i[1])},d(i){i&&v(e)}}}function bt(t){let e,n,s,i,o;return{c(){e=d("div"),n=d("p"),s=he(t[1]),f(n,"class","badge text-dark"),f(e,"class","col-1 border-start-3 cursor-pointer svelte-12xdzqf")},m(l,r){k(l,e,r),m(e,n),m(n,s),i||(o=B(e,"click",t[9]),i=!0)},p(l,r){r&2&&Le(s,l[1])},d(l){l&&v(e),i=!1,o()}}}function pt(t){let e,n,s=J.sanitize(t[0].text)+"";return{c(){e=d("div"),n=d("p"),f(n,"class","p-1"),f(e,"class","col-10")},m(i,o){k(i,e,o),m(e,n),n.innerHTML=s},p(i,o){o&1&&s!==(s=J.sanitize(i[0].text)+"")&&(n.innerHTML=s)},d(i){i&&v(e)}}}function ht(t){let e,n,s=J.sanitize(t[0].text)+"",i,o;return{c(){e=d("div"),n=d("p"),f(n,"class","p-1"),f(e,"class","col-10 cursor-pointer svelte-12xdzqf")},m(l,r){k(l,e,r),m(e,n),n.innerHTML=s,i||(o=B(e,"click",t[10]),i=!0)},p(l,r){r&1&&s!==(s=J.sanitize(l[0].text)+"")&&(n.innerHTML=s)},d(l){l&&v(e),i=!1,o()}}}function gt(t){let e;return{c(){e=d("span"),e.textContent="✗",f(e,"class","text-secondary fw-bold fs-3")},m(n,s){k(n,e,s)},p:z,d(n){n&&v(e)}}}function wt(t){let e;return{c(){e=d("span"),e.textContent="✗",f(e,"class","text-danger-dark fw-bold fs-3")},m(n,s){k(n,e,s)},p:z,d(n){n&&v(e)}}}function kt(t){let e;return{c(){e=d("span"),e.textContent="⇠",f(e,"class","text-success-dark fw-bold fs-3")},m(n,s){k(n,e,s)},p:z,d(n){n&&v(e)}}}function vt(t){let e;return{c(){e=d("span"),e.textContent="✓",f(e,"class","text-success-dark fw-bold fs-3")},m(n,s){k(n,e,s)},p:z,d(n){n&&v(e)}}}function yt(t){let e,n,s;return{c(){e=d("button"),f(e,"type","button"),f(e,"class","btn-close")},m(i,o){k(i,e,o),n||(s=B(e,"click",X(t[11])),n=!0)},p:z,d(i){i&&v(e),n=!1,s()}}}function De(t){let e,n,s,i,o=J.sanitize(t[0].hint)+"";return{c(){e=d("div"),n=S(),s=d("div"),i=d("p"),f(e,"class","col-1 border-3 border-start border-secondary-subtle"),f(i,"class","p-1"),f(s,"class","col-11")},m(l,r){k(l,e,r),k(l,n,r),k(l,s,r),m(s,i),i.innerHTML=o},p(l,r){r&1&&o!==(o=J.sanitize(l[0].hint)+"")&&(i.innerHTML=o)},d(l){l&&(v(e),v(n),v(s))}}}function At(t){let e,n,s,i,o,l,r,c;function u(b,O){return b[2]?mt:bt}let a=u(t),_=a(t);function h(b,O){return b[2]?pt:ht}let y=h(t),C=y(t);function p(b,O){if(!b[2])return yt;if(!b[6]&&b[4]&&b[3])return vt;if(!b[6]&&b[4]&&!b[3])return kt;if(!b[6]&&b[3])return wt;if(b[6]&&b[3])return gt}let K=p(t),q=K&&K(t),w=!t[6]&&t[2]&&t[0].hint&&De(t);return{c(){e=d("div"),_.c(),n=S(),C.c(),s=S(),i=d("div"),q&&q.c(),r=S(),c=d("div"),w&&w.c(),f(i,"class","col-1 ps-1"),f(e,"id",o="answer"+t[0].id),f(e,"class",l="row border-start border-3 m-1 pt-2 "+t[7]+" svelte-12xdzqf"),ne(e,"bg-light",!t[2]&&!t[8]&&!t[3]||t[2]&&!t[4]&&!t[3]||t[6]),ne(e,"text-bg-success",!t[8]&&!t[6]&&t[2]&&t[4]),ne(e,"text-bg-danger",!t[8]&&!t[6]&&t[2]&&!t[4]&&t[3]),ne(e,"bg-cancelled",t[8]),f(c,"class","row ms-1 mb-2 me-1")},m(b,O){k(b,e,O),_.m(e,null),m(e,n),C.m(e,null),m(e,s),m(e,i),q&&q.m(i,null),k(b,r,O),k(b,c,O),w&&w.m(c,null)},p(b,[O]){a===(a=u(b))&&_?_.p(b,O):(_.d(1),_=a(b),_&&(_.c(),_.m(e,n))),y===(y=h(b))&&C?C.p(b,O):(C.d(1),C=y(b),C&&(C.c(),C.m(e,s))),K===(K=p(b))&&q?q.p(b,O):(q&&q.d(1),q=K&&K(b),q&&(q.c(),q.m(i,null))),O&1&&o!==(o="answer"+b[0].id)&&f(e,"id",o),O&128&&l!==(l="row border-start border-3 m-1 pt-2 "+b[7]+" svelte-12xdzqf")&&f(e,"class",l),O&476&&ne(e,"bg-light",!b[2]&&!b[8]&&!b[3]||b[2]&&!b[4]&&!b[3]||b[6]),O&468&&ne(e,"text-bg-success",!b[8]&&!b[6]&&b[2]&&b[4]),O&476&&ne(e,"text-bg-danger",!b[8]&&!b[6]&&b[2]&&!b[4]&&b[3]),O&384&&ne(e,"bg-cancelled",b[8]),!b[6]&&b[2]&&b[0].hint?w?w.p(b,O):(w=De(b),w.c(),w.m(c,null)):w&&(w.d(1),w=null)},i:z,o:z,d(b){b&&(v(e),v(r),v(c)),_.d(),C.d(),q&&q.d(),w&&w.d()}}}function Ct(t,e,n){let{answer:s}=e,{badgeText:i}=e,{hasAnswer:o}=e,{isChosenAnswer:l}=e,{isCorrectAnswer:r}=e,{submitAnswer:c}=e,{examMode:u}=e;var a,_;const h=()=>c(s.id),y=()=>c(s.id),C=()=>n(8,_=!_);return t.$$set=p=>{"answer"in p&&n(0,s=p.answer),"badgeText"in p&&n(1,i=p.badgeText),"hasAnswer"in p&&n(2,o=p.hasAnswer),"isChosenAnswer"in p&&n(3,l=p.isChosenAnswer),"isCorrectAnswer"in p&&n(4,r=p.isCorrectAnswer),"submitAnswer"in p&&n(5,c=p.submitAnswer),"examMode"in p&&n(6,u=p.examMode)},t.$$.update=()=>{t.$$.dirty&93&&s&&(n(8,_=!1),n(7,a="border-secondary"),!u&&o&&(r?n(7,a="border-success"):l&&n(7,a="border-danger")))},[s,i,o,l,r,c,u,a,_,h,y,C]}class Lt extends be{constructor(e){super(),pe(this,e,Ct,At,ae,{answer:0,badgeText:1,hasAnswer:2,isChosenAnswer:3,isCorrectAnswer:4,submitAnswer:5,examMode:6})}}function Mt(t){let e,n,s,i,o;return{c(){e=d("div"),n=d("div"),s=d("button"),s.textContent="Show answer",f(s,"type","button"),f(s,"class","btn btn-warning btn-sm w-100"),f(n,"class","col-md-6 offset-md-3"),f(e,"class","row")},m(l,r){k(l,e,r),m(e,n),m(n,s),i||(o=B(s,"click",X(t[4])),i=!0)},p:z,d(l){l&&v(e),i=!1,o()}}}function qt(t){let e,n,s=J.sanitize(t[0].text)+"",i,o,l=!t[1]&&je(t);return{c(){e=d("div"),n=d("p"),i=S(),l&&l.c(),o=ie(),f(n,"class","p-1"),f(e,"class","row border-light border-start border-3 m-1 p-2")},m(r,c){k(r,e,c),m(e,n),n.innerHTML=s,k(r,i,c),l&&l.m(r,c),k(r,o,c)},p(r,c){c&1&&s!==(s=J.sanitize(r[0].text)+"")&&(n.innerHTML=s),r[1]?l&&(l.d(1),l=null):l?l.p(r,c):(l=je(r),l.c(),l.m(o.parentNode,o))},d(r){r&&(v(e),v(i),v(o)),l&&l.d(r)}}}function je(t){let e,n,s,i,o,l,r,c;return{c(){e=d("div"),n=d("div"),s=d("button"),s.textContent="Ask me again",i=S(),o=d("div"),l=d("button"),l.textContent="I got it!",f(s,"type","button"),f(s,"class","btn btn-danger btn-sm w-100"),f(n,"class","col-md-6 mb-1"),f(l,"type","button"),f(l,"class","btn btn-success btn-sm w-100"),f(o,"class","col-md-6 mb-1"),f(e,"class","row")},m(u,a){k(u,e,a),m(e,n),m(n,s),m(e,i),m(e,o),m(o,l),r||(c=[B(s,"click",X(t[5])),B(l,"click",X(t[6]))],r=!0)},p:z,d(u){u&&v(e),r=!1,Se(c)}}}function Et(t){let e;function n(o,l){return o[3]?qt:Mt}let s=n(t),i=s(t);return{c(){i.c(),e=ie()},m(o,l){i.m(o,l),k(o,e,l)},p(o,[l]){s===(s=n(o))&&i?i.p(o,l):(i.d(1),i=s(o),i&&(i.c(),i.m(e.parentNode,e)))},i:z,o:z,d(o){o&&v(e),i.d(o)}}}function Kt(t,e,n){let{answer:s}=e,{hasAnswer:i}=e,{submitAnswer:o}=e;var l=!1;function r(){n(3,l=!l)}const c=()=>o(),u=()=>o(s.id);return t.$$set=a=>{"answer"in a&&n(0,s=a.answer),"hasAnswer"in a&&n(1,i=a.hasAnswer),"submitAnswer"in a&&n(2,o=a.submitAnswer)},t.$$.update=()=>{t.$$.dirty&2&&(i?n(3,l=!0):n(3,l=!1))},[s,i,o,l,r,c,u]}class Tt extends be{constructor(e){super(),pe(this,e,Kt,Et,ae,{answer:0,hasAnswer:1,submitAnswer:2})}}const qe=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Ee(t,e,n,s){t.addEventListener?t.addEventListener(e,n,s):t.attachEvent&&t.attachEvent("on".concat(e),n)}function ue(t,e,n,s){t.removeEventListener?t.removeEventListener(e,n,s):t.deachEvent&&t.deachEvent("on".concat(e),n)}function it(t,e){const n=e.slice(0,e.length-1);for(let s=0;s<n.length;s++)n[s]=t[n[s].toLowerCase()];return n}function lt(t){typeof t!="string"&&(t=""),t=t.replace(/\s/g,"");const e=t.split(",");let n=e.lastIndexOf("");for(;n>=0;)e[n-1]+=",",e.splice(n,1),n=e.lastIndexOf("");return e}function Ot(t,e){const n=t.length>=e.length?t:e,s=t.length>=e.length?e:t;let i=!0;for(let o=0;o<n.length;o++)s.indexOf(n[o])===-1&&(i=!1);return i}const _e={backspace:8,"⌫":8,tab:9,clear:12,enter:13,"↩":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":qe?173:189,"=":qe?61:187,";":qe?59:186,"'":222,"[":219,"]":221,"\\":220},$={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},Oe={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},N={16:!1,18:!1,17:!1,91:!1},D={};for(let t=1;t<20;t++)_e["f".concat(t)]=111+t;let H=[],de=null,ot="all";const ee=new Map,ve=t=>_e[t.toLowerCase()]||$[t.toLowerCase()]||t.toUpperCase().charCodeAt(0),St=t=>Object.keys(_e).find(e=>_e[e]===t),Ht=t=>Object.keys($).find(e=>$[e]===t);function rt(t){ot=t||"all"}function me(){return ot||"all"}function zt(){return H.slice(0)}function Dt(){return H.map(t=>St(t)||Ht(t)||String.fromCharCode(t))}function jt(){const t=[];return Object.keys(D).forEach(e=>{D[e].forEach(n=>{let{key:s,scope:i,mods:o,shortcut:l}=n;t.push({scope:i,shortcut:l,mods:o,keys:s.split("+").map(r=>ve(r))})})}),t}function It(t){const e=t.target||t.srcElement,{tagName:n}=e;let s=!0;return(e.isContentEditable||(n==="INPUT"||n==="TEXTAREA"||n==="SELECT")&&!e.readOnly)&&(s=!1),s}function Pt(t){return typeof t=="string"&&(t=ve(t)),H.indexOf(t)!==-1}function Nt(t,e){let n,s;t||(t=me());for(const i in D)if(Object.prototype.hasOwnProperty.call(D,i))for(n=D[i],s=0;s<n.length;)n[s].scope===t?n.splice(s,1).forEach(l=>{let{element:r}=l;return He(r)}):s++;me()===t&&rt(e||"all")}function Ut(t){let e=t.keyCode||t.which||t.charCode;const n=H.indexOf(e);if(n>=0&&H.splice(n,1),t.key&&t.key.toLowerCase()==="meta"&&H.splice(0,H.length),(e===93||e===224)&&(e=91),e in N){N[e]=!1;for(const s in $)$[s]===e&&(Z[s]=!1)}}function ct(t){if(typeof t>"u")Object.keys(D).forEach(i=>{Array.isArray(D[i])&&D[i].forEach(o=>ye(o)),delete D[i]}),He(null);else if(Array.isArray(t))t.forEach(i=>{i.key&&ye(i)});else if(typeof t=="object")t.key&&ye(t);else if(typeof t=="string"){for(var e=arguments.length,n=new Array(e>1?e-1:0),s=1;s<e;s++)n[s-1]=arguments[s];let[i,o]=n;typeof i=="function"&&(o=i,i=""),ye({key:t,scope:i,method:o,splitKey:"+"})}}const ye=t=>{let{key:e,scope:n,method:s,splitKey:i="+"}=t;lt(e).forEach(l=>{const r=l.split(i),c=r.length,u=r[c-1],a=u==="*"?"*":ve(u);if(!D[a])return;n||(n=me());const _=c>1?it($,r):[],h=[];D[a]=D[a].filter(y=>{const p=(s?y.method===s:!0)&&y.scope===n&&Ot(y.mods,_);return p&&h.push(y.element),!p}),h.forEach(y=>He(y))})};function Ie(t,e,n,s){if(e.element!==s)return;let i;if(e.scope===n||e.scope==="all"){i=e.mods.length>0;for(const o in N)Object.prototype.hasOwnProperty.call(N,o)&&(!N[o]&&e.mods.indexOf(+o)>-1||N[o]&&e.mods.indexOf(+o)===-1)&&(i=!1);(e.mods.length===0&&!N[16]&&!N[18]&&!N[17]&&!N[91]||i||e.shortcut==="*")&&(e.keys=[],e.keys=e.keys.concat(H),e.method(t,e)===!1&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0)))}}function Pe(t,e){const n=D["*"];let s=t.keyCode||t.which||t.charCode;if(!Z.filter.call(this,t))return;if((s===93||s===224)&&(s=91),H.indexOf(s)===-1&&s!==229&&H.push(s),["ctrlKey","altKey","shiftKey","metaKey"].forEach(r=>{const c=Oe[r];t[r]&&H.indexOf(c)===-1?H.push(c):!t[r]&&H.indexOf(c)>-1?H.splice(H.indexOf(c),1):r==="metaKey"&&t[r]&&H.length===3&&(t.ctrlKey||t.shiftKey||t.altKey||(H=H.slice(H.indexOf(c))))}),s in N){N[s]=!0;for(const r in $)$[r]===s&&(Z[r]=!0);if(!n)return}for(const r in N)Object.prototype.hasOwnProperty.call(N,r)&&(N[r]=t[Oe[r]]);t.getModifierState&&!(t.altKey&&!t.ctrlKey)&&t.getModifierState("AltGraph")&&(H.indexOf(17)===-1&&H.push(17),H.indexOf(18)===-1&&H.push(18),N[17]=!0,N[18]=!0);const i=me();if(n)for(let r=0;r<n.length;r++)n[r].scope===i&&(t.type==="keydown"&&n[r].keydown||t.type==="keyup"&&n[r].keyup)&&Ie(t,n[r],i,e);if(!(s in D))return;const o=D[s],l=o.length;for(let r=0;r<l;r++)if((t.type==="keydown"&&o[r].keydown||t.type==="keyup"&&o[r].keyup)&&o[r].key){const c=o[r],{splitKey:u}=c,a=c.key.split(u),_=[];for(let h=0;h<a.length;h++)_.push(ve(a[h]));_.sort().join("")===H.sort().join("")&&Ie(t,c,i,e)}}function Z(t,e,n){H=[];const s=lt(t);let i=[],o="all",l=document,r=0,c=!1,u=!0,a="+",_=!1,h=!1;for(n===void 0&&typeof e=="function"&&(n=e),Object.prototype.toString.call(e)==="[object Object]"&&(e.scope&&(o=e.scope),e.element&&(l=e.element),e.keyup&&(c=e.keyup),e.keydown!==void 0&&(u=e.keydown),e.capture!==void 0&&(_=e.capture),typeof e.splitKey=="string"&&(a=e.splitKey),e.single===!0&&(h=!0)),typeof e=="string"&&(o=e),h&&ct(t,o);r<s.length;r++)t=s[r].split(a),i=[],t.length>1&&(i=it($,t)),t=t[t.length-1],t=t==="*"?"*":ve(t),t in D||(D[t]=[]),D[t].push({keyup:c,keydown:u,scope:o,mods:i,shortcut:s[r],method:n,key:s[r],splitKey:a,element:l});if(typeof l<"u"&&window){if(!ee.has(l)){const y=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;return Pe(p,l)},C=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;Pe(p,l),Ut(p)};ee.set(l,{keydownListener:y,keyupListenr:C,capture:_}),Ee(l,"keydown",y,_),Ee(l,"keyup",C,_)}if(!de){const y=()=>{H=[]};de={listener:y,capture:_},Ee(window,"focus",y,_)}}}function Bt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"all";Object.keys(D).forEach(n=>{D[n].filter(i=>i.scope===e&&i.shortcut===t).forEach(i=>{i&&i.method&&i.method()})})}function He(t){const e=Object.values(D).flat();if(e.findIndex(s=>{let{element:i}=s;return i===t})<0){const{keydownListener:s,keyupListenr:i,capture:o}=ee.get(t)||{};s&&i&&(ue(t,"keyup",i,o),ue(t,"keydown",s,o),ee.delete(t))}if((e.length<=0||ee.size<=0)&&(Object.keys(ee).forEach(i=>{const{keydownListener:o,keyupListenr:l,capture:r}=ee.get(i)||{};o&&l&&(ue(i,"keyup",l,r),ue(i,"keydown",o,r),ee.delete(i))}),ee.clear(),Object.keys(D).forEach(i=>delete D[i]),de)){const{listener:i,capture:o}=de;ue(window,"focus",i,o),de=null}}const Ke={getPressedKeyString:Dt,setScope:rt,getScope:me,deleteScope:Nt,getPressedKeyCodes:zt,getAllKeyCodes:jt,isPressed:Pt,filter:It,trigger:Bt,unbind:ct,keyMap:_e,modifier:$,modifierMap:Oe};for(const t in Ke)Object.prototype.hasOwnProperty.call(Ke,t)&&(Z[t]=Ke[t]);if(typeof window<"u"){const t=window.hotkeys;Z.noConflict=e=>(e&&window.hotkeys===Z&&(window.hotkeys=t),Z),window.hotkeys=Z}function Ne(t,e,n){const s=t.slice();return s[7]=e[n],s}function Qt(t){let e,n,s,i,o,l,r,c,u;return{c(){e=d("div"),n=d("p"),s=d("button"),i=S(),o=d("div"),l=d("img"),f(s,"type","button"),f(s,"class","btn-close"),f(n,"class","bg-white text-end"),f(l,"class","img-fluid border border-5 border-white"),Ce(l.src,r="/"+t[2].path)||f(l,"src",r),f(l,"alt",""),f(o,"class","text-center"),f(e,"class","img-fullscreen svelte-z0la5k")},m(a,_){k(a,e,_),m(e,n),m(n,s),m(e,i),m(e,o),m(o,l),c||(u=[B(s,"click",X(t[5])),B(e,"click",t[3])],c=!0)},p(a,_){_&4&&!Ce(l.src,r="/"+a[2].path)&&f(l,"src",r)},d(a){a&&v(e),c=!1,Se(u)}}}function Vt(t){let e,n,s=[],i=new Map,o=se(t[0]);const l=r=>r[7].id;for(let r=0;r<o.length;r+=1){let c=Ne(t,o,r),u=l(c);i.set(u,s[r]=Ue(u,c))}return{c(){e=d("div"),n=d("div");for(let r=0;r<s.length;r+=1)s[r].c();f(n,"class","row row-cols-1 row-cols-sm-3 g-4"),f(e,"class","col-lg")},m(r,c){k(r,e,c),m(e,n);for(let u=0;u<s.length;u+=1)s[u]&&s[u].m(n,null)},p(r,c){c&9&&(o=se(r[0]),s=at(s,c,l,1,r,o,i,n,ut,Ue,null,Ne))},d(r){r&&v(e);for(let c=0;c<s.length;c+=1)s[c].d()}}}function Ue(t,e){let n,s,i,o,l,r,c;function u(){return e[4](e[7])}return{key:t,first:null,c(){n=d("div"),s=d("div"),i=d("img"),l=S(),Ce(i.src,o="/"+e[7].path)||f(i,"src",o),f(i,"class","card-img-top"),f(i,"alt",""),f(s,"class","card"),Ae(s,"max-width","18rem"),f(n,"class","col"),this.first=n},m(a,_){k(a,n,_),m(n,s),m(s,i),m(n,l),r||(c=B(i,"click",u),r=!0)},p(a,_){e=a,_&1&&!Ce(i.src,o="/"+e[7].path)&&f(i,"src",o)},d(a){a&&v(n),r=!1,c()}}}function Ft(t){let e;function n(o,l){return o[1]?Qt:Vt}let s=n(t),i=s(t);return{c(){i.c(),e=ie()},m(o,l){i.m(o,l),k(o,e,l)},p(o,[l]){s===(s=n(o))&&i?i.p(o,l):(i.d(1),i=s(o),i&&(i.c(),i.m(e.parentNode,e)))},i:z,o:z,d(o){o&&v(e),i.d(o)}}}function Gt(t,e,n){let{images:s=[]}=e;var i=!1,o;st(()=>{Z("esc","images",function(a,_){i&&n(1,i=!1)})});var l;function r(a){l&&l.cancel(),l=dt(()=>{n(1,i=!i),n(2,o=s.find(_=>_.id===a))},100,{maxWait:200}),l()}const c=a=>r(a.id),u=()=>n(1,i=!i);return t.$$set=a=>{"images"in a&&n(0,s=a.images)},t.$$.update=()=>{t.$$.dirty&2&&(i?Z.setScope("images"):Z.setScope("questions"))},[s,i,o,r,c,u]}class Rt extends be{constructor(e){super(),pe(this,e,Gt,Ft,ae,{images:0})}}function Be(t,e,n){const s=t.slice();return s[12]=e[n],s}function Qe(t,e,n){const s=t.slice();return s[12]=e[n],s}function Ve(t){let e,n,s,i=t[12].name+"",o,l,r,c,u,a,_;function h(){return t[7](t[12])}return{c(){e=d("div"),n=d("div"),s=d("a"),o=he(i),r=S(),c=d("div"),u=d("button"),u.textContent="Add",f(s,"href",l="/decks/"+t[12].id),f(n,"class","col-9 text-overflow svelte-1gfmo48"),f(u,"class","btn btn-sm btn-primary float-end"),f(c,"class","col-3 d-grid gap-4"),f(e,"class","row mb-1")},m(y,C){k(y,e,C),m(e,n),m(n,s),m(s,o),m(e,r),m(e,c),m(c,u),a||(_=B(u,"click",X(h)),a=!0)},p(y,C){t=y,C&2&&i!==(i=t[12].name+"")&&Le(o,i),C&2&&l!==(l="/decks/"+t[12].id)&&f(s,"href",l)},d(y){y&&v(e),a=!1,_()}}}function Fe(t){let e;return{c(){e=d("hr")},m(n,s){k(n,e,s)},d(n){n&&v(e)}}}function Ge(t){let e,n,s,i=t[12].name+"",o,l,r,c,u,a,_;function h(){return t[8](t[12])}return{c(){e=d("div"),n=d("div"),s=d("a"),o=he(i),r=S(),c=d("div"),u=d("button"),u.textContent="Remove",f(s,"href",l="/decks/"+t[12].id),f(n,"class","col-9 text-overflow svelte-1gfmo48"),f(u,"class","btn btn-sm btn-outline-dark float-end"),f(c,"class","col-3 d-grid gap-4"),f(e,"class","row mb-1")},m(y,C){k(y,e,C),m(e,n),m(n,s),m(s,o),m(e,r),m(e,c),m(c,u),a||(_=B(u,"click",X(h)),a=!0)},p(y,C){t=y,C&1&&i!==(i=t[12].name+"")&&Le(o,i),C&1&&l!==(l="/decks/"+t[12].id)&&f(s,"href",l)},d(y){y&&v(e),a=!1,_()}}}function Re(t){let e;return{c(){e=d("p"),e.textContent="You don't have any decks yet."},m(n,s){k(n,e,s)},d(n){n&&v(e)}}}function Jt(t){let e,n,s,i,o,l,r,c,u,a,_,h,y,C,p,K,q,w,b,O,L,x,V=se(t[1]),j=[];for(let g=0;g<V.length;g+=1)j[g]=Ve(Qe(t,V,g));let Q=t[1].length>0&&t[0].length>0&&Fe(),I=se(t[0]),T=[];for(let g=0;g<I.length;g+=1)T[g]=Ge(Be(t,I,g));let E=t[1].length===0&&t[0].length===0&&Re();return{c(){e=d("button"),e.innerHTML='<i class="bi bi-collection"></i> Add to deck',n=S(),s=d("div"),i=d("div"),i.innerHTML='<h5 id="offcanvasAddToDeckLabel">Add question to deck</h5> <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>',o=S(),l=d("div");for(let g=0;g<j.length;g+=1)j[g].c();r=S(),Q&&Q.c(),c=S();for(let g=0;g<T.length;g+=1)T[g].c();u=S(),E&&E.c(),a=S(),_=d("hr"),h=S(),y=d("div"),C=d("div"),p=d("p"),p.textContent="Create new deck:",K=S(),q=d("div"),w=d("input"),b=S(),O=d("button"),O.textContent="Create deck and add question",f(e,"class","btn btn-outline-secondary btn-sm"),f(e,"type","button"),f(e,"data-bs-toggle","offcanvas"),f(e,"data-bs-target","#offcanvasAddToDeck"),f(e,"aria-controls","offcanvasAddToDeck"),f(i,"class","offcanvas-header"),f(w,"type","text"),f(w,"class","form-control"),f(w,"id","name"),f(w,"name","name"),f(w,"placeholder","My new deck ..."),f(q,"class","mb-3"),f(O,"class","btn btn-sm btn-primary"),f(C,"class","col"),f(y,"class","row"),f(l,"class","offcanvas-body"),f(s,"class","offcanvas offcanvas-end"),f(s,"tabindex","-1"),f(s,"id","offcanvasAddToDeck"),f(s,"aria-labelledby","offcanvasAddToDeckLabel")},m(g,W){k(g,e,W),k(g,n,W),k(g,s,W),m(s,i),m(s,o),m(s,l);for(let A=0;A<j.length;A+=1)j[A]&&j[A].m(l,null);m(l,r),Q&&Q.m(l,null),m(l,c);for(let A=0;A<T.length;A+=1)T[A]&&T[A].m(l,null);m(l,u),E&&E.m(l,null),m(l,a),m(l,_),m(l,h),m(l,y),m(y,C),m(C,p),m(C,K),m(C,q),m(q,w),ze(w,t[2]),m(C,b),m(C,O),L||(x=[B(w,"input",t[9]),B(O,"click",X(t[10]))],L=!0)},p(g,[W]){if(W&10){V=se(g[1]);let A;for(A=0;A<V.length;A+=1){const te=Qe(g,V,A);j[A]?j[A].p(te,W):(j[A]=Ve(te),j[A].c(),j[A].m(l,r))}for(;A<j.length;A+=1)j[A].d(1);j.length=V.length}if(g[1].length>0&&g[0].length>0?Q||(Q=Fe(),Q.c(),Q.m(l,c)):Q&&(Q.d(1),Q=null),W&17){I=se(g[0]);let A;for(A=0;A<I.length;A+=1){const te=Be(g,I,A);T[A]?T[A].p(te,W):(T[A]=Ge(te),T[A].c(),T[A].m(l,u))}for(;A<T.length;A+=1)T[A].d(1);T.length=I.length}g[1].length===0&&g[0].length===0?E||(E=Re(),E.c(),E.m(l,a)):E&&(E.d(1),E=null),W&4&&w.value!==g[2]&&ze(w,g[2])},i:z,o:z,d(g){g&&(v(e),v(n),v(s)),Te(j,g),Q&&Q.d(),Te(T,g),E&&E.d(),L=!1,Se(x)}}}function Wt(t,e,n){let{questionId:s}=e,i=[],o=[],l="";st(()=>{const p=document.getElementById("offcanvasAddToDeck");p.addEventListener("show.bs.offcanvas",K=>{r()}),p.addEventListener("hidden.bs.offcanvas",K=>{n(0,i=[]),n(1,o=[])})});function r(){axios.get("/api/decks/withquestionids").then(function(p){var K=p.data;K.forEach(q=>{q.questions.some(w=>w.id===s)?n(0,i=[...i,{id:q.id,name:q.name}]):n(1,o=[...o,{id:q.id,name:q.name}])})}).catch(function(p){console.log(p),alert(p)})}function c(p){axios.post("/api/decks/"+p+"/addquestion",{question_id:s}).then(function(K){const q=o.find(w=>w.id===p);n(0,i=[...i,q]),n(1,o=o.filter(w=>w.id!==p))}).catch(function(K){alert(K)})}function u(p){axios.post("/api/decks/"+p+"/removequestion",{question_id:s}).then(function(K){const q=i.find(w=>w.id===p);n(1,o=[...o,q]),n(0,i=i.filter(w=>w.id!==p))}).catch(function(K){alert(K)})}function a(){l&&axios.post("/api/decks",{name:l}).then(function(p){const K=p.data;n(1,o=[...o,K]),c(K.id),n(2,l="")}).catch(function(p){alert(p)})}const _=p=>c(p.id),h=p=>u(p.id);function y(){l=this.value,n(2,l)}const C=()=>a();return t.$$set=p=>{"questionId"in p&&n(6,s=p.questionId)},[i,o,l,c,u,a,s,_,h,y,C]}class Xt extends be{constructor(e){super(),pe(this,e,Wt,Jt,ae,{questionId:6})}}function Je(t,e,n){const s=t.slice();return s[18]=e[n],s[19]=e,s[20]=n,s}function Yt(t){let e;return{c(){e=d("p"),e.textContent="Loading ..."},m(n,s){k(n,e,s)},p:z,i:z,o:z,d(n){n&&v(e)}}}function Zt(t){let e,n,s,i,o;const l=[$t,xt],r=[];function c(a,_){return a[7]?0:1}e=c(t),n=r[e]=l[e](t);let u=!t[4]&&!t[3]&&t[0].type!=="card"&&nt(t);return{c(){n.c(),s=S(),u&&u.c(),i=ie()},m(a,_){r[e].m(a,_),k(a,s,_),u&&u.m(a,_),k(a,i,_),o=!0},p(a,_){let h=e;e=c(a),e===h?r[e].p(a,_):(oe(),U(r[h],1,1,()=>{r[h]=null}),le(),n=r[e],n?n.p(a,_):(n=r[e]=l[e](a),n.c()),P(n,1),n.m(s.parentNode,s)),!a[4]&&!a[3]&&a[0].type!=="card"?u?u.p(a,_):(u=nt(a),u.c(),u.m(i.parentNode,i)):u&&(u.d(1),u=null)},i(a){o||(P(n),o=!0)},o(a){U(n),o=!1},d(a){a&&(v(s),v(i)),r[e].d(a),u&&u.d(a)}}}function xt(t){let e,n,s,i,o,l,r,c,u,a,_,h,y,C=t[0].id,p,K,q,w,b,O,L,x,V,j,Q,I=t[0].is_invalid&&We(),T=t[0].text&&Xe(t),E=t[0].images&&t[0].images.length>0&&Ye(t),g=!t[3]&&t[0].hint&&Ze(t);const W=[ln,sn,nn],A=[];function te(M,F){return M[0].type==="mc"?0:M[0].answers.length===0?1:2}r=te(t),c=A[r]=W[r](t);let G=!t[3]&&t[4]&&t[0].comment&&$e(t),R=t[4]&&et(t),Y=tt(t);return{c(){e=d("div"),I&&I.c(),n=S(),s=d("div"),T&&T.c(),i=S(),E&&E.c(),o=S(),g&&g.c(),l=S(),c.c(),u=S(),G&&G.c(),a=S(),_=d("div"),h=d("div"),R&&R.c(),y=S(),Y.c(),p=S(),K=d("button"),K.innerHTML='<i class="bi bi-pencil"></i> Edit',q=S(),w=d("a"),b=he("Link "),O=d("i"),f(s,"class","row border-start border-3 border-dark m-1 mb-3 pt-2"),f(K,"type","button"),f(K,"class","btn btn-outline-secondary btn-sm ms-1"),f(O,"class","bi bi-box-arrow-up-right"),f(w,"class","btn btn-sm btn-outline-secondary ms-1"),f(w,"href",L="/questions/"+t[0].id),f(w,"target","_blank"),f(w,"role","button"),f(h,"class","d-flex justify-content-end"),f(_,"class","row mt-1 mb-1 pt-2"),f(e,"id",x="question"+t[0].id)},m(M,F){k(M,e,F),I&&I.m(e,null),m(e,n),m(e,s),T&&T.m(s,null),m(s,i),E&&E.m(s,null),m(e,o),g&&g.m(e,null),m(e,l),A[r].m(e,null),m(e,u),G&&G.m(e,null),m(e,a),m(e,_),m(_,h),R&&R.m(h,null),m(h,y),Y.m(h,null),m(h,p),m(h,K),m(h,q),m(h,w),m(w,b),m(w,O),V=!0,j||(Q=B(K,"click",X(t[9])),j=!0)},p(M,F){M[0].is_invalid?I||(I=We(),I.c(),I.m(e,n)):I&&(I.d(1),I=null),M[0].text?T?T.p(M,F):(T=Xe(M),T.c(),T.m(s,i)):T&&(T.d(1),T=null),M[0].images&&M[0].images.length>0?E?(E.p(M,F),F&1&&P(E,1)):(E=Ye(M),E.c(),P(E,1),E.m(s,null)):E&&(oe(),U(E,1,1,()=>{E=null}),le()),!M[3]&&M[0].hint?g?g.p(M,F):(g=Ze(M),g.c(),g.m(e,l)):g&&(g.d(1),g=null);let Me=r;r=te(M),r===Me?A[r].p(M,F):(oe(),U(A[Me],1,1,()=>{A[Me]=null}),le(),c=A[r],c?c.p(M,F):(c=A[r]=W[r](M),c.c()),P(c,1),c.m(e,u)),!M[3]&&M[4]&&M[0].comment?G?G.p(M,F):(G=$e(M),G.c(),G.m(e,a)):G&&(G.d(1),G=null),M[4]?R?R.p(M,F):(R=et(M),R.c(),R.m(h,y)):R&&(R.d(1),R=null),F&1&&ae(C,C=M[0].id)?(oe(),U(Y,1,1,z),le(),Y=tt(M),Y.c(),P(Y,1),Y.m(h,p)):Y.p(M,F),(!V||F&1&&L!==(L="/questions/"+M[0].id))&&f(w,"href",L),(!V||F&1&&x!==(x="question"+M[0].id))&&f(e,"id",x)},i(M){V||(P(E),P(c),P(Y),V=!0)},o(M){U(E),U(c),U(Y),V=!1},d(M){M&&v(e),I&&I.d(),T&&T.d(),E&&E.d(),g&&g.d(),A[r].d(),G&&G.d(),R&&R.d(),Y.d(M),j=!1,Q()}}}function $t(t){let e,n,s,i;function o(r){t[10](r)}let l={toggleEditor:t[9]};return t[0]!==void 0&&(l.question=t[0]),n=new _t({props:l}),re.push(()=>ce(n,"question",o)),{c(){e=d("div"),ge(n.$$.fragment),f(e,"class","pt-1 pb-3 border-dark"),Ae(e,"border-top","dotted"),Ae(e,"border-bottom","dotted"),Ae(e,"border-width","1px")},m(r,c){k(r,e,c),we(n,e,null),i=!0},p(r,c){const u={};!s&&c&1&&(s=!0,u.question=r[0],fe(()=>s=!1)),n.$set(u)},i(r){i||(P(n.$$.fragment,r),i=!0)},o(r){U(n.$$.fragment,r),i=!1},d(r){r&&v(e),ke(n)}}}function We(t){let e;return{c(){e=d("div"),e.innerHTML='<div class="col"><div class="alert alert-light" role="alert"><i class="bi bi-cone-striped"></i> <strong>Question is marked invalid</strong> and safe to skip!</div></div>',f(e,"class","row")},m(n,s){k(n,e,s)},d(n){n&&v(e)}}}function Xe(t){let e,n,s=J.sanitize(t[0].text)+"";return{c(){e=d("div"),n=d("p"),f(n,"id","questionText"),f(e,"class","col-lg")},m(i,o){k(i,e,o),m(e,n),n.innerHTML=s},p(i,o){o&1&&s!==(s=J.sanitize(i[0].text)+"")&&(n.innerHTML=s)},d(i){i&&v(e)}}}function Ye(t){let e,n,s;function i(l){t[11](l)}let o={};return t[0].images!==void 0&&(o.images=t[0].images),e=new Rt({props:o}),re.push(()=>ce(e,"images",i)),{c(){ge(e.$$.fragment)},m(l,r){we(e,l,r),s=!0},p(l,r){const c={};!n&&r&1&&(n=!0,c.images=l[0].images,fe(()=>n=!1)),e.$set(c)},i(l){s||(P(e.$$.fragment,l),s=!0)},o(l){U(e.$$.fragment,l),s=!1},d(l){ke(e,l)}}}function Ze(t){let e;function n(o,l){return o[8]?tn:en}let s=n(t),i=s(t);return{c(){i.c(),e=ie()},m(o,l){i.m(o,l),k(o,e,l)},p(o,l){s===(s=n(o))&&i?i.p(o,l):(i.d(1),i=s(o),i&&(i.c(),i.m(e.parentNode,e)))},d(o){o&&v(e),i.d(o)}}}function en(t){let e,n,s;return{c(){e=d("button"),e.innerHTML='<i class="bi bi-question"></i> Show hint',f(e,"type","button"),f(e,"class","btn btn-outline-secondary btn-sm mb-3")},m(i,o){k(i,e,o),n||(s=B(e,"click",X(t[12])),n=!0)},p:z,d(i){i&&v(e),n=!1,s()}}}function tn(t){let e,n,s=J.sanitize(t[0].hint)+"";return{c(){e=d("div"),n=d("p"),f(e,"class","row border-start border-3 border-secondary-subtle m-1 mt-3 mb-3")},m(i,o){k(i,e,o),m(e,n),n.innerHTML=s},p(i,o){o&1&&s!==(s=J.sanitize(i[0].hint)+"")&&(n.innerHTML=s)},d(i){i&&v(e)}}}function nn(t){let e,n,s;function i(l){t[16](l)}let o={submitAnswer:t[5],hasAnswer:!!t[2]};return t[0].answers[0]!==void 0&&(o.answer=t[0].answers[0]),e=new Tt({props:o}),re.push(()=>ce(e,"answer",i)),{c(){ge(e.$$.fragment)},m(l,r){we(e,l,r),s=!0},p(l,r){const c={};r&32&&(c.submitAnswer=l[5]),r&4&&(c.hasAnswer=!!l[2]),!n&&r&1&&(n=!0,c.answer=l[0].answers[0],fe(()=>n=!1)),e.$set(c)},i(l){s||(P(e.$$.fragment,l),s=!0)},o(l){U(e.$$.fragment,l),s=!1},d(l){ke(e,l)}}}function sn(t){let e;return{c(){e=d("div"),e.textContent="This questions doesn't have any answer.",f(e,"class","alert alert-light"),f(e,"role","alert")},m(n,s){k(n,e,s)},p:z,i:z,o:z,d(n){n&&v(e)}}}function ln(t){let e,n,s=se(t[0].answers),i=[];for(let l=0;l<s.length;l+=1)i[l]=xe(Je(t,s,l));const o=l=>U(i[l],1,1,()=>{i[l]=null});return{c(){for(let l=0;l<i.length;l+=1)i[l].c();e=ie()},m(l,r){for(let c=0;c<i.length;c+=1)i[c]&&i[c].m(l,r);k(l,e,r),n=!0},p(l,r){if(r&45){s=se(l[0].answers);let c;for(c=0;c<s.length;c+=1){const u=Je(l,s,c);i[c]?(i[c].p(u,r),P(i[c],1)):(i[c]=xe(u),i[c].c(),P(i[c],1),i[c].m(e.parentNode,e))}for(oe(),c=s.length;c<i.length;c+=1)o(c);le()}},i(l){if(!n){for(let r=0;r<s.length;r+=1)P(i[r]);n=!0}},o(l){i=i.filter(Boolean);for(let r=0;r<i.length;r+=1)U(i[r]);n=!1},d(l){l&&v(e),Te(i,l)}}}function xe(t){let e,n,s,i,o;function l(a){t[13](a,t[18],t[19],t[20])}function r(a){t[14](a)}function c(a){t[15](a)}let u={submitAnswer:t[5],badgeText:"ABCDEFGHIJKLMN".charAt(t[20]),isCorrectAnswer:t[0].correct_answer_id===t[18].id,hasAnswer:!!t[2],isChosenAnswer:t[2]&&t[2].answer_id===t[18].id};return t[18]!==void 0&&(u.answer=t[18]),t[2]!==void 0&&(u.answerChoice=t[2]),t[3]!==void 0&&(u.examMode=t[3]),e=new Lt({props:u}),re.push(()=>ce(e,"answer",l)),re.push(()=>ce(e,"answerChoice",r)),re.push(()=>ce(e,"examMode",c)),{c(){ge(e.$$.fragment)},m(a,_){we(e,a,_),o=!0},p(a,_){t=a;const h={};_&32&&(h.submitAnswer=t[5]),_&1&&(h.isCorrectAnswer=t[0].correct_answer_id===t[18].id),_&4&&(h.hasAnswer=!!t[2]),_&5&&(h.isChosenAnswer=t[2]&&t[2].answer_id===t[18].id),!n&&_&1&&(n=!0,h.answer=t[18],fe(()=>n=!1)),!s&&_&4&&(s=!0,h.answerChoice=t[2],fe(()=>s=!1)),!i&&_&8&&(i=!0,h.examMode=t[3],fe(()=>i=!1)),e.$set(h)},i(a){o||(P(e.$$.fragment,a),o=!0)},o(a){U(e.$$.fragment,a),o=!1},d(a){ke(e,a)}}}function $e(t){let e,n,s,i=J.sanitize(t[0].comment)+"";return{c(){e=d("div"),n=d("div"),s=d("div"),f(s,"class","alert alert-light"),f(s,"role","alert"),f(n,"class","col"),f(e,"class","row")},m(o,l){k(o,e,l),m(e,n),m(n,s),s.innerHTML=i},p(o,l){l&1&&i!==(i=J.sanitize(o[0].comment)+"")&&(s.innerHTML=i)},d(o){o&&v(e)}}}function et(t){let e,n,s;return{c(){e=d("button"),e.innerHTML='<i class="bi bi-arrow-counterclockwise"></i> Reset',f(e,"type","button"),f(e,"class","btn btn-outline-secondary btn-sm me-1")},m(i,o){k(i,e,o),n||(s=B(e,"click",X(function(){ft(t[6])&&t[6].apply(this,arguments)})),n=!0)},p(i,o){t=i},d(i){i&&v(e),n=!1,s()}}}function tt(t){let e,n;return e=new Xt({props:{questionId:t[0].id}}),{c(){ge(e.$$.fragment)},m(s,i){we(e,s,i),n=!0},p(s,i){const o={};i&1&&(o.questionId=s[0].id),e.$set(o)},i(s){n||(P(e.$$.fragment,s),n=!0)},o(s){U(e.$$.fragment,s),n=!1},d(s){ke(e,s)}}}function nt(t){let e,n,s,i;return{c(){e=d("div"),n=d("button"),n.textContent="→ Show answer",f(n,"type","button"),f(n,"class","btn btn-outline-secondary btn-sm"),f(e,"class","mt-3")},m(o,l){k(o,e,l),m(e,n),s||(i=B(n,"click",X(t[17])),s=!0)},p:z,d(o){o&&v(e),s=!1,i()}}}function on(t){let e,n,s,i;const o=[Zt,Yt],l=[];function r(c,u){return c[0]?0:1}return e=r(t),n=l[e]=o[e](t),{c(){n.c(),s=ie()},m(c,u){l[e].m(c,u),k(c,s,u),i=!0},p(c,[u]){let a=e;e=r(c),e===a?l[e].p(c,u):(oe(),U(l[a],1,1,()=>{l[a]=null}),le(),n=l[e],n?n.p(c,u):(n=l[e]=o[e](c),n.c()),P(n,1),n.m(s.parentNode,s))},i(c){i||(P(n),i=!0)},o(c){U(n),i=!1},d(c){c&&v(s),l[e].d(c)}}}function rn(t){const e=t.target;!e.classList.contains("bg-danger-subtle")&&!e.classList.contains("bg-warning-subtle")&&!e.classList.contains("bg-success-subtle")?e.classList.add("bg-success-subtle"):e.classList.contains("bg-success-subtle")?(e.classList.remove("bg-success-subtle"),e.classList.add("bg-danger-subtle")):e.classList.contains("bg-danger-subtle")?(e.classList.remove("bg-danger-subtle"),e.classList.add("bg-warning-subtle")):e.classList.contains("bg-warning-subtle")&&e.classList.remove("bg-warning-subtle")}function cn(t,e,n){let{question:s}=e,{questionAnswered:i}=e,{helpUsed:o}=e,{answerChoice:l}=e,{submitAnswer:r}=e,{deleteAnswer:c}=e,{examMode:u}=e;var a=!1,_=i;function h(){n(7,a=!a)}function y(L){s=L,n(0,s)}function C(L){t.$$.not_equal(s.images,L)&&(s.images=L,n(0,s))}const p=()=>{n(8,_=!0),n(1,o=!0)};function K(L,x,V,j){V[j]=L,n(0,s)}function q(L){l=L,n(2,l)}function w(L){u=L,n(3,u)}function b(L){t.$$.not_equal(s.answers[0],L)&&(s.answers[0]=L,n(0,s))}const O=()=>r("");return t.$$set=L=>{"question"in L&&n(0,s=L.question),"questionAnswered"in L&&n(4,i=L.questionAnswered),"helpUsed"in L&&n(1,o=L.helpUsed),"answerChoice"in L&&n(2,l=L.answerChoice),"submitAnswer"in L&&n(5,r=L.submitAnswer),"deleteAnswer"in L&&n(6,c=L.deleteAnswer),"examMode"in L&&n(3,u=L.examMode)},t.$$.update=()=>{t.$$.dirty&17&&(n(8,_=i),n(1,o=i)),t.$$.dirty&1&&(()=>{var L=document.querySelectorAll("#questionText li");[].map.call(L,function(x){x.addEventListener("click",rn,!1)})})()},[s,o,l,u,i,r,c,a,_,h,y,C,p,K,q,w,b,O]}class _n extends be{constructor(e){super(),pe(this,e,cn,on,ae,{question:0,questionAnswered:4,helpUsed:1,answerChoice:2,submitAnswer:5,deleteAnswer:6,examMode:3})}}export{_n as S,Z as h};
