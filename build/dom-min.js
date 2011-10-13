/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Oct 13 20:36
*/
KISSY.add("dom/attr",function(q,a,u,w){function x(g,c){c=B[c]||c;var d=C[c];return d&&d.get?d.get(g,c):g[c]}u=document.documentElement;var z=!u.hasAttribute,E=u.textContent===w?"innerText":"textContent",p=a._nodeName,n=a._isElementNode,r=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,s=/^(?:button|input|object|select|textarea)$/i,l=/^a(?:rea)?$/i,k=/:|^on/,j=/\r/g,o={},t={val:1,css:1,html:1,text:1,data:1,width:1,height:1,
offset:1},y={tabindex:{get:function(g){var c=g.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(g.nodeName)||l.test(g.nodeName)&&g.href?0:w}},style:{get:function(g){return g.style.cssText},set:function(g,c){g.style.cssText=c}}},B={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},
A={get:function(g,c){return a.prop(g,c)?c.toLowerCase():w},set:function(g,c,d){if(c===false)a.removeAttr(g,d);else{c=B[d]||d;if(c in g)g[c]=true;g.setAttribute(d,d.toLowerCase())}return d}},C={},F={},G={option:{get:function(g){var c=g.attributes.value;return!c||c.specified?g.value:g.text}},select:{get:function(g){var c=g.selectedIndex,d=g.options;g=g.type==="select-one";if(c<0)return null;else if(g)return a.val(d[c]);c=[];g=0;for(var f=d.length;g<f;++g)d[g].selected&&c.push(a.val(d[g]));return c},
set:function(g,c){var d=q.makeArray(c);q.each(g.options,function(f){f.selected=q.inArray(a.val(f),d)});if(!d.length)g.selectedIndex=-1;return d}}};if(z){F={get:function(g,c){var d;return(d=g.getAttributeNode(c))&&d.nodeValue!==""?d.nodeValue:w},set:function(g,c,d){var f=g.getAttributeNode(d);if(f)f.nodeValue=c;else try{var i=g.ownerDocument.createAttribute(d);i.value=c;g.setAttributeNode(i)}catch(b){return g.setAttribute(d,c,0)}}};o=B;y.tabIndex=y.tabindex;q.each(["href","src","width","height","colSpan",
"rowSpan"],function(g){y[g]={get:function(c){c=c.getAttribute(g,2);return c===null?w:c}}});G.button=y.value=F}q.each(["radio","checkbox"],function(g){G[g]={get:function(c){return c.getAttribute("value")===null?"on":c.value},set:function(c,d){if(q.isArray(d))return c.checked=q.inArray(a.val(c),d)}}});q.mix(a,{prop:function(g,c,d){if(q.isPlainObject(c))for(var f in c)a.prop(g,f,c[f]);else{g=a.query(g);c=B[c]||c;var i=C[c];if(d!==w)g.each(function(b){if(i&&i.set)i.set(b,d,c);else b[c]=d});else if(g.length)return x(g[0],
c)}},hasProp:function(g,c){for(var d=a.query(g),f=0;f<d.length;f++)if(x(d[f],c)!==w)return true;return false},removeProp:function(g,c){c=B[c]||c;a.query(g).each(function(d){try{d[c]=w;delete d[c]}catch(f){}})},attr:function(g,c,d,f){if(q.isPlainObject(c)){f=d;for(var i in c)a.attr(g,i,c[i],f)}else if(c=q.trim(c)){c=c.toLowerCase();if(f&&t[c])return a[c](g,d);c=o[c]||c;var b;b=r.test(c)?A:k.test(c)?F:y[c];if(d===w){g=a.get(g);if(n(g)){if(p(g,"form"))b=F;if(b&&b.get)return b.get(g,c);g=g.getAttribute(c);
return g===null?w:g}}else a.query(g).each(function(e){if(n(e)){var h=b;if(p(e,"form"))h=F;h&&h.set?h.set(e,d,c):e.setAttribute(c,""+d)}})}},removeAttr:function(g,c){c=c.toLowerCase();c=o[c]||c;a.query(g).each(function(d){if(n(d)){var f;d.removeAttribute(c);if(r.test(c)&&(f=B[c]||c)in d)d[f]=false}})},hasAttr:z?function(g,c){c=c.toLowerCase();for(var d=a.query(g),f=0;f<d.length;f++){var i=d[f].getAttributeNode(c);if(i&&i.specified)return true}return false}:function(g,c){for(var d=a.query(g),f=0;f<
d.length;f++)if(d[f].hasAttribute(c))return true;return false},val:function(g,c){var d,f;if(c===w){var i=a.get(g);if(i){if((d=G[i.nodeName.toLowerCase()]||G[i.type])&&"get"in d&&(f=d.get(i,"value"))!==w)return f;f=i.value;return typeof f==="string"?f.replace(j,""):q.isNullOrUndefined(f)?"":f}}else a.query(g).each(function(b){if(b.nodeType===1){var e=c;if(q.isNullOrUndefined(e))e="";else if(typeof e==="number")e+="";else if(q.isArray(e))e=q.map(e,function(h){return q.isNullOrUndefined(e)?"":h+""});
d=G[b.nodeName.toLowerCase()]||G[b.type];if(!d||!("set"in d)||d.set(b,e,"value")===w)b.value=e}})},text:function(g,c){if(c===w){var d=a.get(g);if(n(d))return d[E]||"";else if(a._nodeTypeIs(d,a.TEXT_NODE))return d.nodeValue;return w}else a.query(g).each(function(f){if(n(f))f[E]=c;else if(a._nodeTypeIs(f,a.TEXT_NODE))f.nodeValue=c})}});return a},{requires:["./base","ua"]});
KISSY.add("dom/base",function(q,a){function u(x,z){return x&&x.nodeType===z}var w={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12,_isElementNode:function(x){return u(x,w.ELEMENT_NODE)},_getWin:function(x){return x&&"scrollTo"in x&&x.document?x:u(x,w.DOCUMENT_NODE)?x.defaultView||x.parentWindow:x===a||x===null?window:false},
_nodeTypeIs:u,_isNodeList:function(x){return x&&!x.nodeType&&x.item&&!x.setTimeout},_nodeName:function(x,z){return x&&x.nodeName.toLowerCase()===z.toLowerCase()}};return w});
KISSY.add("dom/class",function(q,a,u){function w(n){return(z+n+z).replace(p,z)}function x(n,r,s,l){if(!(r=q.trim(r)))return l?false:u;n=a.query(n);var k=n.length,j=r.split(E);r=[];for(var o=0;o<j.length;o++){var t=q.trim(j[o]);t&&r.push(t)}for(o=0;o<k;o++){j=n[o];if(a._isElementNode(j)){j=s(j,r,r.length);if(j!==u)return j}}if(l)return false;return u}var z=" ",E=/[\.\s]\s*\.?/,p=/[\n\t]/g;q.mix(a,{__hasClass:function(n,r){var s=n.className;if(s){s=w(s);return s.indexOf(z+r+z)>-1}else return false},
hasClass:function(n,r){return x(n,r,function(s,l,k){if(s=s.className){s=w(s);for(var j=0,o=true;j<k;j++)if(s.indexOf(z+l[j]+z)<0){o=false;break}if(o)return true}},true)},addClass:function(n,r){x(n,r,function(s,l,k){var j=s.className;if(j){var o=w(j);j=j;for(var t=0;t<k;t++)if(o.indexOf(z+l[t]+z)<0)j+=z+l[t];s.className=q.trim(j)}else s.className=r},u)},removeClass:function(n,r){x(n,r,function(s,l,k){var j=s.className;if(j)if(k){j=w(j);for(var o=0,t;o<k;o++)for(t=z+l[o]+z;j.indexOf(t)>=0;)j=j.replace(t,
z);s.className=q.trim(j)}else s.className=""},u)},replaceClass:function(n,r,s){a.removeClass(n,r);a.addClass(n,s)},toggleClass:function(n,r,s){var l=q.isBoolean(s),k;x(n,r,function(j,o,t){for(var y=0,B;y<t;y++){B=o[y];k=l?!s:a.hasClass(j,B);a[k?"removeClass":"addClass"](j,B)}},u)}});return a},{requires:["dom/base"]});
KISSY.add("dom/create",function(q,a,u,w){function x(g,c,d){if(s(c,a.DOCUMENT_FRAGMENT_NODE)){c=c.childNodes;d=d.childNodes;for(var f=0;c[f];){d[f]&&x(g,c[f],d[f]);f++}}else if(l(c)){c=c.getElementsByTagName("*");d=d.getElementsByTagName("*");for(f=0;c[f];){d[f]&&g(c[f],d[f]);f++}}}function z(g,c){var d=q.require("event");if(!(l(c)&&!a.hasData(g))){var f=a.data(g),i;for(i in f)a.data(c,i,f[i]);if(d){d._removeData(c);d._clone(g,c)}}}function E(g,c){c.clearAttributes&&c.clearAttributes();c.mergeAttributes&&
c.mergeAttributes(g);var d=c.nodeName.toLowerCase(),f=g.childNodes;if(d==="object"&&!c.childNodes.length)for(d=0;d<f.length;d++)c.appendChild(f[d].cloneNode(true));else if(d==="input"&&(g.type==="checkbox"||g.type==="radio")){if(g.checked)c.defaultChecked=c.checked=g.checked;if(c.value!==g.value)c.value=g.value}else if(d==="option")c.selected=g.defaultSelected;else if(d==="input"||d==="textarea")c.defaultValue=g.defaultValue;c.removeAttribute(a.__EXPANDO)}function p(g,c){var d=null,f,i;if(g&&(g.push||
g.item)&&g[0]){c=c||g[0].ownerDocument;d=c.createDocumentFragment();g=q.makeArray(g);f=0;for(i=g.length;f<i;f++)d.appendChild(g[f])}return d}var n=document,r=u.ie,s=a._nodeTypeIs,l=a._isElementNode,k=n.createElement("div"),j=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,o=/<(\w+)/,t=/^\s+/,y=/<|&#?\w+;/,B=/^<(\w+)\s*\/?>(?:<\/\1>)?$/;q.mix(a,{create:function(g,c,d,f){if(l(g)||s(g,a.TEXT_NODE))return a.clone(g);var i=null;if(!q.isString(g))return i;if(f===w)f=true;if(f)g=
q.trim(g);if(!g)return i;f=a._creators;var b,e;d=d||n;var h,m="div";if(y.test(g))if(h=B.exec(g))i=d.createElement(h[1]);else{g=g.replace(j,"<$1></$2>");if((h=o.exec(g))&&(b=h[1]))m=b.toLowerCase();b=(f[m]||f.div)(g,d);if(r&&r<9&&(e=g.match(t)))b.insertBefore(d.createTextNode(e[0]),b.firstChild);g=b.childNodes;if(g.length===1)i=g[0].parentNode.removeChild(g[0]);else if(g.length)i=p(g,d)}else i=d.createTextNode(g);i=i;if(q.isPlainObject(c))if(l(i))a.attr(i,c,true);else s(i,a.DOCUMENT_FRAGMENT_NODE)&&
a.attr(i.childNodes,c,true);return i},_creators:{div:function(g,c){var d=c&&c!=n?c.createElement("div"):k;d.innerHTML="m<div>"+g+"</div>";return d.lastChild}},html:function(g,c,d,f){g=a.query(g);var i=g[0];if(i)if(c===w)return l(i)?i.innerHTML:null;else{if(q.isString(c))c=a.create(c,0,i.ownerDocument,false);g.each(function(b){if(l(b)){a.empty(b);a.append(c,b,d)}});f&&f()}},remove:function(g,c){a.query(g).each(function(d){if(!c&&l(d)){var f=q.require("event");if(f){f.detach(d.getElementsByTagName("*"));
f.detach(d)}a.removeData(d.getElementsByTagName("*"));a.removeData(d)}d.parentNode&&d.parentNode.removeChild(d)})},clone:function(g,c,d,f){g=a.get(g);if(!g)return null;var i=g.cloneNode(c);if(l(g)||s(g,a.DOCUMENT_FRAGMENT_NODE)){l(g)&&E(g,i);c&&x(E,g,i)}if(d){z(g,i);c&&f&&x(z,g,i)}return i},empty:function(g){a.query(g).each(function(c){a.remove(c.childNodes)})},_nl2frag:p});var A=a._creators,C=a.create,F=/(?:\/(?:thead|tfoot|caption|col|colgroup)>)+\s*<tbody/;u={option:"select",td:"tr",tr:"tbody",
tbody:"table",col:"colgroup",legend:"fieldset"};for(var G in u)(function(g){A[G]=function(c,d){return C("<"+g+">"+c+"</"+g+">",null,d)}})(u[G]);if(r<8)A.tbody=function(g,c){var d=C("<table>"+g+"</table>",null,c),f=d.children.tags("tbody")[0];d.children.length>1&&f&&!F.test(g)&&f.parentNode.removeChild(f);return d};q.mix(A,{optgroup:A.option,th:A.td,thead:A.tbody,tfoot:A.tbody,caption:A.tbody,colgroup:A.tbody});return a},{requires:["./base","ua"]});
KISSY.add("dom/data",function(q,a,u){var w=window,x="_ks_data_"+q.now(),z={},E={},p={};p.applet=1;p.object=1;p.embed=1;var n={hasData:function(l,k){if(l)if(k!==u){if(k in l)return true}else if(!q.isEmptyObject(l))return true;return false}},r={hasData:function(l,k){if(l==w)return r.hasData(E,k);return n.hasData(l[x],k)},data:function(l,k,j){if(l==w)return r.data(E,k,j);var o=l[x];if(j!==u){o=l[x]=l[x]||{};o[k]=j}else if(k!==u)return o&&o[k];else return o=l[x]=l[x]||{}},removeData:function(l,k){if(l==
w)return r.removeData(E,k);var j=l[x];if(j)if(k!==u){delete j[k];q.isEmptyObject(j)&&r.removeData(l,u)}else delete l[x]}},s={hasData:function(l,k){var j=l[x];if(!j)return false;return n.hasData(z[j],k)},data:function(l,k,j){if(!p[l.nodeName.toLowerCase()]){var o=l[x];o||(o=l[x]=q.guid());l=z[o];if(j!==u){l=z[o]=z[o]||{};l[k]=j}else if(k!==u)return l&&l[k];else return l=z[o]=z[o]||{}}},removeData:function(l,k){var j=l[x];if(j){var o=z[j];if(o)if(k!==u){delete o[k];q.isEmptyObject(o)&&s.removeData(l,
u)}else{delete z[j];try{delete l[x]}catch(t){}l.removeAttribute&&l.removeAttribute(x)}}}};q.mix(a,{__EXPANDO:x,hasData:function(l,k){for(var j=false,o=a.query(l),t=0;t<o.length;t++)if(j=(j=o[t])&&j.nodeType?s.hasData(j,k):r.hasData(j,k))break;return j},data:function(l,k,j){if(q.isPlainObject(k))for(var o in k)a.data(l,o,k[o]);else if(j===u)if((l=a.get(l))&&l.nodeType)return s.data(l,k,j);else{if(l)return r.data(l,k,j)}else a.query(l).each(function(t){t&&t.nodeType?s.data(t,k,j):r.data(t,k,j)})},removeData:function(l,
k){a.query(l).each(function(j){j&&j.nodeType?s.removeData(j,k):r.removeData(j,k)})}});return a},{requires:["./base"]});
KISSY.add("dom/insertion",function(q,a,u){function w(k){for(var j=0;j<k.length;j++){var o=k[j];if(p(o,"input")){if(o.type==="checkbox"||o.type==="radio")o.defaultChecked=o.checked}else if(n(o)){o=o.getElementsByTagName("input");for(var t=0;t<o.length;t++)w(o[t])}}}function x(k){if(k.src)q.getScript(k.src);else(k=q.trim(k.text||k.textContent||k.innerHTML||""))&&q.globalEval(k)}function z(k,j,o,t){k=u.query(k);if(t)t=[];var y=k,B=t;k=[];for(var A=0;y[A];A++){var C=y[A],F=C.nodeName.toLowerCase();if(F===
"script"&&(!C.type||r.test(C.type))){if(B)B.push(C.parentNode?C.parentNode.removeChild(C):C)}else{if(n(C)&&!E.test(F)){F=[];for(var G=C.getElementsByTagName("script"),g=0;g<G.length;g++)(!G[g].type||r.test(G[g].type))&&F.push(G[g]);y.splice.apply(y,[A+1,0].concat(F))}k.push(C)}}k=k;a.ie<8&&w(k);j=u.query(j);y=k.length;B=j.length;if(!(!y&&(!t||!t.length)||!B)){k=u._nl2frag(k);var c;if(B>1)c=u.clone(k,true);for(A=0;A<B;A++){C=j[A];if(y){F=A>0?u.clone(c,true):k;o(F,C)}t&&q.each(t,x)}}}var E=/^(?:button|input|object|select|textarea)$/i,
p=u._nodeName,n=u._isElementNode,r=/\/(java|ecma)script/i;q.mix(u,{insertBefore:function(k,j,o){z(k,j,function(t,y){y.parentNode&&y.parentNode.insertBefore(t,y)},o)},insertAfter:function(k,j,o){z(k,j,function(t,y){y.parentNode&&y.parentNode.insertBefore(t,y.nextSibling)},o)},appendTo:function(k,j,o){z(k,j,function(t,y){y.appendChild(t)},o)},prependTo:function(k,j,o){z(k,j,function(t,y){y.insertBefore(t,y.firstChild)},o)}});var s={prepend:"prependTo",append:"appendTo",before:"insertBefore",after:"insertAfter"},
l;for(l in s)u[l]=u[s[l]];return u},{requires:["ua","./create"]});
KISSY.add("dom/offset",function(q,a,u,w){function x(c){var d,f=0;d=0;var i=p.body,b=k(c[y]);if(c[g]){d=c[g]();f=d[B];d=d[A];c=n&&p.documentMode!=9&&(j?r.clientTop:i.clientTop)||0;f-=n&&p.documentMode!=9&&(j?r.clientLeft:i.clientLeft)||0;d-=c;if(u.mobile=="apple"){f-=a[F](b);d-=a[G](b)}}return{left:f,top:d}}function z(c,d){var f={left:0,top:0},i=k(c[y]),b=c;d=d||i;do{var e;if(i==d){var h=b;e=x(h);h=k(h[y]);e.left+=a[F](h);e.top+=a[G](h);e=e}else e=x(b);e=e;f.left+=e.left;f.top+=e.top}while(i&&i!=d&&
(b=i.frameElement)&&(i=i.parent));return f}var E=window,p=document,n=u.ie,r=p.documentElement,s=a._isElementNode,l=a._nodeTypeIs,k=a._getWin,j=p.compatMode==="CSS1Compat",o=Math.max,t=parseInt,y="ownerDocument",B="left",A="top",C=q.isNumber,F="scrollLeft",G="scrollTop",g="getBoundingClientRect";q.mix(a,{offset:function(c,d,f){if(d===w){c=a.get(c);var i;if(c)i=z(c,f);return i}a.query(c).each(function(b){if(a.css(b,"position")==="static")b.style.position="relative";var e=z(b),h={},m,v;for(v in d){m=
t(a.css(b,v),10)||0;h[v]=m+d[v]-e[v]}a.css(b,h)})},scrollIntoView:function(c,d,f,i,b){if(c=a.get(c)){if(d)d=a.get(d);if(!d)d=c.ownerDocument;if(b!==true){i=i===w?true:!!i;f=f===w?true:!!f}if(l(d,a.DOCUMENT_NODE))d=k(d);var e=!!k(d);b=a.offset(c);var h=a.outerHeight(c);c=a.outerWidth(c);var m,v,D,H;if(e){e=d;v=a.height(e);m=a.width(e);H={left:a.scrollLeft(e),top:a.scrollTop(e)};e={left:b[B]-H[B],top:b[A]-H[A]};b={left:b[B]+c-(H[B]+m),top:b[A]+h-(H[A]+v)};H=H}else{m=a.offset(d);v=d.clientHeight;D=d.clientWidth;
H={left:a.scrollLeft(d),top:a.scrollTop(d)};e={left:b[B]-m[B]-(t(a.css(d,"borderLeftWidth"))||0),top:b[A]-m[A]-(t(a.css(d,"borderTopWidth"))||0)};b={left:b[B]+c-(m[B]+D+(t(a.css(d,"borderRightWidth"))||0)),top:b[A]+h-(m[A]+v+(t(a.css(d,"borderBottomWidth"))||0))}}if(e.top<0||b.top>0)if(f===true)a.scrollTop(d,H.top+e.top);else if(f===false)a.scrollTop(d,H.top+b.top);else e.top<0?a.scrollTop(d,H.top+e.top):a.scrollTop(d,H.top+b.top);if(i)if(e.left<0||b.left>0)if(f===true)a.scrollLeft(d,H.left+e.left);
else if(f===false)a.scrollLeft(d,H.left+b.left);else e.left<0?a.scrollLeft(d,H.left+e.left):a.scrollLeft(d,H.left+b.left)}},docWidth:0,docHeight:0,viewportHeight:0,viewportWidth:0});q.each(["Left","Top"],function(c,d){var f="scroll"+c;a[f]=function(i,b){if(C(i))return arguments.callee(E,i);i=a.get(i);var e,h=k(i);if(h)if(b!==w){var m=c=="Left"?b:a.scrollLeft(h),v=c=="Top"?b:a.scrollTop(h);h.scrollTo(m,v)}else{e=h["page"+(d?"Y":"X")+"Offset"];if(!C(e)){h=h.document;e=h.documentElement[f];C(e)||(e=
h.body[f])}}else if(s(i))if(b!==w)i[f]=b;else e=i[f];return e}});q.each(["Width","Height"],function(c){a["doc"+c]=function(d){d=a.get(d);d=k(d).document;return o(d.documentElement["scroll"+c],d.body["scroll"+c],a["viewport"+c](d))};a["viewport"+c]=function(d){d=a.get(d);var f="inner"+c;d=k(d);var i=d.document;return f in d?d[f]:j?i.documentElement["client"+c]:i.body["client"+c]}});return a},{requires:["./base","ua"]});
KISSY.add("dom/selector",function(q,a,u){function w(f,i){var b=[],e;e=i===u?[s]:w(i,u);j(e,function(h){A.apply(b,x(f,h))});if(q.isString(f)&&f.indexOf(",")>-1||e.length>1)c(b);b.each=q.bind(j,u,b);return b}function x(f,i){var b=[];k("sizzle");if(F(f))f=q.trim(f);if(F(f)&&f.indexOf(",")>-1)b=z(f,i);else{if(F(f)&&!g.exec(String(f))){b=f;var e=[],h=k("sizzle");h&&h(b,i,e);b=e}else b=E(f,i);b=b}return b=b}function z(f,i){var b=[],e=f.split(",");j(e,function(h){A.apply(b,x(h,i))});return b}function E(f,
i){var b,e,h=[],m;if(F(f))if(G.test(f)){if(e=n(f.slice(1),i))h=[e]}else{if(b=g.exec(f)){e=b[1];m=b[2];b=b[3];if(i=e?n(e,i):i)if(b)if(!e||f.indexOf(C)!=-1)h=[].concat(d(b,m,i));else{if((e=n(e,i))&&a.__hasClass(e,b))h=[e]}else if(m)h=r(m,i)}}else if(f&&(o(f)||y(f)))h=l(f,function(v){return p(v,i)});else if(f)if(p(f,i))h=[f];return h}function p(f,i){if(!f)return false;if(i==s)return true;return a.__contains(i,f)}function n(f,i){if(!i)return null;var b=i;if(i.nodeType!==a.DOCUMENT_NODE)b=i.ownerDocument;
if((b=b.getElementById(f))&&b.parentNode)if(a.attr(b,"id")!==f)b=a.filter("*","#"+f,i)[0]||null;else p(b,i)||(b=null);else b=null;return b}function r(f,i){return i&&t(i.getElementsByTagName(f))||[]}var s=document,l=q.filter,k=q.require,j=q.each,o=q.isArray,t=q.makeArray,y=a._isNodeList,B=a._nodeName,A=Array.prototype.push,C=" ",F=q.isString,G=/^#[\w-]+$/,g=/^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/,c;(function(){var f,i,b=true;[0,0].sort(function(){b=false;return 0});c=function(e){if(f){i=b;e.sort(f);
if(i)for(var h=1,m=e.length;h<m;)if(e[h]===e[h-1])e.splice(h,1);else h++}return e};f=s.documentElement.compareDocumentPosition?function(e,h){if(e==h){i=true;return 0}if(!e.compareDocumentPosition||!h.compareDocumentPosition)return e.compareDocumentPosition?-1:1;return e.compareDocumentPosition(h)&4?-1:1}:function(e,h){if(e==h){i=true;return 0}else if(e.sourceIndex&&h.sourceIndex)return e.sourceIndex-h.sourceIndex}})();(function(){var f=s.createElement("div");f.appendChild(s.createComment(""));if(f.getElementsByTagName("*").length>
0)r=function(i,b){var e=t(b.getElementsByTagName(i));if(i==="*"){for(var h=[],m=0,v;v=e[m++];)v.nodeType===1&&h.push(v);e=h}return e}})();var d=s.getElementsByClassName?function(f,i,b){if(!b)return[];f=b.getElementsByClassName(f);var e=0,h=f.length,m;if(i&&i!=="*")for(b=[];e<h;++e){m=f[e];B(m,i)&&b.push(m)}else b=t(f);return b}:s.querySelectorAll?function(f,i,b){return b&&t(b.querySelectorAll((i?i:"")+"."+f))||[]}:function(f,i,b){if(!b)return[];i=b.getElementsByTagName(i||"*");b=[];for(var e=0,h=
i.length,m;e<h;++e){m=i[e];a.__hasClass(m,f)&&b.push(m)}return b};q.mix(a,{query:w,get:function(f,i){return w(f,i)[0]||null},unique:c,filter:function(f,i,b){f=w(f,b);b=k("sizzle");var e,h,m,v,D=[];if(F(i)&&(e=g.exec(i))){m=e[1];h=e[2];v=e[3];if(m){if(m&&!h&&!v)i=function(H){return H.id===m}}else i=function(H){var I=true,J=true;if(h)I=B(H,h);if(v)J=a.__hasClass(H,v);return J&&I}}if(q.isFunction(i))D=q.filter(f,i);else if(i&&b)D=b.matches(i,f);return D},test:function(f,i,b){f=w(f,b);return f.length&&
a.filter(f,i,b).length===f.length}});return a},{requires:["./base"]});
KISSY.add("dom/style-ie",function(q,a,u,w){if(!u.ie)return a;var x=document,z=x.documentElement,E=w._CUSTOM_STYLES,p=/^-?\d+(?:px)?$/i,n=/^-?\d/,r=/opacity=([^)]*)/,s=/alpha\([^)]*\)/i;try{if(q.isNullOrUndefined(z.style.opacity))E.opacity={get:function(j,o){return r.test((o&&j.currentStyle?j.currentStyle.filter:j.style.filter)||"")?parseFloat(RegExp.$1)/100+"":o?"1":""},set:function(j,o){o=parseFloat(o);var t=j.style,y=j.currentStyle,B=isNaN(o)?"":"alpha(opacity="+o*100+")",A=q.trim(y&&y.filter||
t.filter||"");t.zoom=1;if(o>=1&&q.trim(A.replace(s,""))===""){t.removeAttribute("filter");if(y&&!y.filter)return}t.filter=s.test(A)?A.replace(s,B):A+(A?", ":"")+B}}}catch(l){}u=u.ie==8;var k={};k.thin=u?"1px":"2px";k.medium=u?"3px":"4px";k.thick=u?"5px":"6px";q.each(["","Top","Left","Right","Bottom"],function(j){var o="border"+j+"Width",t="border"+j+"Style";E[o]={get:function(y,B){var A=B?y.currentStyle:0,C=A&&String(A[o])||undefined;if(C&&C.indexOf("px")<0)C=k[C]&&A[t]!=="none"?k[C]:0;return C}}});
if(!(x.defaultView||{}).getComputedStyle&&z.currentStyle)a._getComputedStyle=function(j,o){o=a._cssProps[o]||o;var t=j.currentStyle&&j.currentStyle[o];if(!p.test(t)&&n.test(t)){var y=j.style,B=y.left,A=j.runtimeStyle&&j.runtimeStyle.left;if(A)j.runtimeStyle.left=j.currentStyle.left;y.left=o==="fontSize"?"1em":t||0;t=y.pixelLeft+"px";y.left=B;if(A)j.runtimeStyle.left=A}return t===""?"auto":t};return a},{requires:["./base","ua","./style"]});
KISSY.add("dom/style",function(q,a,u,w){function x(b,e,h){var m={},v;for(v in e){m[v]=b[s][v];b[s][v]=e[v]}h.call(b);for(v in e)b[s][v]=m[v]}function z(b,e,h){var m;if(b.nodeType===3||b.nodeType===8||!(m=b[s]))return w;e=e.replace(y,B);var v,D=G[e];e=g[e]||e;if(h!==w){if(h===null||h===C)h=C;else if(!isNaN(Number(h))&&!t[e])h+=F;if(D&&D.set)h=D.set(b,h);if(h!==w)try{b[s][e]=h}catch(H){}return w}else{if(!(D&&"get"in D&&(v=D.get(b,false))!==w))v=m[e];return v===w?"":v}}function E(b,e,h){if(q.isWindow(b))return e==
l?a.viewportWidth(b):a.viewportHeight(b);else if(b.nodeType==9)return e==l?a.docWidth(b):a.docHeight(b);var m=e===l?["Left","Right"]:["Top","Bottom"],v=e===l?b.offsetWidth:b.offsetHeight;if(v>0){h!=="border"&&q.each(m,function(D){h||(v-=parseFloat(a.css(b,"padding"+D))||0);if(h==="margin")v+=parseFloat(a.css(b,h+D))||0;else v-=parseFloat(a.css(b,"border"+D+"Width"))||0});return v}v=a._getComputedStyle(b,e);if(v<0||q.isNullOrUndefined(v))v=b.style[e]||0;v=parseFloat(v)||0;h&&q.each(m,function(D){v+=
parseFloat(a.css(b,"padding"+D))||0;if(h!=="padding")v+=parseFloat(a.css(b,"border"+D+"Width"))||0;if(h==="margin")v+=parseFloat(a.css(b,h+D))||0});return v}var p=document,n=p.documentElement,r=u.ie,s="style",l="width",k="display"+q.now(),j=parseInt,o=/^-?\d+(?:px)?$/i,t={fillOpacity:1,fontWeight:1,lineHeight:1,opacity:1,orphans:1,widows:1,zIndex:1,zoom:1},y=/-([a-z])/ig,B=function(b,e){return e.toUpperCase()},A=/([A-Z]|^ms)/g,C="",F="px",G={},g={},c={};if(n[s].cssFloat!==w)g["float"]="cssFloat";
else if(n[s].styleFloat!==w)g["float"]="styleFloat";var d,f;q.mix(a,{_CUSTOM_STYLES:G,_cssProps:g,_getComputedStyle:function(b,e){var h="",m={},v=b.ownerDocument;e=e.replace(A,"-$1").toLowerCase();if(m=v.defaultView.getComputedStyle(b,null))h=m.getPropertyValue(e)||m[e];if(h==""&&!a.__contains(v.documentElement,b)){e=g[e]||e;h=b[s][e]}return h},style:function(b,e,h){if(q.isPlainObject(e))for(var m in e)a.style(b,m,e[m]);else if(h===w){b=a.get(b);m="";if(b)m=z(b,e,h);return m}else a.query(b).each(function(v){z(v,
e,h)})},css:function(b,e,h){if(q.isPlainObject(e))for(var m in e)a.css(b,m,e[m]);else{e=e.replace(y,B);m=G[e];if(h===w){b=a.get(b);h="";if(b)if(!(m&&"get"in m&&(h=m.get(b,true))!==w))h=a._getComputedStyle(b,e);return h===w?"":h}else a.style(b,e,h)}},show:function(b){a.query(b).each(function(e){e[s].display=a.data(e,k)||C;if(a.css(e,"display")==="none"){var h;h=e.tagName.toLowerCase();var m,v;if(!c[h]){m=p.body||p.documentElement;v=p.createElement(h);a.prepend(v,m);var D=a.css(v,"display");m.removeChild(v);
if(D==="none"||D===""){if(d)a.prepend(d,m);else{d=p.createElement("iframe");d.frameBorder=d.width=d.height=0;a.prepend(d,m);if(u.ie){v=p.domain;D=location.hostname;v=v!=D&&v!="["+D+"]"}else v=false;if(v)d.src="javascript:void(function(){"+encodeURIComponent("document.open();document.domain='"+p.domain+"';document.close();")+"}())"}if(!f||!d.createElement){f=d.contentWindow.document;f.write((p.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>");f.close()}v=f.createElement(h);f.body.appendChild(v);
D=a.css(v,"display");m.removeChild(d)}c[h]=D}h=c[h];a.data(e,k,h);e[s].display=h}})},hide:function(b){a.query(b).each(function(e){var h=e[s],m=h.display;if(m!=="none"){m&&a.data(e,k,m);h.display="none"}})},toggle:function(b){a.query(b).each(function(e){a.css(e,"display")==="none"?a.show(e):a.hide(e)})},addStyleSheet:function(b,e,h){if(q.isString(b)){h=e;e=b;b=window}b=a.get(b);b=a._getWin(b).document;var m;if(h&&(h=h.replace("#",C)))m=a.get("#"+h,b);if(!m){m=a.create("<style>",{id:h},b);a.get("head",
b).appendChild(m);if(m.styleSheet)m.styleSheet.cssText=e;else m.appendChild(b.createTextNode(e))}},unselectable:function(b){a.query(b).each(function(e){if(u.gecko)e[s].MozUserSelect="none";else if(u.webkit)e[s].KhtmlUserSelect="none";else if(u.ie||u.opera){var h=0,m=e.getElementsByTagName("*");for(e.setAttribute("unselectable","on");e=m[h++];)switch(e.tagName.toLowerCase()){case "iframe":case "textarea":case "input":case "select":break;default:e.setAttribute("unselectable","on")}}})},innerWidth:0,
innerHeight:0,outerWidth:0,outerHeight:0,width:0,height:0});q.each([l,"height"],function(b){a["inner"+(b.charAt(0).toUpperCase()+b.substring(1))]=function(e){return(e=a.get(e))?E(e,b,"padding"):null};a["outer"+(b.charAt(0).toUpperCase()+b.substring(1))]=function(e,h){var m=a.get(e);return m?E(m,b,h?"margin":"border"):null};a[b]=function(e,h){var m=a.css(e,b,h);if(m)m=parseFloat(m);return m}});var i={position:"absolute",visibility:"hidden",display:"block"};q.each(["height","width"],function(b){G[b]=
{get:function(e,h){var m;if(h){if(e.offsetWidth!==0)m=E(e,b);else x(e,i,function(){m=E(e,b)});return m+"px"}},set:function(e,h){if(o.test(h)){h=parseFloat(h);if(h>=0)return h+"px"}else return h}}});q.each(["left","top"],function(b){G[b]={get:function(e,h){if(h){var m=a._getComputedStyle(e,b);if(m==="auto"){m=0;if(q.inArray(a.css(e,"position"),["absolute","fixed"])){m=e[b==="left"?"offsetLeft":"offsetTop"];if(r&&document.documentMode!=9||u.opera)m-=e.offsetParent&&e.offsetParent["client"+(b=="left"?
"Left":"Top")]||0;m=m-(j(a.css(e,"margin-"+b))||0)}m+="px"}return m}}}});return a},{requires:["dom/base","ua"]});
KISSY.add("dom/traversal",function(q,a,u){function w(p,n,r,s,l,k){if(!(p=a.get(p)))return null;if(n===0)return p;k||(p=p[r]);if(!p)return null;l=l&&a.get(l)||null;if(n===u)n=1;k=[];var j=q.isArray(n),o,t;if(q.isNumber(n)){o=0;t=n;n=function(){return++o===t}}for(;p&&p!=l;){if(E(p)&&x(p,n)&&(!s||s(p))){k.push(p);if(!j)break}p=p[r]}return j?k:k[0]||null}function x(p,n){if(!n)return true;if(q.isArray(n))for(var r=0;r<n.length;r++){if(a.test(p,n[r]))return true}else if(a.test(p,n))return true;return false}
function z(p,n,r){var s=[];var l=p=a.get(p);if(p&&r)l=p.parentNode;if(l){r=0;for(l=l.firstChild;l;l=l.nextSibling)if(E(l)&&l!==p&&(!n||a.test(l,n)))s[r++]=l}return s}var E=a._isElementNode;q.mix(a,{closest:function(p,n,r){return w(p,n,"parentNode",function(s){return s.nodeType!=a.DOCUMENT_FRAGMENT_NODE},r,true)},parent:function(p,n,r){return w(p,n,"parentNode",function(s){return s.nodeType!=a.DOCUMENT_FRAGMENT_NODE},r)},first:function(p,n){var r=a.get(p);return w(r&&r.firstChild,n,"nextSibling",u,
u,true)},last:function(p,n){var r=a.get(p);return w(r&&r.lastChild,n,"previousSibling",u,u,true)},next:function(p,n){return w(p,n,"nextSibling",u)},prev:function(p,n){return w(p,n,"previousSibling",u)},siblings:function(p,n){return z(p,n,true)},children:function(p,n){return z(p,n,u)},__contains:document.documentElement.contains?function(p,n){if(p.nodeType==a.TEXT_NODE)return false;var r;if(n.nodeType==a.TEXT_NODE){n=n.parentNode;r=true}else if(n.nodeType==a.DOCUMENT_NODE)return false;else r=p!==n;
return r&&(p.contains?p.contains(n):true)}:document.documentElement.compareDocumentPosition?function(p,n){return!!(p.compareDocumentPosition(n)&16)}:0,contains:function(p,n){p=a.get(p);n=a.get(n);if(p&&n)return a.__contains(p,n)},equals:function(p,n){p=a.query(p);n=a.query(n);if(p.length!=n.length)return false;for(var r=p.length;r>=0;r--)if(p[r]!=n[r])return false;return true}});return a},{requires:["./base"]});
KISSY.add("dom",function(q,a){return a},{requires:["dom/attr","dom/class","dom/create","dom/data","dom/insertion","dom/offset","dom/style","dom/selector","dom/style-ie","dom/traversal"]});
