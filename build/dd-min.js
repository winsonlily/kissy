/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("dd/ddm",function(j,l,n,g,i){function b(){b.superclass.constructor.apply(this,arguments);this._init()}function a(d,f,m){m=m||150;if(m===-1)return function(){d.apply(f,arguments)};var r=j.now();return function(){var s=j.now();if(s-r>m){r=s;d.apply(f,arguments)}}}function c(d){var f=d.offset();return{left:f.left,right:f.left+d[0].offsetWidth,top:f.top,bottom:f.top+d[0].offsetHeight}}function e(d,f){return d.left<=f.left&&d.right>=f.left&&d.top<=f.top&&d.bottom>=f.top}function k(d){if(d.top>=
d.bottom||d.left>=d.right)return 0;return(d.right-d.left)*(d.bottom-d.top)}function h(d,f){return{left:Math.max(d.left,f.left),right:Math.min(d.right,f.right),top:Math.max(d.top,f.top),bottom:Math.min(d.bottom,f.bottom)}}var o=document;b.ATTRS={prefixCls:{value:"ks-dd-"},bufferTime:{value:200},activeDrag:{},activeDrop:{},drops:{value:[]}};j.extend(b,i,{_regDrop:function(d){this.get("drops").push(d)},_unregDrop:function(d){d=j.indexOf(d,this.get("drops"));d!=-1&&this.get("drops").splice(d,1)},_init:function(){this._showShimMove=
a(this._move,this,30)},_move:function(d){var f=this.get("activeDrag");if(f){d.preventDefault();f._move(d);this._notifyDropsMove(d)}},_notifyDropsMove:function(d){var f=this.get("activeDrag"),m=f.get("mode"),r=this.get("drops"),s,p=0,u=c(f.get("node")),w=k(u);j.each(r,function(q){var t=q.getNodeFromTarget(d,f.get("dragNode")[0],f.get("node")[0]);if(t)if(m=="point"){if(e(c(t),f.mousePos))if(!s||s.get("node").contains(t))s=q}else if(m=="intersect"){t=k(h(u,c(t)));if(t>p){p=t;s=q}}else if(m=="strict"){t=
k(h(u,c(t)));if(t==w){s=q;return false}}});(r=this.get("activeDrop"))&&r!=s&&r._handleOut(d);if(s)s._handleOver(d);else{f.get("node").removeClass(this.get("prefixCls")+"drag-over");this.set("activeDrop",null)}},_deactivateDrops:function(){var d=this.get("activeDrag"),f=this.get("activeDrop");d.get("node").removeClass(this.get("prefixCls")+"drag-over");if(f){var m={drag:d,drop:f};f.get("node").removeClass(this.get("prefixCls")+"drop-over");f.fire("drophit",m);d.fire("dragdrophit",m);this.fire("drophit",
m);this.fire("dragdrophit",m)}else{d.fire("dragdropmiss",{drag:d});this.fire("dragdropmiss",{drag:d})}},_start:function(d){var f=this,m=f.get("bufferTime")||0;f._registerEvent();if(m)f._bufferTimer=setTimeout(function(){f._bufferStart(d)},m);else f._bufferStart(d)},_bufferStart:function(d){this.set("activeDrag",d);d.get("shim")&&this._activeShim();d._start();d.get("dragNode").addClass(this.get("prefixCls")+"dragging")},_end:function(d){var f=this.get("activeDrag");this._unregisterEvent();if(this._bufferTimer){clearTimeout(this._bufferTimer);
this._bufferTimer=null}this._shim&&this._shim.css({display:"none"});if(f){f._end(d);f.get("dragNode").removeClass(this.get("prefixCls")+"dragging");this._deactivateDrops(d);this.set("activeDrag",null);this.set("activeDrop",null)}},_activeShim:function(){var d=document;this._shim=(new g("<div style='background-color:red;position:absolute;left:0;width:100%;top:0;cursor:move;z-index:999999;'></div>")).appendTo(d.body);this._shim.css("opacity",0);this._activeShim=this._showShim;this._showShim()},_showShim:function(){this._shim.css({display:"",
height:l.docHeight()})},_registerEvent:function(){n.on(o,"mouseup",this._end,this);n.on(o,"mousemove",this._showShimMove,this)},_unregisterEvent:function(){n.remove(o,"mousemove",this._showShimMove,this);n.remove(o,"mouseup",this._end,this)}});i=new b;i.inRegion=e;i.region=c;return i},{requires:["dom","event","node","base"]});
KISSY.add("dd/draggable",function(j,l,n,g,i){function b(){b.superclass.constructor.apply(this,arguments);this._init()}b.POINT="point";b.INTERSECT="intersect";b.STRICT="strict";b.ATTRS={node:{setter:function(a){return n.one(a)}},dragNode:{},shim:{value:true},handlers:{value:[]},cursor:{value:"move"},mode:{value:"point"}};j.extend(b,g,{_init:function(){var a=this.get("node"),c=this.get("handlers");this.set("dragNode",a);if(c.length==0)c[0]=a;for(var e=0;e<c.length;e++){var k=c[e];k=j.one(k);k.unselectable();
this.get("cursor")&&k.css("cursor",this.get("cursor"))}a.on("mousedown",this._handleMouseDown,this)},destroy:function(){for(var a=this.get("dragNode"),c=this.get("handlers"),e=0;e<c.length;e++){var k=c[e];k.css("cursor")==this.get("cursor")&&k.css("cursor","auto")}a.detach("mousedown",this._handleMouseDown,this);this.detach()},_check:function(a){for(var c=this.get("handlers"),e=0;e<c.length;e++){var k=c[e];if(k.contains(a)||k[0]==a[0])return true}return false},_handleMouseDown:function(a){if(this._check(new n(a.target))){a.preventDefault();
this._prepare(a)}},_prepare:function(a){i._start(this);var c=this.get("node"),e=a.pageX;a=a.pageY;c=c.offset();this.startMousePos=this.mousePos={left:e,top:a};this.startNodePos=c;this._diff={left:e-c.left,top:a-c.top};this.set("diff",this._diff)},_move:function(a){var c=this.get("diff"),e=a.pageX-c.left;c=a.pageY-c.top;this.mousePos={left:a.pageX,top:a.pageY};a={left:e,top:c,pageX:a.pageX,pageY:a.pageY,drag:this};this.fire("drag",a);i.fire("drag",a)},_end:function(){this.fire("dragend",{drag:this});
i.fire("dragend",{drag:this})},_start:function(){this.fire("dragstart",{drag:this});i.fire("dragstart",{drag:this})}});return b},{requires:["ua","node","base","./ddm"]});
KISSY.add("dd/droppable",function(j,l,n,g){function i(){i.superclass.constructor.apply(this,arguments);this._init()}i.ATTRS={node:{setter:function(b){if(b){b=l.one(b);b.addClass(g.get("prefixCls")+"drop");return b}}}};j.extend(i,n,{getNodeFromTarget:function(b,a,c){b=this.get("node");var e=b[0];return e==a||e==c?null:b},_init:function(){g._regDrop(this)},_handleOut:function(){var b=g.get("activeDrag");this.get("node").removeClass(g.get("prefixCls")+"drop-over");var a={drop:this,drag:b};this.fire("dropexit",
a);g.fire("dropexit",a);b.get("node").removeClass(g.get("prefixCls")+"drag-over");b.fire("dragexit",a);g.fire("dragexit",a)},_handleOver:function(b){var a=g.get("activeDrop");g.set("activeDrop",this);var c=g.get("activeDrag");this.get("node").addClass(g.get("prefixCls")+"drop-over");b=j.mix({drag:c,drop:this},b);if(this!=a){c.get("node").addClass(g.get("prefixCls")+"drag-over");c.fire("dragenter",b);this.fire("dropenter",b);g.fire("dragenter",b);g.fire("dropenter",b)}else{c.fire("dragover",b);this.fire("dropover",
b);g.fire("dragover",b);g.fire("dropover",b)}},destroy:function(){g._unregDrop(this)}});return i},{requires:["node","base","./ddm"]});
KISSY.add("dd/proxy",function(j,l){function n(){n.superclass.constructor.apply(this,arguments);this[g]={}}var g="__proxy_destructors",i="__proxy";n.ATTRS={node:{value:function(b){return new l(b.get("node")[0].cloneNode(true))}},destroyOnEnd:{value:false}};j.extend(n,j.Base,{attach:function(b){function a(){var h=e.get("node"),o=b.get("node");if(!e[i]&&j.isFunction(h)){h=h(b);h.addClass("ks-dd-proxy");h.css("position","absolute");e[i]=h}o.parent().append(e[i]);e[i].show();e[i].offset(o.offset());b.set("dragNode",
o);b.set("node",e[i])}function c(){var h=e[i];b.get("dragNode").offset(h.offset());h.hide();if(e.get("destroyOnEnd")){h.remove();e[i]=null}b.set("node",b.get("dragNode"))}if(!b.__proxy_id){var e=this;b.on("dragstart",a);b.on("dragend",c);var k=b.__proxy_id=j.guid("dd-proxyid-");e[g][k]={drag:b,fn:function(){b.detach("dragstart",a);b.detach("dragend",c)}}}},unAttach:function(b){var a=b.__proxy_id;if(a){this[g][a].fn();delete this[g][a];delete b.__proxy_id}},destroy:function(){var b=this.get("node");
b&&!j.isFunction(b)&&b.remove();for(var a in this[g])this.unAttach(this[g][a].drag)}});return n},{requires:["node"]});
KISSY.add("dd/draggable-delegate",function(j,l,n,g,i){function b(){b.superclass.constructor.apply(this,arguments)}j.extend(b,n,{_init:function(){var a=this.get("handlers"),c=this.get("container");a.length==0&&a.push(this.get("selector"));c.on("mousedown",this._handleMouseDown,this)},_getHandler:function(a){for(var c=this.get("container"),e=this.get("handlers");a&&a[0]!==c[0];){for(var k=0;k<e.length;k++)if(g.test(a[0],e[k],c[0]))return a;a=a.parent()}},_getNode:function(a){for(var c=this.get("container"),
e=this.get("selector");a&&a[0]!=c[0];){if(g.test(a[0],e,c[0]))return a;a=a.parent()}},_handleMouseDown:function(a){var c=new i(a.target);if(c=c&&this._getHandler(c))if(c=this._getNode(c)){a.preventDefault();this.set("node",c);this.set("dragNode",c);this._prepare(a)}},destroy:function(){this.get("container").detach("mousedown",this._handleMouseDown,this);this.detach()}},{ATTRS:{container:{setter:function(a){return j.one(a)}},selector:{}}});return b},{requires:["./ddm","./draggable","dom","node"]});
KISSY.add("dd/droppable-delegate",function(j,l,n,g,i){function b(){b.superclass.constructor.apply(this,arguments)}j.extend(b,n,{getNodeFromTarget:function(a,c,e){a={left:a.pageX,top:a.pageY};var k=this.get("container"),h=this.get("selector");k=k.all(h);for(h=0;h<k.length;h++){var o=k[h],d=new i(o);if(!(o==e||o==c))if(l.inRegion(l.region(d),a)){this.set("lastNode",this.get("node"));this.set("node",d);return d}}return null},_handleOut:function(){b.superclass._handleOut.call(this);this.set("node",null);
this.set("lastNode",null)},_handleOver:function(a){var c=l.get("activeDrop");l.set("activeDrop",this);var e=l.get("activeDrag");this.get("node").addClass(l.get("prefixCls")+"drop-over");a=j.mix({drag:e,drop:this},a);var k=this.get("node"),h=this.get("lastNode");if(this!=c||!h||h&&h[0]!==k[0]){if(h){this.set("node",h);b.superclass._handleOut.call(this)}this.set("node",k);e.get("node").addClass(l.get("prefixCls")+"drag-over");e.fire("dragenter",a);this.fire("dropenter",a);l.fire("dragenter",a);l.fire("dropenter",
a)}else{e.fire("dragover",a);this.fire("dropover",a);l.fire("dragover",a);l.fire("dropover",a)}}},{ATTRS:{lastNode:{},selector:{},container:{setter:function(a){return j.one(a)}}}});return b},{requires:["./ddm","./droppable","dom","node"]});
KISSY.add("dd/scroll",function(j,l,n,g){function i(){i.superclass.constructor.apply(this,arguments);this[b]={}}var b="__dd_scrolls";i.ATTRS={node:{setter:function(a){return n.one(a)}},rate:{value:[10,10]},diff:{value:[20,20]}};j.extend(i,l,{getRegion:function(a){return!a||a==window?{width:g.viewportWidth(),height:g.viewportHeight()}:{width:a[0].offsetWidth,height:a[0].offsetHeight}},getOffset:function(a){return!a||a==window?{left:g.scrollLeft(),top:g.scrollTop()}:a.offset()},getScroll:function(a){return!a||
a==window?{left:g.scrollLeft(),top:g.scrollTop()}:{left:a[0].scrollLeft,top:a[0].scrollTop}},setScroll:function(a,c){if(!a||a==window)window.scrollTo(c.left,c.top);else{a[0].scrollLeft=c.left;a[0].scrollTop=c.top}},unAttach:function(a){var c=a["__dd-scroll-id-"];if(c){this[b][c].fn();delete a["__dd-scroll-id-"];delete this[b][c]}},destroy:function(){for(var a in this[b])this.unAttach(this[b][a].drag)},attach:function(a){function c(p){if(!p.fake){var u=h.get("node");f=p;m=j.clone(a.mousePos);p=h.getOffset(u);
m.left-=p.left;m.top-=p.top;r||k()}}function e(){clearTimeout(r);r=null}function k(){var p=h.get("node"),u=h.getRegion(p),w=u.width;u=u.height;var q=h.getScroll(p),t=j.clone(q),v=false;if(m.top-u>=-d[1]){q.top+=o[1];v=true}if(m.top<=d[1]){q.top-=o[1];v=true}if(m.left-w>=-d[0]){q.left+=o[0];v=true}if(m.left<=d[0]){q.left-=o[0];v=true}if(v){h.setScroll(p,q);r=setTimeout(arguments.callee,100);f.fake=true;if(!p||p==window){q=h.getScroll(p);f.left+=q.left-t.left;f.top+=q.top-t.top}a.fire("drag",f)}else r=
null}if(!a["__dd-scroll-id-"]){var h=this,o=h.get("rate"),d=h.get("diff"),f,m,r=null;a.on("drag",c);a.on("dragend",e);var s=a["__dd-scroll-id-"]=j.guid("__dd-scroll-id-");h[b][s]={drag:a,fn:function(){a.detach("drag",c);a.detach("dragend",e)}}}}});return i},{requires:["base","node","dom"]});
KISSY.add("dd",function(j,l,n,g,i,b,a,c){l={Draggable:n,Droppable:g,DDM:l,Proxy:i,DraggableDelegate:b,DroppableDelegate:a,Scroll:c};j.mix(j,l);return l},{requires:["dd/ddm","dd/draggable","dd/droppable","dd/proxy","dd/draggable-delegate","dd/droppable-delegate","dd/scroll"]});
