import{S as de,i as _e,s as ge,e as Ie,a as P,n as z,d as A,b,c as g,G as Qe,h as p,l as X,g as V,t as J,j as ae,p as te,k as D,q as De,f as je,H as Oe,A as ze,x as G,y as Y,w as I,E as Re,m as j,o as x,u as $,v as O,z as ee,B as Z,F as qe,C,r as We}from"./index-DgDIGCFR.js";import{p as Pe,d as Je}from"./purify.es-BxOHINE-.js";import{M as Ke}from"./Messages-DuDDf_hX.js";import{C as Xe}from"./auto-C08LIDt6.js";import{S as Ye}from"./SessionProgressBar-CqGfgLl-.js";import{e as Ae}from"./each-CvUUWvvD.js";import{h as ve,S as Ze}from"./SessionQuestionView-Db_Td2vp.js";import{s as xe}from"./StatsHelper-B91isISU.js";import{U as be}from"./UserSettingsStore-CHRhuN6R.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./format-Dvme3Z7b.js";import"./parseISO-Bm-E8o14.js";import"./lodash-D0JQdfhu.js";import"./QuestionForm-CJ81FxSt.js";function Ce(n){let s,e,i,o,l;return{c(){s=b("div"),e=b("img"),g(e,"class","img-fluid"),Qe(e.src,i="/"+n[0])||g(e,"src",i),g(e,"alt","Magic GIF"),g(s,"class","img-fullscreen d-flex justify-content-center align-items-center svelte-116gbkt")},m(t,c){P(t,s,c),p(s,e),o||(l=X(s,"click",n[2]),o=!0)},p(t,c){c&1&&!Qe(e.src,i="/"+t[0])&&g(e,"src",i)},d(t){t&&A(s),o=!1,l()}}}function $e(n){let s,e=n[0]&&n[1]&&Ce(n);return{c(){e&&e.c(),s=Ie()},m(i,o){e&&e.m(i,o),P(i,s,o)},p(i,[o]){i[0]&&i[1]?e?e.p(i,o):(e=Ce(i),e.c(),e.m(s.parentNode,s)):e&&(e.d(1),e=null)},i:z,o:z,d(i){i&&A(s),e&&e.d(i)}}}function es(n,s,e){let{magicGIFPath:i=""}=s;var o=!0;function l(){e(1,o=!o)}return n.$$set=t=>{"magicGIFPath"in t&&e(0,i=t.magicGIFPath)},[i,o,l]}class ss extends de{constructor(s){super(),_e(this,s,es,$e,ge,{magicGIFPath:0})}}function Me(n){let s,e,i;return{c(){s=b("button"),s.innerHTML='<i class="bi bi-repeat"></i> Repeat incorrect',g(s,"class","btn btn-sm btn-outline-secondary"),g(s,"type","button")},m(o,l){P(o,s,l),e||(i=X(s,"click",te(n[5])),e=!0)},p:z,d(o){o&&A(s),e=!1,i()}}}function ns(n){let s,e,i,o,l,t,c,f=n[0].correct+"",r,d,q,Q,w,M,U,S,h,m=n[0].incorrect>0&&Me(n);return{c(){s=b("div"),e=b("div"),i=b("canvas"),o=V(),l=b("div"),t=b("p"),c=b("span"),r=J(f),d=J("%"),q=J(" correct"),Q=V(),w=b("div"),M=b("a"),M.innerHTML='<i class="bi bi-rocket-takeoff"></i> New session',U=V(),m&&m.c(),S=V(),h=b("a"),h.textContent="Home",g(e,"class","col-md"),g(c,"class","fs-4 font-monospace"),g(t,"class","mt-3 text-dark"),g(M,"href","/sessions/create"),g(M,"class","btn btn-sm btn-primary"),g(h,"href","/"),g(h,"class","btn btn-sm btn-outline-secondary"),g(w,"class","d-grid gap-2"),g(l,"class","col-md"),g(s,"class","row mb-5")},m(u,v){P(u,s,v),p(s,e),p(e,i),n[4](i),p(s,o),p(s,l),p(l,t),p(t,c),p(c,r),p(c,d),p(t,q),p(l,Q),p(l,w),p(w,M),p(w,U),m&&m.m(w,null),p(w,S),p(w,h)},p(u,[v]){v&1&&f!==(f=u[0].correct+"")&&ae(r,f),u[0].incorrect>0?m?m.p(u,v):(m=Me(u),m.c(),m.m(w,S)):m&&(m.d(1),m=null)},i:z,o:z,d(u){u&&A(s),n[4](null),m&&m.d()}}}function is(n){axios.post("/api/sessions/"+n+"/newfromincorrect").then(function(s){window.location.href="/sessions/"+s.data.id}).catch(function(s){alert(s)})}function ts(n,s,e){let{progressPercentage:i}=s,{sessionId:o}=s,l,t;function c(r){D[r?"unshift":"push"](()=>{l=r,e(2,l)})}const f=()=>is(o);return n.$$set=r=>{"progressPercentage"in r&&e(0,i=r.progressPercentage),"sessionId"in r&&e(1,o=r.sessionId)},n.$$.update=()=>{n.$$.dirty&13&&l&&(()=>{if(t)return;const r={type:"doughnut",data:{labels:["Correct","Correct with help","Incorrect"],datasets:[{label:"%",data:[i.correct,i.correctWithHelp,i.incorrect],backgroundColor:["#d4edda","#fff3cd","#f8d7da"],hoverOffet:4}]},options:{responsive:!0,maintainAspectRatio:!1,hover:{mode:null}}};t&&t.destroy();var d=l.getContext("2d");e(3,t=new Xe(d,r))})()},[i,o,l,t,c,f]}class os extends de{constructor(s){super(),_e(this,s,ts,ns,ge,{progressPercentage:0,sessionId:1})}}function Se(n,s,e){const i=n.slice();return i[4]=s[e],i[6]=e,i}function Fe(n){let s;return{c(){s=b("li"),s.textContent="Loading ...",g(s,"class","svelte-za7w49")},m(e,i){P(e,s,i)},p:z,d(e){e&&A(s)}}}function rs(n){let s,e=n[6]+1+"",i;return{c(){s=J("Question Nr. "),i=J(e)},m(o,l){P(o,s,l),P(o,i,l)},p:z,d(o){o&&(A(s),A(i))}}}function us(n){let s=Pe.sanitize(n[4].text).replace(/<\/?[^>]+(>|$)/g,"")+"",e;return{c(){e=J(s)},m(i,o){P(i,e,o)},p(i,o){o&1&&s!==(s=Pe.sanitize(i[4].text).replace(/<\/?[^>]+(>|$)/g,"")+"")&&ae(e,s)},d(i){i&&A(e)}}}function Ge(n){let s,e,i,o=n[1](n[4])+"",l,t,c,f,r,d;function q(U,S){return U[4].text?us:rs}let Q=q(n),w=Q(n);function M(){return n[3](n[4])}return{c(){s=b("li"),e=b("small"),i=new Oe(!1),l=V(),w.c(),t=V(),i.a=l,g(s,"class",c="list-group-item list-group-item-action text-overflow "+(n[4].id===n[0].session.current_question_id?"list-group-item-dark":"list-group-item-light")+" svelte-za7w49"),g(s,"id",f="question"+n[4].id)},m(U,S){P(U,s,S),p(s,e),i.m(o,e),p(e,l),w.m(e,null),p(s,t),r||(d=X(s,"click",M),r=!0)},p(U,S){n=U,S&3&&o!==(o=n[1](n[4])+"")&&i.p(o),Q===(Q=q(n))&&w?w.p(n,S):(w.d(1),w=Q(n),w&&(w.c(),w.m(e,null))),S&1&&c!==(c="list-group-item list-group-item-action text-overflow "+(n[4].id===n[0].session.current_question_id?"list-group-item-dark":"list-group-item-light")+" svelte-za7w49")&&g(s,"class",c),S&1&&f!==(f="question"+n[4].id)&&g(s,"id",f)},d(U){U&&A(s),w.d(),r=!1,d()}}}function ls(n){let s,e,i=Ae(n[0].deck.questions),o=[];for(let t=0;t<i.length;t+=1)o[t]=Ge(Se(n,i,t));let l=null;return i.length||(l=Fe()),{c(){s=b("div"),e=b("ul");for(let t=0;t<o.length;t+=1)o[t].c();l&&l.c(),g(e,"class","list-group"),g(s,"class","overflow-scroll"),De(s,"max-height","85vh")},m(t,c){P(t,s,c),p(s,e);for(let f=0;f<o.length;f+=1)o[f]&&o[f].m(e,null);l&&l.m(e,null)},p(t,[c]){if(c&3){i=Ae(t[0].deck.questions);let f;for(f=0;f<i.length;f+=1){const r=Se(t,i,f);o[f]?o[f].p(r,c):(o[f]=Ge(r),o[f].c(),o[f].m(e,null))}for(;f<o.length;f+=1)o[f].d(1);o.length=i.length,!i.length&&l?l.p(t,c):i.length?l&&(l.d(1),l=null):(l=Fe(),l.c(),l.m(e,null))}},i:z,o:z,d(t){t&&A(s),je(o,t),l&&l.d()}}}function fs(n,s,e){let i,{data:o}=s,{examMode:l}=s;const t=c=>e(0,o.session.current_question_id=c.id,o);return n.$$set=c=>{"data"in c&&e(0,o=c.data),"examMode"in c&&e(2,l=c.examMode)},n.$$.update=()=>{n.$$.dirty&1&&(o.session.current_question_id,(()=>{var c=document.getElementById("question"+o.session.current_question_id);c&&c.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})})()),n.$$.dirty&5&&e(1,i=function(c){var f=o.session.answer_choices.find(r=>r.question_id===c.id);return f?l?'<span class="text-dark fw-bold">&cross;</span>':f.is_correct?f.help_used?'<span class="text-warning-dark fw-bold">&check;</span>':'<span class="text-success-dark fw-bold">&check;</span>':'<span class="text-danger-dark fw-bold">&cross;</span>':'<span class="text-dark fw-bold">&rightarrow;</span>'})},[o,i,l,t]}class cs extends de{constructor(s){super(),_e(this,s,fs,ls,ge,{data:0,examMode:2})}}function as(n){let s;return{c(){s=b("div"),s.innerHTML="",g(s,"class","col-6")},m(e,i){P(e,s,i)},p:z,d(e){e&&A(s)}}}function ds(n){let s,e,i,o;return{c(){s=b("div"),e=b("button"),e.innerHTML='<span class="fw-bold">←</span> Previous',g(e,"class","btn btn-sm btn-light w-100"),g(s,"class","col-6")},m(l,t){P(l,s,t),p(s,e),i||(o=X(e,"click",te(n[2])),i=!0)},p:z,d(l){l&&A(s),i=!1,o()}}}function _s(n){let s;return{c(){s=b("div"),s.innerHTML="",g(s,"class","col-6")},m(e,i){P(e,s,i)},p:z,d(e){e&&A(s)}}}function gs(n){let s,e,i,o,l,t,c;return{c(){s=b("div"),e=b("button"),i=J("Next "),o=b("span"),o.textContent="→",g(o,"class","fw-bold"),g(e,"class",l="btn btn-sm "+(n[1]?"btn-warning":"btn-light")+" w-100"),g(s,"class","col-6")},m(f,r){P(f,s,r),p(s,e),p(e,i),p(e,o),t||(c=X(e,"click",te(n[3])),t=!0)},p(f,r){r&2&&l!==(l="btn btn-sm "+(f[1]?"btn-warning":"btn-light")+" w-100")&&g(e,"class",l)},d(f){f&&A(s),t=!1,c()}}}function ps(n){let s,e;function i(r,d){return r[0].session.current_question_id&&r[0].session.current_question_id!=r[0].deck.questions[0].id?ds:as}let o=i(n),l=o(n);function t(r,d){return r[0].session.current_question_id!=r[0].deck.questions[r[0].deck.questions.length-1].id?gs:_s}let c=t(n),f=c(n);return{c(){s=b("div"),l.c(),e=V(),f.c(),g(s,"class","row mb-3 pt-1 pb-1 sticky-top bg-white")},m(r,d){P(r,s,d),l.m(s,null),p(s,e),f.m(s,null)},p(r,[d]){o===(o=i(r))&&l?l.p(r,d):(l.d(1),l=o(r),l&&(l.c(),l.m(s,e))),c===(c=t(r))&&f?f.p(r,d):(f.d(1),f=c(r),f&&(f.c(),f.m(s,null)))},i:z,o:z,d(r){r&&A(s),l.d(),f.d()}}}function ms(n,s,e){let{data:i}=s,{currentQuestionId:o}=s,{currentQuestionAnswered:l}=s;ze(()=>{ve("left","questions",function(r,d){c()}),ve("right","questions",function(r,d){f()}),ve.setScope("questions")});function t(r){return i.deck.questions.findIndex(d=>d.id===r)}function c(){var r=t(o),d=i.deck.questions[r-1];d&&e(0,i.session.current_question_id=d.id,i)}function f(){var r=t(o),d=i.deck.questions[r+1];d&&e(0,i.session.current_question_id=d.id,i)}return n.$$set=r=>{"data"in r&&e(0,i=r.data),"currentQuestionId"in r&&e(4,o=r.currentQuestionId),"currentQuestionAnswered"in r&&e(1,l=r.currentQuestionAnswered)},[i,l,c,f,o]}class bs extends de{constructor(s){super(),_e(this,s,ms,ps,ge,{data:0,currentQuestionId:4,currentQuestionAnswered:1})}}function hs(n){let s;return{c(){s=b("p"),s.textContent="Loading ..."},m(e,i){P(e,s,i)},p:z,i:z,o:z,d(e){e&&A(s)}}}function ws(n){let s,e,i,o,l,t,c,f,r,d,q,Q,w,M,U,S=n[0].deck.name+"",h,m,u,v,B,W,K,oe,N,R,re,ue,le,pe,F,fe,me,T=!n[14]&&!n[3]&&Te(n),y=n[3]&&ye(n),H=n[6]&&He(n);function he(_){n[30](_)}function we(_){n[31](_)}function ke(_){n[32](_)}let se={};n[0]!==void 0&&(se.data=n[0]),n[0].session.current_question_id!==void 0&&(se.currentQuestionId=n[0].session.current_question_id),n[10]!==void 0&&(se.currentQuestionAnswered=n[10]),R=new bs({props:se}),D.push(()=>j(R,"data",he)),D.push(()=>j(R,"currentQuestionId",we)),D.push(()=>j(R,"currentQuestionAnswered",ke));let L=n[11]&&Le(n);return{c(){s=b("div"),e=b("div"),i=b("p"),o=b("button"),o.innerHTML='<i class="bi bi-layout-sidebar"></i>',l=V(),t=b("button"),t.innerHTML='<i class="bi bi-shuffle"></i>',c=V(),f=b("button"),f.innerHTML='<i class="bi bi-exclamation-square"></i>',r=V(),d=b("span"),q=J(n[12]),Q=J("/"),w=J(n[13]),M=V(),U=b("strong"),h=J(S),m=V(),u=b("div"),v=b("div"),T&&T.c(),B=V(),y&&y.c(),W=V(),K=b("div"),H&&H.c(),oe=V(),N=b("div"),x(R.$$.fragment),pe=V(),L&&L.c(),g(o,"class","btn btn-sm d-none d-sm-none d-md-none d-lg-inline"),g(o,"title","Toggle sidebar"),C(o,"bg-light",!n[6]),C(o,"bg-dark-subtle",n[6]),g(t,"class","btn btn-sm"),g(t,"title","Toggle answer shuffling"),C(t,"bg-light",!n[4]),C(t,"bg-dark-subtle",n[4]),g(f,"class","btn btn-sm"),g(f,"title","Toggle exam mode"),C(f,"bg-light",!n[5]),C(f,"bg-dark-subtle",n[5]),g(d,"class","ms-1 float-end fw-bold font-monospace badge text-dark"),C(d,"text-bg-light",!n[1]||n[14]),C(d,"bg-success",!n[14]&&!n[11].is_invalid&&n[1]&&n[1].is_correct),C(d,"bg-danger",!n[14]&&!n[11].is_invalid&&n[1]&&!n[1].is_correct),g(i,"class","text-overflow svelte-1gfmo48"),g(e,"class","col mb-1"),g(s,"class","row"),g(v,"class","col mb-1"),g(u,"class","row"),g(N,"class","col-md-12"),C(N,"col-lg-9",n[6]),C(N,"col-lg-10",!n[6]),C(N,"offset-lg-1",!n[6]),g(K,"class","row mt-3")},m(_,k){P(_,s,k),p(s,e),p(e,i),p(i,o),p(i,l),p(i,t),p(i,c),p(i,f),p(i,r),p(i,d),p(d,q),p(d,Q),p(d,w),p(i,M),p(i,U),p(U,h),P(_,m,k),P(_,u,k),p(u,v),T&&T.m(v,null),p(v,B),y&&y.m(v,null),P(_,W,k),P(_,K,k),H&&H.m(K,null),p(K,oe),p(K,N),$(R,N,null),p(N,pe),L&&L.m(N,null),F=!0,fe||(me=[X(o,"click",te(n[23])),X(t,"click",te(n[24])),X(f,"click",te(n[25]))],fe=!0)},p(_,k){(!F||k[0]&64)&&C(o,"bg-light",!_[6]),(!F||k[0]&64)&&C(o,"bg-dark-subtle",_[6]),(!F||k[0]&16)&&C(t,"bg-light",!_[4]),(!F||k[0]&16)&&C(t,"bg-dark-subtle",_[4]),(!F||k[0]&32)&&C(f,"bg-light",!_[5]),(!F||k[0]&32)&&C(f,"bg-dark-subtle",_[5]),(!F||k[0]&4096)&&ae(q,_[12]),(!F||k[0]&8192)&&ae(w,_[13]),(!F||k[0]&16386)&&C(d,"text-bg-light",!_[1]||_[14]),(!F||k[0]&18434)&&C(d,"bg-success",!_[14]&&!_[11].is_invalid&&_[1]&&_[1].is_correct),(!F||k[0]&18434)&&C(d,"bg-danger",!_[14]&&!_[11].is_invalid&&_[1]&&!_[1].is_correct),(!F||k[0]&1)&&S!==(S=_[0].deck.name+"")&&ae(h,S),!_[14]&&!_[3]?T?(T.p(_,k),k[0]&16392&&I(T,1)):(T=Te(_),T.c(),I(T,1),T.m(v,B)):T&&(Z(),G(T,1,1,()=>{T=null}),Y()),_[3]?y?(y.p(_,k),k[0]&8&&I(y,1)):(y=ye(_),y.c(),I(y,1),y.m(v,null)):y&&(Z(),G(y,1,1,()=>{y=null}),Y()),_[6]?H?(H.p(_,k),k[0]&64&&I(H,1)):(H=He(_),H.c(),I(H,1),H.m(K,oe)):H&&(Z(),G(H,1,1,()=>{H=null}),Y());const ne={};!re&&k[0]&1&&(re=!0,ne.data=_[0],O(()=>re=!1)),!ue&&k[0]&1&&(ue=!0,ne.currentQuestionId=_[0].session.current_question_id,O(()=>ue=!1)),!le&&k[0]&1024&&(le=!0,ne.currentQuestionAnswered=_[10],O(()=>le=!1)),R.$set(ne),_[11]?L?(L.p(_,k),k[0]&2048&&I(L,1)):(L=Le(_),L.c(),I(L,1),L.m(N,null)):L&&(Z(),G(L,1,1,()=>{L=null}),Y()),(!F||k[0]&64)&&C(N,"col-lg-9",_[6]),(!F||k[0]&64)&&C(N,"col-lg-10",!_[6]),(!F||k[0]&64)&&C(N,"offset-lg-1",!_[6])},i(_){F||(I(T),I(y),I(H),I(R.$$.fragment,_),I(L),F=!0)},o(_){G(T),G(y),G(H),G(R.$$.fragment,_),G(L),F=!1},d(_){_&&(A(s),A(m),A(u),A(W),A(K)),T&&T.d(),y&&y.d(),H&&H.d(),ee(R),L&&L.d(),fe=!1,We(me)}}}function Te(n){let s,e,i;function o(t){n[26](t)}let l={};return n[2]!==void 0&&(l.progressPercentage=n[2]),s=new Ye({props:l}),D.push(()=>j(s,"progressPercentage",o)),{c(){x(s.$$.fragment)},m(t,c){$(s,t,c),i=!0},p(t,c){const f={};!e&&c[0]&4&&(e=!0,f.progressPercentage=t[2],O(()=>e=!1)),s.$set(f)},i(t){i||(I(s.$$.fragment,t),i=!0)},o(t){G(s.$$.fragment,t),i=!1},d(t){ee(s,t)}}}function ye(n){let s,e,i;function o(t){n[27](t)}let l={sessionId:n[0].session.id};return n[2]!==void 0&&(l.progressPercentage=n[2]),s=new os({props:l}),D.push(()=>j(s,"progressPercentage",o)),{c(){x(s.$$.fragment)},m(t,c){$(s,t,c),i=!0},p(t,c){const f={};c[0]&1&&(f.sessionId=t[0].session.id),!e&&c[0]&4&&(e=!0,f.progressPercentage=t[2],O(()=>e=!1)),s.$set(f)},i(t){i||(I(s.$$.fragment,t),i=!0)},o(t){G(s.$$.fragment,t),i=!1},d(t){ee(s,t)}}}function He(n){let s,e,i,o,l;function t(r){n[28](r)}function c(r){n[29](r)}let f={};return n[0]!==void 0&&(f.data=n[0]),n[14]!==void 0&&(f.examMode=n[14]),e=new cs({props:f}),D.push(()=>j(e,"data",t)),D.push(()=>j(e,"examMode",c)),{c(){s=b("div"),x(e.$$.fragment),g(s,"class","col-lg-3 d-none d-lg-block")},m(r,d){P(r,s,d),$(e,s,null),l=!0},p(r,d){const q={};!i&&d[0]&1&&(i=!0,q.data=r[0],O(()=>i=!1)),!o&&d[0]&16384&&(o=!0,q.examMode=r[14],O(()=>o=!1)),e.$set(q)},i(r){l||(I(e.$$.fragment,r),l=!0)},o(r){G(e.$$.fragment,r),l=!1},d(r){r&&A(s),ee(e)}}}function Le(n){let s,e,i,o,l,t,c,f,r,d;function q(u){n[33](u)}function Q(u){n[34](u)}function w(u){n[35](u)}function M(u){n[36](u)}function U(u){n[37](u)}function S(u){n[38](u)}let h={submitAnswer:n[16],deleteAnswer:n[17],updateCurrentQuestionData:n[15]};n[11]!==void 0&&(h.question=n[11]),n[10]!==void 0&&(h.questionAnswered=n[10]),n[8]!==void 0&&(h.helpUsed=n[8]),n[1]!==void 0&&(h.answerChoice=n[1]),n[14]!==void 0&&(h.examMode=n[14]),n[4]!==void 0&&(h.settingsShuffleAnswers=n[4]),s=new Ze({props:h}),D.push(()=>j(s,"question",q)),D.push(()=>j(s,"questionAnswered",Q)),D.push(()=>j(s,"helpUsed",w)),D.push(()=>j(s,"answerChoice",M)),D.push(()=>j(s,"examMode",U)),D.push(()=>j(s,"settingsShuffleAnswers",S));let m=!n[14]&&n[10]&&Ue(n);return{c(){x(s.$$.fragment),f=V(),m&&m.c(),r=Ie()},m(u,v){$(s,u,v),P(u,f,v),m&&m.m(u,v),P(u,r,v),d=!0},p(u,v){const B={};!e&&v[0]&2048&&(e=!0,B.question=u[11],O(()=>e=!1)),!i&&v[0]&1024&&(i=!0,B.questionAnswered=u[10],O(()=>i=!1)),!o&&v[0]&256&&(o=!0,B.helpUsed=u[8],O(()=>o=!1)),!l&&v[0]&2&&(l=!0,B.answerChoice=u[1],O(()=>l=!1)),!t&&v[0]&16384&&(t=!0,B.examMode=u[14],O(()=>t=!1)),!c&&v[0]&16&&(c=!0,B.settingsShuffleAnswers=u[4],O(()=>c=!1)),s.$set(B),!u[14]&&u[10]?m?(m.p(u,v),v[0]&17408&&I(m,1)):(m=Ue(u),m.c(),I(m,1),m.m(r.parentNode,r)):m&&(Z(),G(m,1,1,()=>{m=null}),Y())},i(u){d||(I(s.$$.fragment,u),I(m),d=!0)},o(u){G(s.$$.fragment,u),G(m),d=!1},d(u){u&&(A(f),A(r)),ee(s,u),m&&m.d(u)}}}function Ue(n){let s,e,i;function o(t){n[39](t)}let l={};return n[11].id!==void 0&&(l.questionId=n[11].id),s=new Ke({props:l}),D.push(()=>j(s,"questionId",o)),{c(){x(s.$$.fragment)},m(t,c){$(s,t,c),i=!0},p(t,c){const f={};!e&&c[0]&2048&&(e=!0,f.questionId=t[11].id,O(()=>e=!1)),s.$set(f)},i(t){i||(I(s.$$.fragment,t),i=!0)},o(t){G(s.$$.fragment,t),i=!1},d(t){ee(s,t)}}}function Ne(n){let s,e,i;function o(t){n[40](t)}let l={};return n[9]!==void 0&&(l.magicGIFPath=n[9]),s=new ss({props:l}),D.push(()=>j(s,"magicGIFPath",o)),{c(){x(s.$$.fragment)},m(t,c){$(s,t,c),i=!0},p(t,c){const f={};!e&&c[0]&512&&(e=!0,f.magicGIFPath=t[9],O(()=>e=!1)),s.$set(f)},i(t){i||(I(s.$$.fragment,t),i=!0)},o(t){G(s.$$.fragment,t),i=!1},d(t){ee(s,t)}}}function ks(n){let s,e,i,o,l;const t=[ws,hs],c=[];function f(d,q){return d[0]?0:1}s=f(n),e=c[s]=t[s](n);let r=!n[14]&&Ne(n);return{c(){e.c(),i=V(),r&&r.c(),o=Ie()},m(d,q){c[s].m(d,q),P(d,i,q),r&&r.m(d,q),P(d,o,q),l=!0},p(d,q){let Q=s;s=f(d),s===Q?c[s].p(d,q):(Z(),G(c[Q],1,1,()=>{c[Q]=null}),Y(),e=c[s],e?e.p(d,q):(e=c[s]=t[s](d),e.c()),I(e,1),e.m(i.parentNode,i)),d[14]?r&&(Z(),G(r,1,1,()=>{r=null}),Y()):r?(r.p(d,q),q[0]&16384&&I(r,1)):(r=Ne(d),r.c(),I(r,1),r.m(o.parentNode,o))},i(d){l||(I(e),I(r),l=!0)},o(d){G(e),G(r),l=!1},d(d){d&&(A(i),A(o)),c[s].d(d),r&&r.d(d)}}}function qs(n,s,e){let i,o,l,t,c,f,r,d,q,Q,w,M,U,S,h;Re(n,be,a=>e(7,h=a));let{id:m}=s;var u,v=!1,B="",W=-1;ze(()=>{axios.get("/api/sessions/"+m).then(function(a){e(0,u=a.data)}).catch(function(a){alert(a)})});function K(){return axios.get("/api/questions/"+d.id).then(function(a){var E=u.deck.questions.findIndex(ce=>ce.id===d.id),ie=a.data;e(0,u.deck.questions[E]=ie,u),oe(ie)}).catch(function(a){alert(a)})}function oe(a){if(a.type!=="card"){var E=u.session.answer_choices.findIndex(ie=>ie.question_id===a.id);E!==-1&&e(0,u.session.answer_choices[E].is_correct=u.session.answer_choices[E].answer_id===a.correct_answer_id,u)}}var N;function R(){N&&N.cancel(),N=Je(()=>{axios.put("/api/sessions/"+u.session.id,u.session).then(function(a){}).catch(function(a){alert(a)})},1e3,{maxWait:2e3}),N()}function re(a){if(!w){var E=!1;d.type==="card"?E=!!a:E=d.correct_answer_id===a;var ie={question_id:Q,answer_id:a,is_correct:E,help_used:v};axios.post("/api/sessions/"+m+"/answerchoices",ie).then(function(ce){e(0,u.session.answer_choices=[...u.session.answer_choices,ce.data],u)}).catch(function(ce){alert(ce)})}}function ue(){w&&(e(1,f=u.session.answer_choices.find(a=>a.question_id===Q)),r&&axios.delete("/api/sessions/"+m+"/answerchoices/"+f.id).then(function(a){e(0,u.session.answer_choices=[...u.session.answer_choices.filter(E=>E.question_id!==Q)],u)}).catch(function(a){alert(a)}))}const le=()=>{qe(be,h.session_show_sidebar=!h.session_show_sidebar,h)},pe=()=>{qe(be,h.session_shuffle_answers=!h.session_shuffle_answers,h)},F=()=>{qe(be,h.session_exam_mode=!h.session_exam_mode,h)};function fe(a){M=a,e(2,M),e(0,u),e(22,c),e(21,r)}function me(a){M=a,e(2,M),e(0,u),e(22,c),e(21,r)}function T(a){u=a,e(0,u)}function y(a){i=a,e(14,i),e(3,q),e(7,h),e(0,u),e(22,c),e(21,r)}function H(a){u=a,e(0,u)}function he(a){n.$$.not_equal(u.session.current_question_id,a)&&(u.session.current_question_id=a,e(0,u))}function we(a){w=a,e(10,w),e(0,u),e(1,f),e(20,Q)}function ke(a){d=a,e(11,d),e(0,u)}function se(a){w=a,e(10,w),e(0,u),e(1,f),e(20,Q)}function L(a){v=a,e(8,v)}function _(a){f=a,e(1,f),e(0,u),e(20,Q)}function k(a){i=a,e(14,i),e(3,q),e(7,h),e(0,u),e(22,c),e(21,r)}function ne(a){t=a,e(4,t),e(7,h)}function Be(a){n.$$.not_equal(d.id,a)&&(d.id=a,e(11,d),e(0,u))}function Ee(a){B=a,e(9,B),e(2,M),e(19,W),e(0,u),e(22,c),e(21,r)}return n.$$set=a=>{"id"in a&&e(18,m=a.id)},n.$$.update=()=>{n.$$.dirty[0]&1&&e(22,c=u?u.deck.questions.filter(a=>!a.is_invalid):null),n.$$.dirty[0]&4194305&&e(21,r=u?u.session.answer_choices.filter(a=>c.some(({id:E})=>E===a.question_id)):null),n.$$.dirty[0]&6291457&&e(3,q=u?c.length===r.length:!1),n.$$.dirty[0]&136&&e(14,i=q?!1:h.session_exam_mode),n.$$.dirty[0]&128&&e(6,o=h.session_show_sidebar),n.$$.dirty[0]&128&&e(5,l=h.session_exam_mode),n.$$.dirty[0]&128&&e(4,t=h.session_shuffle_answers),n.$$.dirty[0]&64&&axios.put("/api/users/me/settings",{session_show_sidebar:o}).then(function(a){}).catch(function(a){alert(a)}),n.$$.dirty[0]&32&&axios.put("/api/users/me/settings",{session_exam_mode:l}).then(function(a){}).catch(function(a){alert(a)}),n.$$.dirty[0]&16&&axios.put("/api/users/me/settings",{session_shuffle_answers:t}).then(function(a){}).catch(function(a){alert(a)}),n.$$.dirty[0]&1&&e(20,Q=u?u.session.current_question_id:-1),n.$$.dirty[0]&1048577&&e(1,f=u?u.session.answer_choices.find(a=>a.question_id===Q):null),n.$$.dirty[0]&1&&e(11,d=u?u.deck.questions.find(a=>a.id===u.session.current_question_id):null),n.$$.dirty[0]&8&&q&&e(14,i=!1),n.$$.dirty[0]&1048576&&R(),n.$$.dirty[0]&3&&e(10,w=u?!!f:!1),n.$$.dirty[0]&6291457&&e(2,M=u?xe(c.length,r):null),n.$$.dirty[0]&1&&e(13,U=u?u.deck.questions.length:0),n.$$.dirty[0]&1&&e(12,S=u?u.deck.questions.findIndex(a=>a.id==u.session.current_question_id)+1:null),n.$$.dirty[0]&524292&&(()=>{if(M){var a=M.correct;if(a<60){e(19,W=a);return}if(W===-1){e(19,W=a);return}W<60&&(e(19,W=a),axios.get("/api/magic-gif").then(function(E){e(9,B="magic-gifs/"+E.data.id)}).catch(function(E){}))}})()},[u,f,M,q,t,l,o,h,v,B,w,d,S,U,i,K,re,ue,m,W,Q,r,c,le,pe,F,fe,me,T,y,H,he,we,ke,se,L,_,k,ne,Be,Ee]}class vs extends de{constructor(s){super(),_e(this,s,qs,ks,ge,{id:18},null,[-1,-1])}}const Ve=document.getElementById("SessionView");new vs({target:Ve,props:{id:Ve.dataset.sessionId}});
