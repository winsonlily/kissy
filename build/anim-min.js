/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("anim/base",function(g,e,l,f,m,q,a){function r(b,c,d,h,i,p){if(b=e.get(b)){if(!(this instanceof r))return new r(b,c,d,h,i,p);var o=g.isPlainObject(d);c=c;this.domEl=b;if(g.isPlainObject(c))c=String(g.param(c,";")).replace(/=/g,":").replace(/%23/g,"#").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();var A=c,B=b;b={};var w=t.length,C=B.cloneNode(true);e.insertAfter(C,B);B=C.style;for(j(C,A);w--;){var x=t[w];if(B[x])b[x]=(u[x]||u["*"]).getter(C,x)}A=n(A);for(var D in A)b[D]=(u[D]||u["*"]).getter(C,
D);e.remove(C);this.props=b;this.targetStyle=c;if(o)o=g.merge(E,d);else{o=g.clone(E);if(d)o.duration=parseFloat(d)||1;if(g.isString(h)||g.isFunction(h))o.easing=h;if(g.isFunction(i))o.complete=i;if(p!==a)o.nativeSupport=p}if(!g.isEmptyObject(n(c)))o.nativeSupport=false;this.config=o;if(o.nativeSupport&&v()&&g.isString(h=o.easing))if(/cubic-bezier\([\s\d.,]+\)/.test(h)||(h=f.NativeTimeFunction[h])){o.easing=h;this.transitionName=v()}if(g.isFunction(i))this.callback=i}}function y(b,c){return c}function j(b,
c){if(m.ie&&c.indexOf(z)>-1){var d=c.match(/opacity\s*:\s*([^;]+)(;|$)/);d&&e.css(b,z,parseFloat(d[1]))}b.style.cssText+=";"+c;d=n(c);for(var h in d)b[h]=d[h]}function n(b){for(var c={},d=0;d<s.length;d++){var h=s[d].replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();if(h=b.match(RegExp(h+"\\s*:([^;]+)(;|$)")))c[s[d]]=g.trim(h[1])}return c}var t,s,z,E,k;l=l.Target;t="borderBottomWidth borderBottomStyle borderLeftWidth borderLeftStyle borderRightWidth borderRightStyle borderSpacing borderTopWidth borderTopStyle bottom fontFamily fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop maxHeight maxWidth minHeight minWidth opacity outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex".split(" ");
s=[];z="opacity";E={duration:1,easing:"easeNone",nativeSupport:true};r.PROPS=t;r.CUSTOM_ATTRS=s;r.PROP_OPS={"*":{getter:function(b,c){var d=e.css(b,c),h=parseFloat(d);d=(d+"").replace(/^[-\d.]+/,"");if(isNaN(h))return{v:d,u:"",f:y};return{v:h,u:d,f:this.interpolate}},setter:function(b,c,d){return e.css(b,c,d)},interpolate:function(b,c,d){return(b+(c-b)*d).toFixed(3)},eq:function(b,c){return b.v==c.v&&b.u==c.u}}};var u=r.PROP_OPS;g.augment(r,l,{isRunning:false,elapsedTime:0,start:0,finish:0,duration:0,
run:function(){var b=this.config,c=this.domEl,d,h=this.props,i={},p;if(!this.isRunning)if(this.fire("start")!==false){this.stop();this.duration=d=b.duration*1E3;if(this.transitionName)this._nativeRun();else{for(p in h)i[p]=(u[p]||u["*"]).getter(c,p);this.source=i;c=g.now();d=c+d;b=b.easing;if(g.isString(b))b=f[b]||f.easeNone;this.start=c;this.finish=d;this.easing=b;q.start(this)}this.isRunning=true;return this}},_complete:function(){this.fire("complete");this.callback&&this.callback()},_runFrame:function(){var b=
this.domEl,c=this.finish,d=this.start,h=this.duration,i=g.now(),p=this.source,o=this.easing,A=this.props,B;d=i-d;h=i>c?1:d/h;var w,C;this.elapsedTime=d;for(B in A){d=p[B];w=A[B];var x;x=w;var D=d,F=u[B];x=F&&F.eq?F.eq(x,D):u["*"].eq(x,D);if(!x){if(w.v==0)w.u=d.u;if(d.u!==w.u){d.v=0;d.u=w.u}x=w.f(d.v,w.v,o(h))+w.u;(u[B]||u["*"]).setter(b,B,x);if(w.f==y){d.v=w.v;d.u=w.u}}}if(this.fire("step")===false||(C=i>c)){this.stop();C&&this._complete()}},_nativeRun:function(){var b=this,c=b.domEl,d=b.duration,
h=b.config.easing,i=b.transitionName,p={};p[i+"Property"]="all";p[i+"Duration"]=d+"ms";p[i+"TimingFunction"]=h;e.css(c,p);g.later(function(){j(c,b.targetStyle)},0);g.later(function(){b.stop(true)},d)},stop:function(b){if(this.isRunning){if(this.transitionName)this._nativeStop(b);else{if(b){j(this.domEl,this.targetStyle);this._complete()}q.stop(this)}this.isRunning=false;return this}},_nativeStop:function(b){var c=this.domEl,d=this.transitionName,h=this.props,i;if(b){e.css(c,d+"Property","none");this._complete()}else{for(i in h)e.css(c,
i,e._getComputedStyle(c,i));e.css(c,d+"Property","none")}}});r.supportTransition=function(){if(k)return k;var b="transition",c,d=document.body;if(d.style[b]!==a)c=b;else g.each(["Webkit","Moz","O"],function(h){if(d.style[b=h+"Transition"]!==a){c=b;return false}});return k=c};var v=r.supportTransition;return r},{requires:["dom","event","./easing","ua","./manager"]});
KISSY.add("anim/color",function(g,e,l){function f(j){j=j.toLowerCase();var n;if(n=j.match(q))return[parseInt(n[1]),parseInt(n[2]),parseInt(n[3])];else if(n=j.match(a)){for(j=1;j<n.length;j++)if(n[j].length<2)n[j]+=n[j];return[parseInt(n[1],16),parseInt(n[2],16),parseInt(n[3],16)]}if(m[j])return m[j];return[255,255,255]}var m={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],
olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]},q=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,a=/^#?([0-9A-F]{1,2})([0-9A-F]{1,2})([0-9A-F]{1,2})$/i,r="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color outlineColor".split(" "),y=l.PROP_OPS;l=l.PROPS;l.push.apply(l,r);y.color={getter:function(j,n){return{v:f(e.css(j,n)),u:"",f:this.interpolate}},setter:y["*"].setter,interpolate:function(j,n,t){var s=
y["*"].interpolate;return"rgb("+[Math.floor(s(j[0],n[0],t)),Math.floor(s(j[1],n[1],t)),Math.floor(s(j[2],n[2],t))].join(", ")+")"},eq:function(j,n){return j.v+""==n.v+""}};g.each(r,function(j){y[j]=y.color})},{requires:["dom","./base"]});
KISSY.add("anim/easing",function(){var g=Math,e=g.PI,l=g.pow,f=g.sin,m=1.70158,q={easeNone:function(a){return a},easeIn:function(a){return a*a},easeOut:function(a){return(2-a)*a},easeBoth:function(a){return(a*=2)<1?0.5*a*a:0.5*(1- --a*(a-2))},easeInStrong:function(a){return a*a*a*a},easeOutStrong:function(a){return 1- --a*a*a*a},easeBothStrong:function(a){return(a*=2)<1?0.5*a*a*a*a:0.5*(2-(a-=2)*a*a*a)},elasticIn:function(a){if(a===0||a===1)return a;return-(l(2,10*(a-=1))*f((a-0.075)*2*e/0.3))},elasticOut:function(a){if(a===
0||a===1)return a;return l(2,-10*a)*f((a-0.075)*2*e/0.3)+1},elasticBoth:function(a){if(a===0||(a*=2)===2)return a;if(a<1)return-0.5*l(2,10*(a-=1))*f((a-0.1125)*2*e/0.45);return l(2,-10*(a-=1))*f((a-0.1125)*2*e/0.45)*0.5+1},backIn:function(a){if(a===1)a-=0.0010;return a*a*((m+1)*a-m)},backOut:function(a){return(a-=1)*a*((m+1)*a+m)+1},backBoth:function(a){if((a*=2)<1)return 0.5*a*a*(((m*=1.525)+1)*a-m);return 0.5*((a-=2)*a*(((m*=1.525)+1)*a+m)+2)},bounceIn:function(a){return 1-q.bounceOut(1-a)},bounceOut:function(a){return a<
1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},bounceBoth:function(a){if(a<0.5)return q.bounceIn(a*2)*0.5;return q.bounceOut(a*2-1)*0.5+0.5}};q.NativeTimeFunction={easeNone:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeBoth:"ease-in-out",easeInStrong:"cubic-bezier(0.9, 0.0, 0.9, 0.5)",easeOutStrong:"cubic-bezier(0.1, 0.5, 0.1, 1.0)",easeBothStrong:"cubic-bezier(0.9, 0.0, 0.1, 1.0)"};return q});
KISSY.add("anim/manager",function(g){function e(f){f[l]=f[l]||g.guid("anim-");return f[l]}var l=g.guid("anim-");return{interval:20,runnings:{},timer:null,start:function(f){var m=e(f);if(!this.runnings[m]){this.runnings[m]=f;this.startTimer()}},stop:function(f){this.notRun(f)},notRun:function(f){delete this.runnings[e(f)];g.isEmptyObject(this.runnings)&&this.stopTimer()},pause:function(f){this.notRun(f)},resume:function(f){this.start(f)},startTimer:function(){var f=this;if(!f.timer)f.timer=setTimeout(function(){if(f.runFrames())f.stopTimer();
else{f.timer=null;f.startTimer()}},f.interval)},stopTimer:function(){var f=this.timer;if(f){clearTimeout(f);this.timer=null}},runFrames:function(){var f=true,m=this.runnings,q;for(q in m)if(m.hasOwnProperty(q)){f=false;m[q]._runFrame()}return f}}});
KISSY.add("anim/node-plugin",function(g,e,l,f,m){function q(k,u,v,b,c,d,h){if(u==="toggle"){c=e.css(k,r)===y?1:0;u="show"}if(c)e.css(k,r,e.data(k,r)||"");var i={},p={};g.each(E[u],function(o){if(o===j){i[j]=e.css(k,j);e.css(k,j,n)}else if(o===t){i[t]=e.css(k,t);p.opacity=c?1:0;c&&e.css(k,t,0)}else if(o===s){i[s]=e.css(k,s);p.height=c?e.css(k,s)||k.naturalHeight:0;c&&e.css(k,s,0)}else if(o===z){i[z]=e.css(k,z);p.width=c?e.css(k,z)||k.naturalWidth:0;c&&e.css(k,z,0)}});return(new l(k,p,v,d||"easeOut",
function(){if(!c){var o=k.style,A=o[r];if(A!==y){A&&e.data(k,r,A);o[r]=y}i[s]&&e.css(k,{height:i[s]});i[z]&&e.css(k,{width:i[z]});i[t]&&e.css(k,{opacity:i[t]});i[j]&&e.css(k,{overflow:i[j]})}b&&g.isFunction(b)&&b()},h)).run()}f=f.List.prototype;var a="ksAnims"+g.now(),r="display",y="none",j="overflow",n="hidden",t="opacity",s="height",z="width",E={show:[j,t,s,z],fade:[t],slide:[j,s]};(function(k){function u(v,b){var c=e.data(v,a);c||e.data(v,a,c=[]);b.on("complete",function(){var d=e.data(v,a);if(d){var h=
g.indexOf(b,d);h>=0&&d.splice(h,1);d.length||e.removeData(v,a)}});c.push(b)}k.animate=function(){var v=g.makeArray(arguments);g.each(this,function(b){var c=l.apply(m,[b].concat(v)).run();u(b,c)});return this};k.stop=function(v){g.each(this,function(b){var c=e.data(b,a);if(c){g.each(c,function(d){d.stop(v)});e.removeData(b,a)}})};g.each({show:["show",1],hide:["show",0],toggle:["toggle"],fadeIn:["fade",1],fadeOut:["fade",0],slideDown:["slide",1],slideUp:["slide",0]},function(v,b){k[b]=function(c,d,
h,i){e[b]&&arguments.length===0?e[b](this):g.each(this,function(p){var o=q(p,v[0],c,d,v[1],h,i);u(p,o)});return this}})})(f)},{requires:["dom","anim/base","node"]});KISSY.add("anim/scroll",function(g,e,l){var f=l.PROP_OPS;l.CUSTOM_ATTRS.push("scrollLeft","scrollTop");f.scrollLeft=f.scrollTop={getter:function(m,q){return{v:m[q],u:"",f:f["*"].interpolate}},setter:function(m,q,a){m[q]=a}}},{requires:["dom","./base"]});
KISSY.add("anim",function(g,e,l){e.Easing=l;return e},{requires:["anim/base","anim/easing","anim/node-plugin","anim/color","anim/scroll"]});
