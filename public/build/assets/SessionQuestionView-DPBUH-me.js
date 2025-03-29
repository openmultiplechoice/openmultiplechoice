import{d as Ae,p as Ce,s as Z,a as h,t as b,f as G,i as C,h as r,b as w,j as _e,q as V,c as v,e as Se,m as Fe,u as D,g as c,k as pe,n as ct}from"./if-DJ8jmZGH.js";import{Q as lt,k as vt}from"./QuestionForm-uUBDiIRv.js";import{a as me,p as H,e as je,i as Re}from"./event-modifiers-cAvxwkC8.js";import{h as fe}from"./html-BaFN2fvz.js";import{p as ke}from"./props-DBtqN3KN.js";import{r as we}from"./legacy-client-CpNAQbdg.js";import{p as be,d as ut}from"./purify.es-RntO0bhN.js";import{_ as ft}from"./lodash-toHr6svX.js";import{s as bt}from"./class-BeGuEePz.js";import{o as Xe}from"./index-client-BY1UbLQj.js";import{b as Ge}from"./input-lrw4gelW.js";import{b as mt}from"./this-eq_aegc4.js";const Pe=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Qe(t,e,s,n){t.addEventListener?t.addEventListener(e,s,n):t.attachEvent&&t.attachEvent("on".concat(e),s)}function Ee(t,e,s,n){t.removeEventListener?t.removeEventListener(e,s,n):t.detachEvent&&t.detachEvent("on".concat(e),s)}function Ye(t,e){const s=e.slice(0,e.length-1);for(let n=0;n<s.length;n++)s[n]=t[s[n].toLowerCase()];return s}function Ze(t){typeof t!="string"&&(t=""),t=t.replace(/\s/g,"");const e=t.split(",");let s=e.lastIndexOf("");for(;s>=0;)e[s-1]+=",",e.splice(s,1),s=e.lastIndexOf("");return e}function wt(t,e){const s=t.length>=e.length?t:e,n=t.length>=e.length?e:t;let a=!0;for(let o=0;o<s.length;o++)n.indexOf(s[o])===-1&&(a=!1);return a}const Ke={backspace:8,"⌫":8,tab:9,clear:12,enter:13,"↩":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"⇪":20,",":188,".":190,"/":191,"`":192,"-":Pe?173:189,"=":Pe?61:187,";":Pe?59:186,"'":222,"[":219,"]":221,"\\":220},re={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,cmd:91,command:91},Te={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},N={16:!1,18:!1,17:!1,91:!1},K={};for(let t=1;t<20;t++)Ke["f".concat(t)]=111+t;let E=[],Oe=null,$e="all";const le=new Map,Ie=t=>Ke[t.toLowerCase()]||re[t.toLowerCase()]||t.toUpperCase().charCodeAt(0),_t=t=>Object.keys(Ke).find(e=>Ke[e]===t),gt=t=>Object.keys(re).find(e=>re[e]===t);function et(t){$e=t||"all"}function Me(){return $e||"all"}function ht(){return E.slice(0)}function yt(){return E.map(t=>_t(t)||gt(t)||String.fromCharCode(t))}function pt(){const t=[];return Object.keys(K).forEach(e=>{K[e].forEach(s=>{let{key:n,scope:a,mods:o,shortcut:f}=s;t.push({scope:a,shortcut:f,mods:o,keys:n.split("+").map(d=>Ie(d))})})}),t}function xt(t){const e=t.target||t.srcElement,{tagName:s}=e;let n=!0;const a=s==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(e.type);return(e.isContentEditable||(a||s==="TEXTAREA"||s==="SELECT")&&!e.readOnly)&&(n=!1),n}function kt(t){return typeof t=="string"&&(t=Ie(t)),E.indexOf(t)!==-1}function At(t,e){let s,n;t||(t=Me());for(const a in K)if(Object.prototype.hasOwnProperty.call(K,a))for(s=K[a],n=0;n<s.length;)s[n].scope===t?s.splice(n,1).forEach(f=>{let{element:d}=f;return Ue(d)}):n++;Me()===t&&et(e||"all")}function Ct(t){let e=t.keyCode||t.which||t.charCode;const s=E.indexOf(e);if(s>=0&&E.splice(s,1),t.key&&t.key.toLowerCase()==="meta"&&E.splice(0,E.length),(e===93||e===224)&&(e=91),e in N){N[e]=!1;for(const n in re)re[n]===e&&(W[n]=!1)}}function tt(t){if(typeof t>"u")Object.keys(K).forEach(a=>{Array.isArray(K[a])&&K[a].forEach(o=>De(o)),delete K[a]}),Ue(null);else if(Array.isArray(t))t.forEach(a=>{a.key&&De(a)});else if(typeof t=="object")t.key&&De(t);else if(typeof t=="string"){for(var e=arguments.length,s=new Array(e>1?e-1:0),n=1;n<e;n++)s[n-1]=arguments[n];let[a,o]=s;typeof a=="function"&&(o=a,a=""),De({key:t,scope:a,method:o,splitKey:"+"})}}const De=t=>{let{key:e,scope:s,method:n,splitKey:a="+"}=t;Ze(e).forEach(f=>{const d=f.split(a),g=d.length,q=d[g-1],L=q==="*"?"*":Ie(q);if(!K[L])return;s||(s=Me());const _=g>1?Ye(re,d):[],x=[];K[L]=K[L].filter(y=>{const m=(n?y.method===n:!0)&&y.scope===s&&wt(y.mods,_);return m&&x.push(y.element),!m}),x.forEach(y=>Ue(y))})};function Je(t,e,s,n){if(e.element!==n)return;let a;if(e.scope===s||e.scope==="all"){a=e.mods.length>0;for(const o in N)Object.prototype.hasOwnProperty.call(N,o)&&(!N[o]&&e.mods.indexOf(+o)>-1||N[o]&&e.mods.indexOf(+o)===-1)&&(a=!1);(e.mods.length===0&&!N[16]&&!N[18]&&!N[17]&&!N[91]||a||e.shortcut==="*")&&(e.keys=[],e.keys=e.keys.concat(E),e.method(t,e)===!1&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0)))}}function We(t,e){const s=K["*"];let n=t.keyCode||t.which||t.charCode;if(!W.filter.call(this,t))return;if((n===93||n===224)&&(n=91),E.indexOf(n)===-1&&n!==229&&E.push(n),["metaKey","ctrlKey","altKey","shiftKey"].forEach(d=>{const g=Te[d];t[d]&&E.indexOf(g)===-1?E.push(g):!t[d]&&E.indexOf(g)>-1?E.splice(E.indexOf(g),1):d==="metaKey"&&t[d]&&(E=E.filter(q=>q in Te||q===n))}),n in N){N[n]=!0;for(const d in re)re[d]===n&&(W[d]=!0);if(!s)return}for(const d in N)Object.prototype.hasOwnProperty.call(N,d)&&(N[d]=t[Te[d]]);t.getModifierState&&!(t.altKey&&!t.ctrlKey)&&t.getModifierState("AltGraph")&&(E.indexOf(17)===-1&&E.push(17),E.indexOf(18)===-1&&E.push(18),N[17]=!0,N[18]=!0);const a=Me();if(s)for(let d=0;d<s.length;d++)s[d].scope===a&&(t.type==="keydown"&&s[d].keydown||t.type==="keyup"&&s[d].keyup)&&Je(t,s[d],a,e);if(!(n in K))return;const o=K[n],f=o.length;for(let d=0;d<f;d++)if((t.type==="keydown"&&o[d].keydown||t.type==="keyup"&&o[d].keyup)&&o[d].key){const g=o[d],{splitKey:q}=g,L=g.key.split(q),_=[];for(let x=0;x<L.length;x++)_.push(Ie(L[x]));_.sort().join("")===E.sort().join("")&&Je(t,g,a,e)}}function W(t,e,s){E=[];const n=Ze(t);let a=[],o="all",f=document,d=0,g=!1,q=!0,L="+",_=!1,x=!1;for(s===void 0&&typeof e=="function"&&(s=e),Object.prototype.toString.call(e)==="[object Object]"&&(e.scope&&(o=e.scope),e.element&&(f=e.element),e.keyup&&(g=e.keyup),e.keydown!==void 0&&(q=e.keydown),e.capture!==void 0&&(_=e.capture),typeof e.splitKey=="string"&&(L=e.splitKey),e.single===!0&&(x=!0)),typeof e=="string"&&(o=e),x&&tt(t,o);d<n.length;d++)t=n[d].split(L),a=[],t.length>1&&(a=Ye(re,t)),t=t[t.length-1],t=t==="*"?"*":Ie(t),t in K||(K[t]=[]),K[t].push({keyup:g,keydown:q,scope:o,mods:a,shortcut:n[d],method:s,key:n[d],splitKey:L,element:f});if(typeof f<"u"&&window){if(!le.has(f)){const y=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;return We(m,f)},S=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.event;We(m,f),Ct(m)};le.set(f,{keydownListener:y,keyupListenr:S,capture:_}),Qe(f,"keydown",y,_),Qe(f,"keyup",S,_)}if(!Oe){const y=()=>{E=[]};Oe={listener:y,capture:_},Qe(window,"focus",y,_)}}}function St(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"all";Object.keys(K).forEach(s=>{K[s].filter(a=>a.scope===e&&a.shortcut===t).forEach(a=>{a&&a.method&&a.method()})})}function Ue(t){const e=Object.values(K).flat();if(e.findIndex(n=>{let{element:a}=n;return a===t})<0){const{keydownListener:n,keyupListenr:a,capture:o}=le.get(t)||{};n&&a&&(Ee(t,"keyup",a,o),Ee(t,"keydown",n,o),le.delete(t))}if((e.length<=0||le.size<=0)&&(Object.keys(le).forEach(a=>{const{keydownListener:o,keyupListenr:f,capture:d}=le.get(a)||{};o&&f&&(Ee(a,"keyup",f,d),Ee(a,"keydown",o,d),le.delete(a))}),le.clear(),Object.keys(K).forEach(a=>delete K[a]),Oe)){const{listener:a,capture:o}=Oe;Ee(window,"focus",a,o),Oe=null}}const Ne={getPressedKeyString:yt,setScope:et,getScope:Me,deleteScope:At,getPressedKeyCodes:ht,getAllKeyCodes:pt,isPressed:kt,filter:xt,trigger:St,unbind:tt,keyMap:Ke,modifier:re,modifierMap:Te};for(const t in Ne)Object.prototype.hasOwnProperty.call(Ne,t)&&(W[t]=Ne[t]);if(typeof window<"u"){const t=window.hotkeys;W.noConflict=e=>(e&&window.hotkeys===W&&(window.hotkeys=t),W),window.hotkeys=W}var qt=(t,e)=>e.submitAnswer(e.answer.id),Lt=b('<div class="col-1 border-start-3 cursor-pointer svelte-12xdzqf"><p class="badge text-dark my-0"></p></div>'),Et=b('<div class="col-1 border-start-3"><p class="badge text-dark my-0"></p></div>'),Ot=(t,e)=>e.submitAnswer(e.answer.id),Kt=b('<div class="col-9 cursor-pointer svelte-12xdzqf"><p class="px-1 my-0 trix-content"><!></p></div>'),Mt=b('<div class="col-9"><p class="px-1 my-0 trix-content"><!></p></div>'),It=b('<span class="badge text-muted" title="Percentage of users who chose this answer"> </span>'),Dt=b('<div class="d-flex justify-content-end align-items-center"><button type="button" class="btn btn-sm p-0"><span class="text-secondary">&cross;</span></button> <div class="vr mx-1"></div> <button type="button" class="btn btn-sm p-0"><span class="text-secondary">&check;</span></button></div>'),Tt=b('<span class="text-success-dark fw-bold fs-3">&check;</span>'),jt=b('<span class="text-success-dark fw-bold fs-3">&#8672;</span>'),zt=b('<span class="text-danger-dark fw-bold fs-3">&cross;</span>'),Pt=b('<span class="text-secondary fw-bold fs-3">&check;</span>'),Qt=b('<div class="col-1 border-3 border-start border-secondary-subtle"></div> <div class="col-11"><p class="p-1 trix-content"><!></p></div>',1),Nt=b('<div style="min-height: 3rem;"><!> <!> <div class="col-2"><div class="row text-end d-flex align-items-center"><div class="col"><!></div> <div class="col"><!></div></div></div></div> <div class="row ms-1 mb-2 me-1"><!></div>',1);function Ft(t,e){Ce(e,!0);var s=Z(void 0),n=Z(void 0),a=e.answer.badgeText;we(()=>{W.unbind(`${a}, ${e.answerNumber}`,"questions"),W(`${a}, ${e.answerNumber}`,"questions",function(){e.submitAnswer(e.answer.id)})}),we(()=>{e.answer&&(h(n,""),h(s,"border-secondary"),e.examMode||(e.questionIsAnswered?e.answerContext.isCorrectAnswer?h(s,"border-success"):e.answerContext.isSubmittedAnswer&&h(s,"border-danger"):e.answerContext.isSelectedAnswer&&h(s,"border-danger")))});var o=Nt(),f=G(o);let d;var g=r(f);{var q=i=>{var l=Lt();l.__click=[qt,e];var k=r(l);k.textContent=a,v(i,l)},L=i=>{var l=Et(),k=r(l);k.textContent=a,v(i,l)};C(g,i=>{!e.questionIsAnswered&&!e.answerContext.isSubmittedAnswer?i(q):i(L,!1)})}var _=w(g,2);{var x=i=>{var l=Kt();l.__click=[Ot,e];var k=r(l),O=r(k);fe(O,()=>be.sanitize(e.answer.text)),v(i,l)},y=i=>{var l=Mt(),k=r(l),O=r(k);fe(O,()=>be.sanitize(e.answer.text)),v(i,l)};C(_,i=>{!e.questionIsAnswered&&!e.answerContext.isSelectedAnswer?i(x):i(y,!1)})}var S=w(_,2),m=r(S),p=r(m),R=r(p);{var X=i=>{var l=It(),k=r(l);_e(()=>Fe(k,`${e.answer.answer_percentage??""}%`)),v(i,l)};C(R,i=>{e.questionIsAnswered&&!e.examMode&&e.settingsShowAnswerStats&&e.answer.answer_percentage!=null&&i(X)})}var se=w(p,2),ge=r(se);{var he=i=>{var l=Dt(),k=r(l),O=D(()=>H(()=>h(n,V(n)==="incorrect"?"":"incorrect",!0)));k.__click=function(...de){var Y;(Y=c(O))==null||Y.apply(this,de)};var U=w(k,4),$=D(()=>H(()=>h(n,V(n)==="correct"?"":"correct",!0)));U.__click=function(...de){var Y;(Y=c($))==null||Y.apply(this,de)},v(i,l)},z=(i,l)=>{{var k=U=>{var $=Tt();v(U,$)},O=(U,$)=>{{var de=ne=>{var ve=jt();v(ne,ve)},Y=(ne,ve)=>{{var T=j=>{var ee=zt();v(j,ee)},M=(j,ee)=>{{var ae=ce=>{var ye=Pt();v(ce,ye)};C(j,ce=>{e.examMode&&e.answerContext.isSubmittedAnswer&&ce(ae)},ee)}};C(ne,j=>{!e.examMode&&e.answerContext.isSubmittedAnswer?j(T):j(M,!1)},ve)}};C(U,ne=>{!e.examMode&&e.answerContext.isCorrectAnswer&&!e.answerContext.isSubmittedAnswer&&e.questionIsAnswered?ne(de):ne(Y,!1)},$)}};C(i,U=>{!e.examMode&&e.answerContext.isCorrectAnswer&&e.answerContext.isSubmittedAnswer?U(k):U(O,!1)},l)}};C(ge,i=>{!e.questionIsAnswered&&!e.answerContext.isSelectedAnswer?i(he):i(z,!1)})}var P=w(f,2),F=r(P);{var oe=i=>{var l=Qt(),k=w(G(l),2),O=r(k),U=r(O);fe(U,()=>be.sanitize(e.answer.hint)),v(i,l)};C(F,i=>{!e.examMode&&e.answer.hint&&(e.questionIsAnswered||e.answerContext.isSelectedAnswer)&&i(oe)})}_e(i=>{me(f,"id",`answer${e.answer.id??""}`),d=bt(f,1,`row border-start border-3 m-1 py-2 d-flex align-items-center ${V(s)??""}`,"svelte-12xdzqf",d,i)},[()=>({"bg-light":e.examMode||!e.questionIsAnswered&&!e.answerContext.isSelectedAnswer&&!e.answerContext.isSubmittedAnswer||e.questionIsAnswered&&!e.answerContext.isSubmittedAnswer&&!e.answerContext.isCorrectAnswer,"text-bg-success":!e.examMode&&e.questionIsAnswered&&e.answerContext.isCorrectAnswer,"text-bg-danger":!e.examMode&&e.answerContext.isSelectedAnswer&&!e.answerContext.isCorrectAnswer,"bg-incorrect":V(n)==="incorrect","bg-correct":V(n)==="correct"})]),v(t,o),Se()}Ae(["click"]);var Ut=b('<div class="row"><div class="col-md-6 mb-1"><button type="button" class="btn btn-danger btn-sm w-100">Ask me again</button></div> <div class="col-md-6 mb-1"><button type="button" class="btn btn-success btn-sm w-100">I got it!</button></div></div>'),Vt=b('<div class="row border-light border-start border-3 m-1 p-2"><p class="p-1"><!></p></div> <!>',1),Bt=b('<div class="row"><div class="col-md"><button type="button" class="btn btn-warning btn-sm w-100">Show answer</button></div></div>');function Ht(t,e){Ce(e,!0);var s=Z(!1);we(()=>{e.hasAnswer?h(s,!0):h(s,!1)});function n(){h(s,!V(s))}var a=pe(),o=G(a);{var f=g=>{var q=Vt(),L=G(q),_=r(L),x=r(_);fe(x,()=>be.sanitize(e.answer.text));var y=w(L,2);{var S=m=>{var p=Ut(),R=r(p),X=r(R),se=D(()=>H(()=>e.submitAnswer()));X.__click=function(...P){var F;(F=c(se))==null||F.apply(this,P)};var ge=w(R,2),he=r(ge),z=D(()=>H(()=>e.submitAnswer(e.answer.id)));he.__click=function(...P){var F;(F=c(z))==null||F.apply(this,P)},v(m,p)};C(y,m=>{e.hasAnswer||m(S)})}v(g,q)},d=g=>{var q=Bt(),L=r(q),_=r(L),x=D(()=>H(n));_.__click=function(...y){var S;(S=c(x))==null||S.apply(this,y)},v(g,q)};C(o,g=>{V(s)?g(f):g(d,!1)})}v(t,a),Se()}Ae(["click"]);var Rt=b('<div class="row"><div class="col-md-6 mb-1"><button type="button" class="btn btn-danger btn-sm w-100">Ask me again</button></div> <div class="col-md-6 mb-1"><button type="button" class="btn btn-success btn-sm w-100">I got it!</button></div></div>');function Gt(t,e){Ce(e,!0);var s=pe(),n=G(s);{var a=o=>{var f=Rt(),d=r(f),g=r(d),q=D(()=>H(()=>e.submitAnswer()));g.__click=function(...y){var S;(S=c(q))==null||S.apply(this,y)};var L=w(d,2),_=r(L),x=D(()=>H(()=>e.submitAnswer(-1)));_.__click=function(...y){var S;(S=c(x))==null||S.apply(this,y)},v(o,f)};C(n,o=>{e.hasAnswer||o(a)})}v(t,s),Se()}Ae(["click"]);var Jt=(t,e,s)=>e(c(s).id),Wt=b('<div class="col"><div class="card" style="max-width: 18rem; cursor: pointer;"><img class="card-img-top" alt=""></div></div>'),Xt=b('<div class="col-lg"><div class="row row-cols-1 row-cols-sm-3 g-4"></div></div>'),Yt=b('<div class="img-fullscreen svelte-z0la5k"><p class="bg-white text-end"><button type="button" class="btn-close"></button></p> <div class="text-center"><img class="img-fluid border border-5 border-white" alt=""></div></div>');function Zt(t,e){Ce(e,!0);let s=ke(e,"images",19,()=>[]);var n=Z(!1),a=Z(void 0);we(()=>{V(n)?W.setScope("images"):W.setScope("questions")}),Xe(()=>{W("esc","images",function(_,x){V(n)&&h(n,!1)})});var o;function f(_){o&&o.cancel(),o=ut(()=>{h(n,!V(n)),h(a,s().find(x=>x.id===_),!0)},100,{maxWait:200}),o()}var d=pe(),g=G(d);{var q=_=>{var x=Xt(),y=r(x);je(y,21,s,S=>S.id,(S,m)=>{var p=Wt(),R=r(p),X=r(R);X.__click=[Jt,f,m],_e(()=>me(X,"src",`/${c(m).path??""}`)),v(S,p)}),v(_,x)},L=_=>{var x=Yt();x.__click=f;var y=r(x),S=r(y),m=D(()=>H(()=>h(n,!V(n))));S.__click=function(...X){var se;(se=c(m))==null||se.apply(this,X)};var p=w(y,2),R=r(p);_e(()=>me(R,"src",`/${V(a).path??""}`)),v(_,x)};C(g,_=>{V(n)?_(L,!1):_(q)})}v(t,d),Se()}Ae(["click"]);var $t=b('<input type="text" class="form-control mb-3" placeholder="Filter decks ...">'),es=b('<div class="row mb-1"><div class="col-9 text-truncate"><a class="link-dark"> </a></div> <div class="col-3 d-grid gap-4"><button class="btn btn-sm btn-outline-secondary float-end">Remove</button></div></div>'),ts=b("<hr>"),ss=b('<div class="row mb-1"><div class="col-9 text-truncate"><a class="link-dark"> </a></div> <div class="col-3 d-grid gap-4"><button class="btn btn-sm btn-primary float-end">Add</button></div></div>'),ns=b('<div class="alert alert-light text-center" role="alert">No decks found</div>'),as=b("<!> <!> <!> <!> <!>",1),is=b('<div class="d-flex justify-content-center"><div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Loading decks ...</span></div></div>'),rs=b('<button class="btn btn-outline-secondary btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddToDeck" aria-controls="offcanvasAddToDeck"><i class="bi bi-collection"></i> Add to deck</button> <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddToDeck" aria-labelledby="offcanvasAddToDeckLabel"><div class="offcanvas-header"><h5 id="offcanvasAddToDeckLabel">Add question to deck</h5> <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button></div> <div class="offcanvas-body pb-0"><!> <hr> <div class="row sticky-bottom bg-white mt-3"><div class="col"><p>Create new deck:</p> <div class="mb-2"><input type="text" class="form-control" id="name" name="name" placeholder="My new deck ..."></div> <button class="btn btn-sm btn-primary mb-3">Create deck and add question</button></div></div></div></div>',1);function os(t,e){Ce(e,!0);let s=Z(void 0),n=Z(void 0),a=Z(""),o=Z(void 0),f=Z("");Xe(()=>{const i=document.getElementById("offcanvasAddToDeck");i.addEventListener("show.bs.offcanvas",l=>{d()}),i.addEventListener("shown.bs.offcanvas",l=>{_()}),i.addEventListener("hidden.bs.offcanvas",l=>{h(s,void 0),h(n,void 0),h(f,"")})});function d(){axios.get("/api/decks/withquestionids").then(function(i){var l=i.data;h(s,[],!0),h(n,[],!0),l.forEach(k=>{k.questions.some(O=>O.id===e.questionId)?h(s,[...c(s),{id:k.id,name:k.name}],!0):h(n,[...c(n),{id:k.id,name:k.name}],!0)})}).catch(function(i){console.log(i),alert(i)})}function g(i){axios.post("/api/decks/"+i+"/addquestion",{question_id:e.questionId}).then(function(l){const k=c(n).find(O=>O.id===i);h(s,[...c(s),k],!0),h(n,c(n).filter(O=>O.id!==i),!0)}).catch(function(l){alert(l)})}function q(i){axios.post("/api/decks/"+i+"/removequestion",{question_id:e.questionId}).then(function(l){const k=c(s).find(O=>O.id===i);h(n,[...c(n),k],!0),h(s,c(s).filter(O=>O.id!==i),!0)}).catch(function(l){alert(l)})}function L(){c(a)&&axios.post("/api/decks",{name:c(a)}).then(function(i){const l=i.data;h(n,[...c(n),l],!0),g(l.id),h(a,"")}).catch(function(i){alert(i)})}function _(){c(o)&&c(o).focus()}let x=D(()=>{var i;return(i=c(n))==null?void 0:i.filter(l=>l.name.toLowerCase().includes(c(f).toLowerCase()))}),y=D(()=>{var i;return(i=c(s))==null?void 0:i.filter(l=>l.name.toLowerCase().includes(c(f).toLowerCase()))});we(()=>{c(y),_()});var S=rs(),m=w(G(S),2),p=w(r(m),2),R=r(p);{var X=i=>{var l=as(),k=G(l);{var O=T=>{var M=$t();mt(M,j=>h(o,j),()=>c(o)),Ge(M,()=>c(f),j=>h(f,j)),v(T,M)};C(k,T=>{c(s).length+c(n).length>10&&T(O)})}var U=w(k,2);je(U,17,()=>c(y),Re,(T,M)=>{var j=es(),ee=r(j),ae=r(ee),ce=r(ae),ye=w(ee,2),qe=r(ye),xe=D(()=>H(()=>q(c(M).id)));qe.__click=function(...Le){var ue;(ue=c(xe))==null||ue.apply(this,Le)},_e(()=>{me(ae,"href",`/decks/${c(M).id??""}`),Fe(ce,c(M).name)}),v(T,j)});var $=w(U,2);{var de=T=>{var M=ts();v(T,M)};C($,T=>{c(x).length>0&&c(y).length>0&&T(de)})}var Y=w($,2);je(Y,17,()=>c(x),Re,(T,M)=>{var j=ss(),ee=r(j),ae=r(ee),ce=r(ae),ye=w(ee,2),qe=r(ye),xe=D(()=>H(()=>g(c(M).id)));qe.__click=function(...Le){var ue;(ue=c(xe))==null||ue.apply(this,Le)},_e(()=>{me(ae,"href",`/decks/${c(M).id??""}`),Fe(ce,c(M).name)}),v(T,j)});var ne=w(Y,2);{var ve=T=>{var M=ns();v(T,M)};C(ne,T=>{c(x).length===0&&c(y).length===0&&T(ve)})}v(i,l)},se=i=>{var l=is();v(i,l)};C(R,i=>{c(s)?i(X):i(se,!1)})}var ge=w(R,4),he=r(ge),z=w(r(he),2),P=r(z),F=w(z,2),oe=D(()=>H(()=>L()));F.__click=function(...i){var l;(l=c(oe))==null||l.apply(this,i)},Ge(P,()=>c(a),i=>h(a,i)),v(t,S),Se()}Ae(["click"]);var ds=b('<div class="my-5 pt-1 pb-3 border-dark" style="border-top: dotted; border-bottom: dotted; border-width: 1px;"><!></div>'),cs=b('<div class="row"><div class="col"><div class="alert alert-light" role="alert"><i class="bi bi-cone-striped"></i> <strong>Question is marked invalid</strong> and safe to skip!</div></div></div>'),ls=b('<div class="row"><div class="col"><div class="alert alert-light" role="alert"><i class="bi bi-eraser-fill"></i> <strong>Question needs review</strong> - Please review the question and answer choices and make sure they are correct and clear. Afterwards, remove the "Needs review" flag.</div></div></div>'),vs=b('<div class="alert alert-light" role="alert"><p class="small fw-bold"><i class="bi bi-clipboard2-pulse"></i> CASE</p> <p class="trix-content"><!></p></div>'),us=b('<div class="col-lg"><p id="questionText" class="trix-content"><!></p></div>'),fs=b('<div class="row border-start border-3 border-secondary-subtle m-1 mt-3 mb-3"><p><!></p></div>'),bs=b('<button type="button" class="btn btn-outline-secondary btn-sm mb-3"><i class="bi bi-question"></i> Show hint</button>'),ms=b('<div class="row"><div class="col"><div class="alert alert-light trix-content" role="alert"><!></div></div></div>'),ws=b('<li><button type="button" class="dropdown-item btn btn-sm"><i class="bi bi-arrow-counterclockwise"></i> Reset answer</button></li>'),_s=b('<li><hr class="dropdown-divider"></li> <li><a class="dropdown-item btn btn-sm" role="button"><i class="bi bi-collection"></i> Open in deck editor</a></li>',1),gs=b('<div><!> <!> <!> <div class="row border-start border-3 border-dark m-1 mb-3 pt-2"><!> <!></div> <!> <!> <!> <div class="row mt-1 mb-1 pt-2"><div class="d-flex justify-content-end"><div class="btn-group me-1"><button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">More</button> <ul class="dropdown-menu"><!> <li><a class="dropdown-item btn btn-sm" target="_blank" role="button"><i class="bi bi-box-arrow-up-right"></i> Open in new tab</a></li> <li><hr class="dropdown-divider"></li> <li><button type="button" class="dropdown-item btn btn-sm"><i class="bi bi-pencil"></i> Edit question</button></li> <!></ul></div> <!></div></div></div>'),hs=b('<div class="mt-3"><button type="button" class="btn btn-outline-secondary btn-sm">&rightarrow; Show answer</button></div>'),ys=b("<!> <!>",1),ps=b("<p>Loading ...</p>");function Ds(t,e){Ce(e,!0);let s=ke(e,"question",15),n=ke(e,"questionContext",15),a=ke(e,"helpUsed",15),o=ke(e,"examMode",15),f=ke(e,"settingsShowAnswerStats",15);var d=Z(!1),g=Z(ct(n().isAnswered));we(()=>{s(),h(g,n().isAnswered,!0),a(n().isAnswered)}),we(()=>{s(),(()=>{var m=document.querySelectorAll("#questionText li");[].map.call(m,function(p){p.addEventListener("click",q,!1)})})()}),we(()=>{s(),s().answers.forEach((m,p)=>{m.badgeText="ABCDEFGHIJKLMN".charAt(p)}),s()&&s().type==="mc"&&e.settingsShuffleAnswers&&!n().isAnswered&&!Object.values(n().answerContext).some(m=>m.isSelectedAnswer)&&s(s().answers=ft.shuffle(s().answers),!0)});function q(m){const p=m.target;!p.classList.contains("bg-danger-subtle")&&!p.classList.contains("bg-warning-subtle")&&!p.classList.contains("bg-success-subtle")?p.classList.add("bg-success-subtle"):p.classList.contains("bg-success-subtle")?(p.classList.remove("bg-success-subtle"),p.classList.add("bg-danger-subtle")):p.classList.contains("bg-danger-subtle")?(p.classList.remove("bg-danger-subtle"),p.classList.add("bg-warning-subtle")):p.classList.contains("bg-warning-subtle")&&p.classList.remove("bg-warning-subtle")}function L(){const m=!V(d);m?e.updateCurrentQuestionData?e.updateCurrentQuestionData().then(()=>{h(d,m)}):h(d,m):h(d,m)}var _=pe(),x=G(_);{var y=m=>{var p=ys(),R=G(p);{var X=z=>{var P=ds(),F=r(P);lt(F,{toggleEditor:L,get question(){return s()},set question(oe){s(oe)}}),v(z,P)},se=z=>{var P=gs(),F=r(P);{var oe=u=>{var A=cs();v(u,A)};C(F,u=>{s().is_invalid&&u(oe)})}var i=w(F,2);{var l=u=>{var A=ls();v(u,A)};C(i,u=>{s().needs_review&&u(l)})}var k=w(i,2);{var O=u=>{var A=vs(),B=w(r(A),2),Q=r(B);fe(Q,()=>be.sanitize(s().case.text)),v(u,A)};C(k,u=>{s().case&&u(O)})}var U=w(k,2),$=r(U);{var de=u=>{var A=us(),B=r(A),Q=r(B);fe(Q,()=>be.sanitize(s().text)),v(u,A)};C($,u=>{s().text&&u(de)})}var Y=w($,2);{var ne=u=>{Zt(u,{get images(){return s().images},set images(A){s(s().images=A,!0)}})};C(Y,u=>{s().images&&s().images.length>0&&u(ne)})}var ve=w(U,2);{var T=u=>{var A=pe(),B=G(A);{var Q=I=>{var te=fs(),J=r(te),ze=r(J);fe(ze,()=>be.sanitize(s().hint)),v(I,te)},ie=I=>{var te=bs(),J=D(()=>H(()=>{h(g,!0),a(!0)}));te.__click=function(...ze){var He;(He=c(J))==null||He.apply(this,ze)},v(I,te)};C(B,I=>{V(g)?I(Q):I(ie,!1)})}v(u,A)};C(ve,u=>{!o()&&s().hint&&u(T)})}var M=w(ve,2);{var j=u=>{var A=pe(),B=G(A);je(B,19,()=>s().answers,Q=>Q.id,(Q,ie,I)=>{const te=D(()=>c(I)+1);Ft(Q,{get submitAnswer(){return e.submitAnswer},get questionIsAnswered(){return n().isAnswered},get answerNumber(){return c(te)},get answer(){return s().answers[c(I)]},set answer(J){s(s().answers[c(I)]=J,!0)},get answerContext(){return n().answerContext[c(ie).id]},set answerContext(J){n(n().answerContext[c(ie).id]=J,!0)},get examMode(){return o()},set examMode(J){o(J)},get settingsShowAnswerStats(){return f()},set settingsShowAnswerStats(J){f(J)}})}),v(u,A)},ee=u=>{var A=pe(),B=G(A);{var Q=I=>{const te=D(()=>!!e.answerChoice);Gt(I,{get submitAnswer(){return e.submitAnswer},get hasAnswer(){return c(te)}})},ie=I=>{const te=D(()=>!!e.answerChoice);Ht(I,{get submitAnswer(){return e.submitAnswer},get hasAnswer(){return c(te)},get answer(){return s().answers[0]},set answer(J){s(s().answers[0]=J,!0)}})};C(B,I=>{s().answers.length===0?I(Q):I(ie,!1)})}v(u,A)};C(M,u=>{s().type==="mc"?u(j):u(ee,!1)})}var ae=w(M,2);{var ce=u=>{var A=ms(),B=r(A),Q=r(B),ie=r(Q);fe(ie,()=>be.sanitize(s().comment)),v(u,A)};C(ae,u=>{!o()&&n().isAnswered&&s().comment&&u(ce)})}var ye=w(ae,2),qe=r(ye),xe=r(qe),Le=w(r(xe),2),ue=r(Le);{var st=u=>{var A=ws(),B=r(A),Q=D(()=>H(e.deleteAnswer));B.__click=function(...ie){var I;(I=c(Q))==null||I.apply(this,ie)},v(u,A)};C(ue,u=>{n().isAnswered&&e.answerChoice!==-1&&u(st)})}var Ve=w(ue,2),nt=r(Ve),Be=w(Ve,4),at=r(Be),it=D(()=>H(L));at.__click=function(...u){var A;(A=c(it))==null||A.apply(this,u)};var rt=w(Be,2);{var ot=u=>{var A=_s(),B=w(G(A),2),Q=r(B);_e(()=>me(Q,"href",`/decks/${e.deckId??""}/questions/edit?question_id=${s().id??""}`)),v(u,A)};C(rt,u=>{e.deckId&&u(ot)})}var dt=w(xe,2);vt(dt,()=>s().id,u=>{os(u,{get questionId(){return s().id}})}),_e(()=>{me(P,"id",`question${s().id??""}`),me(nt,"href",`/questions/${s().id??""}`)}),v(z,P)};C(R,z=>{V(d)?z(X):z(se,!1)})}var ge=w(R,2);{var he=z=>{var P=hs(),F=r(P),oe=D(()=>H(()=>e.submitAnswer()));F.__click=function(...i){var l;(l=c(oe))==null||l.apply(this,i)},v(z,P)};C(ge,z=>{!n().isAnswered&&!o()&&s().type!=="card"&&z(he)})}v(m,p)},S=m=>{var p=ps();v(m,p)};C(x,m=>{s()?m(y):m(S,!1)})}v(t,_),Se()}Ae(["click"]);export{Ds as S,W as h};
