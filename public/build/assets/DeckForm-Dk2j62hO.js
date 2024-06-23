import{S as Y,i as Z,s as U,a as L,e as he,b as h,n as I,d as q,c as b,t as z,f,g as W,h as _,j as ae,l as M,p as x,k as j,H as ve,m as ue,o as S,q as $,r as G,u as ee,v as te,w as J,x as F,y as H,z as re,A as ne,B as we,C as Ce,D as ce}from"./index-BBxbQYOu.js";import{d as ye,p as P}from"./purify.es-DfBF0len.js";import{Q as Ee}from"./QuestionForm-BXn-Bja3.js";import{e as K}from"./each-DRTt0YH0.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./lodash-D0JQdfhu.js";function de(e){let t,s,l,i,u,r,n,o,c,a,m,v,E,N,p,T;return{c(){t=b("form"),s=b("div"),l=b("label"),i=z("Case text"),r=L(),n=b("input"),c=L(),a=b("trix-editor"),E=L(),N=new ve(!1),f(l,"for",u="caseText"+e[0].id),f(l,"class","form-label"),f(n,"id",o="caseText"+e[0].id),f(n,"type","hidden"),W(a,"id",m="editor-case"+e[0].id),W(a,"class","bg-light"),W(a,"input",v="caseText"+e[0].id),N.a=null,f(s,"class","mb-3"),f(t,"action","#"),f(t,"class","mt-3")},m(Q,w){h(Q,t,w),_(t,s),_(s,l),_(l,i),_(s,r),_(s,n),ae(n,e[0].text),_(s,c),_(s,a),e[6](a),_(s,E),N.m(e[4],s),p||(T=M(n,"input",e[5]),p=!0)},p(Q,w){w&1&&u!==(u="caseText"+Q[0].id)&&f(l,"for",u),w&1&&o!==(o="caseText"+Q[0].id)&&f(n,"id",o),w&1&&ae(n,Q[0].text),w&1&&m!==(m="editor-case"+Q[0].id)&&W(a,"id",m),w&1&&v!==(v="caseText"+Q[0].id)&&W(a,"input",v),w&16&&N.p(Q[4])},d(Q){Q&&q(t),e[6](null),p=!1,T()}}}function fe(e){let t,s,l,i,u,r,n,o,c;return{c(){t=b("div"),s=b("p"),s.innerHTML="<strong>Delete case?</strong> A case can only be deleted if it&#39;s not associated with any question.",l=L(),i=b("button"),u=b("i"),r=z(" Delete case"),f(u,"class","bi bi-trash"),f(i,"type","button"),f(i,"class","btn btn-sm btn-danger"),i.disabled=n=e[1].some(e[7]),f(t,"class","alert alert-light mt-5"),f(t,"role","alert")},m(a,m){h(a,t,m),_(t,s),_(t,l),_(t,i),_(i,u),_(i,r),o||(c=M(i,"click",x(e[8])),o=!0)},p(a,m){m&3&&n!==(n=a[1].some(a[7]))&&(i.disabled=n)},d(a){a&&q(t),o=!1,c()}}}function Te(e){let t=e[0].id,s,l,i=de(e),u=e[2]&&fe(e);return{c(){i.c(),s=L(),u&&u.c(),l=he()},m(r,n){i.m(r,n),h(r,s,n),u&&u.m(r,n),h(r,l,n)},p(r,[n]){n&1&&U(t,t=r[0].id)?(i.d(1),i=de(r),i.c(),i.m(s.parentNode,s)):i.p(r,n),r[2]?u?u.p(r,n):(u=fe(r),u.c(),u.m(l.parentNode,l)):u&&(u.d(1),u=null)},i:I,o:I,d(r){r&&(q(s),q(l)),i.d(r),u&&u.d(r)}}}function Qe(e,t,s){let{kase:l}=t,{cases:i}=t,{handleCaseRemove:u}=t,r,n="";function o(p){p.addEventListener("trix-change",function(){s(0,l.text=document.getElementById("caseText"+l.id).value,l),s(4,n='<p class="text-end">Saving ...</p>'),a()}),p.toolbarElement.style.display="none",p.addEventListener("trix-focus",function(T){T.target.toolbarElement.style.display="block"}),p.addEventListener("trix-blur",function(T){T.target.toolbarElement.contains(document.activeElement)||(T.target.toolbarElement.style.display="none")})}var c;function a(){c&&c.cancel(),c=ye(()=>{axios.put("/api/cases/"+l.id,l).then(function(p){s(4,n='<p class="text-end">Saved <span class="text-success-dark">&check;</span></p>')}).catch(function(p){s(4,n='<p class="text-end">Saving ... <span class="text-danger-dark">failed!</span></p>'),alert(p)})},500,{maxWait:2e3}),c()}function m(){l.text=this.value,s(0,l)}function v(p){j[p?"unshift":"push"](()=>{r=p,s(3,r)})}const E=p=>p.questions?p.questions.some(T=>T.case_id===l.id):!1,N=()=>{u(l.id)};return e.$$set=p=>{"kase"in p&&s(0,l=p.kase),"cases"in p&&s(1,i=p.cases),"handleCaseRemove"in p&&s(2,u=p.handleCaseRemove)},e.$$.update=()=>{e.$$.dirty&8&&r&&o(r)},[l,i,u,r,n,m,v,E,N]}class Le extends Y{constructor(t){super(),Z(this,t,Qe,Te,U,{kase:0,cases:1,handleCaseRemove:2})}}function _e(e,t,s){const l=e.slice();return l[4]=t[s],l[6]=s,l}function me(e,t,s){const l=e.slice();return l[7]=t[s],l[6]=s,l}function Ne(e){let t;return{c(){t=b("p"),t.textContent="Loading ..."},m(s,l){h(s,t,l)},p:I,d(s){s&&q(t)}}}function Re(e){let t,s,l,i=K(e[0].questions),u=[];for(let o=0;o<i.length;o+=1)u[o]=pe(me(e,i,o));let r=K(e[0].cases),n=[];for(let o=0;o<r.length;o+=1)n[o]=be(_e(e,r,o));return{c(){t=b("div");for(let o=0;o<u.length;o+=1)u[o].c();s=L(),l=b("div");for(let o=0;o<n.length;o+=1)n[o].c();f(t,"class","list-group"),f(l,"class","list-group mt-2")},m(o,c){h(o,t,c);for(let a=0;a<u.length;a+=1)u[a]&&u[a].m(t,null);h(o,s,c),h(o,l,c);for(let a=0;a<n.length;a+=1)n[a]&&n[a].m(l,null)},p(o,c){if(c&1){i=K(o[0].questions);let a;for(a=0;a<i.length;a+=1){const m=me(o,i,a);u[a]?u[a].p(m,c):(u[a]=pe(m),u[a].c(),u[a].m(t,null))}for(;a<u.length;a+=1)u[a].d(1);u.length=i.length}if(c&3){r=K(o[0].cases);let a;for(a=0;a<r.length;a+=1){const m=_e(o,r,a);n[a]?n[a].p(m,c):(n[a]=be(m),n[a].c(),n[a].m(l,null))}for(;a<n.length;a+=1)n[a].d(1);n.length=r.length}},d(o){o&&(q(t),q(s),q(l)),ue(u,o),ue(n,o)}}}function Se(e){let t,s=e[6]+1+"",l;return{c(){t=z("Question Nr. "),l=z(s)},m(i,u){h(i,t,u),h(i,l,u)},p:I,d(i){i&&(q(t),q(l))}}}function De(e){let t=P.sanitize(e[7].text).replace(/<\/?[^>]+(>|$)/g,"")+"",s;return{c(){s=z(t)},m(l,i){h(l,s,i)},p(l,i){i&1&&t!==(t=P.sanitize(l[7].text).replace(/<\/?[^>]+(>|$)/g,"")+"")&&$(s,t)},d(l){l&&q(s)}}}function pe(e){let t,s,l,i,u;function r(a,m){return a[7].text?De:Se}let n=r(e),o=n(e);function c(){return e[2](e[7])}return{c(){t=b("button"),s=b("small"),o.c(),l=L(),f(t,"type","button"),f(t,"class","list-group-item list-group-item-action text-overflow svelte-1gfmo48"),f(t,"aria-current","true"),S(t,"list-group-item-dark",e[7].id===e[0].current_question_id),S(t,"list-group-item-light",e[7].id!==e[0].current_question_id),S(t,"bg-warning-subtle",e[0].current_case_id&&e[7].case_id===e[0].current_case_id)},m(a,m){h(a,t,m),_(t,s),o.m(s,null),_(t,l),i||(u=M(t,"click",x(c)),i=!0)},p(a,m){e=a,n===(n=r(e))&&o?o.p(e,m):(o.d(1),o=n(e),o&&(o.c(),o.m(s,null))),m&1&&S(t,"list-group-item-dark",e[7].id===e[0].current_question_id),m&1&&S(t,"list-group-item-light",e[7].id!==e[0].current_question_id),m&1&&S(t,"bg-warning-subtle",e[0].current_case_id&&e[7].case_id===e[0].current_case_id)},d(a){a&&q(t),o.d(),i=!1,u()}}}function Fe(e){let t,s=e[6]+1+"",l;return{c(){t=z("Case Nr. "),l=z(s)},m(i,u){h(i,t,u),h(i,l,u)},p:I,d(i){i&&(q(t),q(l))}}}function ze(e){let t=P.sanitize(e[4].text).replace(/<\/?[^>]+(>|$)/g,"")+"",s;return{c(){s=z(t)},m(l,i){h(l,s,i)},p(l,i){i&1&&t!==(t=P.sanitize(l[4].text).replace(/<\/?[^>]+(>|$)/g,"")+"")&&$(s,t)},d(l){l&&q(s)}}}function be(e){let t,s,l,i,u,r,n;function o(v,E){return v[4].text?ze:Fe}let c=o(e),a=c(e);function m(){return e[3](e[4])}return{c(){t=b("button"),s=b("small"),l=b("i"),i=L(),a.c(),u=L(),f(l,"class","bi bi-clipboard2-pulse"),f(t,"type","button"),f(t,"class","list-group-item list-group-item-action text-overflow svelte-1gfmo48"),f(t,"aria-current","true"),S(t,"list-group-item-dark",e[4].id===e[0].current_case_id),S(t,"list-group-item-info",e[4].id!==e[0].current_case_id&&!(e[1]&&e[1].case_id===e[4].id)),S(t,"list-group-item-warning",e[1]&&e[1].case_id===e[4].id)},m(v,E){h(v,t,E),_(t,s),_(s,l),_(s,i),a.m(s,null),_(t,u),r||(n=M(t,"click",x(m)),r=!0)},p(v,E){e=v,c===(c=o(e))&&a?a.p(e,E):(a.d(1),a=c(e),a&&(a.c(),a.m(s,null))),E&1&&S(t,"list-group-item-dark",e[4].id===e[0].current_case_id),E&3&&S(t,"list-group-item-info",e[4].id!==e[0].current_case_id&&!(e[1]&&e[1].case_id===e[4].id)),E&3&&S(t,"list-group-item-warning",e[1]&&e[1].case_id===e[4].id)},d(v){v&&q(t),a.d(),r=!1,n()}}}function Ae(e){let t;function s(u,r){return u[0]?Re:Ne}let l=s(e),i=l(e);return{c(){i.c(),t=he()},m(u,r){i.m(u,r),h(u,t,r)},p(u,[r]){l===(l=s(u))&&i?i.p(u,r):(i.d(1),i=l(u),i&&(i.c(),i.m(t.parentNode,t)))},i:I,o:I,d(u){u&&q(t),i.d(u)}}}function He(e,t,s){let l,{data:i}=t;const u=n=>{s(0,i.current_question_id=n.id,i),s(0,i.current_case_id=null,i)},r=n=>{s(0,i.current_case_id=n.id,i),s(0,i.current_question_id=null,i)};return e.$$set=n=>{"data"in n&&s(0,i=n.data)},e.$$.update=()=>{e.$$.dirty&1&&s(1,l=i?i.questions.find(n=>n.id===i.current_question_id):null)},[i,l,u,r]}class Me extends Y{constructor(t){super(),Z(this,t,He,Ae,U,{data:0})}}function ge(e){let t,s,l,i;function u(o){e[12](o)}function r(o){e[13](o)}let n={showConfigEditor:"true",showCaseSelector:"true",handleQuestionRemove:e[7]};return e[4]!==void 0&&(n.question=e[4]),e[2].cases!==void 0&&(n.cases=e[2].cases),t=new Ee({props:n}),j.push(()=>G(t,"question",u)),j.push(()=>G(t,"cases",r)),{c(){ee(t.$$.fragment)},m(o,c){te(t,o,c),i=!0},p(o,c){const a={};!s&&c&16&&(s=!0,a.question=o[4],J(()=>s=!1)),!l&&c&4&&(l=!0,a.cases=o[2].cases,J(()=>l=!1)),t.$set(a)},i(o){i||(F(t.$$.fragment,o),i=!0)},o(o){H(t.$$.fragment,o),i=!1},d(o){ne(t,o)}}}function ke(e){let t,s,l,i;function u(o){e[14](o)}function r(o){e[15](o)}let n={handleCaseRemove:e[8]};return e[3]!==void 0&&(n.kase=e[3]),e[2].cases!==void 0&&(n.cases=e[2].cases),t=new Le({props:n}),j.push(()=>G(t,"kase",u)),j.push(()=>G(t,"cases",r)),{c(){ee(t.$$.fragment)},m(o,c){te(t,o,c),i=!0},p(o,c){const a={};!s&&c&8&&(s=!0,a.kase=o[3],J(()=>s=!1)),!l&&c&4&&(l=!0,a.cases=o[2].cases,J(()=>l=!1)),t.$set(a)},i(o){i||(F(t.$$.fragment,o),i=!0)},o(o){H(t.$$.fragment,o),i=!1},d(o){ne(t,o)}}}function Ie(e){let t,s,l,i,u,r,n,o,c,a,m,v,E,N,p,T,Q,w,d,k,D,se,A,V,B,X,ie;function qe(g){e[11](g)}let le={};e[2]!==void 0&&(le.data=e[2]),k=new Me({props:le}),j.push(()=>G(k,"data",qe));let C=e[4]&&ge(e),y=e[3]&&ke(e);return{c(){t=b("div"),s=b("div"),l=b("h4"),i=b("a"),u=z(e[1]),n=L(),o=b("div"),c=b("div"),a=b("button"),a.textContent="Add MC question",m=L(),v=b("button"),v.textContent="Add card question",E=L(),N=b("button"),N.innerHTML='<i class="bi bi-clipboard2-pulse"></i> Add case',p=L(),T=b("div"),T.innerHTML='<div class="col"><div class="mt-3 mb-3 border-dark" style="border-bottom: dotted; border-width: 1px;"></div></div>',Q=L(),w=b("div"),d=b("div"),ee(k.$$.fragment),se=L(),A=b("div"),C&&C.c(),V=L(),y&&y.c(),f(i,"href",r="/decks/"+e[0]),f(i,"class","text-reset text-decoration-none"),f(s,"class","col"),f(t,"class","row"),f(a,"type","button"),f(a,"class","btn btn-sm btn-primary"),f(v,"type","button"),f(v,"class","btn btn-sm btn-primary"),f(N,"type","button"),f(N,"class","btn btn-sm btn-light"),f(c,"class","col d-grid d-sm-block gap-2"),f(o,"class","row"),f(T,"class","row"),f(d,"class","col-md-4"),f(A,"class","col-md-8"),f(w,"class","row")},m(g,R){h(g,t,R),_(t,s),_(s,l),_(l,i),_(i,u),h(g,n,R),h(g,o,R),_(o,c),_(c,a),_(c,m),_(c,v),_(c,E),_(c,N),h(g,p,R),h(g,T,R),h(g,Q,R),h(g,w,R),_(w,d),te(k,d,null),_(w,se),_(w,A),C&&C.m(A,null),_(A,V),y&&y.m(A,null),B=!0,X||(ie=[M(a,"click",e[9]),M(v,"click",e[10]),M(N,"click",e[6])],X=!0)},p(g,[R]){(!B||R&2)&&$(u,g[1]),(!B||R&1&&r!==(r="/decks/"+g[0]))&&f(i,"href",r);const oe={};!D&&R&4&&(D=!0,oe.data=g[2],J(()=>D=!1)),k.$set(oe),g[4]?C?(C.p(g,R),R&16&&F(C,1)):(C=ge(g),C.c(),F(C,1),C.m(A,V)):C&&(ce(),H(C,1,1,()=>{C=null}),re()),g[3]?y?(y.p(g,R),R&8&&F(y,1)):(y=ke(g),y.c(),F(y,1),y.m(A,null)):y&&(ce(),H(y,1,1,()=>{y=null}),re())},i(g){B||(F(k.$$.fragment,g),F(C),F(y),B=!0)},o(g){H(k.$$.fragment,g),H(C),H(y),B=!1},d(g){g&&(q(t),q(n),q(o),q(p),q(T),q(Q),q(w)),ne(k),C&&C.d(),y&&y.d(),X=!1,we(ie)}}}function Be(e,t,s){let l,i,{id:u}=t,{name:r}=t,n={cases:[],questions:[]};Ce(()=>{axios.get("/api/decks/"+u).then(function(d){s(2,n=d.data),n.questions.length>0&&s(2,n.current_question_id=n.questions[n.questions.length-1].id,n)}).catch(function(d){alert(d)})});function o(d){var k={id:null,text:"",type:d||"mc",correct_answer_id:null,images:[],answers:[]};axios.post("/api/decks/"+u+"/questions",k).then(function(D){k.id=D.data.id,s(2,n.questions=[...n.questions,k],n),s(2,n.current_question_id=k.id,n)}).catch(function(D){alert(D)})}function c(){var d={deck_id:u};axios.post("/api/cases",d).then(function(k){s(2,n.cases=[...n.cases,k.data],n),s(2,n.current_case_id=k.data.id,n),s(2,n.current_question_id=null,n)}).catch(function(k){alert(k)})}function a(d){axios.delete("/api/decks/"+u+"/questions/"+d).then(function(k){s(2,n.questions=n.questions.filter(D=>D.id!==d),n),n.questions.length>0&&s(2,n.current_question_id=n.questions[n.questions.length-1].id,n)}).catch(function(k){alert(k)})}function m(d){axios.delete("/api/decks/"+u+"/cases/"+d).then(function(k){s(2,n.cases=n.cases.filter(D=>D.id!==d),n),n.questions.length>0&&s(2,n.current_question_id=n.questions[n.questions.length-1].id,n)}).catch(function(k){alert(k)})}const v=()=>{o("mc")},E=()=>{o("card")};function N(d){n=d,s(2,n)}function p(d){l=d,s(4,l),s(2,n)}function T(d){e.$$.not_equal(n.cases,d)&&(n.cases=d,s(2,n))}function Q(d){i=d,s(3,i),s(2,n)}function w(d){e.$$.not_equal(n.cases,d)&&(n.cases=d,s(2,n))}return e.$$set=d=>{"id"in d&&s(0,u=d.id),"name"in d&&s(1,r=d.name)},e.$$.update=()=>{e.$$.dirty&4&&s(4,l=n?n.questions.find(d=>d.id===n.current_question_id):null),e.$$.dirty&4&&s(3,i=n?n.cases.find(d=>d.id===n.current_case_id):null)},[u,r,n,i,l,o,c,a,m,v,E,N,p,T,Q,w]}class je extends Y{constructor(t){super(),Z(this,t,Be,Ie,U,{id:0,name:1})}}const O=document.getElementById("DeckForm");new je({target:O,props:{id:O.dataset.deckId,name:O.dataset.deckName,moduleId:O.dataset.moduleId}});
