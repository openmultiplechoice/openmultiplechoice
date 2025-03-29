import{d as ft,p as mt,s as _,n as st,a as f,g as t,t as o,b as e,f as gt,i as m,j as B,m as M,c as n,e as ht,h as a,u as Z,o as yt}from"./if-DJ8jmZGH.js";import{e as $,p as G,a as J,i as K}from"./event-modifiers-cAvxwkC8.js";import{h as V}from"./html-BaFN2fvz.js";import{b as xt}from"./this-eq_aegc4.js";import{o as kt,a as wt}from"./index-client-BY1UbLQj.js";import{r as St}from"./legacy-client-CpNAQbdg.js";import{c as Q}from"./NewSessionHelper-Ba9jtPTo.js";import{C as Lt}from"./auto-C0VlNTRY.js";import{f as W,p as qt}from"./parseISO-nqt9u7wd.js";var It=o('<span class="badge text-bg-light font-monospace" title="Number of questions"><i class="bi bi-collection"></i> <!></span>'),Et=o('<div class="alert alert-light m-1 p-2 text-truncate" role="alert"><!> <button type="button" class="btn btn-sm btn-primary"><i class="bi bi-rocket-takeoff"></i></button> <a class="alert-link text-truncate"> </a></div>'),Nt=o('<div class="col-lg mt-3 text-truncate"><h6>New decks</h6> <!></div>'),Ct=o('<span class="badge text-bg-light font-monospace" title="Number of questions"><i class="bi bi-collection"></i> <!></span>'),Dt=o('<span class="badge text-bg-light font-monospace" title="Number of sessions"><i class="bi bi-rocket"></i> <!></span>'),Ht=o('<div class="alert alert-light m-1 p-2 text-truncate" role="alert"><!> <!> <button type="button" class="btn btn-sm btn-primary"><i class="bi bi-rocket-takeoff"></i></button> <a class="alert-link"> </a></div>'),jt=o('<div class="col-lg mt-3 text-truncate"><h6> </h6> <!></div>'),At=o('<span class="badge text-bg-light font-monospace" title="Number of questions"><i class="bi bi-collection"></i> <!></span>'),Bt=o('<div class="alert alert-light m-1 p-2 text-truncate" role="alert"><!> <button type="button" class="btn btn-sm btn-primary"><i class="bi bi-rocket-takeoff"></i></button> <a class="alert-link"> </a></div>'),Mt=o('<div class="col-lg mt-3 text-truncate"><h6>Last used decks</h6> <!></div>'),Ut=o('<div class="row"><!> <!> <!></div>'),Ot=o('<div class="d-flex justify-content-center mt-3 mb-3"><div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Loading stats ...</span></div></div>'),Vt=o('<div class="alert alert-light text-center" role="alert">No stats available yet <i class="bi bi-heartbreak-fill"></i></div>'),Pt=o('<div class="row"><div class="col-md"><h4>Stats</h4></div></div> <!> <div id="stats" class="row mt-3 p-3"><div class="col-md"><canvas style="max-height: 300px;"></canvas></div></div> <div class="row"><div class="col-md"><span class="badge text-bg-light text-muted"> </span></div></div>',1);function Tt(rt,it){mt(it,!0);let U=_(void 0),P=_(void 0),X,T=_(void 0),O=_(st({})),R=_(st({})),w=_(void 0),S=_(void 0),z=_(0),L=_(void 0);kt(()=>{Y(),X=setInterval(Y,2*60*1e3)}),wt(()=>{clearInterval(X)});function Y(){axios.get("/api/stats/activity").then(function(s){const r=s.data;f(O,r.answers_byhour,!0),f(R,r.users_byhour,!0),f(w,r.decks_new,!0),f(S,r.decks_popular,!0),f(z,r.decks_popular_timespan,!0),f(L,r.decks_last_used,!0),f(T,new Date,!0)}).catch(function(s){console.log(s)})}St(()=>{t(U)&&t(O)&&t(R)&&(()=>{const s=Object.keys(t(O)),r=Object.values(t(O));if(r.reduce((u,D)=>u+D,0)===0){document.getElementById("stats").style.display="none";return}document.getElementById("stats").style.display="block";const C={type:"line",data:{labels:s,datasets:[{label:"Answers",data:r,backgroundColor:"rgba(255, 205, 86, 0.4)",borderColor:"rgba(255, 205, 86, 0.4)",fill:!0,showLine:!1,pointRadius:0,tension:.2},{label:"Users",data:Object.values(t(R)),backgroundColor:"rgba(54, 162, 235, 0.7)",borderColor:"rgba(54, 162, 235, 0.7)",fill:!0,showLine:!1,pointRadius:0,tension:.2}]},options:{plugins:{legend:{display:!1},tooltip:{callbacks:{title(u){return W(qt(u[0].label),"dd.MM.yyyy HH:mm")}}}},responsive:!0,interaction:{intersect:!1},scales:{x:{display:!0,title:{display:!1,text:"Hour of the day"},ticks:{autoSkip:!0,maxTicksLimit:3,callback(u){const D=this.getLabelForValue(u);return W(D,"dd.MM.yyyy")}},grid:{display:!1},border:{display:!1}},y:{display:!0,title:{display:!1,text:"Number of answers"},ticks:{beginAtZero:!0,stepSize:1,maxTicksLimit:4,autoSkip:!0},border:{display:!1}}}}};t(P)&&t(P).destroy();var c=t(U).getContext("2d");f(P,new Lt(c,C),!0)})()});var tt=Pt(),at=e(gt(tt),2);{var nt=s=>{var r=Ut(),N=a(r);{var C=p=>{var g=Nt(),q=e(a(g),2);$(q,17,()=>t(w),K,(H,l)=>{var k=Et(),d=a(k);{var I=i=>{var v=It(),E=e(a(v),2);V(E,()=>t(l).questions.length.toString().padEnd(3," ").replace(/ /g,"&nbsp;")),n(i,v)};m(d,i=>{t(l).questions.length>0&&i(I)})}var h=e(d,2),j=Z(()=>G(()=>Q(t(l).id)));h.__click=function(...i){var v;(v=t(j))==null||v.apply(this,i)};var y=e(h,2),A=a(y);B(()=>{J(y,"href",`/decks/${t(l).id??""}`),M(A,t(l).name)}),n(H,k)}),n(p,g)};m(N,p=>{t(w).length>0&&p(C)})}var c=e(N,2);{var u=p=>{var g=jt(),q=a(g),H=a(q),l=e(q,2);$(l,17,()=>t(S),K,(k,d)=>{var I=Ht(),h=a(I);{var j=b=>{var x=Ct(),F=e(a(x),2);V(F,()=>t(d).questions.length.toString().padEnd(3," ").replace(/ /g,"&nbsp;")),n(b,x)};m(h,b=>{t(d).questions.length>0&&b(j)})}var y=e(h,2);{var A=b=>{var x=Dt(),F=e(a(x),2);V(F,()=>t(d).sessions_count.toString().padEnd(3," ").replace(/ /g,"&nbsp;")),n(b,x)};m(y,b=>{t(d).sessions_count&&b(A)})}var i=e(y,2),v=Z(()=>G(()=>Q(t(d).id)));i.__click=function(...b){var x;(x=t(v))==null||x.apply(this,b)};var E=e(i,2),_t=a(E);B(()=>{J(E,"href",`/decks/${t(d).id??""}`),M(_t,t(d).name)}),n(k,I)}),B(()=>M(H,`Popular decks (last ${t(z)??""} days)`)),n(p,g)};m(c,p=>{t(S).length>0&&t(z)&&p(u)})}var D=e(c,2);{var bt=p=>{var g=Mt(),q=e(a(g),2);$(q,17,()=>t(L),K,(H,l)=>{var k=Bt(),d=a(k);{var I=i=>{var v=At(),E=e(a(v),2);V(E,()=>t(l).questions.length.toString().padEnd(3," ").replace(/ /g,"&nbsp;")),n(i,v)};m(d,i=>{t(l).questions.length>0&&i(I)})}var h=e(d,2),j=Z(()=>G(()=>Q(t(l).id)));h.__click=function(...i){var v;(v=t(j))==null||v.apply(this,i)};var y=e(h,2),A=a(y);B(()=>{J(y,"href",`/decks/${t(l).id??""}`),M(A,t(l).name)}),n(H,k)}),n(p,g)};m(D,p=>{t(L).length>0&&p(bt)})}n(s,r)},ot=(s,r)=>{{var N=c=>{var u=Ot();n(c,u)},C=c=>{var u=Vt();n(c,u)};m(s,c=>{!t(w)&&!t(S)&&!t(L)?c(N):c(C,!1)},r)}};m(at,s=>{t(w)&&t(S)&&t(L)&&(t(w).length>0||t(S).length>0||t(L).length>0)?s(nt):s(ot,!1)})}var et=e(at,2),lt=a(et),dt=a(lt);xt(dt,s=>f(U,s),()=>t(U));var vt=e(et,2),ct=a(vt),ut=a(ct),pt=a(ut);B(s=>M(pt,`Last updated: ${s??""}`),[()=>t(T)?W(t(T),"HH:mm"):"unknown"]),n(rt,tt),ht()}ft(["click"]);const Rt=document.getElementById("IndexStatsView");yt(Tt,{target:Rt});
