function l(t){const n=Object.prototype.toString.call(t);return t instanceof Date||typeof t=="object"&&n==="[object Date]"?new t.constructor(+t):typeof t=="number"||n==="[object Number]"||typeof t=="string"||n==="[object String]"?new Date(t):new Date(NaN)}function b(t,n){return t instanceof Date?new t.constructor(n):new Date(n)}const j=6048e5,R=864e5,Jt=6e4,$t=36e5,Ut=43200,zt=1440;let B={};function v(){return B}function D(t,n){var u,c,d,h;const e=v(),r=(n==null?void 0:n.weekStartsOn)??((c=(u=n==null?void 0:n.locale)==null?void 0:u.options)==null?void 0:c.weekStartsOn)??e.weekStartsOn??((h=(d=e.locale)==null?void 0:d.options)==null?void 0:h.weekStartsOn)??0,a=l(t),i=a.getDay(),s=(i<r?7:0)+i-r;return a.setDate(a.getDate()-s),a.setHours(0,0,0,0),a}function W(t){return D(t,{weekStartsOn:1})}function L(t){const n=l(t),e=n.getFullYear(),r=b(t,0);r.setFullYear(e+1,0,4),r.setHours(0,0,0,0);const a=W(r),i=b(t,0);i.setFullYear(e,0,4),i.setHours(0,0,0,0);const s=W(i);return n.getTime()>=a.getTime()?e+1:n.getTime()>=s.getTime()?e:e-1}function p(t){const n=l(t);return n.setHours(0,0,0,0),n}function q(t){const n=l(t),e=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds()));return e.setUTCFullYear(n.getFullYear()),+t-+e}function A(t,n){const e=p(t),r=p(n),a=+e-q(e),i=+r-q(r);return Math.round((a-i)/R)}function I(t){const n=L(t),e=b(t,0);return e.setFullYear(n,0,4),e.setHours(0,0,0,0),W(e)}function V(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}function J(t){if(!V(t)&&typeof t!="number")return!1;const n=l(t);return!isNaN(Number(n))}function $(t){const n=l(t),e=b(t,0);return e.setFullYear(n.getFullYear(),0,1),e.setHours(0,0,0,0),e}const U={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},z=(t,n,e)=>{let r;const a=U[t];return typeof a=="string"?r=a:n===1?r=a.one:r=a.other.replace("{{count}}",n.toString()),e!=null&&e.addSuffix?e.comparison&&e.comparison>0?"in "+r:r+" ago":r};function Y(t){return(n={})=>{const e=n.width?String(n.width):t.defaultWidth;return t.formats[e]||t.formats[t.defaultWidth]}}const K={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},Z={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},tt={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},et={date:Y({formats:K,defaultWidth:"full"}),time:Y({formats:Z,defaultWidth:"full"}),dateTime:Y({formats:tt,defaultWidth:"full"})},nt={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},rt=(t,n,e,r)=>nt[t];function k(t){return(n,e)=>{const r=e!=null&&e.context?String(e.context):"standalone";let a;if(r==="formatting"&&t.formattingValues){const s=t.defaultFormattingWidth||t.defaultWidth,u=e!=null&&e.width?String(e.width):s;a=t.formattingValues[u]||t.formattingValues[s]}else{const s=t.defaultWidth,u=e!=null&&e.width?String(e.width):t.defaultWidth;a=t.values[u]||t.values[s]}const i=t.argumentCallback?t.argumentCallback(n):n;return a[i]}}const at={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},it={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},ot={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},st={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},ut={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},ct={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},dt=(t,n)=>{const e=Number(t),r=e%100;if(r>20||r<10)switch(r%10){case 1:return e+"st";case 2:return e+"nd";case 3:return e+"rd"}return e+"th"},ft={ordinalNumber:dt,era:k({values:at,defaultWidth:"wide"}),quarter:k({values:it,defaultWidth:"wide",argumentCallback:t=>t-1}),month:k({values:ot,defaultWidth:"wide"}),day:k({values:st,defaultWidth:"wide"}),dayPeriod:k({values:ut,defaultWidth:"wide",formattingValues:ct,defaultFormattingWidth:"wide"})};function x(t){return(n,e={})=>{const r=e.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],i=n.match(a);if(!i)return null;const s=i[0],u=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],c=Array.isArray(u)?mt(u,g=>g.test(s)):ht(u,g=>g.test(s));let d;d=t.valueCallback?t.valueCallback(c):c,d=e.valueCallback?e.valueCallback(d):d;const h=n.slice(s.length);return{value:d,rest:h}}}function ht(t,n){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&n(t[e]))return e}function mt(t,n){for(let e=0;e<t.length;e++)if(n(t[e]))return e}function lt(t){return(n,e={})=>{const r=n.match(t.matchPattern);if(!r)return null;const a=r[0],i=n.match(t.parsePattern);if(!i)return null;let s=t.valueCallback?t.valueCallback(i[0]):i[0];s=e.valueCallback?e.valueCallback(s):s;const u=n.slice(a.length);return{value:s,rest:u}}}const gt=/^(\d+)(th|st|nd|rd)?/i,wt=/\d+/i,yt={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},bt={any:[/^b/i,/^(a|c)/i]},Mt={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Pt={any:[/1/i,/2/i,/3/i,/4/i]},Ot={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},kt={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},xt={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Dt={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Wt={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},vt={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},St={ordinalNumber:lt({matchPattern:gt,parsePattern:wt,valueCallback:t=>parseInt(t,10)}),era:x({matchPatterns:yt,defaultMatchWidth:"wide",parsePatterns:bt,defaultParseWidth:"any"}),quarter:x({matchPatterns:Mt,defaultMatchWidth:"wide",parsePatterns:Pt,defaultParseWidth:"any",valueCallback:t=>t+1}),month:x({matchPatterns:Ot,defaultMatchWidth:"wide",parsePatterns:kt,defaultParseWidth:"any"}),day:x({matchPatterns:xt,defaultMatchWidth:"wide",parsePatterns:Dt,defaultParseWidth:"any"}),dayPeriod:x({matchPatterns:Wt,defaultMatchWidth:"any",parsePatterns:vt,defaultParseWidth:"any"})},Yt={code:"en-US",formatDistance:z,formatLong:et,formatRelative:rt,localize:ft,match:St,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Tt(t){const n=l(t);return A(n,$(n))+1}function Et(t){const n=l(t),e=+W(n)-+I(n);return Math.round(e/j)+1}function _(t,n){var h,g,P,O;const e=l(t),r=e.getFullYear(),a=v(),i=(n==null?void 0:n.firstWeekContainsDate)??((g=(h=n==null?void 0:n.locale)==null?void 0:h.options)==null?void 0:g.firstWeekContainsDate)??a.firstWeekContainsDate??((O=(P=a.locale)==null?void 0:P.options)==null?void 0:O.firstWeekContainsDate)??1,s=b(t,0);s.setFullYear(r+1,0,i),s.setHours(0,0,0,0);const u=D(s,n),c=b(t,0);c.setFullYear(r,0,i),c.setHours(0,0,0,0);const d=D(c,n);return e.getTime()>=u.getTime()?r+1:e.getTime()>=d.getTime()?r:r-1}function Ft(t,n){var u,c,d,h;const e=v(),r=(n==null?void 0:n.firstWeekContainsDate)??((c=(u=n==null?void 0:n.locale)==null?void 0:u.options)==null?void 0:c.firstWeekContainsDate)??e.firstWeekContainsDate??((h=(d=e.locale)==null?void 0:d.options)==null?void 0:h.firstWeekContainsDate)??1,a=_(t,n),i=b(t,0);return i.setFullYear(a,0,r),i.setHours(0,0,0,0),D(i,n)}function Ct(t,n){const e=l(t),r=+D(e,n)-+Ft(e,n);return Math.round(r/j)+1}function o(t,n){const e=t<0?"-":"",r=Math.abs(t).toString().padStart(n,"0");return e+r}const w={y(t,n){const e=t.getFullYear(),r=e>0?e:1-e;return o(n==="yy"?r%100:r,n.length)},M(t,n){const e=t.getMonth();return n==="M"?String(e+1):o(e+1,2)},d(t,n){return o(t.getDate(),n.length)},a(t,n){const e=t.getHours()/12>=1?"pm":"am";switch(n){case"a":case"aa":return e.toUpperCase();case"aaa":return e;case"aaaaa":return e[0];case"aaaa":default:return e==="am"?"a.m.":"p.m."}},h(t,n){return o(t.getHours()%12||12,n.length)},H(t,n){return o(t.getHours(),n.length)},m(t,n){return o(t.getMinutes(),n.length)},s(t,n){return o(t.getSeconds(),n.length)},S(t,n){const e=n.length,r=t.getMilliseconds(),a=Math.trunc(r*Math.pow(10,e-3));return o(a,n.length)}},M={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},N={G:function(t,n,e){const r=t.getFullYear()>0?1:0;switch(n){case"G":case"GG":case"GGG":return e.era(r,{width:"abbreviated"});case"GGGGG":return e.era(r,{width:"narrow"});case"GGGG":default:return e.era(r,{width:"wide"})}},y:function(t,n,e){if(n==="yo"){const r=t.getFullYear(),a=r>0?r:1-r;return e.ordinalNumber(a,{unit:"year"})}return w.y(t,n)},Y:function(t,n,e,r){const a=_(t,r),i=a>0?a:1-a;if(n==="YY"){const s=i%100;return o(s,2)}return n==="Yo"?e.ordinalNumber(i,{unit:"year"}):o(i,n.length)},R:function(t,n){const e=L(t);return o(e,n.length)},u:function(t,n){const e=t.getFullYear();return o(e,n.length)},Q:function(t,n,e){const r=Math.ceil((t.getMonth()+1)/3);switch(n){case"Q":return String(r);case"QQ":return o(r,2);case"Qo":return e.ordinalNumber(r,{unit:"quarter"});case"QQQ":return e.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return e.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return e.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,n,e){const r=Math.ceil((t.getMonth()+1)/3);switch(n){case"q":return String(r);case"qq":return o(r,2);case"qo":return e.ordinalNumber(r,{unit:"quarter"});case"qqq":return e.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return e.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return e.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,n,e){const r=t.getMonth();switch(n){case"M":case"MM":return w.M(t,n);case"Mo":return e.ordinalNumber(r+1,{unit:"month"});case"MMM":return e.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return e.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return e.month(r,{width:"wide",context:"formatting"})}},L:function(t,n,e){const r=t.getMonth();switch(n){case"L":return String(r+1);case"LL":return o(r+1,2);case"Lo":return e.ordinalNumber(r+1,{unit:"month"});case"LLL":return e.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return e.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return e.month(r,{width:"wide",context:"standalone"})}},w:function(t,n,e,r){const a=Ct(t,r);return n==="wo"?e.ordinalNumber(a,{unit:"week"}):o(a,n.length)},I:function(t,n,e){const r=Et(t);return n==="Io"?e.ordinalNumber(r,{unit:"week"}):o(r,n.length)},d:function(t,n,e){return n==="do"?e.ordinalNumber(t.getDate(),{unit:"date"}):w.d(t,n)},D:function(t,n,e){const r=Tt(t);return n==="Do"?e.ordinalNumber(r,{unit:"dayOfYear"}):o(r,n.length)},E:function(t,n,e){const r=t.getDay();switch(n){case"E":case"EE":case"EEE":return e.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return e.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return e.day(r,{width:"short",context:"formatting"});case"EEEE":default:return e.day(r,{width:"wide",context:"formatting"})}},e:function(t,n,e,r){const a=t.getDay(),i=(a-r.weekStartsOn+8)%7||7;switch(n){case"e":return String(i);case"ee":return o(i,2);case"eo":return e.ordinalNumber(i,{unit:"day"});case"eee":return e.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return e.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return e.day(a,{width:"short",context:"formatting"});case"eeee":default:return e.day(a,{width:"wide",context:"formatting"})}},c:function(t,n,e,r){const a=t.getDay(),i=(a-r.weekStartsOn+8)%7||7;switch(n){case"c":return String(i);case"cc":return o(i,n.length);case"co":return e.ordinalNumber(i,{unit:"day"});case"ccc":return e.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return e.day(a,{width:"narrow",context:"standalone"});case"cccccc":return e.day(a,{width:"short",context:"standalone"});case"cccc":default:return e.day(a,{width:"wide",context:"standalone"})}},i:function(t,n,e){const r=t.getDay(),a=r===0?7:r;switch(n){case"i":return String(a);case"ii":return o(a,n.length);case"io":return e.ordinalNumber(a,{unit:"day"});case"iii":return e.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return e.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return e.day(r,{width:"short",context:"formatting"});case"iiii":default:return e.day(r,{width:"wide",context:"formatting"})}},a:function(t,n,e){const a=t.getHours()/12>=1?"pm":"am";switch(n){case"a":case"aa":return e.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return e.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return e.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return e.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,n,e){const r=t.getHours();let a;switch(r===12?a=M.noon:r===0?a=M.midnight:a=r/12>=1?"pm":"am",n){case"b":case"bb":return e.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return e.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return e.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return e.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,n,e){const r=t.getHours();let a;switch(r>=17?a=M.evening:r>=12?a=M.afternoon:r>=4?a=M.morning:a=M.night,n){case"B":case"BB":case"BBB":return e.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return e.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return e.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,n,e){if(n==="ho"){let r=t.getHours()%12;return r===0&&(r=12),e.ordinalNumber(r,{unit:"hour"})}return w.h(t,n)},H:function(t,n,e){return n==="Ho"?e.ordinalNumber(t.getHours(),{unit:"hour"}):w.H(t,n)},K:function(t,n,e){const r=t.getHours()%12;return n==="Ko"?e.ordinalNumber(r,{unit:"hour"}):o(r,n.length)},k:function(t,n,e){let r=t.getHours();return r===0&&(r=24),n==="ko"?e.ordinalNumber(r,{unit:"hour"}):o(r,n.length)},m:function(t,n,e){return n==="mo"?e.ordinalNumber(t.getMinutes(),{unit:"minute"}):w.m(t,n)},s:function(t,n,e){return n==="so"?e.ordinalNumber(t.getSeconds(),{unit:"second"}):w.s(t,n)},S:function(t,n){return w.S(t,n)},X:function(t,n,e){const r=t.getTimezoneOffset();if(r===0)return"Z";switch(n){case"X":return Q(r);case"XXXX":case"XX":return y(r);case"XXXXX":case"XXX":default:return y(r,":")}},x:function(t,n,e){const r=t.getTimezoneOffset();switch(n){case"x":return Q(r);case"xxxx":case"xx":return y(r);case"xxxxx":case"xxx":default:return y(r,":")}},O:function(t,n,e){const r=t.getTimezoneOffset();switch(n){case"O":case"OO":case"OOO":return"GMT"+H(r,":");case"OOOO":default:return"GMT"+y(r,":")}},z:function(t,n,e){const r=t.getTimezoneOffset();switch(n){case"z":case"zz":case"zzz":return"GMT"+H(r,":");case"zzzz":default:return"GMT"+y(r,":")}},t:function(t,n,e){const r=Math.trunc(t.getTime()/1e3);return o(r,n.length)},T:function(t,n,e){const r=t.getTime();return o(r,n.length)}};function H(t,n=""){const e=t>0?"-":"+",r=Math.abs(t),a=Math.trunc(r/60),i=r%60;return i===0?e+String(a):e+String(a)+n+o(i,2)}function Q(t,n){return t%60===0?(t>0?"-":"+")+o(Math.abs(t)/60,2):y(t,n)}function y(t,n=""){const e=t>0?"-":"+",r=Math.abs(t),a=o(Math.trunc(r/60),2),i=o(r%60,2);return e+a+n+i}const X=(t,n)=>{switch(t){case"P":return n.date({width:"short"});case"PP":return n.date({width:"medium"});case"PPP":return n.date({width:"long"});case"PPPP":default:return n.date({width:"full"})}},G=(t,n)=>{switch(t){case"p":return n.time({width:"short"});case"pp":return n.time({width:"medium"});case"ppp":return n.time({width:"long"});case"pppp":default:return n.time({width:"full"})}},pt=(t,n)=>{const e=t.match(/(P+)(p+)?/)||[],r=e[1],a=e[2];if(!a)return X(t,n);let i;switch(r){case"P":i=n.dateTime({width:"short"});break;case"PP":i=n.dateTime({width:"medium"});break;case"PPP":i=n.dateTime({width:"long"});break;case"PPPP":default:i=n.dateTime({width:"full"});break}return i.replace("{{date}}",X(r,n)).replace("{{time}}",G(a,n))},qt={p:G,P:pt},Nt=/^D+$/,Ht=/^Y+$/,Qt=["D","DD","YY","YYYY"];function Xt(t){return Nt.test(t)}function jt(t){return Ht.test(t)}function Lt(t,n,e){const r=_t(t,n,e);if(console.warn(r),Qt.includes(t))throw new RangeError(r)}function _t(t,n,e){const r=t[0]==="Y"?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${n}\`) for formatting ${r} to the input \`${e}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const Gt=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Rt=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Bt=/^'([^]*?)'?$/,At=/''/g,It=/[a-zA-Z]/;function Kt(t,n,e){var h,g,P,O,T,E,F,C;const r=v(),a=(e==null?void 0:e.locale)??r.locale??Yt,i=(e==null?void 0:e.firstWeekContainsDate)??((g=(h=e==null?void 0:e.locale)==null?void 0:h.options)==null?void 0:g.firstWeekContainsDate)??r.firstWeekContainsDate??((O=(P=r.locale)==null?void 0:P.options)==null?void 0:O.firstWeekContainsDate)??1,s=(e==null?void 0:e.weekStartsOn)??((E=(T=e==null?void 0:e.locale)==null?void 0:T.options)==null?void 0:E.weekStartsOn)??r.weekStartsOn??((C=(F=r.locale)==null?void 0:F.options)==null?void 0:C.weekStartsOn)??0,u=l(t);if(!J(u))throw new RangeError("Invalid time value");let c=n.match(Rt).map(m=>{const f=m[0];if(f==="p"||f==="P"){const S=qt[f];return S(m,a.formatLong)}return m}).join("").match(Gt).map(m=>{if(m==="''")return{isToken:!1,value:"'"};const f=m[0];if(f==="'")return{isToken:!1,value:Vt(m)};if(N[f])return{isToken:!0,value:m};if(f.match(It))throw new RangeError("Format string contains an unescaped latin alphabet character `"+f+"`");return{isToken:!1,value:m}});a.localize.preprocessor&&(c=a.localize.preprocessor(u,c));const d={firstWeekContainsDate:i,weekStartsOn:s,locale:a};return c.map(m=>{if(!m.isToken)return m.value;const f=m.value;(!(e!=null&&e.useAdditionalWeekYearTokens)&&jt(f)||!(e!=null&&e.useAdditionalDayOfYearTokens)&&Xt(f))&&Lt(f,n,String(t));const S=N[f[0]];return S(u,f,a.localize,d)}).join("")}function Vt(t){const n=t.match(Bt);return n?n[1].replace(At,"'"):t}export{Ut as a,v as b,$t as c,Jt as d,Yt as e,Kt as f,q as g,zt as m,l as t};
