/*
Copyright 2010, KISSY UI Library v1.1.7dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("event",function(e,k){function j(a,b,d,f,h){if(e.isString(b))b=e.query(b);if(e.isArray(b)){e.each(b,function(l){n[a](l,d,f,h)});return true}if((d=e.trim(d))&&d.indexOf(y)>0){e.each(d.split(y),function(l){n[a](b,l,f,h)});return true}}function g(a){return a&&a.nodeType!==3&&a.nodeType!==8?i.data(a,x):-1}function m(a,b){a&&a.nodeType!==3&&a.nodeType!==8&&i.data(a,x,b)}var c=document,i=e.DOM,t=c.addEventListener?function(a,b,d,f){a.addEventListener&&a.addEventListener(b,d,!!f)}:function(a,b,
d){a.attachEvent&&a.attachEvent("on"+b,d)},p=c.removeEventListener?function(a,b,d,f){a.removeEventListener&&a.removeEventListener(b,d,!!f)}:function(a,b,d){a.detachEvent&&a.detachEvent("on"+b,d)},x="ksEventTargetId",y=" ",z=e.now(),w={},n={EVENT_GUID:x,special:{},add:function(a,b,d,f){if(!j("add",a,b,d,f)){var h=g(a),l,q,r,u,s;if(!(h===-1||!b||!e.isFunction(d))){if(!h){m(a,h=z++);w[h]={target:a,events:{}}}q=w[h].events;if(!q[b]){l=((h=!a.isCustomEventTarget)||a._supportSpecialEvent)&&n.special[b]||
{};r=function(o,v){if(!o||!o.fixed)o=new e.EventObject(a,o,b);e.isPlainObject(v)&&e.mix(o,v);l.setup&&l.setup(o);return(l.handle||n._handle)(a,o)};q[b]={handle:r,listeners:[]};u=l.fix||b;s=l.capture;h&&t(a,u,r,s)}q[b].listeners.push({fn:d,scope:f||a})}}},__getListeners:function(a,b){var d,f=[];if(d=(n.__getEvents(a)||{})[b])f=d.listeners;return f},__getEvents:function(a){var b=g(a),d;if(b!==-1)if(b&&(d=w[b]))if(d.target===a)return d.events||{}},remove:function(a,b,d,f){if(!j("remove",a,b,d,f)){var h=
n.__getEvents(a),l=g(a),q,r,u,s,o,v;if(h!==undefined){f=f||a;if(q=h[b]){r=q.listeners;u=r.length;if(e.isFunction(d)&&u){o=s=0;for(v=[];s<u;++s)if(d!==r[s].fn||f!==r[s].scope)v[o++]=r[s];q.listeners=v;u=v.length}if(d===k||u===0){if(!a.isCustomEventTarget){d=n.special[b]||{};p(a,d.fix||b,q.handle)}delete h[b]}}if(b===k||e.isEmptyObject(h)){for(b in h)n.remove(a,b);delete w[l];i.removeData(a,x)}}}},_handle:function(a,b){var d=n.__getListeners(a,b.type);d=d.slice(0);for(var f,h=0,l=d.length;h<l;++h){f=
d[h];f=f.fn.call(f.scope,b);if(f!==k){b.result=f;f===false&&b.halt()}if(b.isImmediatePropagationStopped)break}return f},_getCache:function(a){return w[a]},__getID:g,_simpleAdd:t,_simpleRemove:p};n.on=n.add;e.Event=n});
KISSY.add("event-object",function(e,k){function j(c,i,t){this.currentTarget=c;this.originalEvent=i||{};if(i){this.type=i.type;this._fix()}else{this.type=t;this.target=c}this.currentTarget=c;this.fixed=true}var g=document,m="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" ");e.augment(j,
{_fix:function(){var c=this.originalEvent,i=m.length,t,p=this.currentTarget;for(p=p.nodeType===9?p:p.ownerDocument||g;i;){t=m[--i];this[t]=c[t]}if(!this.target)this.target=this.srcElement||g;if(this.target.nodeType===3)this.target=this.target.parentNode;if(!this.relatedTarget&&this.fromElement)this.relatedTarget=this.fromElement===this.target?this.toElement:this.fromElement;if(this.pageX===k&&this.clientX!==k){c=p.documentElement;i=p.body;this.pageX=this.clientX+(c&&c.scrollLeft||i&&i.scrollLeft||
0)-(c&&c.clientLeft||i&&i.clientLeft||0);this.pageY=this.clientY+(c&&c.scrollTop||i&&i.scrollTop||0)-(c&&c.clientTop||i&&i.clientTop||0)}if(this.which===k)this.which=this.charCode!==k?this.charCode:this.keyCode;if(this.metaKey===k)this.metaKey=this.ctrlKey;if(!this.which&&this.button!==k)this.which=this.button&1?1:this.button&2?3:this.button&4?2:0},preventDefault:function(){var c=this.originalEvent;if(c.preventDefault)c.preventDefault();else c.returnValue=false;this.isDefaultPrevented=true},stopPropagation:function(){var c=
this.originalEvent;if(c.stopPropagation)c.stopPropagation();else c.cancelBubble=true;this.isPropagationStopped=true},stopImmediatePropagation:function(){var c=this.originalEvent;c.stopImmediatePropagation?c.stopImmediatePropagation():this.stopPropagation();this.isImmediatePropagationStopped=true},halt:function(c){c?this.stopImmediatePropagation():this.stopPropagation();this.preventDefault()}});e.EventObject=j});
KISSY.add("event-target",function(e,k){var j=e.Event;e.EventTarget={isCustomEventTarget:true,fire:function(g,m){var c=e.DOM.data(this,j.EVENT_GUID)||-1;if((c=((j._getCache(c)||{}).events||{})[g])&&e.isFunction(c.handle))return c.handle(k,m)},on:function(g,m,c){j.add(this,g,m,c);return this},detach:function(g,m,c){j.remove(this,g,m,c);return this}}});
KISSY.add("event-mouseenter",function(e){var k=e.Event;e.UA.ie||e.each([{name:"mouseenter",fix:"mouseover"},{name:"mouseleave",fix:"mouseout"}],function(j){k.special[j.name]={fix:j.fix,setup:function(g){g.type=j.name},handle:function(g,m){if(e.DOM._isKSNode(g))g=g[0];var c=m.relatedTarget;try{for(;c&&c!==g;)c=c.parentNode;c!==g&&k._handle(g,m)}catch(i){}}}})});
KISSY.add("event-focusin",function(e){var k=e.Event;document.addEventListener&&e.each([{name:"focusin",fix:"focus"},{name:"focusout",fix:"blur"}],function(j){k.special[j.name]={fix:j.fix,capture:true,setup:function(g){g.type=j.name}}})});
