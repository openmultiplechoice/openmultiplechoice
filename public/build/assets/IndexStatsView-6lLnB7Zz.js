import{S as F,i as Z,s as G,g as m,b as _,q as J,c as u,a as g,h as f,n as L,d as k,A as K,k as Q,f as R,t as C,l as U,p as z,j as S}from"./index-B80I9K_4.js";import{e as N}from"./each-DkBj6IvG.js";import{c as M}from"./NewSessionHelper-Ba9jtPTo.js";import{C as W}from"./auto-B1JLC99t.js";import{f as A,p as X}from"./parseISO-Ds5nI7_t.js";function j(i,e,o){const a=i.slice();return a[9]=e[o],a}function I(i,e,o){const a=i.slice();return a[9]=e[o],a}function Y(i){let e;return{c(){e=_("p"),e.textContent="No stats available yet"},m(o,a){g(o,e,a)},p:L,d(o){o&&k(e)}}}function $(i){let e,o,a=i[1].length>0&&O(i),s=i[2].length>0&&B(i);return{c(){e=_("div"),a&&a.c(),o=m(),s&&s.c(),u(e,"class","row")},m(l,t){g(l,e,t),a&&a.m(e,null),f(e,o),s&&s.m(e,null)},p(l,t){l[1].length>0?a?a.p(l,t):(a=O(l),a.c(),a.m(e,o)):a&&(a.d(1),a=null),l[2].length>0?s?s.p(l,t):(s=B(l),s.c(),s.m(e,null)):s&&(s.d(1),s=null)},d(l){l&&k(e),a&&a.d(),s&&s.d()}}}function O(i){let e,o,a,s=N(i[1]),l=[];for(let t=0;t<s.length;t+=1)l[t]=V(I(i,s,t));return{c(){e=_("div"),o=_("h6"),o.textContent="New decks",a=m();for(let t=0;t<l.length;t+=1)l[t].c();u(e,"class","col-md-6 mt-3")},m(t,r){g(t,e,r),f(e,o),f(e,a);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(e,null)},p(t,r){if(r&2){s=N(t[1]);let n;for(n=0;n<s.length;n+=1){const p=I(t,s,n);l[n]?l[n].p(p,r):(l[n]=V(p),l[n].c(),l[n].m(e,null))}for(;n<l.length;n+=1)l[n].d(1);l.length=s.length}},d(t){t&&k(e),R(l,t)}}}function T(i){let e,o,a,s=i[9].questions.length+"",l;return{c(){e=_("span"),o=_("i"),a=m(),l=C(s),u(o,"class","bi bi-collection"),u(e,"class","badge text-bg-light"),u(e,"title","Number of questions")},m(t,r){g(t,e,r),f(e,o),f(e,a),f(e,l)},p(t,r){r&2&&s!==(s=t[9].questions.length+"")&&S(l,s)},d(t){t&&k(e)}}}function V(i){let e,o,a,s,l,t=i[9].name+"",r,n,p,y,w,c=i[9].questions.length>0&&T(i);function d(){return i[6](i[9])}return{c(){e=_("div"),c&&c.c(),o=m(),a=_("button"),a.innerHTML='<i class="bi bi-rocket-takeoff"></i>',s=m(),l=_("a"),r=C(t),p=m(),u(a,"type","button"),u(a,"class","btn btn-sm btn-primary"),u(l,"href",n="/decks/"+i[9].id),u(l,"class","alert-link text-overflow svelte-1gfmo48"),u(e,"class","alert alert-light m-1 p-2 text-overflow svelte-1gfmo48"),u(e,"role","alert")},m(b,v){g(b,e,v),c&&c.m(e,null),f(e,o),f(e,a),f(e,s),f(e,l),f(l,r),f(e,p),y||(w=U(a,"click",z(d)),y=!0)},p(b,v){i=b,i[9].questions.length>0?c?c.p(i,v):(c=T(i),c.c(),c.m(e,o)):c&&(c.d(1),c=null),v&2&&t!==(t=i[9].name+"")&&S(r,t),v&2&&n!==(n="/decks/"+i[9].id)&&u(l,"href",n)},d(b){b&&k(e),c&&c.d(),y=!1,w()}}}function B(i){let e,o,a,s=N(i[2]),l=[];for(let t=0;t<s.length;t+=1)l[t]=P(j(i,s,t));return{c(){e=_("div"),o=_("h6"),o.textContent="Popular decks",a=m();for(let t=0;t<l.length;t+=1)l[t].c();u(e,"class","col-md-6 mt-3")},m(t,r){g(t,e,r),f(e,o),f(e,a);for(let n=0;n<l.length;n+=1)l[n]&&l[n].m(e,null)},p(t,r){if(r&4){s=N(t[2]);let n;for(n=0;n<s.length;n+=1){const p=j(t,s,n);l[n]?l[n].p(p,r):(l[n]=P(p),l[n].c(),l[n].m(e,null))}for(;n<l.length;n+=1)l[n].d(1);l.length=s.length}},d(t){t&&k(e),R(l,t)}}}function D(i){let e,o,a,s=i[9].questions.length+"",l;return{c(){e=_("span"),o=_("i"),a=m(),l=C(s),u(o,"class","bi bi-collection"),u(e,"class","badge text-bg-light"),u(e,"title","Number of questions")},m(t,r){g(t,e,r),f(e,o),f(e,a),f(e,l)},p(t,r){r&4&&s!==(s=t[9].questions.length+"")&&S(l,s)},d(t){t&&k(e)}}}function E(i){let e,o,a,s=i[9].sessions.length+"",l;return{c(){e=_("span"),o=_("i"),a=m(),l=C(s),u(o,"class","bi bi-rocket"),u(e,"class","badge text-bg-light"),u(e,"title","Number of sessions")},m(t,r){g(t,e,r),f(e,o),f(e,a),f(e,l)},p(t,r){r&4&&s!==(s=t[9].sessions.length+"")&&S(l,s)},d(t){t&&k(e)}}}function P(i){let e,o,a,s,l,t,r=i[9].name+"",n,p,y,w,c,d=i[9].questions.length>0&&D(i),b=i[9].sessions.length>0&&E(i);function v(){return i[7](i[9])}return{c(){e=_("div"),d&&d.c(),o=m(),b&&b.c(),a=m(),s=_("button"),s.innerHTML='<i class="bi bi-rocket-takeoff"></i>',l=m(),t=_("a"),n=C(r),y=m(),u(s,"type","button"),u(s,"class","btn btn-sm btn-primary"),u(t,"href",p="/decks/"+i[9].id),u(t,"class","alert-link"),u(e,"class","alert alert-light m-1 p-2 text-overflow svelte-1gfmo48"),u(e,"role","alert")},m(q,h){g(q,e,h),d&&d.m(e,null),f(e,o),b&&b.m(e,null),f(e,a),f(e,s),f(e,l),f(e,t),f(t,n),f(e,y),w||(c=U(s,"click",z(v)),w=!0)},p(q,h){i=q,i[9].questions.length>0?d?d.p(i,h):(d=D(i),d.c(),d.m(e,o)):d&&(d.d(1),d=null),i[9].sessions.length>0?b?b.p(i,h):(b=E(i),b.c(),b.m(e,a)):b&&(b.d(1),b=null),h&4&&r!==(r=i[9].name+"")&&S(n,r),h&4&&p!==(p="/decks/"+i[9].id)&&u(t,"href",p)},d(q){q&&k(e),d&&d.d(),b&&b.d(),w=!1,c()}}}function x(i){let e,o,a,s;function l(n,p){return n[1]&&n[2]?$:Y}let t=l(i),r=t(i);return{c(){r.c(),e=m(),o=_("div"),a=_("div"),s=_("canvas"),J(s,"max-height","300px"),u(a,"class","col-md"),u(o,"class","row mt-3 p-3")},m(n,p){r.m(n,p),g(n,e,p),g(n,o,p),f(o,a),f(a,s),i[8](s)},p(n,[p]){t===(t=l(n))&&r?r.p(n,p):(r.d(1),r=t(n),r&&(r.c(),r.m(e.parentNode,e)))},i:L,o:L,d(n){n&&(k(e),k(o)),r.d(n),i[8](null)}}}function ee(i,e,o){let a,s,l={},t={},r=[],n=[];K(()=>{axios.get("/api/stats/activity").then(function(c){const d=c.data;o(4,l=d.answers_byhour),o(5,t=d.users_byhour),o(1,r=d.decks_new),o(2,n=d.decks_popular)}).catch(function(c){console.log(c)})});const p=c=>M(c.id),y=c=>M(c.id);function w(c){Q[c?"unshift":"push"](()=>{a=c,o(0,a)})}return i.$$.update=()=>{i.$$.dirty&57&&a&&l&&t&&(()=>{const c=Object.keys(l),d=Object.values(l);if(d.reduce((h,H)=>h+H,0)===0)return;const v={type:"line",data:{labels:c,datasets:[{label:"Answers",data:d,backgroundColor:"rgba(255, 205, 86, 0.4)",borderColor:"rgba(255, 205, 86, 0.4)",fill:!0,showLine:!1,pointRadius:0,tension:.2},{label:"Users",data:Object.values(t),backgroundColor:"rgba(54, 162, 235, 0.7)",borderColor:"rgba(54, 162, 235, 0.7)",fill:!0,showLine:!1,pointRadius:0,tension:.2}]},options:{plugins:{legend:{display:!1},tooltip:{callbacks:{title(h){return A(X(h[0].label),"dd.MM.yyyy HH:mm")}}}},responsive:!0,interaction:{intersect:!1},scales:{x:{display:!0,title:{display:!1,text:"Hour of the day"},ticks:{autoSkip:!0,maxTicksLimit:3,callback(h){const H=this.getLabelForValue(h);return A(H,"dd.MM.yyyy")}},grid:{display:!1},border:{display:!1}},y:{display:!0,title:{display:!1,text:"Number of answers"},ticks:{beginAtZero:!0,stepSize:1,maxTicksLimit:4,autoSkip:!0},border:{display:!1}}}}};s&&s.destroy();var q=a.getContext("2d");o(3,s=new W(q,v))})()},[a,r,n,s,l,t,p,y,w]}class te extends F{constructor(e){super(),Z(this,e,ee,x,G,{})}}const le=document.getElementById("IndexStatsView");new te({target:le});