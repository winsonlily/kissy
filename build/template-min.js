/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 19 20:09
*/
KISSY.add("template/template",function(b){var j={},i={},n={"#":"start","/":"end"},k={},h=function(a){a in k||(k[a]=RegExp(a,"ig"));return k[a]},p=function(a){var d,e;return b.trim(a).replace(h("[\r\t\n]")," ").replace(h("([\"'])"),"\\$1").replace(h("{{([#/]?)(?!}})([^}]*)}}"),function(f,g,c){d="";if(g){c=b.trim(c);e=c.indexOf(" ");c=e===-1?[c,""]:[c.substring(0,c.indexOf(" ")),c.substring(c.indexOf(" "))];for(var o in l)if(c[0]===o){c.shift();if(g in n){f=l[o][n[g]];d=b.isFunction(f)?String(f.apply(this,
b.trim(c.join("").replace(h("\\\\(['\"])"),"$1")).split(/\s+/))):String(f.replace(h("KS_TEMPL_STAT_PARAM"),c.join("").replace(h("\\\\(['\"])"),"$1")))}}}else d="KS_TEMPL.push("+c.replace(h("\\\\(['\"])"),"$1")+");";return'");'+d+'KS_TEMPL.push("'})},l={"if":{start:"if(KS_TEMPL_STAT_PARAM){",end:"}"},"else":{start:"}else{"},elseif:{start:"}else if(KS_TEMPL_STAT_PARAM){"},each:{start:function(){var a=[].slice.call(arguments),d="_ks_value",e="_ks_index";if(a[1]==="as"&&a[2]){d=a[2]||d;e=a[3]||e}return"KISSY.each("+
a[0]+", function("+d+", "+e+"){"},end:"});"},"!":{start:"/*KS_TEMPL_STAT_PARAM*/"}},m=function(a,d){b.mix(j,d);if(!(a in i)){var e="KS_DATA_"+b.now(),f,g=["var KS_TEMPL=[],KS_TEMPL_STAT_PARAM=false;with(",e,'||{}){try{KS_TEMPL.push("',p(a),'");}catch(e){KS_TEMPL=["KISSY.Template: Render Error. " + e.message]}};return KS_TEMPL.join("");'];try{f=new Function(e,g.join(""))}catch(c){g[3]='");KS_TEMPL.push("KISSY.Template: Syntax Error. ,'+c.message+'");KS_TEMPL.push("';f=new Function(e,g.join(""))}i[a]=
{name:e,parser:g.join(""),render:f}}return i[a]};b.mix(m,{log:function(a){if(!(a in i)){m(a,undefined);this.log(a)}},addStatement:function(a,d){if(b.isString(a)&&b.isObject(d))l[a]=d}});return m},{requires:["core"]});KISSY.add("template/template-node",function(b){b.mix(b,{tmpl:function(j,i){return b.one(b.DOM.create(b.Template(b.one(j).html()).render(i)))}})},{requires:["./template"]});KISSY.add("template",function(b,j){return b.Template=j},{requires:["template/template","template/template-node"]});
