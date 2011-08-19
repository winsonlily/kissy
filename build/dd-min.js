/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 19 20:09
*/
KISSY.add("dd/ddm",function(j,l,m,g,h){function c(){c.superclass.constructor.apply(this,arguments);this._init()}function a(d,f,o){if(o===-1)return function(){d.apply(f,arguments)};var s=j.now();return function(){var q=j.now();if(q-s>o){s=q;d.apply(f,arguments)}}}function b(d){var f=d.offset();return{left:f.left,right:f.left+d[0].offsetWidth,top:f.top,bottom:f.top+d[0].offsetHeight}}function e(d,f){return d.left<=f.left&&d.right>=f.left&&d.top<=f.top&&d.bottom>=f.top}function i(d){if(d.top>=d.bottom||
d.left>=d.right)return 0;return(d.right-d.left)*(d.bottom-d.top)}function k(d,f){return{left:Math.max(d.left,f.left),right:Math.min(d.right,f.right),top:Math.max(d.top,f.top),bottom:Math.min(d.bottom,f.bottom)}}var n=document;c.ATTRS={prefixCls:{value:"ks-dd-"},bufferTime:{value:200},activeDrag:{},activeDrop:{},drops:{value:[]}};j.extend(c,h,{_regDrop:function(d){this.get("drops").push(d)},_unregDrop:function(d){d=j.indexOf(d,this.get("drops"));d!=-1&&this.get("drops").splice(d,1)},_init:function(){this._showShimMove=
a(this._move,this,30)},_move:function(d){var f=this.get("activeDrag");if(f){d.preventDefault();f._move(d);this._notifyDropsMove(d)}},_notifyDropsMove:function(d){var f=this.get("activeDrag"),o=f.get("mode"),s=this.get("drops"),q,w=0,r=b(f.get("node")),t=i(r);j.each(s,function(u){var p=u.getNodeFromTarget(d,f.get("dragNode")[0],f.get("node")[0]);if(p)if(o=="point"){if(e(b(p),f.mousePos))if(!q||q.get("node").contains(p))q=u}else if(o=="intersect"){p=i(k(r,b(p)));if(p>w){w=p;q=u}}else if(o=="strict"){p=
i(k(r,b(p)));if(p==t){q=u;return false}}});(s=this.get("activeDrop"))&&s!=q&&s._handleOut(d);if(q)q._handleOver(d);else{f.get("node").removeClass(this.get("prefixCls")+"drag-over");this.set("activeDrop",null)}},_deactivateDrops:function(){var d=this.get("activeDrag"),f=this.get("activeDrop");d.get("node").removeClass(this.get("prefixCls")+"drag-over");if(f){var o={drag:d,drop:f};f.get("node").removeClass(this.get("prefixCls")+"drop-over");f.fire("drophit",o);d.fire("dragdrophit",o);this.fire("drophit",
o);this.fire("dragdrophit",o)}else{d.fire("dragdropmiss",{drag:d});this.fire("dragdropmiss",{drag:d})}},_start:function(d){var f=this,o=f.get("bufferTime")||0;f._registerEvent();if(o)f._bufferTimer=setTimeout(function(){f._bufferStart(d)},o);else f._bufferStart(d)},_bufferStart:function(d){this.set("activeDrag",d);d.get("shim")&&this._activeShim();d._start();d.get("dragNode").addClass(this.get("prefixCls")+"dragging")},_end:function(d){var f=this.get("activeDrag");this._unregisterEvent();if(this._bufferTimer){clearTimeout(this._bufferTimer);
this._bufferTimer=null}this._shim&&this._shim.css({display:"none"});if(f){f._end(d);f.get("dragNode").removeClass(this.get("prefixCls")+"dragging");this._deactivateDrops(d);this.set("activeDrag",null);this.set("activeDrop",null)}},_activeShim:function(){var d=document;this._shim=(new g("<div style='background-color:red;position:absolute;left:0;width:100%;top:0;cursor:move;z-index:999999;'></div>")).appendTo(d.body);this._shim.css("opacity",0);this._activeShim=this._showShim;this._showShim()},_showShim:function(){this._shim.css({display:"",
height:l.docHeight()})},_registerEvent:function(){m.on(n,"mouseup",this._end,this);m.on(n,"mousemove",this._showShimMove,this)},_unregisterEvent:function(){m.remove(n,"mousemove",this._showShimMove,this);m.remove(n,"mouseup",this._end,this)}});h=new c;h.inRegion=e;h.region=b;return h},{requires:["dom","event","node","base"]});
KISSY.add("dd/draggable",function(j,l,m,g,h){function c(){c.superclass.constructor.apply(this,arguments);this._init()}c.POINT="point";c.INTERSECT="intersect";c.STRICT="strict";c.ATTRS={node:{setter:function(a){return m.one(a)}},dragNode:{},shim:{value:true},handlers:{value:[]},cursor:{value:"move"},mode:{value:"point"}};j.extend(c,g,{_init:function(){var a=this.get("node"),b=this.get("handlers");this.set("dragNode",a);if(b.length===0)b[0]=a;for(var e=0;e<b.length;e++){var i=b[e];i=m.one(i);i.unselectable();
this.get("cursor")&&i.css("cursor",this.get("cursor"))}a.on("mousedown",this._handleMouseDown,this)},destroy:function(){for(var a=this.get("dragNode"),b=this.get("handlers"),e=0;e<b.length;e++){var i=b[e];i.css("cursor")==this.get("cursor")&&i.css("cursor","auto")}a.detach("mousedown",this._handleMouseDown,this);this.detach()},_check:function(a){for(var b=this.get("handlers"),e=0;e<b.length;e++){var i=b[e];if(i.contains(a)||i[0]==a[0])return true}return false},_handleMouseDown:function(a){if(this._check(new m(a.target))){a.preventDefault();
this._prepare(a)}},_prepare:function(a){h._start(this);var b=this.get("node"),e=a.pageX;a=a.pageY;b=b.offset();this.startMousePos=this.mousePos={left:e,top:a};this.startNodePos=b;this._diff={left:e-b.left,top:a-b.top};this.set("diff",this._diff)},_move:function(a){var b=this.get("diff"),e=a.pageX-b.left;b=a.pageY-b.top;this.mousePos={left:a.pageX,top:a.pageY};a={left:e,top:b,pageX:a.pageX,pageY:a.pageY,drag:this};this.fire("drag",a);h.fire("drag",a)},_end:function(){this.fire("dragend",{drag:this});
h.fire("dragend",{drag:this})},_start:function(){this.fire("dragstart",{drag:this});h.fire("dragstart",{drag:this})}});return c},{requires:["ua","node","base","./ddm"]});
KISSY.add("dd/droppable",function(j,l,m,g){function h(){h.superclass.constructor.apply(this,arguments);this._init()}h.ATTRS={node:{setter:function(c){if(c){c=l.one(c);c.addClass(g.get("prefixCls")+"drop");return c}}}};j.extend(h,m,{getNodeFromTarget:function(c,a,b){c=this.get("node");var e=c[0];return e==a||e==b?null:c},_init:function(){g._regDrop(this)},_handleOut:function(){var c=g.get("activeDrag");this.get("node").removeClass(g.get("prefixCls")+"drop-over");var a={drop:this,drag:c};this.fire("dropexit",
a);g.fire("dropexit",a);c.get("node").removeClass(g.get("prefixCls")+"drag-over");c.fire("dragexit",a);g.fire("dragexit",a)},_handleOver:function(c){var a=g.get("activeDrop");g.set("activeDrop",this);var b=g.get("activeDrag");this.get("node").addClass(g.get("prefixCls")+"drop-over");c=j.mix({drag:b,drop:this},c);if(this!=a){b.get("node").addClass(g.get("prefixCls")+"drag-over");b.fire("dragenter",c);this.fire("dropenter",c);g.fire("dragenter",c);g.fire("dropenter",c)}else{b.fire("dragover",c);this.fire("dropover",
c);g.fire("dragover",c);g.fire("dropover",c)}},destroy:function(){g._unregDrop(this)}});return h},{requires:["node","base","./ddm"]});
KISSY.add("dd/proxy",function(j,l){function m(){m.superclass.constructor.apply(this,arguments);this[g]={}}var g="__proxy_destructors",h="__proxy";m.ATTRS={node:{value:function(c){return new l(c.get("node")[0].cloneNode(true))}},destroyOnEnd:{value:false}};j.extend(m,j.Base,{attach:function(c){function a(){var k=e.get("node"),n=c.get("node");if(!e[h]&&j.isFunction(k)){k=k(c);k.addClass("ks-dd-proxy");k.css("position","absolute");e[h]=k}n.parent().append(e[h]);e[h].show();e[h].offset(n.offset());c.set("dragNode",
n);c.set("node",e[h])}function b(){var k=e[h];c.get("dragNode").offset(k.offset());k.hide();if(e.get("destroyOnEnd")){k.remove();e[h]=null}c.set("node",c.get("dragNode"))}if(!c.__proxy_id){var e=this;c.on("dragstart",a);c.on("dragend",b);var i=c.__proxy_id=j.guid("dd-proxyid-");e[g][i]={drag:c,fn:function(){c.detach("dragstart",a);c.detach("dragend",b)}}}},unAttach:function(c){var a=c.__proxy_id;if(a){this[g][a].fn();delete this[g][a];delete c.__proxy_id}},destroy:function(){var c=this.get("node");
c&&!j.isFunction(c)&&c.remove();for(var a in this[g])this.unAttach(this[g][a].drag)}});return m},{requires:["node"]});
KISSY.add("dd/draggable-delegate",function(j,l,m,g,h){function c(){c.superclass.constructor.apply(this,arguments)}j.extend(c,m,{_init:function(){var a=this.get("handlers"),b=this.get("container");a.length===0&&a.push(this.get("selector"));b.on("mousedown",this._handleMouseDown,this)},_getHandler:function(a){for(var b=this.get("container"),e=this.get("handlers");a&&a[0]!==b[0];){for(var i=0;i<e.length;i++)if(g.test(a[0],e[i],b[0]))return a;a=a.parent()}},_getNode:function(a){for(var b=this.get("container"),
e=this.get("selector");a&&a[0]!=b[0];){if(g.test(a[0],e,b[0]))return a;a=a.parent()}},_handleMouseDown:function(a){var b=new h(a.target);if(b=b&&this._getHandler(b))if(b=this._getNode(b)){a.preventDefault();this.set("node",b);this.set("dragNode",b);this._prepare(a)}},destroy:function(){this.get("container").detach("mousedown",this._handleMouseDown,this);this.detach()}},{ATTRS:{container:{setter:function(a){return h.one(a)}},selector:{}}});return c},{requires:["./ddm","./draggable","dom","node"]});
KISSY.add("dd/droppable-delegate",function(j,l,m,g,h){function c(){c.superclass.constructor.apply(this,arguments)}j.extend(c,m,{getNodeFromTarget:function(a,b,e){a={left:a.pageX,top:a.pageY};var i=this.get("container"),k=this.get("selector");i=i.all(k);for(k=0;k<i.length;k++){var n=i[k],d=new h(n);if(!(n==e||n==b))if(l.inRegion(l.region(d),a)){this.set("lastNode",this.get("node"));this.set("node",d);return d}}return null},_handleOut:function(){c.superclass._handleOut.call(this);this.set("node",null);
this.set("lastNode",null)},_handleOver:function(a){var b=l.get("activeDrop");l.set("activeDrop",this);var e=l.get("activeDrag");this.get("node").addClass(l.get("prefixCls")+"drop-over");a=j.mix({drag:e,drop:this},a);var i=this.get("node"),k=this.get("lastNode");if(this!=b||!k||k&&k[0]!==i[0]){if(k){this.set("node",k);c.superclass._handleOut.call(this)}this.set("node",i);e.get("node").addClass(l.get("prefixCls")+"drag-over");e.fire("dragenter",a);this.fire("dropenter",a);l.fire("dragenter",a);l.fire("dropenter",
a)}else{e.fire("dragover",a);this.fire("dropover",a);l.fire("dragover",a);l.fire("dropover",a)}}},{ATTRS:{lastNode:{},selector:{},container:{setter:function(a){return h.one(a)}}}});return c},{requires:["./ddm","./droppable","dom","node"]});
KISSY.add("dd/scroll",function(j,l,m,g){function h(){h.superclass.constructor.apply(this,arguments);this[a]={}}var c=100,a="__dd_scrolls";h.ATTRS={node:{setter:function(b){return m.one(b)}},rate:{value:[10,10]},diff:{value:[20,20]}};j.extend(h,l,{getRegion:function(b){return!b||b==window?{width:g.viewportWidth(),height:g.viewportHeight()}:{width:b[0].offsetWidth,height:b[0].offsetHeight}},getOffset:function(b){return!b||b==window?{left:g.scrollLeft(),top:g.scrollTop()}:b.offset()},getScroll:function(b){return!b||
b==window?{left:g.scrollLeft(),top:g.scrollTop()}:{left:b[0].scrollLeft,top:b[0].scrollTop}},setScroll:function(b,e){if(!b||b==window)window.scrollTo(e.left,e.top);else{b[0].scrollLeft=e.left;b[0].scrollTop=e.top}},unAttach:function(b){var e=b["__dd-scroll-id-"];if(e){this[a][e].fn();delete b["__dd-scroll-id-"];delete this[a][e]}},destroy:function(){for(var b in this[a])this.unAttach(this[a][b].drag)},attach:function(b){function e(r){if(!r.fake){var t=n.get("node");o=r;s=j.clone(b.mousePos);r=n.getOffset(t);
s.left-=r.left;s.top-=r.top;q||k()}}function i(){clearTimeout(q);q=null}function k(){var r=n.get("node"),t=n.getRegion(r),u=t.width;t=t.height;var p=n.getScroll(r),x=j.clone(p),v=false;if(s.top-t>=-f[1]){p.top+=d[1];v=true}if(s.top<=f[1]){p.top-=d[1];v=true}if(s.left-u>=-f[0]){p.left+=d[0];v=true}if(s.left<=f[0]){p.left-=d[0];v=true}if(v){n.setScroll(r,p);q=setTimeout(arguments.callee,c);o.fake=true;if(!r||r==window){p=n.getScroll(r);o.left+=p.left-x.left;o.top+=p.top-x.top}b.fire("drag",o)}else q=
null}if(!b["__dd-scroll-id-"]){var n=this,d=n.get("rate"),f=n.get("diff"),o,s,q=null;b.on("drag",e);b.on("dragend",i);var w=b["__dd-scroll-id-"]=j.guid("__dd-scroll-id-");n[a][w]={drag:b,fn:function(){b.detach("drag",e);b.detach("dragend",i)}}}}});return h},{requires:["base","node","dom"]});
KISSY.add("dd",function(j,l,m,g,h,c,a,b){l={Draggable:m,Droppable:g,DDM:l,Proxy:h,DraggableDelegate:c,DroppableDelegate:a,Scroll:b};j.mix(j,l);return l},{requires:["dd/ddm","dd/draggable","dd/droppable","dd/proxy","dd/draggable-delegate","dd/droppable-delegate","dd/scroll"]});
