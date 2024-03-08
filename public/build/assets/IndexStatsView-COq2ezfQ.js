import{S as z,i as F,s as Z,b as p,g as m,c as d,q as G,a as k,h as f,n as A,d as v,A as J,f as P,t as C,l as R,p as U,j as S,k as K}from"./index-DgDIGCFR.js";import{e as L}from"./each-CvUUWvvD.js";import{C as Q}from"./auto-C08LIDt6.js";import{f as W}from"./format-Dvme3Z7b.js";function H(i,e,o){const r=i.slice();return r[9]=e[o],r}function M(i,e,o){const r=i.slice();return r[9]=e[o],r}function j(i){let e,o,r,n=L(i[1]),l=[];for(let t=0;t<n.length;t+=1)l[t]=V(M(i,n,t));return{c(){e=p("div"),o=p("h6"),o.textContent="New decks",r=m();for(let t=0;t<l.length;t+=1)l[t].c();d(e,"class","col-md-6")},m(t,a){k(t,e,a),f(e,o),f(e,r);for(let s=0;s<l.length;s+=1)l[s]&&l[s].m(e,null)},p(t,a){if(a&2){n=L(t[1]);let s;for(s=0;s<n.length;s+=1){const u=M(t,n,s);l[s]?l[s].p(u,a):(l[s]=V(u),l[s].c(),l[s].m(e,null))}for(;s<l.length;s+=1)l[s].d(1);l.length=n.length}},d(t){t&&v(e),P(l,t)}}}function T(i){let e,o,r,n=i[9].questions.length+"",l;return{c(){e=p("span"),o=p("i"),r=m(),l=C(n),d(o,"class","bi bi-collection"),d(e,"class","badge text-bg-light"),d(e,"title","Number of questions")},m(t,a){k(t,e,a),f(e,o),f(e,r),f(e,l)},p(t,a){a&2&&n!==(n=t[9].questions.length+"")&&S(l,n)},d(t){t&&v(e)}}}function V(i){let e,o,r,n,l,t=i[9].name+"",a,s,u,g,y,c=i[9].questions.length>0&&T(i);function b(){return i[6](i[9])}return{c(){e=p("div"),c&&c.c(),o=m(),r=p("button"),r.innerHTML='<i class="bi bi-rocket-takeoff"></i>',n=m(),l=p("a"),a=C(t),u=m(),d(r,"type","button"),d(r,"class","btn btn-sm btn-primary"),d(l,"href",s="/decks/"+i[9].id),d(l,"class","alert-link text-overflow svelte-1gfmo48"),d(e,"class","alert alert-light m-1 p-2 text-overflow svelte-1gfmo48"),d(e,"role","alert")},m(h,w){k(h,e,w),c&&c.m(e,null),f(e,o),f(e,r),f(e,n),f(e,l),f(l,a),f(e,u),g||(y=R(r,"click",U(b)),g=!0)},p(h,w){i=h,i[9].questions.length>0?c?c.p(i,w):(c=T(i),c.c(),c.m(e,o)):c&&(c.d(1),c=null),w&2&&t!==(t=i[9].name+"")&&S(a,t),w&2&&s!==(s="/decks/"+i[9].id)&&d(l,"href",s)},d(h){h&&v(e),c&&c.d(),g=!1,y()}}}function B(i){let e,o,r,n=L(i[2]),l=[];for(let t=0;t<n.length;t+=1)l[t]=D(H(i,n,t));return{c(){e=p("div"),o=p("h6"),o.textContent="Popular decks",r=m();for(let t=0;t<l.length;t+=1)l[t].c();d(e,"class","col-md-6")},m(t,a){k(t,e,a),f(e,o),f(e,r);for(let s=0;s<l.length;s+=1)l[s]&&l[s].m(e,null)},p(t,a){if(a&4){n=L(t[2]);let s;for(s=0;s<n.length;s+=1){const u=H(t,n,s);l[s]?l[s].p(u,a):(l[s]=D(u),l[s].c(),l[s].m(e,null))}for(;s<l.length;s+=1)l[s].d(1);l.length=n.length}},d(t){t&&v(e),P(l,t)}}}function I(i){let e,o,r,n=i[9].questions.length+"",l;return{c(){e=p("span"),o=p("i"),r=m(),l=C(n),d(o,"class","bi bi-collection"),d(e,"class","badge text-bg-light"),d(e,"title","Number of questions")},m(t,a){k(t,e,a),f(e,o),f(e,r),f(e,l)},p(t,a){a&4&&n!==(n=t[9].questions.length+"")&&S(l,n)},d(t){t&&v(e)}}}function O(i){let e,o,r,n=i[9].sessions.length+"",l;return{c(){e=p("span"),o=p("i"),r=m(),l=C(n),d(o,"class","bi bi-rocket"),d(e,"class","badge text-bg-light"),d(e,"title","Number of sessions")},m(t,a){k(t,e,a),f(e,o),f(e,r),f(e,l)},p(t,a){a&4&&n!==(n=t[9].sessions.length+"")&&S(l,n)},d(t){t&&v(e)}}}function D(i){let e,o,r,n,l,t,a=i[9].name+"",s,u,g,y,c,b=i[9].questions.length>0&&I(i),h=i[9].sessions.length>0&&O(i);function w(){return i[7](i[9])}return{c(){e=p("div"),b&&b.c(),o=m(),h&&h.c(),r=m(),n=p("button"),n.innerHTML='<i class="bi bi-rocket-takeoff"></i>',l=m(),t=p("a"),s=C(a),g=m(),d(n,"type","button"),d(n,"class","btn btn-sm btn-primary"),d(t,"href",u="/decks/"+i[9].id),d(t,"class","alert-link"),d(e,"class","alert alert-light m-1 p-2 text-overflow svelte-1gfmo48"),d(e,"role","alert")},m(q,_){k(q,e,_),b&&b.m(e,null),f(e,o),h&&h.m(e,null),f(e,r),f(e,n),f(e,l),f(e,t),f(t,s),f(e,g),y||(c=R(n,"click",U(w)),y=!0)},p(q,_){i=q,i[9].questions.length>0?b?b.p(i,_):(b=I(i),b.c(),b.m(e,o)):b&&(b.d(1),b=null),i[9].sessions.length>0?h?h.p(i,_):(h=O(i),h.c(),h.m(e,r)):h&&(h.d(1),h=null),_&4&&a!==(a=i[9].name+"")&&S(s,a),_&4&&u!==(u="/decks/"+i[9].id)&&d(t,"href",u)},d(q){q&&v(e),b&&b.d(),h&&h.d(),y=!1,c()}}}function X(i){let e,o,r,n,l,t,a=i[1].length>0&&j(i),s=i[2].length>0&&B(i);return{c(){e=p("div"),a&&a.c(),o=m(),s&&s.c(),r=m(),n=p("div"),l=p("div"),t=p("canvas"),d(e,"class","row mt-3"),G(t,"max-height","300px"),d(l,"class","col-md"),d(n,"class","row mt-3 p-3")},m(u,g){k(u,e,g),a&&a.m(e,null),f(e,o),s&&s.m(e,null),k(u,r,g),k(u,n,g),f(n,l),f(l,t),i[8](t)},p(u,[g]){u[1].length>0?a?a.p(u,g):(a=j(u),a.c(),a.m(e,o)):a&&(a.d(1),a=null),u[2].length>0?s?s.p(u,g):(s=B(u),s.c(),s.m(e,null)):s&&(s.d(1),s=null)},i:A,o:A,d(u){u&&(v(e),v(r),v(n)),a&&a.d(),s&&s.d(),i[8](null)}}}function E(i){var e={deck_id:i};axios.post("/api/sessions",e).then(function(o){window.location.href="/sessions/"+o.data.id}).catch(function(o){alert(o)})}function Y(i,e,o){let r,n,l=[],t=[],a=[],s=[];J(()=>{axios.get("/api/stats/answers/byhour").then(function(c){o(4,l=c.data)}).catch(function(c){console.log(c)}),axios.get("/api/stats/users/byhour").then(function(c){o(5,t=c.data)}).catch(function(c){console.log(c)}),axios.get("/api/stats/decks/new").then(function(c){o(1,a=c.data)}).catch(function(c){console.log(c)}),axios.get("/api/stats/decks/popular").then(function(c){o(2,s=c.data)}).catch(function(c){console.log(c)})});const u=c=>E(c.id),g=c=>E(c.id);function y(c){K[c?"unshift":"push"](()=>{r=c,o(0,r)})}return i.$$.update=()=>{i.$$.dirty&57&&r&&(()=>{const c=Object.keys(l),b=Object.values(l);if(b.reduce((_,N)=>_+N,0)===0)return;const w={type:"line",data:{labels:c,datasets:[{label:"Answers",data:b,backgroundColor:"rgba(255, 205, 86, 0.4)",borderColor:"rgba(255, 205, 86, 0.4)",fill:!0,showLine:!1,pointRadius:0,tension:.2},{label:"Users",data:Object.values(t),backgroundColor:"rgba(54, 162, 235, 0.7)",borderColor:"rgba(54, 162, 235, 0.7)",fill:!0,showLine:!1,pointRadius:0,tension:.2}]},options:{plugins:{legend:{display:!1}},responsive:!0,interaction:{intersect:!1},scales:{x:{display:!0,title:{display:!1,text:"Hour of the day"},ticks:{autoSkip:!0,maxTicksLimit:3,callback(_){const N=this.getLabelForValue(_);return W(N,"dd.MM.yyyy")}},grid:{display:!1},border:{display:!1}},y:{display:!0,title:{display:!1,text:"Number of answers"},ticks:{beginAtZero:!0,stepSize:1,maxTicksLimit:5,autoSkip:!0},border:{display:!1}}}}};n&&n.destroy();var q=r.getContext("2d");o(3,n=new Q(q,w))})()},[r,a,s,n,l,t,u,g,y]}class x extends z{constructor(e){super(),F(this,e,Y,X,Z,{})}}const $=document.getElementById("IndexStatsView");new x({target:$});