import{S as re,i as ie,s as oe,k as ae,m as le,b as p,o as ce,g as O,t as v,c as h,q as k,C as N,a as F,u as fe,h as d,v as ue,j as C,w as P,x as z,d as L,z as de,l as he,p as _e,n as me,e as pe,y as be,f as Me,A as De,B as we}from"./index-CovtvcR3.js";import{e as K}from"./each-CtuGQY9F.js";import{S as ye}from"./SessionProgressBar-FS8-6FmE.js";import{s as Se}from"./StatsHelper-B91isISU.js";import{t as g,e as Ie,g as W,m as Z,a as R,b as ve,p as $,f as ke}from"./parseISO-Ds5nI7_t.js";function A(n,e){const s=g(n),o=g(e),t=s.getTime()-o.getTime();return t<0?-1:t>0?1:t}function Oe(n,e){const s=g(n),o=g(e),t=s.getFullYear()-o.getFullYear(),c=s.getMonth()-o.getMonth();return t*12+c}function Pe(n){return e=>{const o=(n?Math[n]:Math.trunc)(e);return o===0?0:o}}function Xe(n,e){return+g(n)-+g(e)}function Te(n){const e=g(n);return e.setHours(23,59,59,999),e}function Ye(n){const e=g(n),s=e.getMonth();return e.setFullYear(e.getFullYear(),s+1,0),e.setHours(23,59,59,999),e}function He(n){const e=g(n);return+Te(e)==+Ye(e)}function Ne(n,e){const s=g(n),o=g(e),t=A(s,o),c=Math.abs(Oe(s,o));let i;if(c<1)i=0;else{s.getMonth()===1&&s.getDate()>27&&s.setDate(30),s.setMonth(s.getMonth()-t*c);let r=A(s,o)===-t;He(g(n))&&c===1&&A(n,o)===1&&(r=!1),i=t*(c-Number(r))}return i===0?0:i}function Re(n,e,s){const o=Xe(n,e)/1e3;return Pe(s==null?void 0:s.roundingMethod)(o)}function Ae(n,e,s){const o=ve(),t=(s==null?void 0:s.locale)??o.locale??Ie,c=2520,i=A(n,e);if(isNaN(i))throw new RangeError("Invalid time value");const r=Object.assign({},s,{addSuffix:s==null?void 0:s.addSuffix,comparison:i});let l,a;i>0?(l=g(e),a=g(n)):(l=g(n),a=g(e));const m=Re(a,l),b=(W(a)-W(l))/1e3,f=Math.round((m-b)/60);let y;if(f<2)return s!=null&&s.includeSeconds?m<5?t.formatDistance("lessThanXSeconds",5,r):m<10?t.formatDistance("lessThanXSeconds",10,r):m<20?t.formatDistance("lessThanXSeconds",20,r):m<40?t.formatDistance("halfAMinute",0,r):m<60?t.formatDistance("lessThanXMinutes",1,r):t.formatDistance("xMinutes",1,r):f===0?t.formatDistance("lessThanXMinutes",1,r):t.formatDistance("xMinutes",f,r);if(f<45)return t.formatDistance("xMinutes",f,r);if(f<90)return t.formatDistance("aboutXHours",1,r);if(f<Z){const M=Math.round(f/60);return t.formatDistance("aboutXHours",M,r)}else{if(f<c)return t.formatDistance("xDays",1,r);if(f<R){const M=Math.round(f/Z);return t.formatDistance("xDays",M,r)}else if(f<R*2)return y=Math.round(f/R),t.formatDistance("aboutXMonths",y,r)}if(y=Ne(a,l),y<12){const M=Math.round(f/R);return t.formatDistance("xMonths",M,r)}else{const M=y%12,S=Math.trunc(y/12);return M<3?t.formatDistance("aboutXYears",S,r):M<9?t.formatDistance("overXYears",S,r):t.formatDistance("almostXYears",S+1,r)}}function x(n){let e,s,o;return{c(){e=p("button"),e.innerHTML='<i class="bi bi-repeat"></i> Repeat incorrect',h(e,"class","btn btn-sm btn-outline-secondary"),k(e,"--bs-btn-padding-y",".25rem"),k(e,"--bs-btn-padding-x",".5rem"),k(e,"--bs-btn-font-size",".75rem"),h(e,"type","button")},m(t,c){F(t,e,c),s||(o=he(e,"click",_e(n[6])),s=!0)},p:me,d(t){t&&L(e),s=!1,o()}}}function ze(n){let e,s,o,t,c,i,r,l=n[0].name+"",a,m,b,f,y,M,S,V,E,I,X,T,q,j,Q,Y,H,B,U,D;function ge(u){n[5](u)}let G={};n[1]!==void 0&&(G.progressPercentage=n[1]),s=new ye({props:G}),ae.push(()=>le(s,"progressPercentage",ge));let _=n[1].unanswered===0&&n[1].incorrect>0&&x(n);return{c(){e=p("div"),ce(s.$$.fragment),t=O(),c=p("div"),i=p("div"),r=p("strong"),a=v(l),m=O(),b=p("div"),f=p("a"),y=p("i"),M=v(" Open"),V=O(),_&&_.c(),E=O(),I=p("div"),X=p("span"),T=p("small"),q=v(n[3]),j=v(" ago"),Q=O(),Y=p("span"),H=p("small"),B=v(n[3]),U=v(" ago"),h(i,"class","col-md-4"),h(y,"class","bi bi-rocket-takeoff"),h(f,"href",S="/sessions/"+n[0].id),h(f,"class","btn btn-sm"),k(f,"--bs-btn-padding-y",".25rem"),k(f,"--bs-btn-padding-x",".5rem"),k(f,"--bs-btn-font-size",".75rem"),N(f,"btn-primary",n[1].unanswered),N(f,"btn-outline-secondary",!n[1].unanswered),h(b,"class","col-md-4"),h(X,"class","float-end d-none d-sm-none d-md-inline"),h(Y,"class","d-inline d-sm-inline d-md-none"),h(I,"class","col-md-4"),h(I,"title",n[2]),h(c,"class","row mt-1"),h(e,"class","mt-3 mb-3")},m(u,w){F(u,e,w),fe(s,e,null),d(e,t),d(e,c),d(c,i),d(i,r),d(r,a),d(c,m),d(c,b),d(b,f),d(f,y),d(f,M),d(b,V),_&&_.m(b,null),d(c,E),d(c,I),d(I,X),d(X,T),d(T,q),d(T,j),d(I,Q),d(I,Y),d(Y,H),d(H,B),d(H,U),D=!0},p(u,[w]){const J={};!o&&w&2&&(o=!0,J.progressPercentage=u[1],ue(()=>o=!1)),s.$set(J),(!D||w&1)&&l!==(l=u[0].name+"")&&C(a,l),(!D||w&1&&S!==(S="/sessions/"+u[0].id))&&h(f,"href",S),(!D||w&2)&&N(f,"btn-primary",u[1].unanswered),(!D||w&2)&&N(f,"btn-outline-secondary",!u[1].unanswered),u[1].unanswered===0&&u[1].incorrect>0?_?_.p(u,w):(_=x(u),_.c(),_.m(b,null)):_&&(_.d(1),_=null),(!D||w&8)&&C(q,u[3]),(!D||w&8)&&C(B,u[3]),(!D||w&4)&&h(I,"title",u[2])},i(u){D||(P(s.$$.fragment,u),D=!0)},o(u){z(s.$$.fragment,u),D=!1},d(u){u&&L(e),de(s),_&&_.d()}}}function Fe(n){axios.post("/api/sessions/"+n+"/newfromincorrect").then(function(e){window.location.href="/sessions/"+e.data.id}).catch(function(e){alert(e)})}function Le(n,e,s){let o,t,c,i,{session:r}=e;function l(m){i=m,s(1,i),s(0,r),s(4,c)}const a=()=>Fe(r.id);return n.$$set=m=>{"session"in m&&s(0,r=m.session)},n.$$.update=()=>{n.$$.dirty&1&&s(3,o=Ae($(r.created_at),new Date)),n.$$.dirty&1&&s(2,t=ke($(r.created_at),"dd.MM.yyyy HH:mm")),n.$$.dirty&1&&s(4,c=r?r.deck.questions.filter(m=>!m.is_invalid):null),n.$$.dirty&17&&s(1,i=r?Se(c.length,r.answerchoices.filter(m=>c.some(({id:b})=>b===m.question_id))):null)},[r,i,t,o,c,l,a]}class qe extends re{constructor(e){super(),ie(this,e,Le,ze,oe,{session:0})}}function ee(n,e,s){const o=n.slice();return o[3]=e[s],o[4]=e,o[5]=s,o}function se(n){let e;return{c(){e=p("p"),e.textContent="No sessions yet"},m(s,o){F(s,e,o)},p:me,d(s){s&&L(e)}}}function ne(n){let e,s,o;function t(i){n[2](i,n[3],n[4],n[5])}let c={};return n[3]!==void 0&&(c.session=n[3]),e=new qe({props:c}),ae.push(()=>le(e,"session",t)),{c(){ce(e.$$.fragment)},m(i,r){fe(e,i,r),o=!0},p(i,r){n=i;const l={};!s&&r&1&&(s=!0,l.session=n[3],ue(()=>s=!1)),e.$set(l)},i(i){o||(P(e.$$.fragment,i),o=!0)},o(i){z(e.$$.fragment,i),o=!1},d(i){de(e,i)}}}function Be(n){let e,s,o=K(n[0]),t=[];for(let r=0;r<o.length;r+=1)t[r]=ne(ee(n,o,r));const c=r=>z(t[r],1,1,()=>{t[r]=null});let i=null;return o.length||(i=se()),{c(){for(let r=0;r<t.length;r+=1)t[r].c();e=pe(),i&&i.c()},m(r,l){for(let a=0;a<t.length;a+=1)t[a]&&t[a].m(r,l);F(r,e,l),i&&i.m(r,l),s=!0},p(r,[l]){if(l&1){o=K(r[0]);let a;for(a=0;a<o.length;a+=1){const m=ee(r,o,a);t[a]?(t[a].p(m,l),P(t[a],1)):(t[a]=ne(m),t[a].c(),P(t[a],1),t[a].m(e.parentNode,e))}for(we(),a=o.length;a<t.length;a+=1)c(a);be(),!o.length&&i?i.p(r,l):o.length?i&&(i.d(1),i=null):(i=se(),i.c(),i.m(e.parentNode,e))}},i(r){if(!s){for(let l=0;l<o.length;l+=1)P(t[l]);s=!0}},o(r){t=t.filter(Boolean);for(let l=0;l<t.length;l+=1)z(t[l]);s=!1},d(r){r&&L(e),Me(t,r),i&&i.d(r)}}}function Ce(n,e,s){let{userId:o}=e;var t=[];De(()=>{axios.get("/api/sessions?take=15&user-id="+o).then(function(i){s(0,t=i.data)}).catch(function(i){alert(i)})});function c(i,r,l,a){l[a]=i,s(0,t)}return n.$$set=i=>{"userId"in i&&s(1,o=i.userId)},[t,o,c]}class Ve extends re{constructor(e){super(),ie(this,e,Ce,Be,oe,{userId:1})}}const te=document.getElementById("IndexSessionView");new Ve({target:te,props:{userId:te.dataset.userId}});