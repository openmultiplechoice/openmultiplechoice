import{S as X,i as Y,s as $,c as m,a as g,f as u,E as x,b as v,h as c,n as T,d as y,C as ee,k as te,m as A,t as q,l as D,p as I,q as C}from"./index-BBxbQYOu.js";import{e as S}from"./each-DRTt0YH0.js";import{c as N}from"./NewSessionHelper-Ba9jtPTo.js";import{C as le}from"./auto-De2ec26M.js";import{f as O,p as se}from"./parseISO-Ds5nI7_t.js";function V(s,e,o){const r=s.slice();return r[12]=e[o],r}function j(s,e,o){const r=s.slice();return r[12]=e[o],r}function B(s,e,o){const r=s.slice();return r[12]=e[o],r}function ie(s){let e;return{c(){e=m("p"),e.textContent="No stats available yet"},m(o,r){v(o,e,r)},p:T,d(o){o&&y(e)}}}function ne(s){let e,o,r,n=s[1].length>0&&E(s),l=s[2].length>0&&s[3]&&R(s),t=s[4].length>0&&G(s);return{c(){e=m("div"),n&&n.c(),o=g(),l&&l.c(),r=g(),t&&t.c(),u(e,"class","row")},m(a,i){v(a,e,i),n&&n.m(e,null),c(e,o),l&&l.m(e,null),c(e,r),t&&t.m(e,null)},p(a,i){a[1].length>0?n?n.p(a,i):(n=E(a),n.c(),n.m(e,o)):n&&(n.d(1),n=null),a[2].length>0&&a[3]?l?l.p(a,i):(l=R(a),l.c(),l.m(e,r)):l&&(l.d(1),l=null),a[4].length>0?t?t.p(a,i):(t=G(a),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},d(a){a&&y(e),n&&n.d(),l&&l.d(),t&&t.d()}}}function E(s){let e,o,r,n=S(s[1]),l=[];for(let t=0;t<n.length;t+=1)l[t]=U(B(s,n,t));return{c(){e=m("div"),o=m("h6"),o.textContent="New decks",r=g();for(let t=0;t<l.length;t+=1)l[t].c();u(e,"class","col-lg mt-3 text-overflow svelte-1gfmo48")},m(t,a){v(t,e,a),c(e,o),c(e,r);for(let i=0;i<l.length;i+=1)l[i]&&l[i].m(e,null)},p(t,a){if(a&2){n=S(t[1]);let i;for(i=0;i<n.length;i+=1){const f=B(t,n,i);l[i]?l[i].p(f,a):(l[i]=U(f),l[i].c(),l[i].m(e,null))}for(;i<l.length;i+=1)l[i].d(1);l.length=n.length}},d(t){t&&y(e),A(l,t)}}}function P(s){let e,o,r,n=s[12].questions.length+"",l;return{c(){e=m("span"),o=m("i"),r=g(),l=q(n),u(o,"class","bi bi-collection"),u(e,"class","badge text-bg-light"),u(e,"title","Number of questions")},m(t,a){v(t,e,a),c(e,o),c(e,r),c(e,l)},p(t,a){a&2&&n!==(n=t[12].questions.length+"")&&C(l,n)},d(t){t&&y(e)}}}function U(s){let e,o,r,n,l,t=s[12].name+"",a,i,f,b,d,_=s[12].questions.length>0&&P(s);function k(){return s[8](s[12])}return{c(){e=m("div"),_&&_.c(),o=g(),r=m("button"),r.innerHTML='<i class="bi bi-rocket-takeoff"></i>',n=g(),l=m("a"),a=q(t),f=g(),u(r,"type","button"),u(r,"class","btn btn-sm btn-primary"),u(l,"href",i="/decks/"+s[12].id),u(l,"class","alert-link text-overflow svelte-1gfmo48"),u(e,"class","alert alert-light m-1 p-2 text-overflow svelte-1gfmo48"),u(e,"role","alert")},m(p,h){v(p,e,h),_&&_.m(e,null),c(e,o),c(e,r),c(e,n),c(e,l),c(l,a),c(e,f),b||(d=D(r,"click",I(k)),b=!0)},p(p,h){s=p,s[12].questions.length>0?_?_.p(s,h):(_=P(s),_.c(),_.m(e,o)):_&&(_.d(1),_=null),h&2&&t!==(t=s[12].name+"")&&C(a,t),h&2&&i!==(i="/decks/"+s[12].id)&&u(l,"href",i)},d(p){p&&y(e),_&&_.d(),b=!1,d()}}}function R(s){let e,o,r,n,l,t,a=S(s[2]),i=[];for(let f=0;f<a.length;f+=1)i[f]=Z(j(s,a,f));return{c(){e=m("div"),o=m("h6"),r=q("Popular decks (last "),n=q(s[3]),l=q(" days)"),t=g();for(let f=0;f<i.length;f+=1)i[f].c();u(e,"class","col-lg mt-3 text-overflow svelte-1gfmo48")},m(f,b){v(f,e,b),c(e,o),c(o,r),c(o,n),c(o,l),c(e,t);for(let d=0;d<i.length;d+=1)i[d]&&i[d].m(e,null)},p(f,b){if(b&8&&C(n,f[3]),b&4){a=S(f[2]);let d;for(d=0;d<a.length;d+=1){const _=j(f,a,d);i[d]?i[d].p(_,b):(i[d]=Z(_),i[d].c(),i[d].m(e,null))}for(;d<i.length;d+=1)i[d].d(1);i.length=a.length}},d(f){f&&y(e),A(i,f)}}}function z(s){let e,o,r,n=s[12].questions.length+"",l;return{c(){e=m("span"),o=m("i"),r=g(),l=q(n),u(o,"class","bi bi-collection"),u(e,"class","badge text-bg-light"),u(e,"title","Number of questions")},m(t,a){v(t,e,a),c(e,o),c(e,r),c(e,l)},p(t,a){a&4&&n!==(n=t[12].questions.length+"")&&C(l,n)},d(t){t&&y(e)}}}function F(s){let e,o,r,n=s[12].sessions_count+"",l;return{c(){e=m("span"),o=m("i"),r=g(),l=q(n),u(o,"class","bi bi-rocket"),u(e,"class","badge text-bg-light"),u(e,"title","Number of sessions")},m(t,a){v(t,e,a),c(e,o),c(e,r),c(e,l)},p(t,a){a&4&&n!==(n=t[12].sessions_count+"")&&C(l,n)},d(t){t&&y(e)}}}function Z(s){let e,o,r,n,l,t,a=s[12].name+"",i,f,b,d,_,k=s[12].questions.length>0&&z(s),p=s[12].sessions_count&&F(s);function h(){return s[9](s[12])}return{c(){e=m("div"),k&&k.c(),o=g(),p&&p.c(),r=g(),n=m("button"),n.innerHTML='<i class="bi bi-rocket-takeoff"></i>',l=g(),t=m("a"),i=q(a),b=g(),u(n,"type","button"),u(n,"class","btn btn-sm btn-primary"),u(t,"href",f="/decks/"+s[12].id),u(t,"class","alert-link"),u(e,"class","alert alert-light m-1 p-2 text-overflow svelte-1gfmo48"),u(e,"role","alert")},m(w,L){v(w,e,L),k&&k.m(e,null),c(e,o),p&&p.m(e,null),c(e,r),c(e,n),c(e,l),c(e,t),c(t,i),c(e,b),d||(_=D(n,"click",I(h)),d=!0)},p(w,L){s=w,s[12].questions.length>0?k?k.p(s,L):(k=z(s),k.c(),k.m(e,o)):k&&(k.d(1),k=null),s[12].sessions_count?p?p.p(s,L):(p=F(s),p.c(),p.m(e,r)):p&&(p.d(1),p=null),L&4&&a!==(a=s[12].name+"")&&C(i,a),L&4&&f!==(f="/decks/"+s[12].id)&&u(t,"href",f)},d(w){w&&y(e),k&&k.d(),p&&p.d(),d=!1,_()}}}function G(s){let e,o,r,n=S(s[4]),l=[];for(let t=0;t<n.length;t+=1)l[t]=K(V(s,n,t));return{c(){e=m("div"),o=m("h6"),o.textContent="Last used decks",r=g();for(let t=0;t<l.length;t+=1)l[t].c();u(e,"class","col-lg mt-3 text-overflow svelte-1gfmo48")},m(t,a){v(t,e,a),c(e,o),c(e,r);for(let i=0;i<l.length;i+=1)l[i]&&l[i].m(e,null)},p(t,a){if(a&16){n=S(t[4]);let i;for(i=0;i<n.length;i+=1){const f=V(t,n,i);l[i]?l[i].p(f,a):(l[i]=K(f),l[i].c(),l[i].m(e,null))}for(;i<l.length;i+=1)l[i].d(1);l.length=n.length}},d(t){t&&y(e),A(l,t)}}}function J(s){let e,o,r,n=s[12].questions.length+"",l;return{c(){e=m("span"),o=m("i"),r=g(),l=q(n),u(o,"class","bi bi-collection"),u(e,"class","badge text-bg-light"),u(e,"title","Number of questions")},m(t,a){v(t,e,a),c(e,o),c(e,r),c(e,l)},p(t,a){a&16&&n!==(n=t[12].questions.length+"")&&C(l,n)},d(t){t&&y(e)}}}function K(s){let e,o,r,n,l,t=s[12].name+"",a,i,f,b,d,_=s[12].questions.length>0&&J(s);function k(){return s[10](s[12])}return{c(){e=m("div"),_&&_.c(),o=g(),r=m("button"),r.innerHTML='<i class="bi bi-rocket-takeoff"></i>',n=g(),l=m("a"),a=q(t),f=g(),u(r,"type","button"),u(r,"class","btn btn-sm btn-primary"),u(l,"href",i="/decks/"+s[12].id),u(l,"class","alert-link"),u(e,"class","alert alert-light m-1 p-2 text-overflow svelte-1gfmo48"),u(e,"role","alert")},m(p,h){v(p,e,h),_&&_.m(e,null),c(e,o),c(e,r),c(e,n),c(e,l),c(l,a),c(e,f),b||(d=D(r,"click",I(k)),b=!0)},p(p,h){s=p,s[12].questions.length>0?_?_.p(s,h):(_=J(s),_.c(),_.m(e,o)):_&&(_.d(1),_=null),h&16&&t!==(t=s[12].name+"")&&C(a,t),h&16&&i!==(i="/decks/"+s[12].id)&&u(l,"href",i)},d(p){p&&y(e),_&&_.d(),b=!1,d()}}}function oe(s){let e,o,r,n,l,t;function a(b,d){return b[1]&&b[2]&&b[4]?ne:ie}let i=a(s),f=i(s);return{c(){e=m("div"),e.innerHTML='<div class="col-md"><h4>Stats</h4></div>',o=g(),f.c(),r=g(),n=m("div"),l=m("div"),t=m("canvas"),u(e,"class","row"),x(t,"max-height","300px"),u(l,"class","col-md"),u(n,"class","row mt-3 p-3")},m(b,d){v(b,e,d),v(b,o,d),f.m(b,d),v(b,r,d),v(b,n,d),c(n,l),c(l,t),s[11](t)},p(b,[d]){i===(i=a(b))&&f?f.p(b,d):(f.d(1),f=i(b),f&&(f.c(),f.m(r.parentNode,r)))},i:T,o:T,d(b){b&&(y(e),y(o),y(r),y(n)),f.d(b),s[11](null)}}}function ae(s,e,o){let r,n,l={},t={},a=[],i=[],f=0,b=[];ee(()=>{axios.get("/api/stats/activity").then(function(h){const w=h.data;o(6,l=w.answers_byhour),o(7,t=w.users_byhour),o(1,a=w.decks_new),o(2,i=w.decks_popular),o(3,f=w.decks_popular_timespan),o(4,b=w.decks_last_used)}).catch(function(h){console.log(h)})});const d=h=>N(h.id),_=h=>N(h.id),k=h=>N(h.id);function p(h){te[h?"unshift":"push"](()=>{r=h,o(0,r)})}return s.$$.update=()=>{s.$$.dirty&225&&r&&l&&t&&(()=>{const h=Object.keys(l),w=Object.values(l);if(w.reduce((H,M)=>H+M,0)===0)return;const Q={type:"line",data:{labels:h,datasets:[{label:"Answers",data:w,backgroundColor:"rgba(255, 205, 86, 0.4)",borderColor:"rgba(255, 205, 86, 0.4)",fill:!0,showLine:!1,pointRadius:0,tension:.2},{label:"Users",data:Object.values(t),backgroundColor:"rgba(54, 162, 235, 0.7)",borderColor:"rgba(54, 162, 235, 0.7)",fill:!0,showLine:!1,pointRadius:0,tension:.2}]},options:{plugins:{legend:{display:!1},tooltip:{callbacks:{title(H){return O(se(H[0].label),"dd.MM.yyyy HH:mm")}}}},responsive:!0,interaction:{intersect:!1},scales:{x:{display:!0,title:{display:!1,text:"Hour of the day"},ticks:{autoSkip:!0,maxTicksLimit:3,callback(H){const M=this.getLabelForValue(H);return O(M,"dd.MM.yyyy")}},grid:{display:!1},border:{display:!1}},y:{display:!0,title:{display:!1,text:"Number of answers"},ticks:{beginAtZero:!0,stepSize:1,maxTicksLimit:4,autoSkip:!0},border:{display:!1}}}}};n&&n.destroy();var W=r.getContext("2d");o(5,n=new le(W,Q))})()},[r,a,i,f,b,n,l,t,d,_,k,p]}class re extends X{constructor(e){super(),Y(this,e,ae,oe,$,{})}}const fe=document.getElementById("IndexStatsView");new re({target:fe});
