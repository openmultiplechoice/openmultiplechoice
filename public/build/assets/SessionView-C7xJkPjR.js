import{S as de,i as _e,s as ge,n as E,d as Q,a as P,e as ve,D as Pe,m as Xe,o as v,f as C,g as k,E as I,M as ye,c as q,l as ie,q as we,b as V,t as $,p as ce,k as O,H as is,w as H,x as M,z as se,A as ne,K as ts,r as W,u as te,v as os,y as K,B as oe,C as re,N as rs,L as Me}from"./index-C5hKwDc9.js";import{p as Fe,d as ls}from"./purify.es-CzHI0FGf.js";import{e as Ce}from"./each-JoEH9o9l.js";import{M as us}from"./Messages-D80vYOi0.js";import{C as fs}from"./auto-C0VlNTRY.js";import{S as as}from"./SessionProgressBar-D35tF687.js";import{h as Qe,S as cs}from"./SessionQuestionView-DioQisgK.js";import{s as ds}from"./StatsHelper-B91isISU.js";import{U as qe}from"./UserSettingsStore-DIGhToub.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./parseISO-nqt9u7wd.js";import"./lodash-DBMh2b1a.js";import"./QuestionForm-LRPWcbwj.js";function Ge(n,s,e){const i=n.slice();return i[19]=s[e],i}function Te(n){let s,e=Ce({length:n[6]}),i=[];for(let o=0;o<e.length;o+=1)i[o]=ze(Ge(n,e,o));return{c(){s=C("div");for(let o=0;o<i.length;o+=1)i[o].c();k(s,"class","confetti-holder svelte-15ksp55"),v(s,"rounded",n[9]),v(s,"cone",n[10]),v(s,"no-gravity",n[11]),v(s,"reduced-motion",n[13])},m(o,r){P(o,s,r);for(let t=0;t<i.length;t+=1)i[t]&&i[t].m(s,null)},p(o,r){if(r&37375){e=Ce({length:o[6]});let t;for(t=0;t<e.length;t+=1){const d=Ge(o,e,t);i[t]?i[t].p(d,r):(i[t]=ze(d),i[t].c(),i[t].m(s,null))}for(;t<i.length;t+=1)i[t].d(1);i.length=e.length}r&512&&v(s,"rounded",o[9]),r&1024&&v(s,"cone",o[10]),r&2048&&v(s,"no-gravity",o[11]),r&8192&&v(s,"reduced-motion",o[13])},d(o){o&&Q(s),Xe(i,o)}}}function ze(n){let s;return{c(){s=C("div"),k(s,"class","confetti svelte-15ksp55"),I(s,"--fall-distance",n[8]),I(s,"--size",n[0]+"px"),I(s,"--color",n[15]()),I(s,"--skew",X(-45,45)+"deg,"+X(-45,45)+"deg"),I(s,"--rotation-xyz",X(-10,10)+", "+X(-10,10)+", "+X(-10,10)),I(s,"--rotation-deg",X(0,360)+"deg"),I(s,"--translate-y-multiplier",X(n[2][0],n[2][1])),I(s,"--translate-x-multiplier",X(n[1][0],n[1][1])),I(s,"--scale",.1*X(2,10)),I(s,"--transition-duration",n[4]?`calc(${n[3]}ms * var(--scale))`:`${n[3]}ms`),I(s,"--transition-delay",X(n[5][0],n[5][1])+"ms"),I(s,"--transition-iteration-count",n[4]?"infinite":n[7]),I(s,"--x-spread",1-n[12])},m(e,i){P(e,s,i)},p(e,i){i&256&&I(s,"--fall-distance",e[8]),i&1&&I(s,"--size",e[0]+"px"),i&4&&I(s,"--translate-y-multiplier",X(e[2][0],e[2][1])),i&2&&I(s,"--translate-x-multiplier",X(e[1][0],e[1][1])),i&24&&I(s,"--transition-duration",e[4]?`calc(${e[3]}ms * var(--scale))`:`${e[3]}ms`),i&32&&I(s,"--transition-delay",X(e[5][0],e[5][1])+"ms"),i&144&&I(s,"--transition-iteration-count",e[4]?"infinite":e[7]),i&4096&&I(s,"--x-spread",1-e[12])},d(e){e&&Q(s)}}}function _s(n){let s,e=!n[14]&&Te(n);return{c(){e&&e.c(),s=ve()},m(i,o){e&&e.m(i,o),P(i,s,o)},p(i,[o]){i[14]?e&&(e.d(1),e=null):e?e.p(i,o):(e=Te(i),e.c(),e.m(s.parentNode,s))},i:E,o:E,d(i){i&&Q(s),e&&e.d(i)}}}function X(n,s){return Math.random()*(s-n)+n}function gs(n,s,e){let{size:i=10}=s,{x:o=[-.5,.5]}=s,{y:r=[.25,1]}=s,{duration:t=2e3}=s,{infinite:d=!1}=s,{delay:l=[0,50]}=s,{colorRange:f=[0,360]}=s,{colorArray:a=[]}=s,{amount:p=50}=s,{iterationCount:w=1}=s,{fallDistance:m="100px"}=s,{rounded:G=!1}=s,{cone:A=!1}=s,{noGravity:T=!1}=s,{xSpread:z=.15}=s,{destroyOnComplete:y=!0}=s,{disableForReducedMotion:F=!1}=s,h=!1;Pe(()=>{!y||d||w=="infinite"||setTimeout(()=>e(14,h=!0),(t+l[1])*w)});function b(){return a.length?a[Math.round(Math.random()*(a.length-1))]:`hsl(${Math.round(X(f[0],f[1]))}, 75%, 50%)`}return n.$$set=c=>{"size"in c&&e(0,i=c.size),"x"in c&&e(1,o=c.x),"y"in c&&e(2,r=c.y),"duration"in c&&e(3,t=c.duration),"infinite"in c&&e(4,d=c.infinite),"delay"in c&&e(5,l=c.delay),"colorRange"in c&&e(16,f=c.colorRange),"colorArray"in c&&e(17,a=c.colorArray),"amount"in c&&e(6,p=c.amount),"iterationCount"in c&&e(7,w=c.iterationCount),"fallDistance"in c&&e(8,m=c.fallDistance),"rounded"in c&&e(9,G=c.rounded),"cone"in c&&e(10,A=c.cone),"noGravity"in c&&e(11,T=c.noGravity),"xSpread"in c&&e(12,z=c.xSpread),"destroyOnComplete"in c&&e(18,y=c.destroyOnComplete),"disableForReducedMotion"in c&&e(13,F=c.disableForReducedMotion)},[i,o,r,t,d,l,p,w,m,G,A,T,z,F,h,b,f,a,y]}class ms extends de{constructor(s){super(),_e(this,s,gs,_s,ge,{size:0,x:1,y:2,duration:3,infinite:4,delay:5,colorRange:16,colorArray:17,amount:6,iterationCount:7,fallDistance:8,rounded:9,cone:10,noGravity:11,xSpread:12,destroyOnComplete:18,disableForReducedMotion:13})}}function He(n){let s,e,i,o,r;return{c(){s=C("div"),e=C("img"),k(e,"class","img-fluid"),ye(e.src,i="/"+n[0])||k(e,"src",i),k(e,"alt","Magic GIF"),k(s,"class","img-fullscreen d-flex justify-content-center align-items-center svelte-k1osqd")},m(t,d){P(t,s,d),q(s,e),o||(r=ie(s,"click",n[2]),o=!0)},p(t,d){d&1&&!ye(e.src,i="/"+t[0])&&k(e,"src",i)},d(t){t&&Q(s),o=!1,r()}}}function hs(n){let s,e=n[0]&&n[1]&&He(n);return{c(){e&&e.c(),s=ve()},m(i,o){e&&e.m(i,o),P(i,s,o)},p(i,[o]){i[0]&&i[1]?e?e.p(i,o):(e=He(i),e.c(),e.m(s.parentNode,s)):e&&(e.d(1),e=null)},i:E,o:E,d(i){i&&Q(s),e&&e.d(i)}}}function bs(n,s,e){let{magicGIFPath:i=""}=s;var o=!0;function r(){e(1,o=!o)}return n.$$set=t=>{"magicGIFPath"in t&&e(0,i=t.magicGIFPath)},[i,o,r]}class ps extends de{constructor(s){super(),_e(this,s,bs,hs,ge,{magicGIFPath:0})}}function Le(n){let s,e,i;return{c(){s=C("button"),s.innerHTML='<i class="bi bi-repeat"></i> Repeat incorrect',k(s,"class","btn btn-sm btn-outline-secondary"),k(s,"type","button")},m(o,r){P(o,s,r),e||(i=ie(s,"click",ce(n[5])),e=!0)},p:E,d(o){o&&Q(s),e=!1,i()}}}function ws(n){let s,e,i,o,r,t,d,l=n[0].correct+"",f,a,p,w,m,G,A,T,z,y=n[0].incorrect>0&&Le(n);return{c(){s=C("div"),e=C("div"),i=C("canvas"),o=V(),r=C("div"),t=C("p"),d=C("span"),f=$(l),a=$("%"),p=$(" correct"),w=V(),m=C("div"),G=C("a"),G.innerHTML='<i class="bi bi-rocket-takeoff"></i> New session',A=V(),y&&y.c(),T=V(),z=C("a"),z.textContent="Home",k(e,"class","col-md"),k(d,"class","fs-4 font-monospace"),k(t,"class","mt-3 text-dark"),k(G,"href","/sessions/create"),k(G,"class","btn btn-sm btn-primary"),k(z,"href","/"),k(z,"class","btn btn-sm btn-outline-secondary"),k(m,"class","d-grid gap-2"),k(r,"class","col-md"),k(s,"class","row mb-5")},m(F,h){P(F,s,h),q(s,e),q(e,i),n[4](i),q(s,o),q(s,r),q(r,t),q(t,d),q(d,f),q(d,a),q(t,p),q(r,w),q(r,m),q(m,G),q(m,A),y&&y.m(m,null),q(m,T),q(m,z)},p(F,[h]){h&1&&l!==(l=F[0].correct+"")&&we(f,l),F[0].incorrect>0?y?y.p(F,h):(y=Le(F),y.c(),y.m(m,T)):y&&(y.d(1),y=null)},i:E,o:E,d(F){F&&Q(s),n[4](null),y&&y.d()}}}function ks(n){axios.post("/api/sessions/"+n+"/newfromincorrect").then(function(s){window.location.href="/sessions/"+s.data.id}).catch(function(s){alert(s)})}function qs(n,s,e){let{progressPercentage:i}=s,{sessionId:o}=s,r,t;function d(f){O[f?"unshift":"push"](()=>{r=f,e(2,r)})}const l=()=>ks(o);return n.$$set=f=>{"progressPercentage"in f&&e(0,i=f.progressPercentage),"sessionId"in f&&e(1,o=f.sessionId)},n.$$.update=()=>{n.$$.dirty&13&&r&&(()=>{if(t)return;const f={type:"doughnut",data:{labels:["Correct","Correct with help","Incorrect"],datasets:[{label:"%",data:[i.correct,i.correctWithHelp,i.incorrect],backgroundColor:["#d4edda","#fff3cd","#f8d7da"],hoverOffet:4}]},options:{responsive:!0,maintainAspectRatio:!1,hover:{mode:null},plugins:{legend:{display:!1}}}};t&&t.destroy();var a=r.getContext("2d");e(3,t=new fs(a,f))})()},[i,o,r,t,d,l]}class Cs extends de{constructor(s){super(),_e(this,s,qs,ws,ge,{progressPercentage:0,sessionId:1})}}function Ne(n,s,e){const i=n.slice();return i[5]=s[e],i[7]=e,i}function Re(n){let s;return{c(){s=C("li"),s.textContent="Loading ...",k(s,"class","svelte-za7w49")},m(e,i){P(e,s,i)},p:E,d(e){e&&Q(s)}}}function vs(n){let s,e=n[7]+1+"",i;return{c(){s=$("Question Nr. "),i=$(e)},m(o,r){P(o,s,r),P(o,i,r)},p:E,d(o){o&&(Q(s),Q(i))}}}function Ss(n){let s=Fe.sanitize(n[5].text).replace(/<\/?[^>]+(>|$)/g,"")+"",e;return{c(){e=$(s)},m(i,o){P(i,e,o)},p(i,o){o&1&&s!==(s=Fe.sanitize(i[5].text).replace(/<\/?[^>]+(>|$)/g,"")+"")&&we(e,s)},d(i){i&&Q(e)}}}function Ue(n){let s,e,i,o=n[1](n[5])+"",r,t,d,l,f,a;function p(A,T){return A[5].text?Ss:vs}let w=p(n),m=w(n);function G(){return n[4](n[5])}return{c(){s=C("li"),e=C("small"),i=new is(!1),r=V(),m.c(),t=V(),i.a=r,k(s,"class",d="list-group-item list-group-item-action text-overflow "+(n[5].id===n[0].session.current_question_id?"list-group-item-dark":"list-group-item-light")+" svelte-za7w49"),k(s,"id",l="question"+n[5].id)},m(A,T){P(A,s,T),q(s,e),i.m(o,e),q(e,r),m.m(e,null),q(s,t),f||(a=ie(s,"click",G),f=!0)},p(A,T){n=A,T&3&&o!==(o=n[1](n[5])+"")&&i.p(o),w===(w=p(n))&&m?m.p(n,T):(m.d(1),m=w(n),m&&(m.c(),m.m(e,null))),T&1&&d!==(d="list-group-item list-group-item-action text-overflow "+(n[5].id===n[0].session.current_question_id?"list-group-item-dark":"list-group-item-light")+" svelte-za7w49")&&k(s,"class",d),T&1&&l!==(l="question"+n[5].id)&&k(s,"id",l)},d(A){A&&Q(s),m.d(),f=!1,a()}}}function As(n){let s,e,i=Ce(n[0].deck.questions),o=[];for(let t=0;t<i.length;t+=1)o[t]=Ue(Ne(n,i,t));let r=null;return i.length||(r=Re()),{c(){s=C("div"),e=C("ul");for(let t=0;t<o.length;t+=1)o[t].c();r&&r.c(),k(e,"class","list-group"),k(s,"class","overflow-scroll"),I(s,"max-height","85vh")},m(t,d){P(t,s,d),q(s,e);for(let l=0;l<o.length;l+=1)o[l]&&o[l].m(e,null);r&&r.m(e,null)},p(t,[d]){if(d&3){i=Ce(t[0].deck.questions);let l;for(l=0;l<i.length;l+=1){const f=Ne(t,i,l);o[l]?o[l].p(f,d):(o[l]=Ue(f),o[l].c(),o[l].m(e,null))}for(;l<o.length;l+=1)o[l].d(1);o.length=i.length,!i.length&&r?r.p(t,d):i.length?r&&(r.d(1),r=null):(r=Re(),r.c(),r.m(e,null))}},i:E,o:E,d(t){t&&Q(s),Xe(o,t),r&&r.d()}}}function Is(n,s,e){let i,o,{data:r}=s,{examMode:t}=s;const d=l=>e(0,r.session.current_question_id=l.id,r);return n.$$set=l=>{"data"in l&&e(0,r=l.data),"examMode"in l&&e(2,t=l.examMode)},n.$$.update=()=>{n.$$.dirty&1&&e(3,i=r.session.current_question_id),n.$$.dirty&8&&(()=>{var l=document.getElementById("question"+i);l&&l.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})})(),n.$$.dirty&5&&e(1,o=function(l){var f=r.session.answer_choices.find(a=>a.question_id===l.id);return f?t?'<span class="text-dark fw-bold">&check;</span>':f.is_correct?f.help_used?'<span class="text-warning-dark fw-bold">&check;</span>':'<span class="text-success-dark fw-bold">&check;</span>':'<span class="text-danger-dark fw-bold">&cross;</span>':'<span class="text-dark fw-bold">&rightarrow;</span>'})},[r,o,t,i,d]}class Ms extends de{constructor(s){super(),_e(this,s,Is,As,ge,{data:0,examMode:2})}}function Qs(n){let s;return{c(){s=C("div"),s.innerHTML="",k(s,"class","col-6")},m(e,i){P(e,s,i)},p:E,d(e){e&&Q(s)}}}function Ps(n){let s,e,i,o;return{c(){s=C("div"),e=C("button"),e.innerHTML='<span class="fw-bold">←</span> Previous',k(e,"class","btn btn-sm btn-light w-100"),k(s,"class","col-6")},m(r,t){P(r,s,t),q(s,e),i||(o=ie(e,"click",ce(n[2])),i=!0)},p:E,d(r){r&&Q(s),i=!1,o()}}}function ys(n){let s;return{c(){s=C("div"),s.innerHTML="",k(s,"class","col-6")},m(e,i){P(e,s,i)},p:E,d(e){e&&Q(s)}}}function Fs(n){let s,e,i,o;return{c(){s=C("div"),e=C("button"),e.innerHTML='Next <span class="fw-bold">→</span>',k(e,"class","btn btn-sm w-100"),v(e,"btn-warning",n[1].isAnswered),v(e,"btn-light",!n[1].isAnswered),k(s,"class","col-6")},m(r,t){P(r,s,t),q(s,e),i||(o=ie(e,"click",ce(n[3])),i=!0)},p(r,t){t&2&&v(e,"btn-warning",r[1].isAnswered),t&2&&v(e,"btn-light",!r[1].isAnswered)},d(r){r&&Q(s),i=!1,o()}}}function Gs(n){let s,e;function i(f,a){return f[0].session.current_question_id&&f[0].session.current_question_id!=f[0].deck.questions[0].id?Ps:Qs}let o=i(n),r=o(n);function t(f,a){return f[0].session.current_question_id!=f[0].deck.questions[f[0].deck.questions.length-1].id?Fs:ys}let d=t(n),l=d(n);return{c(){s=C("div"),r.c(),e=V(),l.c(),k(s,"class","row mb-3 pt-1 pb-1 sticky-top bg-white")},m(f,a){P(f,s,a),r.m(s,null),q(s,e),l.m(s,null)},p(f,[a]){o===(o=i(f))&&r?r.p(f,a):(r.d(1),r=o(f),r&&(r.c(),r.m(s,e))),d===(d=t(f))&&l?l.p(f,a):(l.d(1),l=d(f),l&&(l.c(),l.m(s,null)))},i:E,o:E,d(f){f&&Q(s),r.d(),l.d()}}}function Ts(n,s,e){let{data:i}=s,{currentQuestionId:o}=s,{currentQuestionContext:r}=s;Pe(()=>{Qe("left","questions",function(f,a){d()}),Qe("right","questions",function(f,a){l()}),Qe.setScope("questions")});function t(f){return i.deck.questions.findIndex(a=>a.id===f)}function d(){var f=t(o),a=i.deck.questions[f-1];a&&e(0,i.session.current_question_id=a.id,i)}function l(){var f=t(o),a=i.deck.questions[f+1];a&&e(0,i.session.current_question_id=a.id,i)}return n.$$set=f=>{"data"in f&&e(0,i=f.data),"currentQuestionId"in f&&e(4,o=f.currentQuestionId),"currentQuestionContext"in f&&e(1,r=f.currentQuestionContext)},[i,r,d,l,o]}class zs extends de{constructor(s){super(),_e(this,s,Ts,Gs,ge,{data:0,currentQuestionId:4,currentQuestionContext:1})}}function Hs(n){let s;return{c(){s=C("p"),s.textContent="Loading ..."},m(e,i){P(e,s,i)},p:E,i:E,o:E,d(e){e&&Q(s)}}}function Ls(n){let s,e,i,o,r,t,d,l,f,a,p,w,m,G,A,T,z=n[0].deck.name+"",y,F,h,b,c,_,ee,Y,ue,J,Z,j,me,he,le,L,be,ke,R=!n[13]&&n[16]&&(!n[4]||!n[9].isAnswered)&&De(n),U=n[4]&&n[9].isAnswered&&Be(n),D=n[7]&&Ve(n);function Se(g){n[33](g)}function Ae(g){n[34](g)}function Ie(g){n[35](g)}let fe={};n[0]!==void 0&&(fe.data=n[0]),n[0].session.current_question_id!==void 0&&(fe.currentQuestionId=n[0].session.current_question_id),n[9]!==void 0&&(fe.currentQuestionContext=n[9]),Z=new zs({props:fe}),O.push(()=>W(Z,"data",Se)),O.push(()=>W(Z,"currentQuestionId",Ae)),O.push(()=>W(Z,"currentQuestionContext",Ie));let B=n[14]&&Ee(n);return{c(){s=C("div"),e=C("div"),i=C("p"),o=C("button"),o.innerHTML='<i class="bi bi-layout-sidebar"></i>',r=V(),t=C("button"),t.innerHTML='<i class="bi bi-shuffle"></i>',d=V(),l=C("button"),l.innerHTML='<i class="bi bi-exclamation-square"></i>',f=V(),a=C("span"),p=$(n[15]),w=$("/"),m=$(n[2]),G=V(),A=C("a"),T=C("strong"),y=$(z),h=V(),b=C("div"),c=C("div"),R&&R.c(),_=V(),U&&U.c(),ee=V(),Y=C("div"),D&&D.c(),ue=V(),J=C("div"),re(Z.$$.fragment),le=V(),B&&B.c(),k(o,"class","btn btn-sm d-none d-sm-none d-md-none d-lg-inline"),k(o,"title","Toggle sidebar"),v(o,"bg-light",!n[7]),v(o,"bg-dark-subtle",n[7]),k(t,"class","btn btn-sm"),k(t,"title","Toggle answer shuffling"),v(t,"bg-light",!n[5]),v(t,"bg-dark-subtle",n[5]),k(l,"class","btn btn-sm"),k(l,"title","Toggle exam mode"),v(l,"bg-light",!n[6]),v(l,"bg-dark-subtle",n[6]),k(a,"class","ms-1 float-end fw-bold font-monospace badge text-dark"),v(a,"text-bg-light",!n[1]||n[13]),v(a,"bg-success",!n[13]&&!n[14].is_invalid&&n[1]&&n[1].is_correct),v(a,"bg-danger",!n[13]&&!n[14].is_invalid&&n[1]&&!n[1].is_correct),k(A,"href",F="/decks/"+n[0].deck.id),k(A,"class","text-reset text-decoration-none"),k(i,"class","text-overflow svelte-1gfmo48"),k(e,"class","col mb-1"),k(s,"class","row"),k(c,"class","col mb-1"),k(b,"class","row"),k(J,"class","col-md-12"),v(J,"col-lg-9",n[7]),v(J,"col-lg-10",!n[7]),v(J,"offset-lg-1",!n[7]),k(Y,"class","row mt-3")},m(g,S){P(g,s,S),q(s,e),q(e,i),q(i,o),q(i,r),q(i,t),q(i,d),q(i,l),q(i,f),q(i,a),q(a,p),q(a,w),q(a,m),q(i,G),q(i,A),q(A,T),q(T,y),P(g,h,S),P(g,b,S),q(b,c),R&&R.m(c,null),q(c,_),U&&U.m(c,null),P(g,ee,S),P(g,Y,S),D&&D.m(Y,null),q(Y,ue),q(Y,J),oe(Z,J,null),q(J,le),B&&B.m(J,null),L=!0,be||(ke=[ie(o,"click",ce(n[26])),ie(t,"click",ce(n[27])),ie(l,"click",ce(n[28]))],be=!0)},p(g,S){(!L||S[0]&128)&&v(o,"bg-light",!g[7]),(!L||S[0]&128)&&v(o,"bg-dark-subtle",g[7]),(!L||S[0]&32)&&v(t,"bg-light",!g[5]),(!L||S[0]&32)&&v(t,"bg-dark-subtle",g[5]),(!L||S[0]&64)&&v(l,"bg-light",!g[6]),(!L||S[0]&64)&&v(l,"bg-dark-subtle",g[6]),(!L||S[0]&32768)&&we(p,g[15]),(!L||S[0]&4)&&we(m,g[2]),(!L||S[0]&8194)&&v(a,"text-bg-light",!g[1]||g[13]),(!L||S[0]&24578)&&v(a,"bg-success",!g[13]&&!g[14].is_invalid&&g[1]&&g[1].is_correct),(!L||S[0]&24578)&&v(a,"bg-danger",!g[13]&&!g[14].is_invalid&&g[1]&&!g[1].is_correct),(!L||S[0]&1)&&z!==(z=g[0].deck.name+"")&&we(y,z),(!L||S[0]&1&&F!==(F="/decks/"+g[0].deck.id))&&k(A,"href",F),!g[13]&&g[16]&&(!g[4]||!g[9].isAnswered)?R?(R.p(g,S),S[0]&74256&&M(R,1)):(R=De(g),R.c(),M(R,1),R.m(c,_)):R&&(se(),H(R,1,1,()=>{R=null}),ne()),g[4]&&g[9].isAnswered?U?(U.p(g,S),S[0]&528&&M(U,1)):(U=Be(g),U.c(),M(U,1),U.m(c,null)):U&&(se(),H(U,1,1,()=>{U=null}),ne()),g[7]?D?(D.p(g,S),S[0]&128&&M(D,1)):(D=Ve(g),D.c(),M(D,1),D.m(Y,ue)):D&&(se(),H(D,1,1,()=>{D=null}),ne());const ae={};!j&&S[0]&1&&(j=!0,ae.data=g[0],K(()=>j=!1)),!me&&S[0]&1&&(me=!0,ae.currentQuestionId=g[0].session.current_question_id,K(()=>me=!1)),!he&&S[0]&512&&(he=!0,ae.currentQuestionContext=g[9],K(()=>he=!1)),Z.$set(ae),g[14]?B?(B.p(g,S),S[0]&16384&&M(B,1)):(B=Ee(g),B.c(),M(B,1),B.m(J,null)):B&&(se(),H(B,1,1,()=>{B=null}),ne()),(!L||S[0]&128)&&v(J,"col-lg-9",g[7]),(!L||S[0]&128)&&v(J,"col-lg-10",!g[7]),(!L||S[0]&128)&&v(J,"offset-lg-1",!g[7])},i(g){L||(M(R),M(U),M(D),M(Z.$$.fragment,g),M(B),L=!0)},o(g){H(R),H(U),H(D),H(Z.$$.fragment,g),H(B),L=!1},d(g){g&&(Q(s),Q(h),Q(b),Q(ee),Q(Y)),R&&R.d(),U&&U.d(),D&&D.d(),te(Z),B&&B.d(),be=!1,os(ke)}}}function De(n){let s,e,i;function o(t){n[29](t)}let r={};return n[3]!==void 0&&(r.progressPercentage=n[3]),s=new as({props:r}),O.push(()=>W(s,"progressPercentage",o)),{c(){re(s.$$.fragment)},m(t,d){oe(s,t,d),i=!0},p(t,d){const l={};!e&&d[0]&8&&(e=!0,l.progressPercentage=t[3],K(()=>e=!1)),s.$set(l)},i(t){i||(M(s.$$.fragment,t),i=!0)},o(t){H(s.$$.fragment,t),i=!1},d(t){te(s,t)}}}function Be(n){let s,e,i;function o(t){n[30](t)}let r={sessionId:n[0].session.id};return n[3]!==void 0&&(r.progressPercentage=n[3]),s=new Cs({props:r}),O.push(()=>W(s,"progressPercentage",o)),{c(){re(s.$$.fragment)},m(t,d){oe(s,t,d),i=!0},p(t,d){const l={};d[0]&1&&(l.sessionId=t[0].session.id),!e&&d[0]&8&&(e=!0,l.progressPercentage=t[3],K(()=>e=!1)),s.$set(l)},i(t){i||(M(s.$$.fragment,t),i=!0)},o(t){H(s.$$.fragment,t),i=!1},d(t){te(s,t)}}}function Ve(n){let s,e,i,o,r;function t(f){n[31](f)}function d(f){n[32](f)}let l={};return n[0]!==void 0&&(l.data=n[0]),n[13]!==void 0&&(l.examMode=n[13]),e=new Ms({props:l}),O.push(()=>W(e,"data",t)),O.push(()=>W(e,"examMode",d)),{c(){s=C("div"),re(e.$$.fragment),k(s,"class","col-lg-3 d-none d-lg-block")},m(f,a){P(f,s,a),oe(e,s,null),r=!0},p(f,a){const p={};!i&&a[0]&1&&(i=!0,p.data=f[0],K(()=>i=!1)),!o&&a[0]&8192&&(o=!0,p.examMode=f[13],K(()=>o=!1)),e.$set(p)},i(f){r||(M(e.$$.fragment,f),r=!0)},o(f){H(e.$$.fragment,f),r=!1},d(f){f&&Q(s),te(e)}}}function Ee(n){let s,e,i,o,r,t,d,l,f,a,p;function w(b){n[36](b)}function m(b){n[37](b)}function G(b){n[38](b)}function A(b){n[39](b)}function T(b){n[40](b)}function z(b){n[41](b)}function y(b){n[42](b)}let F={deckId:n[0].deck.id,submitAnswer:n[19],deleteAnswer:n[20],updateCurrentQuestionData:n[18]};n[14]!==void 0&&(F.question=n[14]),n[9]!==void 0&&(F.questionContext=n[9]),n[10]!==void 0&&(F.helpUsed=n[10]),n[1]!==void 0&&(F.answerChoice=n[1]),n[13]!==void 0&&(F.examMode=n[13]),n[5]!==void 0&&(F.settingsShuffleAnswers=n[5]),n[17]!==void 0&&(F.settingsShowAnswerStats=n[17]),s=new cs({props:F}),O.push(()=>W(s,"question",w)),O.push(()=>W(s,"questionContext",m)),O.push(()=>W(s,"helpUsed",G)),O.push(()=>W(s,"answerChoice",A)),O.push(()=>W(s,"examMode",T)),O.push(()=>W(s,"settingsShuffleAnswers",z)),O.push(()=>W(s,"settingsShowAnswerStats",y));let h=!n[13]&&n[9].isAnswered&&Oe(n);return{c(){re(s.$$.fragment),f=V(),h&&h.c(),a=ve()},m(b,c){oe(s,b,c),P(b,f,c),h&&h.m(b,c),P(b,a,c),p=!0},p(b,c){const _={};c[0]&1&&(_.deckId=b[0].deck.id),!e&&c[0]&16384&&(e=!0,_.question=b[14],K(()=>e=!1)),!i&&c[0]&512&&(i=!0,_.questionContext=b[9],K(()=>i=!1)),!o&&c[0]&1024&&(o=!0,_.helpUsed=b[10],K(()=>o=!1)),!r&&c[0]&2&&(r=!0,_.answerChoice=b[1],K(()=>r=!1)),!t&&c[0]&8192&&(t=!0,_.examMode=b[13],K(()=>t=!1)),!d&&c[0]&32&&(d=!0,_.settingsShuffleAnswers=b[5],K(()=>d=!1)),!l&&c[0]&131072&&(l=!0,_.settingsShowAnswerStats=b[17],K(()=>l=!1)),s.$set(_),!b[13]&&b[9].isAnswered?h?(h.p(b,c),c[0]&8704&&M(h,1)):(h=Oe(b),h.c(),M(h,1),h.m(a.parentNode,a)):h&&(se(),H(h,1,1,()=>{h=null}),ne())},i(b){p||(M(s.$$.fragment,b),M(h),p=!0)},o(b){H(s.$$.fragment,b),H(h),p=!1},d(b){b&&(Q(f),Q(a)),te(s,b),h&&h.d(b)}}}function Oe(n){let s,e,i;function o(t){n[43](t)}let r={};return n[14].id!==void 0&&(r.questionId=n[14].id),s=new us({props:r}),O.push(()=>W(s,"questionId",o)),{c(){re(s.$$.fragment)},m(t,d){oe(s,t,d),i=!0},p(t,d){const l={};!e&&d[0]&16384&&(e=!0,l.questionId=t[14].id,K(()=>e=!1)),s.$set(l)},i(t){i||(M(s.$$.fragment,t),i=!0)},o(t){H(s.$$.fragment,t),i=!1},d(t){te(s,t)}}}function We(n){let s,e,i;function o(t){n[44](t)}let r={};return n[11]!==void 0&&(r.magicGIFPath=n[11]),s=new ps({props:r}),O.push(()=>W(s,"magicGIFPath",o)),{c(){re(s.$$.fragment)},m(t,d){oe(s,t,d),i=!0},p(t,d){const l={};!e&&d[0]&2048&&(e=!0,l.magicGIFPath=t[11],K(()=>e=!1)),s.$set(l)},i(t){i||(M(s.$$.fragment,t),i=!0)},o(t){H(s.$$.fragment,t),i=!1},d(t){te(s,t)}}}function Ke(n){let s,e,i;return e=new ms({props:{x:[-5,5],y:[0,.1],delay:[100,3e3],infinite:!0,duration:"5000",amount:"200",fallDistance:"100vh"}}),{c(){s=C("div"),re(e.$$.fragment),I(s,"position","fixed"),I(s,"top","-50px"),I(s,"left","0"),I(s,"height","100vh"),I(s,"width","100vw"),I(s,"display","flex"),I(s,"justify-content","center"),I(s,"overflow","hidden"),I(s,"pointer-events","none")},m(o,r){P(o,s,r),oe(e,s,null),i=!0},i(o){i||(M(e.$$.fragment,o),i=!0)},o(o){H(e.$$.fragment,o),i=!1},d(o){o&&Q(s),te(e)}}}function Ns(n){let s,e,i,o,r,t;const d=[Ls,Hs],l=[];function f(w,m){return w[0]?0:1}s=f(n),e=l[s]=d[s](n);let a=!n[13]&&We(n),p=n[12]&&Ke();return{c(){e.c(),i=V(),a&&a.c(),o=V(),p&&p.c(),r=ve()},m(w,m){l[s].m(w,m),P(w,i,m),a&&a.m(w,m),P(w,o,m),p&&p.m(w,m),P(w,r,m),t=!0},p(w,m){let G=s;s=f(w),s===G?l[s].p(w,m):(se(),H(l[G],1,1,()=>{l[G]=null}),ne(),e=l[s],e?e.p(w,m):(e=l[s]=d[s](w),e.c()),M(e,1),e.m(i.parentNode,i)),w[13]?a&&(se(),H(a,1,1,()=>{a=null}),ne()):a?(a.p(w,m),m[0]&8192&&M(a,1)):(a=We(w),a.c(),M(a,1),a.m(o.parentNode,o)),w[12]?p?m[0]&4096&&M(p,1):(p=Ke(),p.c(),M(p,1),p.m(r.parentNode,r)):p&&(se(),H(p,1,1,()=>{p=null}),ne())},i(w){t||(M(e),M(a),M(p),t=!0)},o(w){H(e),H(a),H(p),t=!1},d(w){w&&(Q(i),Q(o),Q(r)),l[s].d(w),a&&a.d(w),p&&p.d(w)}}}function Rs(n,s,e){let i,o,r,t,d,l,f,a,p,w,m,G,A,T,z,y,F,h;ts(n,qe,u=>e(8,h=u));let{id:b}=s;var c,_,ee=!1,Y="",ue=0;const J=document.getElementById("appconfig").dataset;function Z(){return{isAnswered:!!T,answerContext:m.answers.reduce((N,x)=>(N[x.id]={isCorrectAnswer:x.id===m.correct_answer_id,isSubmittedAnswer:p?x.id===p.answer_id:!1,isSelectedAnswer:p?x.id===p.answer_id:!1},N),{})}}var j=-1;Pe(()=>{axios.get("/api/sessions/"+b).then(function(u){e(0,_=u.data)}).catch(function(u){alert(u)})});function me(){return axios.get("/api/questions/"+m.id).then(function(u){var N=_.deck.questions.findIndex(pe=>pe.id===m.id),x=u.data;e(0,_.deck.questions[N]=x,_),he(x)}).catch(function(u){alert(u)})}function he(u){if(u.type!=="card"){var N=_.session.answer_choices.findIndex(x=>x.question_id===u.id);N!==-1&&e(0,_.session.answer_choices[N].is_correct=_.session.answer_choices[N].answer_id===u.correct_answer_id,_)}}var le;function L(){le&&le.cancel(),le=ls(()=>{axios.put("/api/sessions/"+_.session.id,_.session).then(function(u){}).catch(function(u){alert(u)})},1e3,{maxWait:2e3}),le()}function be(u){if(u&&u!==-1?e(9,c.answerContext[u].isSelectedAnswer=!0,c):e(9,c.isAnswered=!0,c),T&&u&&u===m.correct_answer_id){e(9,c.isAnswered=!0,c);return}else if(T)return;var N=!1;m.type==="card"?(N=!!u,u===-1&&(u=null)):N=m.correct_answer_id===u,(N||i||!d)&&e(9,c.isAnswered=!0,c),u&&u!==-1&&(e(9,c.answerContext[u].isSubmittedAnswer=!0,c),e(9,c.answerContext[u].isCorrectAnswer=N,c));var x={question_id:A,answer_id:u,is_correct:N,help_used:ee};axios.post("/api/sessions/"+b+"/answerchoices",x).then(function(pe){e(0,_.session.answer_choices=[..._.session.answer_choices,pe.data],_)}).catch(function(pe){alert(pe)})}function ke(){T&&(e(1,p=_.session.answer_choices.find(u=>u.question_id===A)),p&&axios.delete("/api/sessions/"+b+"/answerchoices/"+p.id).then(function(u){e(0,_.session.answer_choices=[..._.session.answer_choices.filter(N=>N.question_id!==A)],_),rs().then(()=>{e(9,c=Z())})}).catch(function(u){alert(u)}))}const R=()=>{Me(qe,h.session_show_sidebar=!h.session_show_sidebar,h)},U=()=>{Me(qe,h.session_shuffle_answers=!h.session_shuffle_answers,h)},D=()=>{Me(qe,h.session_exam_mode=!h.session_exam_mode,h)};function Se(u){z=u,e(3,z),e(0,_),e(25,a),e(24,w)}function Ae(u){z=u,e(3,z),e(0,_),e(25,a),e(24,w)}function Ie(u){_=u,e(0,_)}function fe(u){i=u,e(13,i),e(4,G),e(8,h),e(0,_),e(25,a),e(24,w)}function B(u){_=u,e(0,_)}function g(u){n.$$.not_equal(_.session.current_question_id,u)&&(_.session.current_question_id=u,e(0,_))}function S(u){c=u,e(9,c),e(23,A),e(0,_)}function ae(u){m=u,e(14,m),e(0,_)}function Ye(u){c=u,e(9,c),e(23,A),e(0,_)}function Ze(u){ee=u,e(10,ee)}function je(u){p=u,e(1,p),e(0,_),e(23,A)}function xe(u){i=u,e(13,i),e(4,G),e(8,h),e(0,_),e(25,a),e(24,w)}function $e(u){t=u,e(5,t),e(8,h)}function es(u){l=u,e(17,l),e(8,h)}function ss(u){n.$$.not_equal(m.id,u)&&(m.id=u,e(14,m),e(0,_))}function ns(u){Y=u,e(11,Y),e(3,z),e(22,j),e(2,y),e(0,_),e(25,a),e(24,w)}return n.$$set=u=>{"id"in u&&e(21,b=u.id)},n.$$.update=()=>{n.$$.dirty[0]&1&&e(25,a=_?_.deck.questions.filter(u=>!u.is_invalid):null),n.$$.dirty[0]&33554433&&e(24,w=_?_.session.answer_choices.filter(u=>a.some(({id:N})=>N===u.question_id)):null),n.$$.dirty[0]&50331649&&e(4,G=_?a.length===w.length:!1),n.$$.dirty[0]&272&&e(13,i=G?!1:h.session_exam_mode),n.$$.dirty[0]&256&&e(7,o=h.session_show_sidebar),n.$$.dirty[0]&256&&e(6,r=h.session_exam_mode),n.$$.dirty[0]&256&&e(5,t=h.session_shuffle_answers),n.$$.dirty[0]&256&&(d=h.session_multiple_answer_tries),n.$$.dirty[0]&256&&e(17,l=h.session_show_answer_stats),n.$$.dirty[0]&256&&e(16,f=h.session_show_progress_bar),n.$$.dirty[0]&128&&axios.put("/api/users/me/settings",{session_show_sidebar:o}).then(function(u){}).catch(function(u){alert(u)}),n.$$.dirty[0]&64&&axios.put("/api/users/me/settings",{session_exam_mode:r}).then(function(u){}).catch(function(u){alert(u)}),n.$$.dirty[0]&32&&axios.put("/api/users/me/settings",{session_shuffle_answers:t}).then(function(u){}).catch(function(u){alert(u)}),n.$$.dirty[0]&1&&e(23,A=_?_.session.current_question_id:null),n.$$.dirty[0]&8388609&&e(1,p=_?_.session.answer_choices.find(u=>u.question_id===A):null),n.$$.dirty[0]&1&&e(14,m=_?_.deck.questions.find(u=>u.id===_.session.current_question_id):null),n.$$.dirty[0]&16&&G&&e(13,i=!1),n.$$.dirty[0]&8388608&&L(),n.$$.dirty[0]&3&&(T=_?!!p:!1),n.$$.dirty[0]&8388608&&A&&e(9,c=Z()),n.$$.dirty[0]&50331649&&e(3,z=_?ds(a.length,w):null),n.$$.dirty[0]&1&&e(2,y=_?_.deck.questions.length:0),n.$$.dirty[0]&1&&e(15,F=_?_.deck.questions.findIndex(u=>u.id==_.session.current_question_id)+1:null),n.$$.dirty[0]&4194317&&(()=>{if(z){var u=z.correct;if(u<60){e(22,j=u);return}if(j===-1){e(22,j=u);return}j<60&&(e(22,j=u),axios.get("/api/magic-gif").then(function(N){e(11,Y="magic-gifs/"+N.data.id)}).catch(function(N){})),J.magic==="1"&&u===100&&j<100&&y>=10&&_.session.parent_session_id===null&&e(12,ue=1)}})()},[_,p,y,z,G,t,r,o,h,c,ee,Y,ue,i,m,F,f,l,me,be,ke,b,j,A,w,a,R,U,D,Se,Ae,Ie,fe,B,g,S,ae,Ye,Ze,je,xe,$e,es,ss,ns]}class Us extends de{constructor(s){super(),_e(this,s,Rs,Ns,ge,{id:21},null,[-1,-1])}}const Je=document.getElementById("SessionView");new Us({target:Je,props:{id:Je.dataset.sessionId}});
