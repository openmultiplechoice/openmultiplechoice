import{B as o,v as d,E as u}from"./if-DJ8jmZGH.js";function h(e,a,v=a){o(e,"input",l=>{var r=l?e.defaultValue:e.value;if(r=c(e)?f(r):r,v(r),r!==(r=a())){var _=e.selectionStart,n=e.selectionEnd;e.value=r??"",n!==null&&(e.selectionStart=_,e.selectionEnd=Math.min(n,e.value.length))}}),d(a)==null&&e.value&&v(c(e)?f(e.value):e.value),u(()=>{var l=a();c(e)&&l===f(e.value)||e.type==="date"&&!l&&!e.value||l!==e.value&&(e.value=l??"")})}function k(e,a,v=a){o(e,"change",l=>{var r=l?e.defaultChecked:e.checked;v(r)}),d(a)==null&&v(e.checked),u(()=>{var l=a();e.checked=!!l})}function c(e){var a=e.type;return a==="number"||a==="range"}function f(e){return e===""?null:+e}export{k as a,h as b};
