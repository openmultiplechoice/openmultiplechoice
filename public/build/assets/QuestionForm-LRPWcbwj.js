import{S as De,i as Ne,s as me,n as ce,d as C,v as re,g as l,h as Z,j as J,a as E,c as a,l as W,f as d,t as ne,b as g,H as ae,k as se,w as Be,x as ze,z as Oe,A as Pe,p as ee,e as pe,O as je,M as he,E as Je,r as Ve,u as Ke,y as Ue,B as Xe,C as Ye,G as fe,I as Ge,J as be,q as We,m as Ze}from"./index-C5hKwDc9.js";import{e as le,u as ge,d as xe,o as $e}from"./each-JoEH9o9l.js";import{_ as ve}from"./lodash-DBMh2b1a.js";import{d as Fe,p as _e}from"./purify.es-CzHI0FGf.js";function et(n){let e,i,s,t,u,_,c,h,L,v,m,b,T,o,k,w,Q,S,K,G,B,A,F,O,M,q,y,H,X,Y,U,x,D,N;return{c(){e=d("form"),i=d("div"),s=d("label"),t=ne("Answer text"),_=g(),c=d("input"),L=g(),v=d("trix-editor"),T=g(),o=new ae(!1),k=g(),w=d("div"),Q=d("label"),S=ne("Answer hint (optional)"),G=g(),B=d("input"),F=g(),O=d("trix-editor"),y=g(),H=new ae(!1),X=g(),Y=d("div"),U=ne("A hint that will be shown once the user has answered the question."),l(s,"for",u="answerText"+n[0].id),l(s,"class","form-label"),l(c,"id",h="answerText"+n[0].id),l(c,"type","hidden"),J(v,"id",m="editor-answer"+n[0].id),J(v,"class","bg-light"),J(v,"input",b="answerText"+n[0].id),o.a=null,l(i,"class","mb-3"),l(Q,"for",K="answerHint"+n[0].id+"t"),l(Q,"class","form-label"),l(B,"id",A="answerHint"+n[0].id),l(B,"type","hidden"),J(O,"id",M="editor-answerHint"+n[0].id),J(O,"class","bg-light"),J(O,"input",q="answerHint"+n[0].id),H.a=X,l(Y,"id",x="answerHint"+n[0].id),l(Y,"class","form-text"),l(w,"class","mb-3"),l(e,"action","#"),l(e,"class","mt-3 mb-1 p-3 bg-light-subtle rounded")},m(r,p){E(r,e,p),a(e,i),a(i,s),a(s,t),a(i,_),a(i,c),Z(c,n[0].text),a(i,L),a(i,v),n[5](v),a(i,T),o.m(n[3],i),a(e,k),a(e,w),a(w,Q),a(Q,S),a(w,G),a(w,B),Z(B,n[0].hint),a(w,F),a(w,O),n[7](O),a(w,y),H.m(n[3],w),a(w,X),a(w,Y),a(Y,U),D||(N=[W(c,"input",n[4]),W(B,"input",n[6])],D=!0)},p(r,[p]){p&1&&u!==(u="answerText"+r[0].id)&&l(s,"for",u),p&1&&h!==(h="answerText"+r[0].id)&&l(c,"id",h),p&1&&Z(c,r[0].text),p&1&&m!==(m="editor-answer"+r[0].id)&&J(v,"id",m),p&1&&b!==(b="answerText"+r[0].id)&&J(v,"input",b),p&8&&o.p(r[3]),p&1&&K!==(K="answerHint"+r[0].id+"t")&&l(Q,"for",K),p&1&&A!==(A="answerHint"+r[0].id)&&l(B,"id",A),p&1&&Z(B,r[0].hint),p&1&&M!==(M="editor-answerHint"+r[0].id)&&J(O,"id",M),p&1&&q!==(q="answerHint"+r[0].id)&&J(O,"input",q),p&8&&H.p(r[3]),p&1&&x!==(x="answerHint"+r[0].id)&&l(Y,"id",x)},i:ce,o:ce,d(r){r&&C(e),n[5](null),n[7](null),D=!1,re(N)}}}function tt(n,e,i){let{answer:s}=e,t,u,_="";function c(o){o.addEventListener("trix-change",function(){i(0,s.text=document.getElementById("answerText"+s.id).value,s),i(0,s.hint=document.getElementById("answerHint"+s.id).value,s),i(3,_='<p class="text-end">Saving ...</p>'),L()}),o.toolbarElement.style.display="none",o.addEventListener("trix-focus",function(k){k.target.toolbarElement.style.display="block"}),o.addEventListener("trix-blur",function(k){k.target.toolbarElement.contains(document.activeElement)||(k.target.toolbarElement.style.display="none")})}var h;function L(){h&&h.cancel(),h=Fe(()=>{axios.put("/api/answers/"+s.id,s).then(function(o){i(3,_='<p class="text-end">Saved <span class="text-success-dark">&check;</span></p>')}).catch(function(o){i(3,_='<p class="text-end">Saving ... <span class="text-danger-dark">failed!</span></p>'),alert(o)})},500,{maxWait:2e3}),h()}function v(){s.text=this.value,i(0,s)}function m(o){se[o?"unshift":"push"](()=>{t=o,i(1,t)})}function b(){s.hint=this.value,i(0,s)}function T(o){se[o?"unshift":"push"](()=>{u=o,i(2,u)})}return n.$$set=o=>{"answer"in o&&i(0,s=o.answer)},n.$$.update=()=>{n.$$.dirty&2&&t&&c(t),n.$$.dirty&4&&u&&c(u)},[s,t,u,_,v,m,b,T]}class it extends De{constructor(e){super(),Ne(this,e,tt,et,me,{answer:0})}}function we(n,e,i){const s=n.slice();return s[41]=e[i],s[42]=e,s[43]=i,s}function ke(n,e,i){const s=n.slice();return s[44]=e[i],s}function ye(n,e,i){const s=n.slice();return s[47]=e[i],s}function qe(n){let e,i,s;return{c(){e=d("button"),e.textContent="Close editor",l(e,"type","button"),l(e,"class","btn btn-outline-secondary btn-sm")},m(t,u){E(t,e,u),i||(s=W(e,"click",ee(function(){je(n[2])&&n[2].apply(this,arguments)})),i=!0)},p(t,u){n=t},d(t){t&&C(e),i=!1,s()}}}function nt(n){let e,i,s,t,u,_,c,h,L,v=le(n[1]),m=[];for(let b=0;b<v.length;b+=1)m[b]=Ce(ye(n,v,b));return{c(){e=d("div"),i=d("div"),s=d("div"),s.innerHTML='<label for="case" class="col-form-label small fw-bold"><i class="bi bi-clipboard2-pulse"></i> CASE</label>',t=g(),u=d("div"),_=d("select"),c=d("option"),c.textContent="Select case";for(let b=0;b<m.length;b+=1)m[b].c();l(s,"class","col-auto"),c.__value="",Z(c,c.__value),l(_,"id","case"),l(_,"class","form-select"),n[9]===void 0&&Ge(()=>n[24].call(_)),l(u,"class","col-auto"),l(i,"class","row g-3 align-items-center"),l(e,"class","alert alert-light"),l(e,"role","alert")},m(b,T){E(b,e,T),a(e,i),a(i,s),a(i,t),a(i,u),a(u,_),a(_,c);for(let o=0;o<m.length;o+=1)m[o]&&m[o].m(_,null);fe(_,n[9],!0),h||(L=[W(_,"change",n[24]),W(_,"change",n[19])],h=!0)},p(b,T){if(T[0]&3){v=le(b[1]);let o;for(o=0;o<v.length;o+=1){const k=ye(b,v,o);m[o]?m[o].p(k,T):(m[o]=Ce(k),m[o].c(),m[o].m(_,null))}for(;o<m.length;o+=1)m[o].d(1);m.length=v.length}T[0]&514&&fe(_,b[9])},d(b){b&&C(e),Ze(m,b),h=!1,re(L)}}}function lt(n){let e,i,s,t,u=_e.sanitize(n[1].find(n[23]).text)+"",_,c,h,L,v;return{c(){e=d("div"),i=d("p"),i.innerHTML='<i class="bi bi-clipboard2-pulse"></i> CASE',s=g(),t=d("p"),_=g(),c=d("div"),h=d("button"),h.innerHTML='<i class="bi bi-trash"></i> Remove case',l(i,"class","small fw-bold"),l(e,"class","alert alert-light m-1"),l(e,"role","alert"),l(h,"type","button"),l(h,"class","btn btn-sm btn-light"),l(h,"title","Remove case"),l(c,"class","text-end m-1")},m(m,b){E(m,e,b),a(e,i),a(e,s),a(e,t),t.innerHTML=u,E(m,_,b),E(m,c,b),a(c,h),L||(v=W(h,"click",ee(n[20])),L=!0)},p(m,b){b[0]&3&&u!==(u=_e.sanitize(m[1].find(m[23]).text)+"")&&(t.innerHTML=u)},d(m){m&&(C(e),C(_),C(c)),L=!1,v()}}}function Ce(n){let e,i=ve.truncate(_e.sanitize(n[47].text,{ALLOWED_TAGS:[]}),{length:30})+"",s,t,u;return{c(){e=d("option"),s=ne(i),e.__value=t=n[47].id,Z(e,e.__value),e.selected=u=n[0].case_id==n[47].id},m(_,c){E(_,e,c),a(e,s)},p(_,c){c[0]&2&&i!==(i=ve.truncate(_e.sanitize(_[47].text,{ALLOWED_TAGS:[]}),{length:30})+"")&&We(s,i),c[0]&2&&t!==(t=_[47].id)&&(e.__value=t,Z(e,e.__value)),c[0]&3&&u!==(u=_[0].case_id==_[47].id)&&(e.selected=u)},d(_){_&&C(e)}}}function Ee(n){let e,i,s,t,u,_,c,h,L,v,m,b,T,o,k,w,Q,S,K,G,B,A,F,O,M,q,y,H,X,Y,U,x,D,N,r,p,z,ue,te,$,de,ie,oe,f;function I(R,j){if(R[5]&&R[0].case_id)return lt;if(R[5]&&R[1]&&R[1].length>0)return nt}let P=I(n),V=P&&P(n);return{c(){V&&V.c(),e=g(),i=d("div"),s=d("label"),s.textContent="Question text",t=g(),u=d("input"),_=g(),c=d("trix-editor"),h=g(),L=new ae(!1),v=g(),m=d("div"),b=d("label"),b.textContent="Question hint (optional)",T=g(),o=d("input"),k=g(),w=d("trix-editor"),Q=g(),S=new ae(!1),K=g(),G=d("div"),G.textContent="A hint that can be shown to the user if they are stuck.",B=g(),A=d("div"),F=d("label"),F.textContent="Question comment (optional)",O=g(),M=d("input"),q=g(),y=d("trix-editor"),H=g(),X=new ae(!1),Y=g(),U=d("div"),U.textContent=`A comment that will be shown once the user has answered the question.
                It can be used to explain the correct answer or provide additional
                information, for example sources.`,x=g(),D=d("div"),N=d("div"),r=d("input"),p=g(),z=d("label"),z.innerHTML='<i class="bi bi-cone-striped"></i> <strong>Invalid question</strong> - Is the answer unknown or disputed? Invalid questions remain in deck but are not counted into results.',ue=g(),te=d("div"),$=d("input"),de=g(),ie=d("label"),ie.innerHTML='<i class="bi bi-eraser-fill"></i> <strong>Needs review</strong> - Does this question need to be reviewed and improved? Questions marked for review remain in deck and are counted into results.',l(s,"for","questionText"),l(s,"class","form-label"),l(u,"id","questionText"),l(u,"type","hidden"),J(c,"id","editor-questionText"),J(c,"class","bg-light"),J(c,"input","questionText"),L.a=null,l(i,"class","mt-3 mb-3"),l(b,"for","questionHint"),l(b,"class","form-label"),l(o,"id","questionHint"),l(o,"type","hidden"),J(w,"id","editor-questionHint"),J(w,"class","bg-light"),J(w,"input","questionHint"),S.a=K,l(G,"id","questionHint"),l(G,"class","form-text"),l(m,"class","mt-3 mb-3"),l(F,"for","questionComment"),l(F,"class","form-label"),l(M,"id","questionComment"),l(M,"type","hidden"),J(y,"id","editor-questionComment"),J(y,"class","bg-light"),J(y,"input","questionComment"),X.a=Y,l(U,"id","questionHint"),l(U,"class","form-text"),l(A,"class","mt-3 mb-3"),l(r,"type","checkbox"),l(r,"class","form-check-input"),l(r,"id","checkInvalidQuestion"),l(z,"class","form-check-label"),l(z,"for","checkInvalidQuestion"),l(N,"class","form-check mb-3"),l($,"type","checkbox"),l($,"class","form-check-input"),l($,"id","checkNeedsReview"),l(ie,"class","form-check-label"),l(ie,"for","checkNeedsReview"),l(te,"class","form-check"),l(D,"class","mb-3 p-3 bg-light rounded")},m(R,j){V&&V.m(R,j),E(R,e,j),E(R,i,j),a(i,s),a(i,t),a(i,u),Z(u,n[0].text),a(i,_),a(i,c),n[26](c),a(i,h),L.m(n[10],i),E(R,v,j),E(R,m,j),a(m,b),a(m,T),a(m,o),Z(o,n[0].hint),a(m,k),a(m,w),n[28](w),a(m,Q),S.m(n[10],m),a(m,K),a(m,G),E(R,B,j),E(R,A,j),a(A,F),a(A,O),a(A,M),Z(M,n[0].comment),a(A,q),a(A,y),n[30](y),a(A,H),X.m(n[10],A),a(A,Y),a(A,U),E(R,x,j),E(R,D,j),a(D,N),a(N,r),r.checked=n[0].is_invalid,a(N,p),a(N,z),a(D,ue),a(D,te),a(te,$),$.checked=n[0].needs_review,a(te,de),a(te,ie),oe||(f=[W(u,"input",n[25]),W(o,"input",n[27]),W(M,"input",n[29]),W(r,"change",n[31]),W(r,"click",ee(n[21])),W($,"change",n[32]),W($,"click",ee(n[22]))],oe=!0)},p(R,j){P===(P=I(R))&&V?V.p(R,j):(V&&V.d(1),V=P&&P(R),V&&(V.c(),V.m(e.parentNode,e))),j[0]&1&&Z(u,R[0].text),j[0]&1024&&L.p(R[10]),j[0]&1&&Z(o,R[0].hint),j[0]&1024&&S.p(R[10]),j[0]&1&&Z(M,R[0].comment),j[0]&1024&&X.p(R[10]),j[0]&1&&(r.checked=R[0].is_invalid),j[0]&1&&($.checked=R[0].needs_review)},d(R){R&&(C(e),C(i),C(v),C(m),C(B),C(A),C(x),C(D)),V&&V.d(R),n[26](null),n[28](null),n[30](null),oe=!1,re(f)}}}function He(n){let e;return{c(){e=d("div"),e.innerHTML='<div class="alert alert-warning" role="alert">Don&#39;t forget to set the correct answer!</div>',l(e,"class","col")},m(i,s){E(i,e,s)},d(i){i&&C(e)}}}function Te(n){let e,i,s=n[44].comment+"",t;return{c(){e=d("div"),i=d("p"),t=ne(s),l(i,"class","card-text"),l(e,"class","card-body")},m(u,_){E(u,e,_),a(e,i),a(i,t)},p(u,_){_[0]&1&&s!==(s=u[44].comment+"")&&We(t,s)},d(u){u&&C(e)}}}function Le(n,e){let i,s,t,u,_,c,h,L,v,m,b;function T(){return e[33](e[44])}let o=e[44].comment&&Te(e);return{key:n,first:null,c(){i=d("div"),s=d("div"),t=d("div"),u=d("button"),u.innerHTML='<i class="bi bi-trash"></i>',_=g(),c=d("img"),L=g(),o&&o.c(),v=g(),l(u,"type","button"),l(u,"class","btn btn-sm btn-light"),l(t,"class","card-header bg-transparent"),he(c.src,h="/"+e[44].path)||l(c,"src",h),l(c,"class","card-img-top"),l(c,"alt",""),l(s,"class","card"),Je(s,"width","18rem"),l(i,"class","col"),this.first=i},m(k,w){E(k,i,w),a(i,s),a(s,t),a(t,u),a(s,_),a(s,c),a(s,L),o&&o.m(s,null),a(i,v),m||(b=W(u,"click",ee(T)),m=!0)},p(k,w){e=k,w[0]&1&&!he(c.src,h="/"+e[44].path)&&l(c,"src",h),e[44].comment?o?o.p(e,w):(o=Te(e),o.c(),o.m(s,null)):o&&(o.d(1),o=null)},d(k){k&&C(i),o&&o.d(),m=!1,b()}}}function Ae(n){let e,i,s,t,u;function _(){return n[35](n[41])}return{c(){e=d("button"),i=d("i"),l(i,"class","bi bi-check-lg"),l(e,"type","button"),l(e,"class",s="btn btn-sm "+(n[11]===n[41].id?"btn-success":"btn-light")),l(e,"title","Set as correct answer")},m(c,h){E(c,e,h),a(e,i),t||(u=W(e,"click",ee(_)),t=!0)},p(c,h){n=c,h[0]&2049&&s!==(s="btn btn-sm "+(n[11]===n[41].id?"btn-success":"btn-light"))&&l(e,"class",s)},d(c){c&&C(e),t=!1,u()}}}function Se(n,e){let i,s,t,u,_,c,h,L,v,m;function b(w){e[34](w,e[41],e[42],e[43])}let T={};e[41]!==void 0&&(T.answer=e[41]),s=new it({props:T}),se.push(()=>Ve(s,"answer",b));let o=e[0].type==="mc"&&Ae(e);function k(){return e[36](e[41])}return{key:n,first:null,c(){i=pe(),Ye(s.$$.fragment),u=g(),_=d("div"),o&&o.c(),c=g(),h=d("button"),h.innerHTML='<i class="bi bi-trash"></i>',l(h,"type","button"),l(h,"class","btn btn-sm btn-light"),l(h,"title","Delete answer"),l(_,"class","text-end mb-2"),this.first=i},m(w,Q){E(w,i,Q),Xe(s,w,Q),E(w,u,Q),E(w,_,Q),o&&o.m(_,null),a(_,c),a(_,h),L=!0,v||(m=W(h,"click",ee(k)),v=!0)},p(w,Q){e=w;const S={};!t&&Q[0]&1&&(t=!0,S.answer=e[41],Ue(()=>t=!1)),s.$set(S),e[0].type==="mc"?o?o.p(e,Q):(o=Ae(e),o.c(),o.m(_,c)):o&&(o.d(1),o=null)},i(w){L||(ze(s.$$.fragment,w),L=!0)},o(w){Be(s.$$.fragment,w),L=!1},d(w){w&&(C(i),C(u),C(_)),Ke(s,w),o&&o.d(),v=!1,m()}}}function Me(n){let e,i,s;return{c(){e=d("button"),e.textContent="Add answer",l(e,"class","btn btn-sm btn-primary")},m(t,u){E(t,e,u),i||(s=W(e,"click",n[16]),i=!0)},p:ce,d(t){t&&C(e),i=!1,s()}}}function Qe(n){let e,i,s,t,u,_,c,h,L,v,m,b,T,o,k,w,Q,S,K,G,B,A,F,O,M=(n[0].answers.length<=1||n[0].type==="card")&&Ie(n),q=n[3]&&Re(n);return{c(){e=d("div"),e.innerHTML='<div class="col"><div class="mt-5 mb-5 border-dark" style="border-bottom: dotted; border-width: 1px;"></div></div>',i=g(),s=d("div"),t=d("div"),u=d("span"),u.textContent="ID",_=g(),c=d("input"),L=g(),v=d("div"),m=d("div"),m.innerHTML='<label for="questionType" class="col-form-label fw-bold">Question type:</label>',b=g(),T=d("div"),o=d("select"),M&&M.c(),k=d("option"),w=ne("mc"),K=g(),G=d("div"),G.innerHTML=`<span id="questionTypeHelp" class="form-text">Can be either multiple choice (MC) or card (CARD). <strong>Card Questions
                    can have only one or no answer.</strong></span>`,B=g(),q&&q.c(),A=pe(),l(e,"class","row"),l(u,"class","input-group-text"),l(c,"type","text"),l(c,"class","form-control"),c.value=h=n[0].id,c.disabled=!0,c.readOnly=!0,l(t,"class","input-group mb-3"),l(m,"class","col-auto"),k.__value="mc",Z(k,k.__value),k.selected=Q=n[0].type=="mc",l(o,"id","questionType"),l(o,"class","form-select font-monospace text-uppercase"),o.disabled=S=n[0].answers.length>1,n[0].type===void 0&&Ge(()=>n[37].call(o)),l(T,"class","col-auto"),l(G,"class","col-auto"),l(v,"class","row g-3 align-items-center"),l(s,"class","alert alert-light"),l(s,"role","alert")},m(y,H){E(y,e,H),E(y,i,H),E(y,s,H),a(s,t),a(t,u),a(t,_),a(t,c),a(s,L),a(s,v),a(v,m),a(v,b),a(v,T),a(T,o),M&&M.m(o,null),a(o,k),a(k,w),fe(o,n[0].type,!0),a(v,K),a(v,G),E(y,B,H),q&&q.m(y,H),E(y,A,H),F||(O=[W(o,"change",n[37]),W(o,"change",n[18])],F=!0)},p(y,H){H[0]&1&&h!==(h=y[0].id)&&c.value!==h&&(c.value=h),y[0].answers.length<=1||y[0].type==="card"?M?M.p(y,H):(M=Ie(y),M.c(),M.m(o,k)):M&&(M.d(1),M=null),H[0]&1&&Q!==(Q=y[0].type=="mc")&&(k.selected=Q),H[0]&1&&S!==(S=y[0].answers.length>1)&&(o.disabled=S),H[0]&1&&fe(o,y[0].type),y[3]?q?q.p(y,H):(q=Re(y),q.c(),q.m(A.parentNode,A)):q&&(q.d(1),q=null)},d(y){y&&(C(e),C(i),C(s),C(B),C(A)),M&&M.d(),q&&q.d(y),F=!1,re(O)}}}function Ie(n){let e,i,s;return{c(){e=d("option"),i=ne("card"),e.__value="card",Z(e,e.__value),e.selected=s=n[0].type=="card"},m(t,u){E(t,e,u),a(e,i)},p(t,u){u[0]&1&&s!==(s=t[0].type=="card")&&(e.selected=s)},d(t){t&&C(e)}}}function Re(n){let e,i,s,t,u,_;return{c(){e=d("div"),i=d("p"),i.innerHTML="<strong>Delete question?</strong> Deleting a question will also delete all associated answers and images.",s=g(),t=d("button"),t.innerHTML='<i class="bi bi-trash"></i> Delete question',l(t,"type","button"),l(t,"class","btn btn-sm btn-danger"),l(e,"class","alert alert-light"),l(e,"role","alert")},m(c,h){E(c,e,h),a(e,i),a(e,s),a(e,t),u||(_=W(t,"click",ee(n[38])),u=!0)},p:ce,d(c){c&&C(e),u=!1,_()}}}function st(n){let e,i,s=n[0].id,t,u,_,c,h,L,v,m,b,T,o,k=[],w=new Map,Q,S=[],K=new Map,G,B,A,F,O,M,q=n[2]&&qe(n),y=Ee(n),H=!n[11]&&n[0].type==="mc"&&He(),X=le(n[0].images);const Y=r=>r[44].id;for(let r=0;r<X.length;r+=1){let p=ke(n,X,r),z=Y(p);w.set(z,k[r]=Le(z,p))}let U=le(n[0].answers);const x=r=>r[41].id;for(let r=0;r<U.length;r+=1){let p=we(n,U,r),z=x(p);K.set(z,S[r]=Se(z,p))}let D=(n[0].type==="mc"||n[0].answers.length===0)&&Me(n),N=n[4]&&Qe(n);return{c(){e=d("form"),q&&q.c(),i=g(),y.c(),t=g(),u=d("div"),_=d("label"),_.textContent="Add image",c=g(),h=d("input"),v=g(),m=d("div"),m.textContent="Supported formats are JPEG, PNG, and WebP.",b=g(),H&&H.c(),T=g(),o=d("div");for(let r=0;r<k.length;r+=1)k[r].c();Q=g();for(let r=0;r<S.length;r+=1)S[r].c();G=g(),D&&D.c(),B=g(),N&&N.c(),A=pe(),l(_,"for","image"),l(_,"class","form-label"),l(h,"class","form-control"),l(h,"type","file"),l(h,"accept","image/jpeg, image/png, image/webp"),l(h,"id",L="imageInput"+n[0].id),l(h,"name","image"),l(m,"id","imageHelp"),l(m,"class","form-text"),l(u,"class","mb-3"),l(e,"action","#"),l(e,"class","mt-3"),l(o,"class","row row-cols-1 row-cols-lg-3 g4")},m(r,p){E(r,e,p),q&&q.m(e,null),a(e,i),y.m(e,null),a(e,t),a(e,u),a(u,_),a(u,c),a(u,h),a(u,v),a(u,m),E(r,b,p),H&&H.m(r,p),E(r,T,p),E(r,o,p);for(let z=0;z<k.length;z+=1)k[z]&&k[z].m(o,null);E(r,Q,p);for(let z=0;z<S.length;z+=1)S[z]&&S[z].m(r,p);E(r,G,p),D&&D.m(r,p),E(r,B,p),N&&N.m(r,p),E(r,A,p),F=!0,O||(M=[W(h,"input",n[14]),W(e,"submit",ee(n[13]))],O=!0)},p(r,p){r[2]?q?q.p(r,p):(q=qe(r),q.c(),q.m(e,i)):q&&(q.d(1),q=null),p[0]&1&&me(s,s=r[0].id)?(y.d(1),y=Ee(r),y.c(),y.m(e,t)):y.p(r,p),(!F||p[0]&1&&L!==(L="imageInput"+r[0].id))&&l(h,"id",L),!r[11]&&r[0].type==="mc"?H||(H=He(),H.c(),H.m(T.parentNode,T)):H&&(H.d(1),H=null),p[0]&32769&&(X=le(r[0].images),k=ge(k,p,Y,1,r,X,w,o,xe,Le,null,ke)),p[0]&137217&&(U=le(r[0].answers),Oe(),S=ge(S,p,x,1,r,U,K,G.parentNode,$e,Se,G,we),Pe()),r[0].type==="mc"||r[0].answers.length===0?D?D.p(r,p):(D=Me(r),D.c(),D.m(B.parentNode,B)):D&&(D.d(1),D=null),r[4]?N?N.p(r,p):(N=Qe(r),N.c(),N.m(A.parentNode,A)):N&&(N.d(1),N=null)},i(r){if(!F){for(let p=0;p<U.length;p+=1)ze(S[p]);F=!0}},o(r){for(let p=0;p<S.length;p+=1)Be(S[p]);F=!1},d(r){r&&(C(e),C(b),C(T),C(o),C(Q),C(G),C(B),C(A)),q&&q.d(),y.d(r),H&&H.d(r);for(let p=0;p<k.length;p+=1)k[p].d();for(let p=0;p<S.length;p+=1)S[p].d(r);D&&D.d(r),N&&N.d(r),O=!1,re(M)}}}function ot(n,e,i){let s,{question:t}=e,{cases:u}=e,{toggleEditor:_}=e,{handleQuestionRemove:c}=e,{showConfigEditor:h=!1}=e,{showCaseSelector:L=!1}=e,v,m,b,T,o="";function k(f){f.addEventListener("trix-change",function(){i(0,t.text=document.getElementById("questionText").value,t),i(0,t.comment=document.getElementById("questionComment").value,t),i(0,t.hint=document.getElementById("questionHint").value,t),i(10,o='<p class="text-end">Saving ...</p>'),S()}),f.toolbarElement.style.display="none",f.addEventListener("trix-focus",function(I){I.target.toolbarElement.style.display="block"}),f.addEventListener("trix-blur",function(I){I.target.toolbarElement.contains(document.activeElement)||(I.target.toolbarElement.style.display="none")})}function w(f){f!==t.correct_answer_id&&(i(0,t.correct_answer_id=f,t),axios.put("/api/questions/"+t.id,t).then(function(I){}).catch(function(I){alert(I)}))}var Q;function S(){Q&&Q.cancel(),Q=Fe(()=>{axios.put("/api/questions/"+t.id,t).then(function(f){i(10,o='<p class="text-end">Saved <span class="text-success-dark">&check;</span></p>')}).catch(function(f){i(10,o='<p class="text-end">Saving ... <span class="text-danger-dark">failed!</span></p>'),alert(f)})},500,{maxWait:2e3}),Q()}function K(){var f=new FormData,I=document.getElementById("imageInput"+t.id);f.set("image",I.files[0]),axios.post("/api/questions/"+t.id+"/images",f,{headers:{"Content-Type":"multipart/form-data"}}).then(function(P){I.value="";var V=P.data;i(0,t.images=[...t.images,V],t)}).catch(function(P){I.value="",alert(P)})}function G(f){axios.delete("/api/images/"+f).then(function(I){i(0,t.images=t.images.filter(P=>P.id!==f),t)}).catch(function(I){alert(I)})}function B(){axios.post("/api/questions/"+t.id+"/answers",{}).then(function(f){i(0,t.answers=[...t.answers,f.data],t)}).catch(function(f){alert(f)})}function A(f){axios.delete("/api/answers/"+f).then(function(I){i(0,t.answers=t.answers.filter(P=>P.id!==f),t)}).catch(function(I){alert(I)})}function F(){axios.put("/api/questions/"+t.id,{type:t.type==="mc"?"mc":"card"}).then(function(f){i(0,t.type=f.data.type,t)}).catch(function(f){alert(f)})}function O(){axios.put("/api/questions/"+t.id,{case_id:T}).then(function(f){i(0,t.case_id=f.data.case_id,t);const I=u.find(P=>P.id===f.data.case_id);i(0,t.case=I,t),I.questions||(I.questions=[]),I.questions.push({id:t.id,case_id:I.id})}).catch(function(f){alert(f)})}function M(){axios.put("/api/questions/"+t.id,{case_id:null}).then(function(f){i(0,t.case_id=null,t),i(0,t.case=null,t),u.map(I=>{I.questions=I.questions.filter(P=>P.id!==t.id)})}).catch(function(f){alert(f)})}function q(){axios.put("/api/questions/"+t.id,{is_invalid:!t.is_invalid}).then(function(f){i(0,t.is_invalid=!t.is_invalid,t)}).catch(function(f){alert(f)})}function y(){axios.put("/api/questions/"+t.id,{needs_review:!t.needs_review}).then(function(f){i(0,t.needs_review=!t.needs_review,t)}).catch(function(f){alert(f)})}const H=f=>f.id===t.case_id;function X(){T=be(this),i(9,T),i(0,t),i(1,u)}function Y(){t.text=this.value,i(0,t)}function U(f){se[f?"unshift":"push"](()=>{v=f,i(6,v)})}function x(){t.hint=this.value,i(0,t)}function D(f){se[f?"unshift":"push"](()=>{b=f,i(8,b)})}function N(){t.comment=this.value,i(0,t)}function r(f){se[f?"unshift":"push"](()=>{m=f,i(7,m)})}function p(){t.is_invalid=this.checked,i(0,t)}function z(){t.needs_review=this.checked,i(0,t)}const ue=f=>{confirm("Are you sure you want to delete this image?")&&G(f.id)};function te(f,I,P,V){P[V]=f,i(0,t)}const $=f=>{w(f.id)},de=f=>{confirm("Are you sure you want to delete this answer?")&&A(f.id)};function ie(){t.type=be(this),i(0,t)}const oe=()=>{confirm("Are you sure you want to delete this question?")&&c(t.id)};return n.$$set=f=>{"question"in f&&i(0,t=f.question),"cases"in f&&i(1,u=f.cases),"toggleEditor"in f&&i(2,_=f.toggleEditor),"handleQuestionRemove"in f&&i(3,c=f.handleQuestionRemove),"showConfigEditor"in f&&i(4,h=f.showConfigEditor),"showCaseSelector"in f&&i(5,L=f.showCaseSelector)},n.$$.update=()=>{n.$$.dirty[0]&1&&i(11,s=t.correct_answer_id),n.$$.dirty[0]&64&&v&&k(v),n.$$.dirty[0]&128&&m&&k(m),n.$$.dirty[0]&256&&b&&k(b),n.$$.dirty[0]&1&&(t.case?i(9,T=t.case.id):i(9,T=""))},[t,u,_,c,h,L,v,m,b,T,o,s,w,S,K,G,B,A,F,O,M,q,y,H,X,Y,U,x,D,N,r,p,z,ue,te,$,de,ie,oe]}class ct extends De{constructor(e){super(),Ne(this,e,ot,st,me,{question:0,cases:1,toggleEditor:2,handleQuestionRemove:3,showConfigEditor:4,showCaseSelector:5},null,[-1,-1])}}export{ct as Q};
