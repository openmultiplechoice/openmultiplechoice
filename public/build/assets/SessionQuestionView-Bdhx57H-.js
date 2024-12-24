import{S as ye,i as Ae,s as we,c as d,a as M,f as c,E as ge,o as ue,b as h,h as m,n as K,d as k,t as ve,q as Ve,l as Q,p as ee,e as fe,B as De,C as yt,M as Ie,j as Je,m as We,y as R,z as he,x as V,D as ke,k as me,r as _e,u as Ce,v as Se,w as be,A as qe,O as Et}from"./index-CW_84yAU.js";import{e as de,u as At,d as Tt,o as Ot}from"./each-23V_io8F.js";import{p as G,d as Kt}from"./purify.es-BMHaTOf2.js";import{_ as Ht}from"./lodash-D0JQdfhu.js";import{Q as zt}from"./QuestionForm-BYBTEgc_.js";const Pe=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Qe(n,e,t,s){n.addEventListener?n.addEventListener(e,t,s):n.attachEvent&&n.attachEvent("on".concat(e),t)}function Le(n,e,t,s){n.removeEventListener?n.removeEventListener(e,t,s):n.detachEvent&&n.detachEvent("on".concat(e),t)}function Ct(n,e){const t=e.slice(0,e.length-1);for(let s=0;s<t.length;s++)t[s]=n[t[s].toLowerCase()];return t}function St(n){typeof n!="string"&&(n=""),n=n.replace(/\s/g,"");const e=n.split(",");let t=e.lastIndexOf("");for(;t>=0;)e[t-1]+=",",e.splice(t,1),t=e.lastIndexOf("");return e}function It(n,e){const t=n.length>=e.length?n:e,s=n.length>=e.length?e:n;let i=!0;for(let l=0;l<t.length;l++)s.indexOf(t[l])===-1&&(i=!1);return i}const Ee={backspace:8,"⌫":8,tab:9,clear:12,enter:13,"↩":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":Pe?173:189,"=":Pe?61:187,";":Pe?59:186,"'":222,"[":219,"]":221,"\\":220},re={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},ze={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},F={16:!1,18:!1,17:!1,91:!1},N={};for(let n=1;n<20;n++)Ee["f".concat(n)]=111+n;let z=[],Me=null,qt="all";const oe=new Map,Oe=n=>Ee[n.toLowerCase()]||re[n.toLowerCase()]||n.toUpperCase().charCodeAt(0),Dt=n=>Object.keys(Ee).find(e=>Ee[e]===n),Nt=n=>Object.keys(re).find(e=>re[e]===n);function Lt(n){qt=n||"all"}function Te(){return qt||"all"}function jt(){return z.slice(0)}function Pt(){return z.map(n=>Dt(n)||Nt(n)||String.fromCharCode(n))}function Qt(){const n=[];return Object.keys(N).forEach(e=>{N[e].forEach(t=>{let{key:s,scope:i,mods:l,shortcut:r}=t;n.push({scope:i,shortcut:r,mods:l,keys:s.split("+").map(o=>Oe(o))})})}),n}function Ut(n){const e=n.target||n.srcElement,{tagName:t}=e;let s=!0;const i=t==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(e.type);return(e.isContentEditable||(i||t==="TEXTAREA"||t==="SELECT")&&!e.readOnly)&&(s=!1),s}function Vt(n){return typeof n=="string"&&(n=Oe(n)),z.indexOf(n)!==-1}function Bt(n,e){let t,s;n||(n=Te());for(const i in N)if(Object.prototype.hasOwnProperty.call(N,i))for(t=N[i],s=0;s<t.length;)t[s].scope===n?t.splice(s,1).forEach(r=>{let{element:o}=r;return Be(o)}):s++;Te()===n&&Lt(e||"all")}function Ft(n){let e=n.keyCode||n.which||n.charCode;const t=z.indexOf(e);if(t>=0&&z.splice(t,1),n.key&&n.key.toLowerCase()==="meta"&&z.splice(0,z.length),(e===93||e===224)&&(e=91),e in F){F[e]=!1;for(const s in re)re[s]===e&&(se[s]=!1)}}function Mt(n){if(typeof n>"u")Object.keys(N).forEach(i=>{Array.isArray(N[i])&&N[i].forEach(l=>He(l)),delete N[i]}),Be(null);else if(Array.isArray(n))n.forEach(i=>{i.key&&He(i)});else if(typeof n=="object")n.key&&He(n);else if(typeof n=="string"){for(var e=arguments.length,t=new Array(e>1?e-1:0),s=1;s<e;s++)t[s-1]=arguments[s];let[i,l]=t;typeof i=="function"&&(l=i,i=""),He({key:n,scope:i,method:l,splitKey:"+"})}}const He=n=>{let{key:e,scope:t,method:s,splitKey:i="+"}=n;St(e).forEach(r=>{const o=r.split(i),f=o.length,a=o[f-1],u=a==="*"?"*":Oe(a);if(!N[u])return;t||(t=Te());const p=f>1?Ct(re,o):[],C=[];N[u]=N[u].filter(v=>{const b=(s?v.method===s:!0)&&v.scope===t&&It(v.mods,p);return b&&C.push(v.element),!b}),C.forEach(v=>Be(v))})};function Xe(n,e,t,s){if(e.element!==s)return;let i;if(e.scope===t||e.scope==="all"){i=e.mods.length>0;for(const l in F)Object.prototype.hasOwnProperty.call(F,l)&&(!F[l]&&e.mods.indexOf(+l)>-1||F[l]&&e.mods.indexOf(+l)===-1)&&(i=!1);(e.mods.length===0&&!F[16]&&!F[18]&&!F[17]&&!F[91]||i||e.shortcut==="*")&&(e.keys=[],e.keys=e.keys.concat(z),e.method(n,e)===!1&&(n.preventDefault?n.preventDefault():n.returnValue=!1,n.stopPropagation&&n.stopPropagation(),n.cancelBubble&&(n.cancelBubble=!0)))}}function Ye(n,e){const t=N["*"];let s=n.keyCode||n.which||n.charCode;if(!se.filter.call(this,n))return;if((s===93||s===224)&&(s=91),z.indexOf(s)===-1&&s!==229&&z.push(s),["metaKey","ctrlKey","altKey","shiftKey"].forEach(o=>{const f=ze[o];n[o]&&z.indexOf(f)===-1?z.push(f):!n[o]&&z.indexOf(f)>-1?z.splice(z.indexOf(f),1):o==="metaKey"&&n[o]&&(z=z.filter(a=>a in ze||a===s))}),s in F){F[s]=!0;for(const o in re)re[o]===s&&(se[o]=!0);if(!t)return}for(const o in F)Object.prototype.hasOwnProperty.call(F,o)&&(F[o]=n[ze[o]]);n.getModifierState&&!(n.altKey&&!n.ctrlKey)&&n.getModifierState("AltGraph")&&(z.indexOf(17)===-1&&z.push(17),z.indexOf(18)===-1&&z.push(18),F[17]=!0,F[18]=!0);const i=Te();if(t)for(let o=0;o<t.length;o++)t[o].scope===i&&(n.type==="keydown"&&t[o].keydown||n.type==="keyup"&&t[o].keyup)&&Xe(n,t[o],i,e);if(!(s in N))return;const l=N[s],r=l.length;for(let o=0;o<r;o++)if((n.type==="keydown"&&l[o].keydown||n.type==="keyup"&&l[o].keyup)&&l[o].key){const f=l[o],{splitKey:a}=f,u=f.key.split(a),p=[];for(let C=0;C<u.length;C++)p.push(Oe(u[C]));p.sort().join("")===z.sort().join("")&&Xe(n,f,i,e)}}function se(n,e,t){z=[];const s=St(n);let i=[],l="all",r=document,o=0,f=!1,a=!0,u="+",p=!1,C=!1;for(t===void 0&&typeof e=="function"&&(t=e),Object.prototype.toString.call(e)==="[object Object]"&&(e.scope&&(l=e.scope),e.element&&(r=e.element),e.keyup&&(f=e.keyup),e.keydown!==void 0&&(a=e.keydown),e.capture!==void 0&&(p=e.capture),typeof e.splitKey=="string"&&(u=e.splitKey),e.single===!0&&(C=!0)),typeof e=="string"&&(l=e),C&&Mt(n,l);o<s.length;o++)n=s[o].split(u),i=[],n.length>1&&(i=Ct(re,n)),n=n[n.length-1],n=n==="*"?"*":Oe(n),n in N||(N[n]=[]),N[n].push({keyup:f,keydown:a,scope:l,mods:i,shortcut:s[o],method:t,key:s[o],splitKey:u,element:r});if(typeof r<"u"&&window){if(!oe.has(r)){const v=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;return Ye(b,r)},w=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;Ye(b,r),Ft(b)};oe.set(r,{keydownListener:v,keyupListenr:w,capture:p}),Qe(r,"keydown",v,p),Qe(r,"keyup",w,p)}if(!Me){const v=()=>{z=[]};Me={listener:v,capture:p},Qe(window,"focus",v,p)}}}function Rt(n){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"all";Object.keys(N).forEach(t=>{N[t].filter(i=>i.scope===e&&i.shortcut===n).forEach(i=>{i&&i.method&&i.method()})})}function Be(n){const e=Object.values(N).flat();if(e.findIndex(s=>{let{element:i}=s;return i===n})<0){const{keydownListener:s,keyupListenr:i,capture:l}=oe.get(n)||{};s&&i&&(Le(n,"keyup",i,l),Le(n,"keydown",s,l),oe.delete(n))}if((e.length<=0||oe.size<=0)&&(Object.keys(oe).forEach(i=>{const{keydownListener:l,keyupListenr:r,capture:o}=oe.get(i)||{};l&&r&&(Le(i,"keyup",r,o),Le(i,"keydown",l,o),oe.delete(i))}),oe.clear(),Object.keys(N).forEach(i=>delete N[i]),Me)){const{listener:i,capture:l}=Me;Le(window,"focus",i,l),Me=null}}const Ue={getPressedKeyString:Pt,setScope:Lt,getScope:Te,deleteScope:Bt,getPressedKeyCodes:jt,getAllKeyCodes:Qt,isPressed:Vt,filter:Ut,trigger:Rt,unbind:Mt,keyMap:Ee,modifier:re,modifierMap:ze};for(const n in Ue)Object.prototype.hasOwnProperty.call(Ue,n)&&(se[n]=Ue[n]);if(typeof window<"u"){const n=window.hotkeys;se.noConflict=e=>(e&&window.hotkeys===se&&(window.hotkeys=n),se),window.hotkeys=se}function Gt(n){let e,t;return{c(){e=d("div"),t=d("p"),t.textContent=`${n[8]}`,c(t,"class","badge text-dark my-0"),c(e,"class","col-1 border-start-3")},m(s,i){h(s,e,i),m(e,t)},p:K,d(s){s&&k(e)}}}function Jt(n){let e,t,s,i;return{c(){e=d("div"),t=d("p"),t.textContent=`${n[8]}`,c(t,"class","badge text-dark my-0"),c(e,"class","col-1 border-start-3 cursor-pointer svelte-12xdzqf")},m(l,r){h(l,e,r),m(e,t),s||(i=Q(e,"click",n[10]),s=!0)},p:K,d(l){l&&k(e),s=!1,i()}}}function Wt(n){let e,t,s=G.sanitize(n[0].text)+"";return{c(){e=d("div"),t=d("p"),c(t,"class","px-1 my-0"),c(e,"class","col-9")},m(i,l){h(i,e,l),m(e,t),t.innerHTML=s},p(i,l){l&1&&s!==(s=G.sanitize(i[0].text)+"")&&(t.innerHTML=s)},d(i){i&&k(e)}}}function Xt(n){let e,t,s=G.sanitize(n[0].text)+"",i,l;return{c(){e=d("div"),t=d("p"),c(t,"class","px-1 my-0"),c(e,"class","col-9 cursor-pointer svelte-12xdzqf")},m(r,o){h(r,e,o),m(e,t),t.innerHTML=s,i||(l=Q(e,"click",n[11]),i=!0)},p(r,o){o&1&&s!==(s=G.sanitize(r[0].text)+"")&&(t.innerHTML=s)},d(r){r&&k(e),i=!1,l()}}}function Ze(n){let e,t=n[0].answer_percentage+"",s,i;return{c(){e=d("span"),s=ve(t),i=ve("%"),c(e,"class","badge text-muted"),c(e,"title","Percentage of users who chose this answer")},m(l,r){h(l,e,r),m(e,s),m(e,i)},p(l,r){r&1&&t!==(t=l[0].answer_percentage+"")&&Ve(s,t)},d(l){l&&k(e)}}}function Yt(n){let e;return{c(){e=d("span"),e.textContent="✓",c(e,"class","text-secondary fw-bold fs-3")},m(t,s){h(t,e,s)},p:K,d(t){t&&k(e)}}}function Zt(n){let e;return{c(){e=d("span"),e.textContent="✗",c(e,"class","text-danger-dark fw-bold fs-3")},m(t,s){h(t,e,s)},p:K,d(t){t&&k(e)}}}function xt(n){let e;return{c(){e=d("span"),e.textContent="⇠",c(e,"class","text-success-dark fw-bold fs-3")},m(t,s){h(t,e,s)},p:K,d(t){t&&k(e)}}}function $t(n){let e;return{c(){e=d("span"),e.textContent="✓",c(e,"class","text-success-dark fw-bold fs-3")},m(t,s){h(t,e,s)},p:K,d(t){t&&k(e)}}}function en(n){let e,t,s;return{c(){e=d("button"),c(e,"type","button"),c(e,"class","btn-close")},m(i,l){h(i,e,l),t||(s=Q(e,"click",ee(n[12])),t=!0)},p:K,d(i){i&&k(e),t=!1,s()}}}function xe(n){let e,t,s,i,l=G.sanitize(n[0].hint)+"";return{c(){e=d("div"),t=M(),s=d("div"),i=d("p"),c(e,"class","col-1 border-3 border-start border-secondary-subtle"),c(i,"class","p-1"),c(s,"class","col-11")},m(r,o){h(r,e,o),h(r,t,o),h(r,s,o),m(s,i),i.innerHTML=l},p(r,o){o&1&&l!==(l=G.sanitize(r[0].hint)+"")&&(i.innerHTML=l)},d(r){r&&(k(e),k(t),k(s))}}}function tn(n){let e,t,s,i,l,r,o,f,a,u,p,C;function v(_,E){return!_[2]&&!_[1].isSubmittedAnswer?Jt:Gt}let w=v(n),b=w(n);function y(_,E){return!_[2]&&!_[1].isSelectedAnswer?Xt:Wt}let H=y(n),A=H(n),I=n[2]&&!n[4]&&n[5]&&n[0].answer_percentage!=null&&Ze(n);function J(_,E){if(!_[2]&&!_[1].isSelectedAnswer)return en;if(!_[4]&&_[1].isCorrectAnswer&&_[1].isSubmittedAnswer)return $t;if(!_[4]&&_[1].isCorrectAnswer&&!_[1].isSubmittedAnswer&&_[2])return xt;if(!_[4]&&_[1].isSubmittedAnswer)return Zt;if(_[4]&&_[1].isSubmittedAnswer)return Yt}let j=J(n),D=j&&j(n),T=!n[4]&&n[0].hint&&(n[2]||n[1].isSelectedAnswer)&&xe(n);return{c(){e=d("div"),b.c(),t=M(),A.c(),s=M(),i=d("div"),l=d("div"),r=d("div"),I&&I.c(),o=M(),f=d("div"),D&&D.c(),p=M(),C=d("div"),T&&T.c(),c(r,"class","col"),c(f,"class","col"),c(l,"class","row text-end d-flex align-items-center"),c(i,"class","col-2"),c(e,"id",a="answer"+n[0].id),ge(e,"min-height","3rem"),c(e,"class",u="row border-start border-3 m-1 py-2 d-flex align-items-center "+n[6]+" svelte-12xdzqf"),ue(e,"bg-light",n[4]||!n[2]&&!n[1].isSelectedAnswer&&!n[1].isSubmittedAnswer||n[2]&&!n[1].isSubmittedAnswer&&!n[1].isCorrectAnswer),ue(e,"text-bg-success",!n[7]&&!n[4]&&n[2]&&n[1].isCorrectAnswer),ue(e,"text-bg-danger",!n[7]&&!n[4]&&n[1].isSelectedAnswer&&!n[1].isCorrectAnswer),ue(e,"bg-cancelled",n[7]),c(C,"class","row ms-1 mb-2 me-1")},m(_,E){h(_,e,E),b.m(e,null),m(e,t),A.m(e,null),m(e,s),m(e,i),m(i,l),m(l,r),I&&I.m(r,null),m(l,o),m(l,f),D&&D.m(f,null),h(_,p,E),h(_,C,E),T&&T.m(C,null)},p(_,[E]){w===(w=v(_))&&b?b.p(_,E):(b.d(1),b=w(_),b&&(b.c(),b.m(e,t))),H===(H=y(_))&&A?A.p(_,E):(A.d(1),A=H(_),A&&(A.c(),A.m(e,s))),_[2]&&!_[4]&&_[5]&&_[0].answer_percentage!=null?I?I.p(_,E):(I=Ze(_),I.c(),I.m(r,null)):I&&(I.d(1),I=null),j===(j=J(_))&&D?D.p(_,E):(D&&D.d(1),D=j&&j(_),D&&(D.c(),D.m(f,null))),E&1&&a!==(a="answer"+_[0].id)&&c(e,"id",a),E&64&&u!==(u="row border-start border-3 m-1 py-2 d-flex align-items-center "+_[6]+" svelte-12xdzqf")&&c(e,"class",u),E&86&&ue(e,"bg-light",_[4]||!_[2]&&!_[1].isSelectedAnswer&&!_[1].isSubmittedAnswer||_[2]&&!_[1].isSubmittedAnswer&&!_[1].isCorrectAnswer),E&214&&ue(e,"text-bg-success",!_[7]&&!_[4]&&_[2]&&_[1].isCorrectAnswer),E&210&&ue(e,"text-bg-danger",!_[7]&&!_[4]&&_[1].isSelectedAnswer&&!_[1].isCorrectAnswer),E&192&&ue(e,"bg-cancelled",_[7]),!_[4]&&_[0].hint&&(_[2]||_[1].isSelectedAnswer)?T?T.p(_,E):(T=xe(_),T.c(),T.m(C,null)):T&&(T.d(1),T=null)},i:K,o:K,d(_){_&&(k(e),k(p),k(C)),b.d(),A.d(),I&&I.d(),D&&D.d(),T&&T.d()}}}function nn(n,e,t){let{answer:s}=e,{answerContext:i}=e,{answerNumber:l}=e,{questionIsAnswered:r}=e,{submitAnswer:o}=e,{examMode:f}=e,{settingsShowAnswerStats:a}=e;var u,p,C=s.badgeText;const v=()=>o(s.id),w=()=>o(s.id),b=()=>t(7,p=!p);return n.$$set=y=>{"answer"in y&&t(0,s=y.answer),"answerContext"in y&&t(1,i=y.answerContext),"answerNumber"in y&&t(9,l=y.answerNumber),"questionIsAnswered"in y&&t(2,r=y.questionIsAnswered),"submitAnswer"in y&&t(3,o=y.submitAnswer),"examMode"in y&&t(4,f=y.examMode),"settingsShowAnswerStats"in y&&t(5,a=y.settingsShowAnswerStats)},n.$$.update=()=>{n.$$.dirty&521&&(se.unbind(`${C}, ${l}`,"questions"),se(`${C}, ${l}`,"questions",function(){o(s.id)})),n.$$.dirty&23&&s&&(t(7,p=!1),t(6,u="border-secondary"),f||(r?i.isCorrectAnswer?t(6,u="border-success"):i.isSubmittedAnswer&&t(6,u="border-danger"):i.isSelectedAnswer&&t(6,u="border-danger")))},[s,i,r,o,f,a,u,p,C,l,v,w,b]}class sn extends ye{constructor(e){super(),Ae(this,e,nn,tn,we,{answer:0,answerContext:1,answerNumber:9,questionIsAnswered:2,submitAnswer:3,examMode:4,settingsShowAnswerStats:5})}}function ln(n){let e,t,s,i,l;return{c(){e=d("div"),t=d("div"),s=d("button"),s.textContent="Show answer",c(s,"type","button"),c(s,"class","btn btn-warning btn-sm w-100"),c(t,"class","col-md"),c(e,"class","row")},m(r,o){h(r,e,o),m(e,t),m(t,s),i||(l=Q(s,"click",ee(n[4])),i=!0)},p:K,d(r){r&&k(e),i=!1,l()}}}function rn(n){let e,t,s=G.sanitize(n[0].text)+"",i,l,r=!n[1]&&$e(n);return{c(){e=d("div"),t=d("p"),i=M(),r&&r.c(),l=fe(),c(t,"class","p-1"),c(e,"class","row border-light border-start border-3 m-1 p-2")},m(o,f){h(o,e,f),m(e,t),t.innerHTML=s,h(o,i,f),r&&r.m(o,f),h(o,l,f)},p(o,f){f&1&&s!==(s=G.sanitize(o[0].text)+"")&&(t.innerHTML=s),o[1]?r&&(r.d(1),r=null):r?r.p(o,f):(r=$e(o),r.c(),r.m(l.parentNode,l))},d(o){o&&(k(e),k(i),k(l)),r&&r.d(o)}}}function $e(n){let e,t,s,i,l,r,o,f;return{c(){e=d("div"),t=d("div"),s=d("button"),s.textContent="Ask me again",i=M(),l=d("div"),r=d("button"),r.textContent="I got it!",c(s,"type","button"),c(s,"class","btn btn-danger btn-sm w-100"),c(t,"class","col-md-6 mb-1"),c(r,"type","button"),c(r,"class","btn btn-success btn-sm w-100"),c(l,"class","col-md-6 mb-1"),c(e,"class","row")},m(a,u){h(a,e,u),m(e,t),m(t,s),m(e,i),m(e,l),m(l,r),o||(f=[Q(s,"click",ee(n[5])),Q(r,"click",ee(n[6]))],o=!0)},p:K,d(a){a&&k(e),o=!1,De(f)}}}function on(n){let e;function t(l,r){return l[3]?rn:ln}let s=t(n),i=s(n);return{c(){i.c(),e=fe()},m(l,r){i.m(l,r),h(l,e,r)},p(l,[r]){s===(s=t(l))&&i?i.p(l,r):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},i:K,o:K,d(l){l&&k(e),i.d(l)}}}function fn(n,e,t){let{answer:s}=e,{hasAnswer:i}=e,{submitAnswer:l}=e;var r=!1;function o(){t(3,r=!r)}const f=()=>l(),a=()=>l(s.id);return n.$$set=u=>{"answer"in u&&t(0,s=u.answer),"hasAnswer"in u&&t(1,i=u.hasAnswer),"submitAnswer"in u&&t(2,l=u.submitAnswer)},n.$$.update=()=>{n.$$.dirty&2&&(i?t(3,r=!0):t(3,r=!1))},[s,i,l,r,o,f,a]}class cn extends ye{constructor(e){super(),Ae(this,e,fn,on,we,{answer:0,hasAnswer:1,submitAnswer:2})}}function et(n){let e,t,s,i,l,r,o,f;return{c(){e=d("div"),t=d("div"),s=d("button"),s.textContent="Ask me again",i=M(),l=d("div"),r=d("button"),r.textContent="I got it!",c(s,"type","button"),c(s,"class","btn btn-danger btn-sm w-100"),c(t,"class","col-md-6 mb-1"),c(r,"type","button"),c(r,"class","btn btn-success btn-sm w-100"),c(l,"class","col-md-6 mb-1"),c(e,"class","row")},m(a,u){h(a,e,u),m(e,t),m(t,s),m(e,i),m(e,l),m(l,r),o||(f=[Q(s,"click",ee(n[2])),Q(r,"click",ee(n[3]))],o=!0)},p:K,d(a){a&&k(e),o=!1,De(f)}}}function an(n){let e,t=!n[0]&&et(n);return{c(){t&&t.c(),e=fe()},m(s,i){t&&t.m(s,i),h(s,e,i)},p(s,[i]){s[0]?t&&(t.d(1),t=null):t?t.p(s,i):(t=et(s),t.c(),t.m(e.parentNode,e))},i:K,o:K,d(s){s&&k(e),t&&t.d(s)}}}function un(n,e,t){let{hasAnswer:s}=e,{submitAnswer:i}=e;const l=()=>i(),r=()=>i(-1);return n.$$set=o=>{"hasAnswer"in o&&t(0,s=o.hasAnswer),"submitAnswer"in o&&t(1,i=o.submitAnswer)},[s,i,l,r]}class dn extends ye{constructor(e){super(),Ae(this,e,un,an,we,{hasAnswer:0,submitAnswer:1})}}function tt(n,e,t){const s=n.slice();return s[7]=e[t],s}function mn(n){let e,t,s,i,l,r,o,f,a;return{c(){e=d("div"),t=d("p"),s=d("button"),i=M(),l=d("div"),r=d("img"),c(s,"type","button"),c(s,"class","btn-close"),c(t,"class","bg-white text-end"),c(r,"class","img-fluid border border-5 border-white"),Ie(r.src,o="/"+n[2].path)||c(r,"src",o),c(r,"alt",""),c(l,"class","text-center"),c(e,"class","img-fullscreen svelte-z0la5k")},m(u,p){h(u,e,p),m(e,t),m(t,s),m(e,i),m(e,l),m(l,r),f||(a=[Q(s,"click",ee(n[5])),Q(e,"click",n[3])],f=!0)},p(u,p){p&4&&!Ie(r.src,o="/"+u[2].path)&&c(r,"src",o)},d(u){u&&k(e),f=!1,De(a)}}}function _n(n){let e,t,s=[],i=new Map,l=de(n[0]);const r=o=>o[7].id;for(let o=0;o<l.length;o+=1){let f=tt(n,l,o),a=r(f);i.set(a,s[o]=nt(a,f))}return{c(){e=d("div"),t=d("div");for(let o=0;o<s.length;o+=1)s[o].c();c(t,"class","row row-cols-1 row-cols-sm-3 g-4"),c(e,"class","col-lg")},m(o,f){h(o,e,f),m(e,t);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(t,null)},p(o,f){f&9&&(l=de(o[0]),s=At(s,f,r,1,o,l,i,t,Tt,nt,null,tt))},d(o){o&&k(e);for(let f=0;f<s.length;f+=1)s[f].d()}}}function nt(n,e){let t,s,i,l,r,o,f;function a(){return e[4](e[7])}return{key:n,first:null,c(){t=d("div"),s=d("div"),i=d("img"),r=M(),Ie(i.src,l="/"+e[7].path)||c(i,"src",l),c(i,"class","card-img-top"),c(i,"alt",""),c(s,"class","card"),ge(s,"max-width","18rem"),ge(s,"cursor","pointer"),c(t,"class","col"),this.first=t},m(u,p){h(u,t,p),m(t,s),m(s,i),m(t,r),o||(f=Q(i,"click",a),o=!0)},p(u,p){e=u,p&1&&!Ie(i.src,l="/"+e[7].path)&&c(i,"src",l)},d(u){u&&k(t),o=!1,f()}}}function bn(n){let e;function t(l,r){return l[1]?mn:_n}let s=t(n),i=s(n);return{c(){i.c(),e=fe()},m(l,r){i.m(l,r),h(l,e,r)},p(l,[r]){s===(s=t(l))&&i?i.p(l,r):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},i:K,o:K,d(l){l&&k(e),i.d(l)}}}function wn(n,e,t){let{images:s=[]}=e;var i=!1,l;yt(()=>{se("esc","images",function(u,p){i&&t(1,i=!1)})});var r;function o(u){r&&r.cancel(),r=Kt(()=>{t(1,i=!i),t(2,l=s.find(p=>p.id===u))},100,{maxWait:200}),r()}const f=u=>o(u.id),a=()=>t(1,i=!i);return n.$$set=u=>{"images"in u&&t(0,s=u.images)},n.$$.update=()=>{n.$$.dirty&2&&(i?se.setScope("images"):se.setScope("questions"))},[s,i,l,o,f,a]}class pn extends ye{constructor(e){super(),Ae(this,e,wn,bn,we,{images:0})}}function st(n,e,t){const s=n.slice();return s[12]=e[t],s}function it(n,e,t){const s=n.slice();return s[12]=e[t],s}function lt(n){let e,t,s,i=n[12].name+"",l,r,o,f,a,u,p;function C(){return n[7](n[12])}return{c(){e=d("div"),t=d("div"),s=d("a"),l=ve(i),o=M(),f=d("div"),a=d("button"),a.textContent="Add",c(s,"href",r="/decks/"+n[12].id),c(s,"class","link-dark"),c(t,"class","col-9 text-overflow svelte-1gfmo48"),c(a,"class","btn btn-sm btn-primary float-end"),c(f,"class","col-3 d-grid gap-4"),c(e,"class","row mb-1")},m(v,w){h(v,e,w),m(e,t),m(t,s),m(s,l),m(e,o),m(e,f),m(f,a),u||(p=Q(a,"click",ee(C)),u=!0)},p(v,w){n=v,w&2&&i!==(i=n[12].name+"")&&Ve(l,i),w&2&&r!==(r="/decks/"+n[12].id)&&c(s,"href",r)},d(v){v&&k(e),u=!1,p()}}}function rt(n){let e;return{c(){e=d("hr")},m(t,s){h(t,e,s)},d(t){t&&k(e)}}}function ot(n){let e,t,s,i=n[12].name+"",l,r,o,f,a,u,p;function C(){return n[8](n[12])}return{c(){e=d("div"),t=d("div"),s=d("a"),l=ve(i),o=M(),f=d("div"),a=d("button"),a.textContent="Remove",c(s,"href",r="/decks/"+n[12].id),c(s,"class","link-dark"),c(t,"class","col-9 text-overflow svelte-1gfmo48"),c(a,"class","btn btn-sm btn-outline-secondary float-end"),c(f,"class","col-3 d-grid gap-4"),c(e,"class","row mb-1")},m(v,w){h(v,e,w),m(e,t),m(t,s),m(s,l),m(e,o),m(e,f),m(f,a),u||(p=Q(a,"click",ee(C)),u=!0)},p(v,w){n=v,w&1&&i!==(i=n[12].name+"")&&Ve(l,i),w&1&&r!==(r="/decks/"+n[12].id)&&c(s,"href",r)},d(v){v&&k(e),u=!1,p()}}}function ft(n){let e;return{c(){e=d("p"),e.textContent="You don't have any decks yet."},m(t,s){h(t,e,s)},d(t){t&&k(e)}}}function gn(n){let e,t,s,i,l,r,o,f,a,u,p,C,v,w,b,y,H,A,I,J,j,D,T=de(n[1]),_=[];for(let q=0;q<T.length;q+=1)_[q]=lt(it(n,T,q));let E=n[1].length>0&&n[0].length>0&&rt(),g=de(n[0]),O=[];for(let q=0;q<g.length;q+=1)O[q]=ot(st(n,g,q));let P=n[1].length===0&&n[0].length===0&&ft();return{c(){e=d("button"),e.innerHTML='<i class="bi bi-collection"></i> Add to deck',t=M(),s=d("div"),i=d("div"),i.innerHTML='<h5 id="offcanvasAddToDeckLabel">Add question to deck</h5> <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>',l=M(),r=d("div");for(let q=0;q<_.length;q+=1)_[q].c();o=M(),E&&E.c(),f=M();for(let q=0;q<O.length;q+=1)O[q].c();a=M(),P&&P.c(),u=M(),p=d("hr"),C=M(),v=d("div"),w=d("div"),b=d("p"),b.textContent="Create new deck:",y=M(),H=d("div"),A=d("input"),I=M(),J=d("button"),J.textContent="Create deck and add question",c(e,"class","btn btn-outline-secondary btn-sm"),c(e,"type","button"),c(e,"data-bs-toggle","offcanvas"),c(e,"data-bs-target","#offcanvasAddToDeck"),c(e,"aria-controls","offcanvasAddToDeck"),c(i,"class","offcanvas-header"),c(A,"type","text"),c(A,"class","form-control"),c(A,"id","name"),c(A,"name","name"),c(A,"placeholder","My new deck ..."),c(H,"class","mb-3"),c(J,"class","btn btn-sm btn-primary"),c(w,"class","col"),c(v,"class","row"),c(r,"class","offcanvas-body"),c(s,"class","offcanvas offcanvas-end"),c(s,"tabindex","-1"),c(s,"id","offcanvasAddToDeck"),c(s,"aria-labelledby","offcanvasAddToDeckLabel")},m(q,ie){h(q,e,ie),h(q,t,ie),h(q,s,ie),m(s,i),m(s,l),m(s,r);for(let L=0;L<_.length;L+=1)_[L]&&_[L].m(r,null);m(r,o),E&&E.m(r,null),m(r,f);for(let L=0;L<O.length;L+=1)O[L]&&O[L].m(r,null);m(r,a),P&&P.m(r,null),m(r,u),m(r,p),m(r,C),m(r,v),m(v,w),m(w,b),m(w,y),m(w,H),m(H,A),Je(A,n[2]),m(w,I),m(w,J),j||(D=[Q(A,"input",n[9]),Q(J,"click",ee(n[10]))],j=!0)},p(q,[ie]){if(ie&10){T=de(q[1]);let L;for(L=0;L<T.length;L+=1){const ce=it(q,T,L);_[L]?_[L].p(ce,ie):(_[L]=lt(ce),_[L].c(),_[L].m(r,o))}for(;L<_.length;L+=1)_[L].d(1);_.length=T.length}if(q[1].length>0&&q[0].length>0?E||(E=rt(),E.c(),E.m(r,f)):E&&(E.d(1),E=null),ie&17){g=de(q[0]);let L;for(L=0;L<g.length;L+=1){const ce=st(q,g,L);O[L]?O[L].p(ce,ie):(O[L]=ot(ce),O[L].c(),O[L].m(r,a))}for(;L<O.length;L+=1)O[L].d(1);O.length=g.length}q[1].length===0&&q[0].length===0?P||(P=ft(),P.c(),P.m(r,u)):P&&(P.d(1),P=null),ie&4&&A.value!==q[2]&&Je(A,q[2])},i:K,o:K,d(q){q&&(k(e),k(t),k(s)),We(_,q),E&&E.d(),We(O,q),P&&P.d(),j=!1,De(D)}}}function hn(n,e,t){let{questionId:s}=e,i=[],l=[],r="";yt(()=>{const b=document.getElementById("offcanvasAddToDeck");b.addEventListener("show.bs.offcanvas",y=>{o()}),b.addEventListener("hidden.bs.offcanvas",y=>{t(0,i=[]),t(1,l=[])})});function o(){axios.get("/api/decks/withquestionids").then(function(b){var y=b.data;y.forEach(H=>{H.questions.some(A=>A.id===s)?t(0,i=[...i,{id:H.id,name:H.name}]):t(1,l=[...l,{id:H.id,name:H.name}])})}).catch(function(b){console.log(b),alert(b)})}function f(b){axios.post("/api/decks/"+b+"/addquestion",{question_id:s}).then(function(y){const H=l.find(A=>A.id===b);t(0,i=[...i,H]),t(1,l=l.filter(A=>A.id!==b))}).catch(function(y){alert(y)})}function a(b){axios.post("/api/decks/"+b+"/removequestion",{question_id:s}).then(function(y){const H=i.find(A=>A.id===b);t(1,l=[...l,H]),t(0,i=i.filter(A=>A.id!==b))}).catch(function(y){alert(y)})}function u(){r&&axios.post("/api/decks",{name:r}).then(function(b){const y=b.data;t(1,l=[...l,y]),f(y.id),t(2,r="")}).catch(function(b){alert(b)})}const p=b=>f(b.id),C=b=>a(b.id);function v(){r=this.value,t(2,r)}const w=()=>u();return n.$$set=b=>{"questionId"in b&&t(6,s=b.questionId)},[i,l,r,f,a,u,s,p,C,v,w]}class kn extends ye{constructor(e){super(),Ae(this,e,hn,gn,we,{questionId:6})}}function ct(n,e,t){const s=n.slice();return s[23]=e[t],s[24]=e,s[25]=t,s}function vn(n){let e;return{c(){e=d("p"),e.textContent="Loading ..."},m(t,s){h(t,e,s)},p:K,i:K,o:K,d(t){t&&k(e)}}}function yn(n){let e,t,s,i,l;const r=[Cn,An],o=[];function f(u,p){return u[9]?0:1}e=f(n),t=o[e]=r[e](n);let a=!n[1].isAnswered&&!n[3]&&n[0].type!=="card"&&vt(n);return{c(){t.c(),s=M(),a&&a.c(),i=fe()},m(u,p){o[e].m(u,p),h(u,s,p),a&&a.m(u,p),h(u,i,p),l=!0},p(u,p){let C=e;e=f(u),e===C?o[e].p(u,p):(ke(),R(o[C],1,1,()=>{o[C]=null}),he(),t=o[e],t?t.p(u,p):(t=o[e]=r[e](u),t.c()),V(t,1),t.m(s.parentNode,s)),!u[1].isAnswered&&!u[3]&&u[0].type!=="card"?a?a.p(u,p):(a=vt(u),a.c(),a.m(i.parentNode,i)):a&&(a.d(1),a=null)},i(u){l||(V(t),l=!0)},o(u){R(t),l=!1},d(u){u&&(k(s),k(i)),o[e].d(u),a&&a.d(u)}}}function An(n){let e,t,s,i,l,r,o,f,a,u,p,C,v,w,b,y,H,A,I,J,j,D,T,_,E,g,O,P,q,ie,L,ce=n[0].id,Ke,pe,Ne,Fe,te=n[0].is_invalid&&at(),ne=n[0].needs_review&&ut(),W=n[0].case&&dt(n),X=n[0].text&&mt(n),U=n[0].images&&n[0].images.length>0&&_t(n),Y=!n[3]&&n[0].hint&&bt(n);const Re=[En,Mn,Ln],ae=[];function Ge(S,B){return S[0].type==="mc"?0:S[0].answers.length===0?1:2}a=Ge(n),u=ae[a]=Re[a](n);let Z=!n[3]&&n[1].isAnswered&&n[0].comment&&pt(n),x=n[1].isAnswered&&n[6]!==-1&&gt(n),$=n[5]&&ht(n),le=kt(n);return{c(){e=d("div"),te&&te.c(),t=M(),ne&&ne.c(),s=M(),W&&W.c(),i=M(),l=d("div"),X&&X.c(),r=M(),U&&U.c(),o=M(),Y&&Y.c(),f=M(),u.c(),p=M(),Z&&Z.c(),C=M(),v=d("div"),w=d("div"),b=d("div"),y=d("button"),y.textContent="More",H=M(),A=d("ul"),x&&x.c(),I=M(),J=d("li"),j=d("a"),D=d("i"),T=ve(" Open in new tab"),E=M(),g=d("li"),g.innerHTML='<hr class="dropdown-divider"/>',O=M(),P=d("li"),q=d("button"),q.innerHTML='<i class="bi bi-pencil"></i> Edit question',ie=M(),$&&$.c(),L=M(),le.c(),c(l,"class","row border-start border-3 border-dark m-1 mb-3 pt-2"),c(y,"class","btn btn-outline-secondary btn-sm dropdown-toggle"),c(y,"type","button"),c(y,"data-bs-toggle","dropdown"),c(y,"aria-expanded","false"),c(D,"class","bi bi-box-arrow-up-right"),c(j,"class","dropdown-item btn btn-sm"),c(j,"href",_="/questions/"+n[0].id),c(j,"target","_blank"),c(j,"role","button"),c(q,"type","button"),c(q,"class","dropdown-item btn btn-sm"),c(A,"class","dropdown-menu"),c(b,"class","btn-group me-1"),c(w,"class","d-flex justify-content-end"),c(v,"class","row mt-1 mb-1 pt-2"),c(e,"id",Ke="question"+n[0].id)},m(S,B){h(S,e,B),te&&te.m(e,null),m(e,t),ne&&ne.m(e,null),m(e,s),W&&W.m(e,null),m(e,i),m(e,l),X&&X.m(l,null),m(l,r),U&&U.m(l,null),m(e,o),Y&&Y.m(e,null),m(e,f),ae[a].m(e,null),m(e,p),Z&&Z.m(e,null),m(e,C),m(e,v),m(v,w),m(w,b),m(b,y),m(b,H),m(b,A),x&&x.m(A,null),m(A,I),m(A,J),m(J,j),m(j,D),m(j,T),m(A,E),m(A,g),m(A,O),m(A,P),m(P,q),m(A,ie),$&&$.m(A,null),m(w,L),le.m(w,null),pe=!0,Ne||(Fe=Q(q,"click",ee(n[11])),Ne=!0)},p(S,B){S[0].is_invalid?te||(te=at(),te.c(),te.m(e,t)):te&&(te.d(1),te=null),S[0].needs_review?ne||(ne=ut(),ne.c(),ne.m(e,s)):ne&&(ne.d(1),ne=null),S[0].case?W?W.p(S,B):(W=dt(S),W.c(),W.m(e,i)):W&&(W.d(1),W=null),S[0].text?X?X.p(S,B):(X=mt(S),X.c(),X.m(l,r)):X&&(X.d(1),X=null),S[0].images&&S[0].images.length>0?U?(U.p(S,B),B&1&&V(U,1)):(U=_t(S),U.c(),V(U,1),U.m(l,null)):U&&(ke(),R(U,1,1,()=>{U=null}),he()),!S[3]&&S[0].hint?Y?Y.p(S,B):(Y=bt(S),Y.c(),Y.m(e,f)):Y&&(Y.d(1),Y=null);let je=a;a=Ge(S),a===je?ae[a].p(S,B):(ke(),R(ae[je],1,1,()=>{ae[je]=null}),he(),u=ae[a],u?u.p(S,B):(u=ae[a]=Re[a](S),u.c()),V(u,1),u.m(e,p)),!S[3]&&S[1].isAnswered&&S[0].comment?Z?Z.p(S,B):(Z=pt(S),Z.c(),Z.m(e,C)):Z&&(Z.d(1),Z=null),S[1].isAnswered&&S[6]!==-1?x?x.p(S,B):(x=gt(S),x.c(),x.m(A,I)):x&&(x.d(1),x=null),(!pe||B&1&&_!==(_="/questions/"+S[0].id))&&c(j,"href",_),S[5]?$?$.p(S,B):($=ht(S),$.c(),$.m(A,null)):$&&($.d(1),$=null),B&1&&we(ce,ce=S[0].id)?(ke(),R(le,1,1,K),he(),le=kt(S),le.c(),V(le,1),le.m(w,null)):le.p(S,B),(!pe||B&1&&Ke!==(Ke="question"+S[0].id))&&c(e,"id",Ke)},i(S){pe||(V(U),V(u),V(le),pe=!0)},o(S){R(U),R(u),R(le),pe=!1},d(S){S&&k(e),te&&te.d(),ne&&ne.d(),W&&W.d(),X&&X.d(),U&&U.d(),Y&&Y.d(),ae[a].d(),Z&&Z.d(),x&&x.d(),$&&$.d(),le.d(S),Ne=!1,Fe()}}}function Cn(n){let e,t,s,i;function l(o){n[14](o)}let r={toggleEditor:n[11]};return n[0]!==void 0&&(r.question=n[0]),t=new zt({props:r}),me.push(()=>_e(t,"question",l)),{c(){e=d("div"),Ce(t.$$.fragment),c(e,"class","my-5 pt-1 pb-3 border-dark"),ge(e,"border-top","dotted"),ge(e,"border-bottom","dotted"),ge(e,"border-width","1px")},m(o,f){h(o,e,f),Se(t,e,null),i=!0},p(o,f){const a={};!s&&f&1&&(s=!0,a.question=o[0],be(()=>s=!1)),t.$set(a)},i(o){i||(V(t.$$.fragment,o),i=!0)},o(o){R(t.$$.fragment,o),i=!1},d(o){o&&k(e),qe(t)}}}function at(n){let e;return{c(){e=d("div"),e.innerHTML='<div class="col"><div class="alert alert-light" role="alert"><i class="bi bi-cone-striped"></i> <strong>Question is marked invalid</strong> and safe to skip!</div></div>',c(e,"class","row")},m(t,s){h(t,e,s)},d(t){t&&k(e)}}}function ut(n){let e;return{c(){e=d("div"),e.innerHTML='<div class="col"><div class="alert alert-light" role="alert"><i class="bi bi-eraser-fill"></i> <strong>Question needs review</strong> - Please review the question and answer choices and make sure they are correct and clear. Afterwards, remove the &quot;Needs review&quot; flag.</div></div>',c(e,"class","row")},m(t,s){h(t,e,s)},d(t){t&&k(e)}}}function dt(n){let e,t,s,i,l=G.sanitize(n[0].case.text)+"";return{c(){e=d("div"),t=d("p"),t.innerHTML='<i class="bi bi-clipboard2-pulse"></i> CASE',s=M(),i=d("p"),c(t,"class","small fw-bold"),c(e,"class","alert alert-light"),c(e,"role","alert")},m(r,o){h(r,e,o),m(e,t),m(e,s),m(e,i),i.innerHTML=l},p(r,o){o&1&&l!==(l=G.sanitize(r[0].case.text)+"")&&(i.innerHTML=l)},d(r){r&&k(e)}}}function mt(n){let e,t,s=G.sanitize(n[0].text)+"";return{c(){e=d("div"),t=d("p"),c(t,"id","questionText"),c(e,"class","col-lg")},m(i,l){h(i,e,l),m(e,t),t.innerHTML=s},p(i,l){l&1&&s!==(s=G.sanitize(i[0].text)+"")&&(t.innerHTML=s)},d(i){i&&k(e)}}}function _t(n){let e,t,s;function i(r){n[15](r)}let l={};return n[0].images!==void 0&&(l.images=n[0].images),e=new pn({props:l}),me.push(()=>_e(e,"images",i)),{c(){Ce(e.$$.fragment)},m(r,o){Se(e,r,o),s=!0},p(r,o){const f={};!t&&o&1&&(t=!0,f.images=r[0].images,be(()=>t=!1)),e.$set(f)},i(r){s||(V(e.$$.fragment,r),s=!0)},o(r){R(e.$$.fragment,r),s=!1},d(r){qe(e,r)}}}function bt(n){let e;function t(l,r){return l[10]?qn:Sn}let s=t(n),i=s(n);return{c(){i.c(),e=fe()},m(l,r){i.m(l,r),h(l,e,r)},p(l,r){s===(s=t(l))&&i?i.p(l,r):(i.d(1),i=s(l),i&&(i.c(),i.m(e.parentNode,e)))},d(l){l&&k(e),i.d(l)}}}function Sn(n){let e,t,s;return{c(){e=d("button"),e.innerHTML='<i class="bi bi-question"></i> Show hint',c(e,"type","button"),c(e,"class","btn btn-outline-secondary btn-sm mb-3")},m(i,l){h(i,e,l),t||(s=Q(e,"click",ee(n[16])),t=!0)},p:K,d(i){i&&k(e),t=!1,s()}}}function qn(n){let e,t,s=G.sanitize(n[0].hint)+"";return{c(){e=d("div"),t=d("p"),c(e,"class","row border-start border-3 border-secondary-subtle m-1 mt-3 mb-3")},m(i,l){h(i,e,l),m(e,t),t.innerHTML=s},p(i,l){l&1&&s!==(s=G.sanitize(i[0].hint)+"")&&(t.innerHTML=s)},d(i){i&&k(e)}}}function Ln(n){let e,t,s;function i(r){n[21](r)}let l={submitAnswer:n[7],hasAnswer:!!n[6]};return n[0].answers[0]!==void 0&&(l.answer=n[0].answers[0]),e=new cn({props:l}),me.push(()=>_e(e,"answer",i)),{c(){Ce(e.$$.fragment)},m(r,o){Se(e,r,o),s=!0},p(r,o){const f={};o&128&&(f.submitAnswer=r[7]),o&64&&(f.hasAnswer=!!r[6]),!t&&o&1&&(t=!0,f.answer=r[0].answers[0],be(()=>t=!1)),e.$set(f)},i(r){s||(V(e.$$.fragment,r),s=!0)},o(r){R(e.$$.fragment,r),s=!1},d(r){qe(e,r)}}}function Mn(n){let e,t;return e=new dn({props:{submitAnswer:n[7],hasAnswer:!!n[6]}}),{c(){Ce(e.$$.fragment)},m(s,i){Se(e,s,i),t=!0},p(s,i){const l={};i&128&&(l.submitAnswer=s[7]),i&64&&(l.hasAnswer=!!s[6]),e.$set(l)},i(s){t||(V(e.$$.fragment,s),t=!0)},o(s){R(e.$$.fragment,s),t=!1},d(s){qe(e,s)}}}function En(n){let e=[],t=new Map,s,i,l=de(n[0].answers);const r=o=>o[23].id;for(let o=0;o<l.length;o+=1){let f=ct(n,l,o),a=r(f);t.set(a,e[o]=wt(a,f))}return{c(){for(let o=0;o<e.length;o+=1)e[o].c();s=fe()},m(o,f){for(let a=0;a<e.length;a+=1)e[a]&&e[a].m(o,f);h(o,s,f),i=!0},p(o,f){f&155&&(l=de(o[0].answers),ke(),e=At(e,f,r,1,o,l,t,s.parentNode,Ot,wt,s,ct),he())},i(o){if(!i){for(let f=0;f<l.length;f+=1)V(e[f]);i=!0}},o(o){for(let f=0;f<e.length;f+=1)R(e[f]);i=!1},d(o){o&&k(s);for(let f=0;f<e.length;f+=1)e[f].d(o)}}}function wt(n,e){let t,s,i,l,r,o,f;function a(w){e[17](w,e[23],e[24],e[25])}function u(w){e[18](w,e[23])}function p(w){e[19](w)}function C(w){e[20](w)}let v={submitAnswer:e[7],questionIsAnswered:e[1].isAnswered,answerNumber:e[25]+1};return e[23]!==void 0&&(v.answer=e[23]),e[1].answerContext[e[23].id]!==void 0&&(v.answerContext=e[1].answerContext[e[23].id]),e[3]!==void 0&&(v.examMode=e[3]),e[4]!==void 0&&(v.settingsShowAnswerStats=e[4]),s=new sn({props:v}),me.push(()=>_e(s,"answer",a)),me.push(()=>_e(s,"answerContext",u)),me.push(()=>_e(s,"examMode",p)),me.push(()=>_e(s,"settingsShowAnswerStats",C)),{key:n,first:null,c(){t=fe(),Ce(s.$$.fragment),this.first=t},m(w,b){h(w,t,b),Se(s,w,b),f=!0},p(w,b){e=w;const y={};b&128&&(y.submitAnswer=e[7]),b&2&&(y.questionIsAnswered=e[1].isAnswered),b&1&&(y.answerNumber=e[25]+1),!i&&b&1&&(i=!0,y.answer=e[23],be(()=>i=!1)),!l&&b&3&&(l=!0,y.answerContext=e[1].answerContext[e[23].id],be(()=>l=!1)),!r&&b&8&&(r=!0,y.examMode=e[3],be(()=>r=!1)),!o&&b&16&&(o=!0,y.settingsShowAnswerStats=e[4],be(()=>o=!1)),s.$set(y)},i(w){f||(V(s.$$.fragment,w),f=!0)},o(w){R(s.$$.fragment,w),f=!1},d(w){w&&k(t),qe(s,w)}}}function pt(n){let e,t,s,i=G.sanitize(n[0].comment)+"";return{c(){e=d("div"),t=d("div"),s=d("div"),c(s,"class","alert alert-light"),c(s,"role","alert"),c(t,"class","col"),c(e,"class","row")},m(l,r){h(l,e,r),m(e,t),m(t,s),s.innerHTML=i},p(l,r){r&1&&i!==(i=G.sanitize(l[0].comment)+"")&&(s.innerHTML=i)},d(l){l&&k(e)}}}function gt(n){let e,t,s,i;return{c(){e=d("li"),t=d("button"),t.innerHTML='<i class="bi bi-arrow-counterclockwise"></i> Reset answer',c(t,"type","button"),c(t,"class","dropdown-item btn btn-sm")},m(l,r){h(l,e,r),m(e,t),s||(i=Q(t,"click",ee(function(){Et(n[8])&&n[8].apply(this,arguments)})),s=!0)},p(l,r){n=l},d(l){l&&k(e),s=!1,i()}}}function ht(n){let e,t,s,i,l,r,o;return{c(){e=d("li"),e.innerHTML='<hr class="dropdown-divider"/>',t=M(),s=d("li"),i=d("a"),l=d("i"),r=ve(" Open in deck editor"),c(l,"class","bi bi-collection"),c(i,"class","dropdown-item btn btn-sm"),c(i,"href",o="/decks/"+n[5]+"/questions/edit?question_id="+n[0].id),c(i,"role","button")},m(f,a){h(f,e,a),h(f,t,a),h(f,s,a),m(s,i),m(i,l),m(i,r)},p(f,a){a&33&&o!==(o="/decks/"+f[5]+"/questions/edit?question_id="+f[0].id)&&c(i,"href",o)},d(f){f&&(k(e),k(t),k(s))}}}function kt(n){let e,t;return e=new kn({props:{questionId:n[0].id}}),{c(){Ce(e.$$.fragment)},m(s,i){Se(e,s,i),t=!0},p(s,i){const l={};i&1&&(l.questionId=s[0].id),e.$set(l)},i(s){t||(V(e.$$.fragment,s),t=!0)},o(s){R(e.$$.fragment,s),t=!1},d(s){qe(e,s)}}}function vt(n){let e,t,s,i;return{c(){e=d("div"),t=d("button"),t.textContent="→ Show answer",c(t,"type","button"),c(t,"class","btn btn-outline-secondary btn-sm"),c(e,"class","mt-3")},m(l,r){h(l,e,r),m(e,t),s||(i=Q(t,"click",ee(n[22])),s=!0)},p:K,d(l){l&&k(e),s=!1,i()}}}function Tn(n){let e,t,s,i;const l=[yn,vn],r=[];function o(f,a){return f[0]?0:1}return e=o(n),t=r[e]=l[e](n),{c(){t.c(),s=fe()},m(f,a){r[e].m(f,a),h(f,s,a),i=!0},p(f,[a]){let u=e;e=o(f),e===u?r[e].p(f,a):(ke(),R(r[u],1,1,()=>{r[u]=null}),he(),t=r[e],t?t.p(f,a):(t=r[e]=l[e](f),t.c()),V(t,1),t.m(s.parentNode,s))},i(f){i||(V(t),i=!0)},o(f){R(t),i=!1},d(f){f&&k(s),r[e].d(f)}}}function On(n){const e=n.target;!e.classList.contains("bg-danger-subtle")&&!e.classList.contains("bg-warning-subtle")&&!e.classList.contains("bg-success-subtle")?e.classList.add("bg-success-subtle"):e.classList.contains("bg-success-subtle")?(e.classList.remove("bg-success-subtle"),e.classList.add("bg-danger-subtle")):e.classList.contains("bg-danger-subtle")?(e.classList.remove("bg-danger-subtle"),e.classList.add("bg-warning-subtle")):e.classList.contains("bg-warning-subtle")&&e.classList.remove("bg-warning-subtle")}function Kn(n,e,t){let{deckId:s}=e,{question:i}=e,{questionContext:l}=e,{helpUsed:r}=e,{answerChoice:o}=e,{submitAnswer:f}=e,{deleteAnswer:a}=e,{examMode:u}=e,{updateCurrentQuestionData:p}=e,{settingsShuffleAnswers:C}=e,{settingsShowAnswerStats:v}=e;var w=!1,b=l.isAnswered;function y(){const g=!w;g&&p?p().then(()=>{t(9,w=g)}):t(9,w=g)}function H(g){i=g,t(0,i),t(13,C),t(1,l)}function A(g){n.$$.not_equal(i.images,g)&&(i.images=g,t(0,i),t(13,C),t(1,l))}const I=()=>{t(10,b=!0),t(2,r=!0)};function J(g,O,P,q){P[q]=g,t(0,i),t(13,C),t(1,l)}function j(g,O){n.$$.not_equal(l.answerContext[O.id],g)&&(l.answerContext[O.id]=g,t(1,l))}function D(g){u=g,t(3,u)}function T(g){v=g,t(4,v)}function _(g){n.$$.not_equal(i.answers[0],g)&&(i.answers[0]=g,t(0,i),t(13,C),t(1,l))}const E=()=>f();return n.$$set=g=>{"deckId"in g&&t(5,s=g.deckId),"question"in g&&t(0,i=g.question),"questionContext"in g&&t(1,l=g.questionContext),"helpUsed"in g&&t(2,r=g.helpUsed),"answerChoice"in g&&t(6,o=g.answerChoice),"submitAnswer"in g&&t(7,f=g.submitAnswer),"deleteAnswer"in g&&t(8,a=g.deleteAnswer),"examMode"in g&&t(3,u=g.examMode),"updateCurrentQuestionData"in g&&t(12,p=g.updateCurrentQuestionData),"settingsShuffleAnswers"in g&&t(13,C=g.settingsShuffleAnswers),"settingsShowAnswerStats"in g&&t(4,v=g.settingsShowAnswerStats)},n.$$.update=()=>{n.$$.dirty&8195&&(i.answers.forEach((g,O)=>{g.badgeText="ABCDEFGHIJKLMN".charAt(O)}),i&&i.type==="mc"&&C&&!l.isAnswered&&!Object.values(l.answerContext).some(g=>g.isSelectedAnswer)&&t(0,i.answers=Ht.shuffle(i.answers),i)),n.$$.dirty&3&&(t(10,b=l.isAnswered),t(2,r=l.isAnswered)),n.$$.dirty&1&&(()=>{var g=document.querySelectorAll("#questionText li");[].map.call(g,function(O){O.addEventListener("click",On,!1)})})()},[i,l,r,u,v,s,o,f,a,w,b,y,p,C,H,A,I,J,j,D,T,_,E]}class jn extends ye{constructor(e){super(),Ae(this,e,Kn,Tn,we,{deckId:5,question:0,questionContext:1,helpUsed:2,answerChoice:6,submitAnswer:7,deleteAnswer:8,examMode:3,updateCurrentQuestionData:12,settingsShuffleAnswers:13,settingsShowAnswerStats:4})}}export{jn as S,se as h};
