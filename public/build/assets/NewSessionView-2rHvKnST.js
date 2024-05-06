import{S as Le,i as Qe,s as Ge,e as je,a as A,n as le,d as L,k as Se,b as f,g as M,t as w,c as m,h as l,j,l as J,p as ie,m as Ce,o as Re,u as Pe,v as Me,w as qe,x as ye,z as Ve,f as Te,r as ot,H as rt,D as ze,y as ut,E as ct,A as at,B as dt,F as He}from"./index-CovtvcR3.js";import{e as De}from"./each-CtuGQY9F.js";import{s as ft}from"./StatsHelper-B91isISU.js";import{C as _t}from"./auto-DTdYmgno.js";import{f as Ue,p as Ae}from"./parseISO-Ds5nI7_t.js";import{U as Ne}from"./UserSettingsStore-B1GYynLG.js";function mt(e){let t,n,s,i,o,r,a,b,h,d,_,g,v,k,u,p,C,c,D,S,q,I=Math.round(100*e[5]/e[6]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"",N,y,P,F,ee,K,B,$,U,G=Math.round(100*e[1]/e[6]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"",X,W,Y,E,me,x,T,pe,de,oe=Math.round(100*e[4]/e[5]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"",he,fe,ge,re,be,Z,te,ue,ke,_e=Math.round(100*e[3]/e[5]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"",ce,we,Ie,ae,se,ve,ne,V,H,R=Math.round(100*e[2]/e[5]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"",Ee,Be,Oe,O=e[2]>0&&Fe(e);return{c(){t=f("div"),n=f("div"),s=f("canvas"),i=M(),o=f("div"),r=f("table"),a=f("thead"),b=M(),h=f("tbody"),d=f("tr"),_=f("td"),_.textContent="Questions",g=M(),v=f("td"),k=w(e[6]),u=M(),p=f("tr"),C=f("td"),C.textContent="Answered",c=M(),D=f("td"),S=w(e[5]),q=w(`
                            (`),N=w(I),y=w("%)"),P=M(),F=f("tr"),ee=f("td"),ee.textContent="Unanswered",K=M(),B=f("td"),$=w(e[1]),U=w(`
                            (`),X=w(G),W=w("%)"),Y=M(),E=f("tr"),me=f("td"),me.textContent="Correct",x=M(),T=f("td"),pe=w(e[4]),de=w(`
                            (`),he=w(oe),fe=w("%)"),ge=M(),re=f("tr"),be=f("td"),be.textContent="Correct with help",Z=M(),te=f("td"),ue=w(e[3]),ke=w(`
                            (`),ce=w(_e),we=w("%)"),Ie=M(),ae=f("tr"),se=f("td"),se.textContent="Incorrect",ve=M(),ne=f("td"),V=w(e[2]),H=w(`
                            (`),Ee=w(R),Be=w("%)"),Oe=M(),O&&O.c(),m(n,"class","col-md-5"),m(v,"class","font-monospace text-end"),m(D,"class","font-monospace text-end"),m(B,"class","font-monospace text-end"),m(T,"class","font-monospace text-end"),m(te,"class","font-monospace text-end"),m(ne,"class","font-monospace text-end"),m(r,"class","table"),m(o,"class","col-md-7 mt-3"),m(t,"class","row mb-5")},m(Q,z){A(Q,t,z),l(t,n),l(n,s),e[15](s),l(t,i),l(t,o),l(o,r),l(r,a),l(r,b),l(r,h),l(h,d),l(d,_),l(d,g),l(d,v),l(v,k),l(h,u),l(h,p),l(p,C),l(p,c),l(p,D),l(D,S),l(D,q),l(D,N),l(D,y),l(h,P),l(h,F),l(F,ee),l(F,K),l(F,B),l(B,$),l(B,U),l(B,X),l(B,W),l(h,Y),l(h,E),l(E,me),l(E,x),l(E,T),l(T,pe),l(T,de),l(T,he),l(T,fe),l(h,ge),l(h,re),l(re,be),l(re,Z),l(re,te),l(te,ue),l(te,ke),l(te,ce),l(te,we),l(h,Ie),l(h,ae),l(ae,se),l(ae,ve),l(ae,ne),l(ne,V),l(ne,H),l(ne,Ee),l(ne,Be),l(o,Oe),O&&O.m(o,null)},p(Q,z){z&64&&j(k,Q[6]),z&32&&j(S,Q[5]),z&96&&I!==(I=Math.round(100*Q[5]/Q[6]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"")&&j(N,I),z&2&&j($,Q[1]),z&66&&G!==(G=Math.round(100*Q[1]/Q[6]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"")&&j(X,G),z&16&&j(pe,Q[4]),z&48&&oe!==(oe=Math.round(100*Q[4]/Q[5]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"")&&j(he,oe),z&8&&j(ue,Q[3]),z&40&&_e!==(_e=Math.round(100*Q[3]/Q[5]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"")&&j(ce,_e),z&4&&j(V,Q[2]),z&36&&R!==(R=Math.round(100*Q[2]/Q[5]).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1})+"")&&j(Ee,R),Q[2]>0?O?O.p(Q,z):(O=Fe(Q),O.c(),O.m(o,null)):O&&(O.d(1),O=null)},d(Q){Q&&L(t),e[15](null),O&&O.d()}}}function pt(e){let t,n,s,i,o,r,a,b;return{c(){t=f("div"),n=f("div"),s=f("p"),i=w("Number of questions in this module (duplicates included): "),o=f("span"),r=f("i"),a=M(),b=w(e[6]),m(r,"class","bi bi-collection"),m(o,"class","badge text-bg-secondary"),m(n,"class","col-md"),m(t,"class","row")},m(h,d){A(h,t,d),l(t,n),l(n,s),l(s,i),l(s,o),l(o,r),l(o,a),l(o,b)},p(h,d){d&64&&j(b,h[6])},d(h){h&&L(t)}}}function Fe(e){let t,n,s,i,o,r,a,b,h,d,_=e[2]>=40&&We(e),g=e[2]>=70&&Ye(e);return{c(){t=f("div"),_&&_.c(),n=M(),g&&g.c(),s=M(),i=f("button"),o=f("i"),r=w(" Repeat "),a=w(e[2]),b=w(" incorrect"),m(o,"class","bi bi-repeat"),m(i,"class","btn btn-sm btn-outline-secondary"),m(i,"type","button"),m(t,"class","d-grid gap-2")},m(v,k){A(v,t,k),_&&_.m(t,null),l(t,n),g&&g.m(t,null),l(t,s),l(t,i),l(i,o),l(i,r),l(i,a),l(i,b),h||(d=J(i,"click",ie(e[18])),h=!0)},p(v,k){v[2]>=40?_?_.p(v,k):(_=We(v),_.c(),_.m(t,n)):_&&(_.d(1),_=null),v[2]>=70?g?g.p(v,k):(g=Ye(v),g.c(),g.m(t,s)):g&&(g.d(1),g=null),k&4&&j(a,v[2])},d(v){v&&L(t),_&&_.d(),g&&g.d(),h=!1,d()}}}function We(e){let t,n,s;return{c(){t=f("button"),t.innerHTML='<i class="bi bi-repeat"></i> Repeat 30 incorrect',m(t,"class","btn btn-sm btn-outline-secondary"),m(t,"type","button")},m(i,o){A(i,t,o),n||(s=J(t,"click",ie(e[16])),n=!0)},p:le,d(i){i&&L(t),n=!1,s()}}}function Ye(e){let t,n,s;return{c(){t=f("button"),t.innerHTML='<i class="bi bi-repeat"></i> Repeat 60 incorrect',m(t,"class","btn btn-sm btn-outline-secondary"),m(t,"type","button")},m(i,o){A(i,t,o),n||(s=J(t,"click",ie(e[17])),n=!0)},p:le,d(i){i&&L(t),n=!1,s()}}}function ht(e){let t;function n(o,r){return o[6]===o[1]?pt:mt}let s=n(e),i=s(e);return{c(){i.c(),t=je()},m(o,r){i.m(o,r),A(o,t,r)},p(o,[r]){s===(s=n(o))&&i?i.p(o,r):(i.d(1),i=s(o),i&&(i.c(),i.m(t.parentNode,t)))},i:le,o:le,d(o){o&&L(t),i.d(o)}}}function gt(e,t,n){let s,i,o,r,a,b,h,d,_,{questionsInModule:g}=t,{answerChoices:v}=t,{moduleId:k}=t,u,p;function C(I){const N={module_id:k,question_ids:I};axios.post("/api/sessions/newfromquestionids",N).then(function(y){window.location.href="/sessions/"+y.data.id}).catch(function(y){alert(y)})}function c(I){Se[I?"unshift":"push"](()=>{p=I,n(0,p)})}const D=()=>C(_.slice(0,30)),S=()=>C(_.slice(0,60)),q=()=>C(_);return e.$$set=I=>{"questionsInModule"in I&&n(9,g=I.questionsInModule),"answerChoices"in I&&n(10,v=I.answerChoices),"moduleId"in I&&n(11,k=I.moduleId)},e.$$.update=()=>{e.$$.dirty&512&&n(14,s=g.filter(I=>!I.is_invalid)),e.$$.dirty&17408&&n(13,i=v.filter(I=>s.some(({id:N})=>N===I.question_id))),e.$$.dirty&16384&&n(6,o=s.length),e.$$.dirty&8192&&n(5,r=i.length),e.$$.dirty&96&&n(1,a=o-r),e.$$.dirty&8192&&n(4,b=i.filter(I=>I.is_correct===1&&I.help_used===0).length),e.$$.dirty&8192&&n(3,h=i.filter(I=>I.is_correct===1&&I.help_used===1).length),e.$$.dirty&8192&&n(2,d=i.filter(I=>I.is_correct===0).length),e.$$.dirty&8192&&n(7,_=i.filter(I=>I.is_correct===0).map(I=>I.question_id)),e.$$.dirty&4127&&p&&(()=>{const I={type:"doughnut",data:{labels:["Correct","Correct with help","Incorrect","Unanswered"],datasets:[{label:"n",data:[b,h,d,a],backgroundColor:["#d4edda","#fff3cd","#f8d7da","#bbbbbb"],hoverOffet:4}]},options:{responsive:!0,maintainAspectRatio:!1,hover:{mode:null},plugins:{legend:{display:!1}}}};u&&u.destroy();var N=p.getContext("2d");n(12,u=new _t(N,I))})()},[p,a,d,h,b,r,o,_,C,g,v,k,u,i,s,c,D,S,q]}class bt extends Le{constructor(t){super(),Qe(this,t,gt,ht,Ge,{questionsInModule:9,answerChoices:10,moduleId:11})}}function Je(e,t,n){const s=e.slice();return s[15]=t[n],s}function Ke(e){let t;return{c(){t=f("p"),t.textContent="Loading ..."},m(n,s){A(n,t,s)},p:le,d(n){n&&L(t)}}}function kt(e){let t,n=Ue(Ae(e[15].created_at),"dd.MM.yyyy")+"",s;return{c(){t=f("span"),s=w(n),m(t,"class","badge text-bg-light")},m(i,o){A(i,t,o),l(t,s)},p(i,o){o&16&&n!==(n=Ue(Ae(i[15].created_at),"dd.MM.yyyy")+"")&&j(s,n)},d(i){i&&L(t)}}}function wt(e){let t,n=Ue(Ae(e[15].exam_at),"dd.MM.yyyy")+"",s;return{c(){t=f("span"),s=w(n),m(t,"class","badge text-bg-light")},m(i,o){A(i,t,o),l(t,s)},p(i,o){o&16&&n!==(n=Ue(Ae(i[15].exam_at),"dd.MM.yyyy")+"")&&j(s,n)},d(i){i&&L(t)}}}function Xe(e){let t,n=e[5][e[15].id]+"",s;return{c(){t=new rt(!1),s=je(),t.a=s},m(i,o){t.m(n,i,o),A(i,s,o)},p(i,o){o&48&&n!==(n=i[5][i[15].id]+"")&&t.p(n)},d(i){i&&(L(s),t.d())}}}function Ze(e){let t,n,s,i,o,r,a,b=e[15].questions.length+"",h,d,_,g,v,k,u,p,C,c=e[15].name+"",D,S,q,I,N,y,P,F,ee,K;function B(Y,E){return Y[15].exam_at?wt:kt}let $=B(e),U=$(e),G=e[5][e[15].id]&&Xe(e);function X(){return e[12](e[15])}function W(){return e[13](e[15])}return{c(){t=f("div"),n=f("div"),s=f("div"),U.c(),i=M(),o=f("span"),r=f("i"),a=M(),h=w(b),d=M(),G&&G.c(),_=M(),g=f("input"),u=M(),p=f("div"),C=f("h6"),D=w(c),S=M(),q=f("button"),q.innerHTML='<i class="bi bi-rocket-takeoff"></i> New session',I=M(),N=f("a"),y=w("Browse deck"),F=M(),m(r,"class","bi bi-collection"),m(o,"class","badge text-bg-secondary"),m(o,"title","Number of questions"),m(g,"class","form-check-input float-end"),m(g,"type","checkbox"),g.value="",m(g,"id",v="selected"+e[15].id),g.checked=k=e[3].has(e[15].id),m(s,"class","card-header"),m(C,"class","card-title"),m(q,"type","button"),m(q,"class","btn btn-sm btn-primary"),m(N,"href",P="/decks/"+e[15].id),m(N,"class","card-link"),m(p,"class","card-body"),m(n,"class","card"),m(t,"class","col-lg-6 mb-1")},m(Y,E){A(Y,t,E),l(t,n),l(n,s),U.m(s,null),l(s,i),l(s,o),l(o,r),l(o,a),l(o,h),l(s,d),G&&G.m(s,null),l(s,_),l(s,g),l(n,u),l(n,p),l(p,C),l(C,D),l(p,S),l(p,q),l(p,I),l(p,N),l(N,y),l(t,F),ee||(K=[J(g,"click",X),J(q,"click",ie(W))],ee=!0)},p(Y,E){e=Y,$===($=B(e))&&U?U.p(e,E):(U.d(1),U=$(e),U&&(U.c(),U.m(s,i))),E&16&&b!==(b=e[15].questions.length+"")&&j(h,b),e[5][e[15].id]?G?G.p(e,E):(G=Xe(e),G.c(),G.m(s,_)):G&&(G.d(1),G=null),E&16&&v!==(v="selected"+e[15].id)&&m(g,"id",v),E&24&&k!==(k=e[3].has(e[15].id))&&(g.checked=k),E&16&&c!==(c=e[15].name+"")&&j(D,c),E&16&&P!==(P="/decks/"+e[15].id)&&m(N,"href",P)},d(Y){Y&&L(t),U.d(),G&&G.d(),ee=!1,ot(K)}}}function vt(e){let t,n,s,i,o,r,a;function b(u){e[9](u)}function h(u){e[10](u)}function d(u){e[11](u)}let _={};e[0]!==void 0&&(_.moduleId=e[0]),e[7]!==void 0&&(_.questionsInModule=e[7]),e[6]!==void 0&&(_.answerChoices=e[6]),t=new bt({props:_}),Se.push(()=>Ce(t,"moduleId",b)),Se.push(()=>Ce(t,"questionsInModule",h)),Se.push(()=>Ce(t,"answerChoices",d));let g=De(e[4]),v=[];for(let u=0;u<g.length;u+=1)v[u]=Ze(Je(e,g,u));let k=null;return g.length||(k=Ke()),{c(){Re(t.$$.fragment),o=M();for(let u=0;u<v.length;u+=1)v[u].c();r=je(),k&&k.c()},m(u,p){Pe(t,u,p),A(u,o,p);for(let C=0;C<v.length;C+=1)v[C]&&v[C].m(u,p);A(u,r,p),k&&k.m(u,p),a=!0},p(u,[p]){const C={};if(!n&&p&1&&(n=!0,C.moduleId=u[0],Me(()=>n=!1)),!s&&p&128&&(s=!0,C.questionsInModule=u[7],Me(()=>s=!1)),!i&&p&64&&(i=!0,C.answerChoices=u[6],Me(()=>i=!1)),t.$set(C),p&62){g=De(u[4]);let c;for(c=0;c<g.length;c+=1){const D=Je(u,g,c);v[c]?v[c].p(D,p):(v[c]=Ze(D),v[c].c(),v[c].m(r.parentNode,r))}for(;c<v.length;c+=1)v[c].d(1);v.length=g.length,!g.length&&k?k.p(u,p):g.length?k&&(k.d(1),k=null):(k=Ke(),k.c(),k.m(r.parentNode,r))}},i(u){a||(qe(t.$$.fragment,u),a=!0)},o(u){ye(t.$$.fragment,u),a=!1},d(u){u&&(L(o),L(r)),Ve(t,u),Te(v,u),k&&k.d(u)}}}function St(e,t,n){let s,i,o,{moduleId:r}=t,{createSession:a}=t,{selectDeck:b}=t,{userSelectedDecks:h}=t,d=[],_={};function g(c){if(!c){n(4,d=[]);return}axios.get("/api/decks?module="+c).then(function(D){n(4,d=D.data),d.sort(function(S,q){return S.exam_at===null?1:q.exam_at===null?-1:S.exam_at<q.exam_at?1:S.exam_at>q.exam_at?-1:0})}).catch(function(D){alert(D)})}function v(c){r=c,n(0,r)}function k(c){s=c,n(7,s),n(4,d)}function u(c){i=c,n(6,i),n(8,_),n(4,d)}const p=c=>b(c.id),C=c=>a(c.id);return e.$$set=c=>{"moduleId"in c&&n(0,r=c.moduleId),"createSession"in c&&n(1,a=c.createSession),"selectDeck"in c&&n(2,b=c.selectDeck),"userSelectedDecks"in c&&n(3,h=c.userSelectedDecks)},e.$$.update=()=>{e.$$.dirty&16&&n(7,s=(()=>{var c=[];return d.forEach(D=>c.push(...D.questions)),c})()),e.$$.dirty&16&&(()=>{if(d.length===0)return;const c=d.map(D=>"decks[]="+D.id);axios.get("/api/stats/sessionsfordecks?"+c.join("&")).then(function(D){n(8,_=D.data)}).catch(function(D){alert(D)})})(),e.$$.dirty&256&&n(6,i=(()=>{var c=[];for(const D in _)c.push(..._[D].answer_choices);return c.sort(function(D,S){return D.created_at<S.created_at}),c})()),e.$$.dirty&1&&g(r),e.$$.dirty&272&&n(5,o=(()=>{var c={};if(!_)return c;for(const S of d){if(!_[S.id]){c[S.id]="";continue}const q=_[S.id],I=q.deck.questions.filter(P=>!P.is_invalid),N=q.answer_choices.filter(P=>I.some(({id:F})=>F===P.question_id)),y=ft(I.length,N);var D='style="color: #721c24; background-color: #f8d7da;"';y.correct>=60&&(D='style="color: #155724; background-color: #d4edda;"'),c[S.id]="<span "+D+` class="badge" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here's some..." title="Correct answers in percent">`+y.correct+" %</span>"}return c})())},[r,a,b,h,d,o,i,s,_,v,k,u,p,C]}class Dt extends Le{constructor(t){super(),Qe(this,t,St,vt,Ge,{moduleId:0,createSession:1,selectDeck:2,userSelectedDecks:3})}}function $e(e){let t,n,s,i,o,r,a,b,h,d=e[1].length+"",_,g,v=e[1].length>1?"s":"",k,u,p,C=e[3].length+"",c,D,S=e[3].length>1?"s":"",q,I,N,y=e[2]?"excluded":"included",P,F,ee,K,B,$,U,G,X,W,Y,E,me,x,T,pe,de=e[3].length+"",oe,he,fe=e[3].length>1?"s":"",ge,re,be,Z,te,ue=e[5].length+"",ke,_e,ce=e[5].length>1?"s":"",we,Ie,ae,se,ve,ne,V=e[5].length>0&&xe(e);return{c(){t=f("div"),n=f("div"),s=f("div"),i=f("p"),i.textContent="Create your own super deck:",o=M(),r=f("p"),a=w("You have "),b=f("strong"),h=w("selected "),_=w(d),g=w(" deck"),k=w(v),u=w(`
                    with `),p=f("strong"),c=w(C),D=w(" question"),q=w(S),I=M(),V&&V.c(),N=w(`
                    (duplicates `),P=w(y),F=w(")"),ee=M(),K=f("div"),B=f("label"),B.textContent="Deck Name",$=M(),U=f("input"),G=M(),X=f("div"),W=f("input"),Y=M(),E=f("label"),E.textContent="Filter out duplicates",me=M(),x=f("div"),T=f("button"),pe=w("Create deck ("),oe=w(de),he=w(" question"),ge=w(fe),re=w(")"),be=M(),Z=f("button"),te=w("Create deck ("),ke=w(ue),_e=w(" image question"),we=w(ce),Ie=w(")"),ae=M(),se=f("button"),se.textContent="Cancel",m(B,"for","name"),m(B,"class","form-label"),m(U,"type","text"),m(U,"class","form-control"),m(U,"id","name"),m(K,"class","mb-3"),m(W,"type","checkbox"),m(W,"class","form-check-input"),m(W,"id","checkboxRemoveDuplicates"),m(E,"class","form-check-label"),m(E,"for","checkboxRemoveDuplicates"),m(X,"class","mb-3 form-check"),m(T,"class","btn btn-sm btn-primary"),m(Z,"class","btn btn-sm btn-primary"),m(se,"class","btn btn-sm btn-link"),m(x,"class","d-grid gap-2 d-md-block"),m(s,"class","alert alert-light"),m(s,"role","alert"),m(n,"class","col-md"),m(t,"class","row")},m(H,R){A(H,t,R),l(t,n),l(n,s),l(s,i),l(s,o),l(s,r),l(r,a),l(r,b),l(b,h),l(b,_),l(b,g),l(b,k),l(r,u),l(r,p),l(p,c),l(p,D),l(p,q),l(r,I),V&&V.m(r,null),l(r,N),l(r,P),l(r,F),l(s,ee),l(s,K),l(K,B),l(K,$),l(K,U),ze(U,e[4]),l(s,G),l(s,X),l(X,W),W.checked=e[2],l(X,Y),l(X,E),l(s,me),l(s,x),l(x,T),l(T,pe),l(T,oe),l(T,he),l(T,ge),l(T,re),l(x,be),l(x,Z),l(Z,te),l(Z,ke),l(Z,_e),l(Z,we),l(Z,Ie),l(x,ae),l(x,se),ve||(ne=[J(U,"input",e[6]),J(U,"focus",Ct),J(W,"change",e[7]),J(T,"click",ie(e[8])),J(Z,"click",ie(e[9])),J(se,"click",ie(e[10]))],ve=!0)},p(H,R){R&2&&d!==(d=H[1].length+"")&&j(_,d),R&2&&v!==(v=H[1].length>1?"s":"")&&j(k,v),R&8&&C!==(C=H[3].length+"")&&j(c,C),R&8&&S!==(S=H[3].length>1?"s":"")&&j(q,S),H[5].length>0?V?V.p(H,R):(V=xe(H),V.c(),V.m(r,N)):V&&(V.d(1),V=null),R&4&&y!==(y=H[2]?"excluded":"included")&&j(P,y),R&16&&U.value!==H[4]&&ze(U,H[4]),R&4&&(W.checked=H[2]),R&8&&de!==(de=H[3].length+"")&&j(oe,de),R&8&&fe!==(fe=H[3].length>1?"s":"")&&j(ge,fe),R&32&&ue!==(ue=H[5].length+"")&&j(ke,ue),R&32&&ce!==(ce=H[5].length>1?"s":"")&&j(we,ce)},d(H){H&&L(t),V&&V.d(),ve=!1,ot(ne)}}}function xe(e){let t,n,s=e[5].length+"",i,o,r=e[5].length>1?"s":"",a,b;return{c(){t=w("/ "),n=f("strong"),i=w(s),o=w(" question"),a=w(r),b=w(" with images")},m(h,d){A(h,t,d),A(h,n,d),l(n,i),l(n,o),l(n,a),l(n,b)},p(h,d){d&32&&s!==(s=h[5].length+"")&&j(i,s),d&32&&r!==(r=h[5].length>1?"s":"")&&j(a,r)},d(h){h&&(L(t),L(n))}}}function It(e){let t,n=e[1].length>0&&$e(e);return{c(){n&&n.c(),t=je()},m(s,i){n&&n.m(s,i),A(s,t,i)},p(s,[i]){s[1].length>0?n?n.p(s,i):(n=$e(s),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},i:le,o:le,d(s){s&&L(t),n&&n.d(s)}}}function et(e,t){var n={name:e,question_ids:t};axios.post("/api/decks",n).then(function(s){window.location.href="/decks/"+s.data.id}).catch(function(s){alert(s)})}const Ct=e=>e.target.select();function Mt(e,t,n){let s,i,{userSelectedDecks:o}=t,r=[],a="My new super deck",b=!0;function h(){if(o.size===0){n(1,r=[]);return}const u=[...o].map(p=>"decks[]="+p);axios.get("/api/decks?"+u.join("&")).then(function(p){n(1,r=p.data)}).catch(function(p){alert(p)})}function d(){a=this.value,n(4,a)}function _(){b=this.checked,n(2,b)}const g=()=>et(a,s.map(u=>u.id)),v=()=>et(a,i.map(u=>u.id)),k=()=>n(0,o=new Set);return e.$$set=u=>{"userSelectedDecks"in u&&n(0,o=u.userSelectedDecks)},e.$$.update=()=>{e.$$.dirty&1&&h(),e.$$.dirty&6&&n(3,s=(()=>{var u=[];return r.forEach(p=>u.push(...p.questions)),b?[...new Map(u.map(p=>[p.id,p])).values()]:u})()),e.$$.dirty&6&&n(5,i=(()=>{var u=[];return r.forEach(p=>{p.questions.forEach(C=>{C.images.length>0&&u.push(C)})}),b?[...new Map(u.map(p=>[p.id,p])).values()]:u})())},[o,r,b,s,a,i,d,_,g,v,k]}class qt extends Le{constructor(t){super(),Qe(this,t,Mt,It,Ge,{userSelectedDecks:0})}}function tt(e,t,n){const s=e.slice();return s[12]=t[n],s}function nt(e,t,n){const s=e.slice();return s[15]=t[n],s}function lt(e){let t,n,s=De(e[2]),i=[];for(let o=0;o<s.length;o+=1)i[o]=st(nt(e,s,o));return{c(){t=f("ul");for(let o=0;o<i.length;o+=1)i[o].c();n=M(),m(t,"class","list-group m-2 me-0")},m(o,r){A(o,t,r);for(let a=0;a<i.length;a+=1)i[a]&&i[a].m(t,null);l(t,n)},p(o,r){if(r&37){s=De(o[2]);let a;for(a=0;a<s.length;a+=1){const b=nt(o,s,a);i[a]?i[a].p(b,r):(i[a]=st(b),i[a].c(),i[a].m(t,n))}for(;a<i.length;a+=1)i[a].d(1);i.length=s.length}},d(o){o&&L(t),Te(i,o)}}}function st(e){let t,n=e[15].name+"",s,i,o,r;function a(){return e[9](e[15])}return{c(){t=f("button"),s=w(n),m(t,"class",i="list-group-item list-group-item-action "+(e[0].last_module_id===e[15].id?"list-group-item-secondary":"list-group-item-light"))},m(b,h){A(b,t,h),l(t,s),o||(r=J(t,"click",ie(a)),o=!0)},p(b,h){e=b,h&4&&n!==(n=e[15].name+"")&&j(s,n),h&5&&i!==(i="list-group-item list-group-item-action "+(e[0].last_module_id===e[15].id?"list-group-item-secondary":"list-group-item-light"))&&m(t,"class",i)},d(b){b&&L(t),o=!1,r()}}}function it(e){let t,n=e[12].name+"",s,i,o,r,a,b;function h(){return e[8](e[12])}let d=e[0].last_subject_id===e[12].id&&lt(e);return{c(){t=f("button"),s=w(n),o=M(),d&&d.c(),r=je(),m(t,"class",i="list-group-item list-group-item-action "+(e[0].last_subject_id===e[12].id?"list-group-item-dark":"list-group-item-light"))},m(_,g){A(_,t,g),l(t,s),A(_,o,g),d&&d.m(_,g),A(_,r,g),a||(b=J(t,"click",ie(h)),a=!0)},p(_,g){e=_,g&2&&n!==(n=e[12].name+"")&&j(s,n),g&3&&i!==(i="list-group-item list-group-item-action "+(e[0].last_subject_id===e[12].id?"list-group-item-dark":"list-group-item-light"))&&m(t,"class",i),e[0].last_subject_id===e[12].id?d?d.p(e,g):(d=lt(e),d.c(),d.m(r.parentNode,r)):d&&(d.d(1),d=null)},d(_){_&&(L(t),L(o),L(r)),d&&d.d(_),a=!1,b()}}}function yt(e){let t;return{c(){t=f("p"),t.textContent="No module selected."},m(n,s){A(n,t,s)},p:le,i:le,o:le,d(n){n&&L(t)}}}function jt(e){let t,n,s;function i(r){e[11](r)}let o={moduleId:e[0].last_module_id,createSession:Ut,selectDeck:e[6]};return e[3]!==void 0&&(o.userSelectedDecks=e[3]),t=new Dt({props:o}),Se.push(()=>Ce(t,"userSelectedDecks",i)),{c(){Re(t.$$.fragment)},m(r,a){Pe(t,r,a),s=!0},p(r,a){const b={};a&1&&(b.moduleId=r[0].last_module_id),!n&&a&8&&(n=!0,b.userSelectedDecks=r[3],Me(()=>n=!1)),t.$set(b)},i(r){s||(qe(t.$$.fragment,r),s=!0)},o(r){ye(t.$$.fragment,r),s=!1},d(r){Ve(t,r)}}}function Nt(e){let t,n,s,i,o,r,a,b,h,d,_,g,v=De(e[1]),k=[];for(let S=0;S<v.length;S+=1)k[S]=it(tt(e,v,S));function u(S){e[10](S)}let p={};e[3]!==void 0&&(p.userSelectedDecks=e[3]),r=new qt({props:p}),Se.push(()=>Ce(r,"userSelectedDecks",u));const C=[jt,yt],c=[];function D(S,q){return S[0].last_module_id?0:1}return d=D(e),_=c[d]=C[d](e),{c(){t=f("div"),n=f("div"),s=f("ul");for(let S=0;S<k.length;S+=1)k[S].c();i=M(),o=f("div"),Re(r.$$.fragment),b=M(),h=f("div"),_.c(),m(s,"class","list-group"),m(n,"class","col-md-4 mb-2"),m(h,"class","row"),m(o,"class","col-md-8"),m(t,"class","row")},m(S,q){A(S,t,q),l(t,n),l(n,s);for(let I=0;I<k.length;I+=1)k[I]&&k[I].m(s,null);l(t,i),l(t,o),Pe(r,o,null),l(o,b),l(o,h),c[d].m(h,null),g=!0},p(S,[q]){if(q&55){v=De(S[1]);let y;for(y=0;y<v.length;y+=1){const P=tt(S,v,y);k[y]?k[y].p(P,q):(k[y]=it(P),k[y].c(),k[y].m(s,null))}for(;y<k.length;y+=1)k[y].d(1);k.length=v.length}const I={};!a&&q&8&&(a=!0,I.userSelectedDecks=S[3],Me(()=>a=!1)),r.$set(I);let N=d;d=D(S),d===N?c[d].p(S,q):(dt(),ye(c[N],1,1,()=>{c[N]=null}),ut(),_=c[d],_?_.p(S,q):(_=c[d]=C[d](S),_.c()),qe(_,1),_.m(h,null))},i(S){g||(qe(r.$$.fragment,S),qe(_),g=!0)},o(S){ye(r.$$.fragment,S),ye(_),g=!1},d(S){S&&L(t),Te(k,S),Ve(r),c[d].d()}}}function Ut(e){var t={deck_id:e};axios.post("/api/sessions",t).then(function(n){window.location.href="/sessions/"+n.data.id}).catch(function(n){alert(n)})}function At(e,t,n){let s;ct(e,Ne,u=>n(0,s=u));let i=[],o=[],r=[],a=new Set;at(()=>{axios.get("/api/modules").then(function(u){var p=u.data;n(7,i=p.filter((c,D,S)=>D===S.findIndex(q=>q.id===c.id)).sort(function(c,D){return c.name>D.name?1:c.name<D.name?-1:0}));var C=i.map(c=>c.subject).filter(c=>!!c);n(1,o=C.filter((c,D,S)=>D===S.findIndex(q=>q.id===c.id)).sort(function(c,D){return c.name>D.name?1:c.name<D.name?-1:0}))}).catch(function(u){alert(u)})});function b(u){var p={last_subject_id:u,last_module_id:0};axios.put("/api/users/me/settings",p).then(function(C){He(Ne,s.last_subject_id=u,s),He(Ne,s.last_module_id=0,s)}).catch(function(C){alert(C)})}function h(u){var p={last_module_id:u};axios.put("/api/users/me/settings",p).then(function(C){He(Ne,s.last_module_id=u,s)}).catch(function(C){alert(C)})}function d(u){a.has(u)?a.delete(u):a.add(u),n(3,a=new Set([...a]))}const _=u=>b(u.id),g=u=>h(u.id);function v(u){a=u,n(3,a)}function k(u){a=u,n(3,a)}return e.$$.update=()=>{e.$$.dirty&129&&(s.last_subject_id,n(2,r=i.filter(u=>s.last_subject_id?u.subject?u.subject.id===s.last_subject_id:!1:!0)))},[s,o,r,a,b,h,d,i,_,g,v,k]}class Lt extends Le{constructor(t){super(),Qe(this,t,At,Nt,Ge,{})}}const Qt=document.getElementById("NewSessionView");new Lt({target:Qt});