import{r as q,x as z,w as B}from"./index-CovtvcR3.js";function E(n){return(n==null?void 0:n.length)!==void 0?n:Array.from(n)}function F(n,f){n.d(1),f.delete(n.key)}function G(n,f){z(n,1,1,()=>{f.delete(n.key)})}function H(n,f,S,C,k,g,h,A,p,_,o,j){let i=n.length,d=g.length,c=i;const u={};for(;c--;)u[n[c].key]=c;const l=[],a=new Map,y=new Map,M=[];for(c=d;c--;){const e=j(k,g,c),s=S(e);let t=h.get(s);t?M.push(()=>t.p(e,f)):(t=_(s,e),t.c()),a.set(s,l[c]=t),s in u&&y.set(s,Math.abs(c-u[s]))}const v=new Set,x=new Set;function m(e){B(e,1),e.m(A,o),h.set(e.key,e),o=e.first,d--}for(;i&&d;){const e=l[d-1],s=n[i-1],t=e.key,w=s.key;e===s?(o=e.first,i--,d--):a.has(w)?!h.has(t)||v.has(t)?m(e):x.has(w)?i--:y.get(t)>y.get(w)?(x.add(t),m(e)):(v.add(w),i--):(p(s,h),i--)}for(;i--;){const e=n[i];a.has(e.key)||p(e,h)}for(;d;)m(l[d-1]);return q(M),l}export{F as d,E as e,G as o,H as u};