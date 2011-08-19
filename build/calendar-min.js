/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 19 20:08
*/
KISSY.add("calendar/base",function(k,h,i,m){function j(a,d){this._init(a,d)}var e=i.Target,b=h.all;k.augment(j,{_init:function(a,d){var c=h.one(a);this.id=this.C_Id=this._stamp(c);this._buildParam(d);if(this.popup){this.trigger=c;this.con=new h("<div>");h.one("body").append(this.con);this.C_Id=this._stamp(this.con);this.con.css({top:"0px",position:"absolute",background:"white",visibility:"hidden"})}else this.con=c;c=function(){};k.augment(c,e);c=new c;k.mix(this,c);this.render();this._buildEvent();
return this},render:function(a){var d=0,c,f;a=a||{};this._parseParam(a);this.ca=[];this.con.addClass("ks-cal-call ks-clearfix multi-"+this.pages);this.con.html("");d=0;for(f=[this.year,this.month];d<this.pages;d++){if(d===0)a=true;else{a=false;f=this._computeNextMonth(f)}c=d==this.pages-1;this.ca.push(new this.Page({year:f[0],month:f[1],prevArrow:a,nextArrow:c,showTime:this.showTime},this));this.ca[d].render()}return this},_stamp:function(a){a.attr("id")||a.attr("id",k.guid("K_Calendar"));return a.attr("id")},
_showdate:function(a,d){var c=new Date(d-0+a*864E5);c=c.getFullYear()+"/"+(c.getMonth()+1)+"/"+c.getDate();return new Date(c)},_buildEvent:function(){var a=this;if(!a.popup)return this;for(var d=0;d<a.EV.length;d++)a.EV[d]!==m&&a.EV[d].detach();a.EV[0]=h.one("body").on("click",function(c){var f=b(c.target);if(f.attr("id")!==a.C_Id)if(!((f.hasClass("ks-next")||f.hasClass("ks-prev"))&&f[0].tagName==="A"))if(f.attr("id")!=a.id)if(a.con.css("visibility")!="hidden")(function(l,g){return l[0]>g[0].x&&l[0]<
g[1].x&&l[1]>g[0].y&&l[1]<g[1].y})([c.pageX,c.pageY],[{x:a.con.offset().left,y:a.con.offset().top},{x:a.con.offset().left+a.con.width(),y:a.con.offset().top+a.con.height()}])||a.hide()});for(d=0;d<a.triggerType.length;d++)a.EV[1]=h.one("#"+a.id).on(a.triggerType[d],function(c){c.target=b(c.target);c.preventDefault();var f=a.triggerType;if(k.inArray("click",f)&&k.inArray("focus",f))c.type=="focus"&&a.toggle();else if(k.inArray("click",f)&&!k.inArray("focus",f))c.type=="click"&&a.toggle();else!k.inArray("click",
f)&&k.inArray("focus",f)?setTimeout(function(){a.toggle()},170):a.toggle()});return this},toggle:function(){this.con.css("visibility")=="hidden"?this.show():this.hide()},show:function(){this.con.css("visibility","");var a=this.trigger.offset().left,d=this.trigger[0].offsetHeight||this.trigger.height();d=this.trigger.offset().top+d;this.con.css("left",a.toString()+"px");this.con.css("top",d.toString()+"px");return this},hide:function(){this.con.css("visibility","hidden");return this},_buildParam:function(a){function d(g,
n){var p=a[n];c[n]=p===m||p===null?g:p}var c=this;if(a===m||a===null)a={};k.each({date:new Date,startDay:0,pages:1,closable:false,rangeSelect:false,minDate:false,maxDate:false,multiSelect:false,navigator:true,popup:false,showTime:false,triggerType:["click"]},d);if(typeof a.triggerType==="string")a.triggerType=[a.triggerType];d(c.date,"selected");if(a.startDay)c.startDay=(7-a.startDay)%7;if(a.range!==m&&a.range!==null){var f=c._showdate(1,new Date(a.range.start.getFullYear()+"/"+(a.range.start.getMonth()+
1)+"/"+a.range.start.getDate())),l=c._showdate(1,new Date(a.range.end.getFullYear()+"/"+(a.range.end.getMonth()+1)+"/"+a.range.end.getDate()));c.range={start:f,end:l}}else c.range={start:null,end:null};c.EV=[];return this},_parseParam:function(a){var d;if(a===m||a===null)a={};for(d in a)this[d]=a[d];this._handleDate();return this},_templetShow:function(a,d){var c,f,l,g;if(d instanceof Array){c="";for(f=0;f<d.length;f++)c+=arguments.callee(a,d[f]);a=c}else{c=a.match(/{\$(.*?)}/g);if(d!==m&&c!==null){f=
0;for(l=c.length;f<l;f++){g=c[f].replace(/({\$)|}/g,"");g=d[g]!==m?d[g]:"";a=a.replace(c[f],g)}}}return a},_handleDate:function(){var a=this.date;this.weekday=a.getDay()+1;this.day=a.getDate();this.month=a.getMonth();this.year=a.getFullYear();return this},_getHeadStr:function(a,d){return a.toString()+"\u5e74"+(Number(d)+1).toString()+"\u6708"},_monthAdd:function(){if(this.month==11){this.year++;this.month=0}else this.month++;this.date=new Date(this.year.toString()+"/"+(this.month+1).toString()+"/1");return this},
_monthMinus:function(){if(this.month===0){this.year--;this.month=11}else this.month--;this.date=new Date(this.year.toString()+"/"+(this.month+1).toString()+"/1");return this},_computeNextMonth:function(a){var d=a[0];a=a[1];if(a==11){d++;a=0}else a++;return[d,a]},_handleOffset:function(){var a=["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"],d=this.startDay,c="";c=[];for(var f=0;f<7;f++)c[f]={day:a[(f-d+7)%7]};c=this._templetShow("<span>{$day}</span>",c);return{day_html:c}},_handleRange:function(a){if(this.range.start===
null&&this.range.end===null||this.range.start!==null&&this.range.end!==null){this.range.start=a;this.range.end=null;this.render()}else if(this.range.start!==null&&this.range.end===null){this.range.end=a;if(this.range.start.getTime()>this.range.end.getTime()){a=this.range.start;this.range.start=this.range.end;this.range.end=a}this.fire("rangeSelect",this.range);this.render()}return this}});return j},{requires:["node","event"]});
KISSY.add("calendar/date",function(){var k=function(){var h=/w{1}|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,i=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,m=/[^-+\dA-Z]/g,j=function(a,d){a=String(a);for(d=d||2;a.length<d;)a="0"+a;return a},e={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",longTime:"h:MM:ss TT Z",
isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUTCDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",localShortDate:"yy\u5e74mm\u6708dd\u65e5",localShortDateTime:"yy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",localLongDate:"yyyy\u5e74mm\u6708dd\u65e5",localLongDateTime:"yyyy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",localFullDate:"yyyy\u5e74mm\u6708dd\u65e5 w",localFullDateTime:"yyyy\u5e74mm\u6708dd\u65e5 w hh:MM:ss TT"},b={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","\u661f\u671f\u65e5","\u661f\u671f\u4e00","\u661f\u671f\u4e8c","\u661f\u671f\u4e09","\u661f\u671f\u56db","\u661f\u671f\u4e94",
"\u661f\u671f\u516d"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};return function(a,d,c){if(arguments.length==1&&Object.prototype.toString.call(a)=="[object String]"&&!/\d/.test(a)){d=a;a=undefined}a=a?new Date(a):new Date;if(isNaN(a))throw SyntaxError("invalid date");d=String(e[d]||d||e["default"]);if(d.slice(0,4)=="UTC:"){d=d.slice(4);c=true}var f=c?"getUTC":"get",
l=a[f+"Date"](),g=a[f+"Day"](),n=a[f+"Month"](),p=a[f+"FullYear"](),o=a[f+"Hours"](),s=a[f+"Minutes"](),t=a[f+"Seconds"]();f=a[f+"Milliseconds"]();var r=c?0:a.getTimezoneOffset(),u={d:l,dd:j(l,undefined),ddd:b.dayNames[g],dddd:b.dayNames[g+7],w:b.dayNames[g+14],m:n+1,mm:j(n+1,undefined),mmm:b.monthNames[n],mmmm:b.monthNames[n+12],yy:String(p).slice(2),yyyy:p,h:o%12||12,hh:j(o%12||12,undefined),H:o,HH:j(o,undefined),M:s,MM:j(s,undefined),s:t,ss:j(t,undefined),l:j(f,3),L:j(f>99?Math.round(f/10):f,undefined),
t:o<12?"a":"p",tt:o<12?"am":"pm",T:o<12?"A":"P",TT:o<12?"AM":"PM",Z:c?"UTC":(String(a).match(i)||[""]).pop().replace(m,""),o:(r>0?"-":"+")+j(Math.floor(Math.abs(r)/60)*100+Math.abs(r)%60,4),S:["th","st","nd","rd"][l%10>3?0:(l%100-l%10!=10)*l%10]};return d.replace(h,function(q){return q in u?u[q]:q.slice(1,q.length-1)})}}();return{format:function(h,i,m){return k(h,i,m)},parse:function(h){var i=null;if(i instanceof Date)h=i;else{i=new Date(h);h=i instanceof Date&&i!="Invalid Date"&&!isNaN(i)?i:null}return h}}});
KISSY.add("calendar/page",function(k,h,i,m){k.augment(m,{Page:function(j,e){this.father=e;this.month=Number(j.month);this.year=Number(j.year);this.prevArrow=j.prevArrow;this.nextArrow=j.nextArrow;this.timmer=this.node=null;this.id="";this.EV=[];this.html=['<div class="ks-cal-box" id="{$id}"><div class="ks-cal-hd"><a href="javascript:void(0);" class="ks-prev {$prev}"><</a><a href="javascript:void(0);" class="ks-title">{$title}</a><a href="javascript:void(0);" class="ks-next {$next}">></a></div><div class="ks-cal-bd"><div class="ks-whd">',
e._handleOffset().day_html,'</div><div class="ks-dbd ks-clearfix">{$ds}</div></div><div class="ks-setime hidden"></div><div class="ks-cal-ft {$showtime}"><div class="ks-cal-time">\u65f6\u95f4\uff1a00:00 &hearts;</div></div><div class="ks-selectime hidden"></div></div><!--#ks-cal-box--\>'].join("");this.nav_html='<p>\u6708<select value="{$the_month}"><option class="m1" value="1">01</option><option class="m2" value="2">02</option><option class="m3" value="3">03</option><option class="m4" value="4">04</option><option class="m5" value="5">05</option><option class="m6" value="6">06</option><option class="m7" value="7">07</option><option class="m8" value="8">08</option><option class="m9" value="9">09</option><option class="m10" value="10">10</option><option class="m11" value="11">11</option><option class="m12" value="12">12</option></select></p><p>\u5e74<input type="text" value="{$the_year}" onfocus="this.select()"/></p><p><button class="ok">\u786e\u5b9a</button><button class="cancel">\u53d6\u6d88</button></p>';
this.Verify=function(){return{isDay:function(b){if(!/^\d+$/i.test(b))return false;b=Number(b);return!(b<1||b>31)},isYear:function(b){if(!/^\d+$/i.test(b))return false;b=Number(b);return!(b<100||b>1E4)},isMonth:function(b){if(!/^\d+$/i.test(b))return false;b=Number(b);return!(b<1||b>12)}}};this._renderUI=function(){var b={};this.HTML="";b.prev="";b.next="";b.title="";b.ds="";if(!this.prevArrow)b.prev="hidden";if(!this.nextArrow)b.next="hidden";if(!this.father.showtime)b.showtime="hidden";b.id=this.id=
"ks-cal-"+Math.random().toString().replace(/.\./i,"");b.title=this.father._getHeadStr(this.year,this.month);this.createDS();b.ds=this.ds;this.father.con.append(this.father._templetShow(this.html,b));this.node=i.one("#"+this.id);if(this.father.showTime){b=this.node.one(".ks-cal-ft");b.removeClass("hidden");this.timmer=new this.father.TimeSelector(b,this.father)}return this};this._buildEvent=function(){var b=this,a,d=i.one("#"+b.id);for(a=0;a<b.EV.length;a++)typeof b.EV[a]!="undefined"&&b.EV[a].detach();
b.EV[0]=d.one("div.ks-dbd").on("click",function(c){c.target=i(c.target);if(!c.target.hasClass("ks-null"))if(!c.target.hasClass("ks-disabled")){c=Number(c.target.html());var f=new Date("2010/01/01");f.setYear(b.year);f.setMonth(b.month);f.setDate(c);b.father.dt_date=f;b.father.fire("select",{date:f});b.father.popup&&b.father.closable&&b.father.hide();b.father.rangeSelect&&b.father._handleRange(f);b.father.render({selected:f})}});b.EV[1]=d.one("a.ks-prev").on("click",function(c){c.preventDefault();
b.father._monthMinus().render();b.father.fire("monthChange",{date:new Date(b.father.year+"/"+(b.father.month+1)+"/01")})});b.EV[2]=d.one("a.ks-next").on("click",function(c){c.preventDefault();b.father._monthAdd().render();b.father.fire("monthChange",{date:new Date(b.father.year+"/"+(b.father.month+1)+"/01")})});if(b.father.navigator){b.EV[3]=d.one("a.ks-title").on("click",function(c){try{b.timmer.hidePopup();c.preventDefault()}catch(f){}c.target=i(c.target);c=d.one(".ks-setime");c.html("");var l=
b.father._templetShow(b.nav_html,{the_month:b.month+1,the_year:b.year});c.html(l);c.removeClass("hidden");d.one("input").on("keydown",function(g){g.target=i(g.target);if(g.keyCode==38){g.target.val(Number(g.target.val())+1);g.target[0].select()}if(g.keyCode==40){g.target.val(Number(g.target.val())-1);g.target[0].select()}if(g.keyCode==13){g=d.one(".ks-setime").one("select").val();var n=d.one(".ks-setime").one("input").val();d.one(".ks-setime").addClass("hidden");if(b.Verify().isYear(n))if(b.Verify().isMonth(g)){b.father.render({date:new Date(n+
"/"+g+"/01")});b.father.fire("monthChange",{date:new Date(n+"/"+g+"/01")})}}})});b.EV[4]=d.one(".ks-setime").on("click",function(c){c.preventDefault();c.target=i(c.target);if(c.target.hasClass("ok")){c=d.one(".ks-setime").one("select").val();var f=d.one(".ks-setime").one("input").val();d.one(".ks-setime").addClass("hidden");if(b.Verify().isYear(f))if(b.Verify().isMonth(c)){b.father.render({date:new Date(f+"/"+c+"/01")});b.father.fire("monthChange",{date:new Date(f+"/"+c+"/01")})}}else c.target.hasClass("cancel")&&
d.one(".ks-setime").addClass("hidden")})}return this};this._getNode=function(){return this.node};this._getNumOfDays=function(b,a){return 32-(new Date(b,a-1,32)).getDate()};this.createDS=function(){var b="",a=((new Date(this.year+"/"+(this.month+1)+"/01")).getDay()+this.father.startDay+7)%7,d=this._getNumOfDays(this.year,this.month+1)+a,c,f;for(c=0;c<d;c++){f=/532/.test(h.webkit)?new Date(this.year+"/"+Number(this.month+1)+"/"+(c+1-a).toString()):new Date(this.year+"/"+Number(this.month+1)+"/"+(c+
2-a).toString());var l=new Date(this.year+"/"+Number(this.month+1)+"/"+(c+1-a).toString());b+=c<a?'<a href="javascript:void(0);" class="ks-null">0</a>':this.father.minDate instanceof Date&&(new Date(this.year+"/"+(this.month+1)+"/"+(c+2-a))).getTime()<this.father.minDate.getTime()+1?'<a href="javascript:void(0);" class="ks-disabled">'+(c-a+1)+"</a>":this.father.maxDate instanceof Date&&(new Date(this.year+"/"+(this.month+1)+"/"+(c+1-a))).getTime()>this.father.maxDate.getTime()?'<a href="javascript:void(0);" class="ks-disabled">'+
(c-a+1)+"</a>":this.father.range.start!==null&&this.father.range.end!==null&&f.getTime()>=this.father._showdate(1,this.father.range.start).getTime()&&l.getTime()<this.father._showdate(1,this.father.range.end).getTime()?c==a+(new Date).getDate()-1&&(new Date).getFullYear()==this.year&&(new Date).getMonth()==this.month?'<a href="javascript:void(0);" class="ks-range ks-today">'+(c-a+1)+"</a>":'<a href="javascript:void(0);" class="ks-range">'+(c-a+1)+"</a>":c==a+(new Date).getDate()-1&&(new Date).getFullYear()==
this.year&&(new Date).getMonth()==this.month?'<a href="javascript:void(0);" class="ks-today">'+(c-a+1)+"</a>":c==a+this.father.selected.getDate()-1&&this.month==this.father.selected.getMonth()&&this.year==this.father.selected.getFullYear()?'<a href="javascript:void(0);" class="ks-selected">'+(c-a+1)+"</a>":'<a href="javascript:void(0);">'+(c-a+1)+"</a>"}if(d%7!==0)for(c=0;c<7-d%7;c++)b+='<a href="javascript:void(0);" class="ks-null">0</a>';this.ds=b;return this};this.render=function(){this._renderUI();
this._buildEvent();return this}}});return m},{requires:["ua","node","calendar/base"]});
KISSY.add("calendar/time",function(k,h,i){k.augment(i,{TimeSelector:function(m,j){this.father=j;this.fcon=m.parent(".ks-cal-box");this.popupannel=this.fcon.one(".ks-selectime");if(typeof j._time=="undefined")j._time=new Date;this.time=j._time;this.status="s";this.ctime=h('<div class="ks-cal-time">\u65f6\u95f4\uff1a<span class="h">h</span>:<span class="m">m</span>:<span class="s">s</span><!--{{arrow--\><div class="cta"><button class="u"></button><button class="d"></button></div><!--arrow}}--\></div>');this.button=
h('<button class="ct-ok">\u786e\u5b9a</button>');this.h_a=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];this.m_a=["00","10","20","30","40","50"];this.s_a=["00","10","20","30","40","50"];this.parseSubHtml=function(e){for(var b="",a=0;a<e.length;a++)b+='<a href="javascript:void(0);" class="item">'+e[a]+"</a>";b+='<a href="javascript:void(0);" class="x">x</a>';return b};this.showPopup=function(e){this.popupannel.html(e);this.popupannel.removeClass("hidden");
e=this.status;this.ctime.all("span").removeClass("on");switch(e){case "h":this.ctime.all(".h").addClass("on");break;case "m":this.ctime.all(".m").addClass("on");break;case "s":this.ctime.all(".s").addClass("on")}};this.hidePopup=function(){this.popupannel.addClass("hidden")};this.render=function(){var e=this.get("h"),b=this.get("m"),a=this.get("s");this.father._time=this.time;this.ctime.all(".h").html(e);this.ctime.all(".m").html(b);this.ctime.all(".s").html(a);return this};this.set=function(e,b){b=
Number(b);switch(e){case "h":this.time.setHours(b);break;case "m":this.time.setMinutes(b);break;case "s":this.time.setSeconds(b)}this.render()};this.get=function(e){var b=this.time;switch(e){case "h":return b.getHours();case "m":return b.getMinutes();case "s":return b.getSeconds()}};this.add=function(){var e=this.status,b=this.get(e);b++;this.set(e,b)};this.minus=function(){var e=this.status,b=this.get(e);b--;this.set(e,b)};this._init=function(){var e=this;m.html("").append(e.ctime);m.append(e.button);
e.render();e.popupannel.on("click",function(b){b=h(b.target);if(b.hasClass("x"))e.hidePopup();else if(b.hasClass("item")){b=Number(b.html());e.set(e.status,b);e.hidePopup()}});e.button.on("click",function(){var b=typeof e.father.dt_date=="undefined"?e.father.date:e.father.dt_date;b.setHours(e.get("h"));b.setMinutes(e.get("m"));b.setSeconds(e.get("s"));e.father.fire("timeSelect",{date:b});e.father.popup&&e.father.closable&&e.father.hide()});e.ctime.on("keyup",function(b){if(b.keyCode==38||b.keyCode==
37){b.preventDefault();e.add()}if(b.keyCode==40||b.keyCode==39){b.preventDefault();e.minus()}});e.ctime.one(".u").on("click",function(){e.hidePopup();e.add()});e.ctime.one(".d").on("click",function(){e.hidePopup();e.minus()});e.ctime.one(".h").on("click",function(){var b=e.parseSubHtml(e.h_a);e.status="h";e.showPopup(b)});e.ctime.one(".m").on("click",function(){var b=e.parseSubHtml(e.m_a);e.status="m";e.showPopup(b)});e.ctime.one(".s").on("click",function(){var b=e.parseSubHtml(e.s_a);e.status="s";
e.showPopup(b)})};this._init()}});return i},{requires:["node","calendar/base"]});KISSY.add("calendar",function(k,h,i,m,j){k.Calendar=h;k.Date=j;return h},{requires:["calendar/base","calendar/page","calendar/time","calendar/date"]});
