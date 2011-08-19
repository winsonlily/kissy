/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 19 20:09
*/
KISSY.add("tree/basenode",function(g,e,h,d,f){var b=e.all,k=f.ITEM_CLS,i=e.KeyCodes,l=h.create(d.ModelControl,[d.DecorateChild],{_keyNav:function(a){var c=true,j,m=this.get("children");switch(a.keyCode){case i.HOME:j=this.get("tree");break;case i.END:j=this.get("tree").getLastVisibleDescendant();break;case i.UP:j=this.getPreviousVisibleNode();break;case i.DOWN:j=this.getNextVisibleNode();break;case i.LEFT:if(this.get("expanded")&&(m.length||this.get("isLeaf")===false))this.set("expanded",false);else j=
this.get("parent");break;case i.RIGHT:if(m.length||this.get("isLeaf")===false)this.get("expanded")?m[0].select():this.set("expanded",true);break;default:c=false}j&&j.select();return c},getLastVisibleDescendant:function(){var a=this.get("children");if(!this.get("expanded")||!a.length)return this;return a[a.length-1].getLastVisibleDescendant()},getNextVisibleNode:function(){var a=this.get("children"),c=this.get("parent");if(this.get("expanded")&&a.length)return a[0];for(a=this.next();c&&!a;){a=c.next();
c=c.get("parent")}return a},getPreviousVisibleNode:function(){var a=this.prev();return a=a?a.getLastVisibleDescendant():this.get("parent")},next:function(){var a=this.get("parent");if(!a)return null;a=a.get("children");var c=g.indexOf(this,a);if(c==a.length-1)return null;return a[c+1]},prev:function(){var a=this.get("parent");if(!a)return null;a=a.get("children");var c=g.indexOf(this,a);if(c===0)return null;return a[c-1]},select:function(){this.get("tree").set("selectedItem",this)},_performInternal:function(a){var c=
b(a.target),j=this.get("tree"),m=this.get("view");j.get("el")[0].focus();if(c.equals(m.get("expandIconEl")))a.type!="dblclick"&&this.set("expanded",!this.get("expanded"));else if(a.type=="dblclick")this.set("expanded",!this.get("expanded"));else{this.select();j.fire("click",{target:this})}},decorateChildrenInternal:function(a,c,j){this.addChild(new a({srcNode:c,tree:this.get("tree"),prefixCls:j}))},addChild:function(a){var c=this.get("tree");a.set("tree",c);a.set("depth",this.get("depth")+1);l.superclass.addChild.call(this,
a);this._updateRecursive();c._register(a);g.each(a.get("children"),function(j){c._register(j)})},_computeClass:function(a){this.get("view")._computeClass(this.get("children"),this.get("parent"),a)},_updateRecursive:function(){var a=this.get("children").length;this._computeClass("_updateRecursive");g.each(this.get("children"),function(c,j){c._computeClass("_updateRecursive_children");c.get("view").set("ariaPosInSet",j+1);c.get("view").set("ariaSize",a)})},removeChild:function(a){var c=this.get("tree");
c._unregister(a);g.each(a.get("children"),function(j){c._unregister(j)});l.superclass.removeChild.apply(this,g.makeArray(arguments));this._updateRecursive()},_uiSetExpanded:function(a){var c=this.get("tree");this._computeClass("expanded-"+a);a?c.fire("expand",{target:this}):c.fire("collapse",{target:this})},_uiSetSelected:function(a){this._forwardSetAttrToView("selected",a)},expandAll:function(){this.set("expanded",true);g.each(this.get("children"),function(a){a.set("expanded",true)})},collapseAll:function(){this.set("expanded",
false);g.each(this.get("children"),function(a){a.set("expanded",false)})}},{DefaultRender:f,ATTRS:{handleMouseEvents:{value:false},id:{getter:function(){var a=this.get("el").attr("id");a||this.get("el").attr("id",a=g.guid("tree-node"));return a}},content:{view:true},isLeaf:{view:true},expandIconEl:{view:true},iconEl:{view:true},selected:{},expanded:{value:false,view:true},tooltip:{view:true},tree:{},depth:{value:0,view:true},focusable:{value:false},decorateChildCls:{value:"tree-children"}},HTML_PARSER:{expanded:function(a){a=
a.one("."+this.getCls("tree-children"));if(!a)return false;return a.css("display")!="none"}}});d.UIStore.setUIByClass(k,{priority:10,ui:l});return l},{requires:["node","uibase","component","./basenoderender"]});
KISSY.add("tree/basenoderender",function(g,e,h,d){var f=e.all;return h.create(d.Render,{_computeClass:function(b,k){var i=this.get("expanded"),l=this.get("isLeaf"),a=this.get("iconEl"),c=this.get("expandIconEl"),j=this.get("childrenEl"),m="inline-block tree-icon tree-expand-icon ",n=this.getCls("inline-block tree-icon tree-file-icon "),p=this.getCls(["inline-block tree-icon",i?"tree-expanded-folder-icon":"tree-collapsed-folder-icon",""].join(" ")),o=!k||k.get("children")[k.get("children").length-
1].get("view")==this;if(l===false||l===undefined&&b.length){a.attr("class",p);m+=i?"tree-expand-icon-{t}minus":"tree-expand-icon-{t}plus";c.attr("class",this.getCls(g.substitute(m,{t:o?"l":"t"})))}else{a.attr("class",n);c.attr("class",this.getCls(g.substitute(m+"tree-expand-icon-{t}",{t:o?"l":"t"})))}j&&j.attr("class",this.getCls(o?"tree-lchildren":"tree-children"))},createDom:function(){var b=this.get("el"),k,i,l=this.get("labelEl");i=f("<div class='"+this.getCls("tree-row")+"'/>");k=g.guid("tree-item");
this.set("rowEl",i);var a=f("<div/>").appendTo(i),c=f("<div />").appendTo(i);if(!l){l=f("<span id='"+k+"' class='"+this.getCls("tree-item-label")+"'/>");this.set("labelEl",l)}l.appendTo(i);b.attr({role:"treeitem","aria-labelledby":k}).prepend(i);this.set("expandIconEl",a);this.set("iconEl",c)},_uiSetExpanded:function(b){var k=this.get("childrenEl");if(k)if(b)b&&k.show();else k.hide();this.get("el").attr("aria-expanded",b)},_setSelected:function(b,k){this.get("rowEl")[b?"addClass":"removeClass"](this._completeClasses(k,
"-selected"))},_uiSetContent:function(b){this.get("labelEl").html(b)},_uiSetDepth:function(b){this.get("el").attr("aria-level",b)},_uiSetAriaSize:function(b){this.get("el").attr("aria-setsize",b)},_uiSetAriaPosInSet:function(b){this.get("el").attr("aria-posinset",b)},_uiSetTooltip:function(b){this.get("el").attr("title",b)},getContentElement:function(){if(this.get("childrenEl"))return this.get("childrenEl");var b=f("<div "+(this.get("expanded")?"":"style='display:none'")+" role='group'></div>").appendTo(this.get("el"));
this.set("childrenEl",b);return b}},{ATTRS:{ariaSize:{},ariaPosInSet:{},childrenEl:{},expandIconEl:{},tooltip:{},iconEl:{},expanded:{},rowEl:{},depth:{},labelEl:{},content:{},isLeaf:{}},HTML_PARSER:{childrenEl:function(b){return b.children("."+this.getCls("tree-children"))},labelEl:function(b){return b.children("."+this.getCls("tree-item-label"))},content:function(b){return b.children("."+this.getCls("tree-item-label")).html()},isLeaf:function(b){if(b.hasClass(this.getCls("tree-item-leaf")))return true;
if(b.hasClass(this.getCls("tree-item-folder")))return false}},ITEM_CLS:"tree-item"})},{requires:["node","uibase","component"]});
KISSY.add("tree/checknode",function(g,e,h,d,f,b){var k=e.all;e=h.create(f,{_performInternal:function(i){this.get("tree").get("el")[0].focus();var l=k(i.target),a=this.get("view"),c=this.get("tree");if(i.type=="dblclick"){if(l.equals(a.get("expandIconEl")))return;if(l.equals(a.get("checkEl")))return;this.set("expanded",!this.get("expanded"))}if(l.equals(a.get("expandIconEl")))this.set("expanded",!this.get("expanded"));else{i=this.get("checkState");i=i==1?0:1;this.set("checkState",i);c.fire("click",
{target:this})}},_uiSetCheckState:function(i){if(i==1||i==0)g.each(this.get("children"),function(n){n.set("checkState",i)});var l=this.get("parent");if(l){for(var a=0,c=l.get("children"),j=0;j<c.length;j++){var m=c[j].get("checkState");if(m==2){l.set("checkState",2);return}else m==1&&a++}if(a==c.length)l.set("checkState",1);else a===0?l.set("checkState",0):l.set("checkState",2)}}},{ATTRS:{checkState:{view:true,value:0}},CHECK_CLS:"tree-item-check",DefaultRender:b,PARTIAL_CHECK:2,CHECK:1,EMPTY:0});
d.UIStore.setUIByClass("tree-item-check",{priority:d.UIStore.PRIORITY.LEVEL2,ui:e});return e},{requires:["node","uibase","component","./basenode","./checknoderender"]});
KISSY.add("tree/checknoderender",function(g,e,h,d,f){var b=e.all;return h.create(f,{createDom:function(){var k=this.get("expandIconEl");this.set("checkEl",b("<div class='"+this.getCls("inline-block  tree-icon")+"'/>").insertAfter(k))},_uiSetCheckState:function(k){this.get("checkEl").removeClass(this.getCls("tree-item-checked0 tree-item-checked1 tree-item-checked2")).addClass(this.getCls("tree-item-checked"+k))}},{ATTRS:{checkEl:{},checkState:{}},CHECK_CLS:"tree-item-check"})},{requires:["node","uibase",
"component","./basenoderender"]});KISSY.add("tree/checktree",function(g,e,h,d,f,b){g=f.CHECK_TREE_CLS;e=e.create(d,[b,h.DelegateChildren],{},{DefaultRender:f});h.UIStore.setUIByClass(g,{priority:h.UIStore.PRIORITY.LEVEL4,ui:e});return e},{requires:["uibase","component","./checknode","./checktreerender","./treemgr"]});KISSY.add("tree/checktreerender",function(g,e,h,d,f){return e.create(d,[f],{},{CHECK_TREE_CLS:"tree-root-check"})},{requires:["uibase","component","./checknoderender","./treemgrrender"]});
KISSY.add("tree/tree",function(g,e,h,d,f,b){g=f.TREE_CLS;e=e.create(d,[b,h.DelegateChildren],{},{DefaultRender:f});h.UIStore.setUIByClass(g,{priority:h.UIStore.PRIORITY.LEVEL3,ui:e});return e},{requires:["uibase","component","./basenode","./treerender","./treemgr"]});
KISSY.add("tree/treemgr",function(g,e){function h(){}h.ATTRS={showRootNode:{view:true},selectedItem:{},tree:{valueFn:function(){return this}},focusable:{value:true}};g.augment(h,{__getAllNodes:function(){if(!this._allNodes)this._allNodes={};return this._allNodes},__renderUI:function(){this.get("children").length||this._computeClass("root_renderUI")},_register:function(d){this.__getAllNodes()[d.get("id")]=d},_unregister:function(d){delete this.__getAllNodes()[d.get("id")]},_handleKeyEventInternal:function(d){var f=
this.get("selectedItem");if(d.keyCode==e.KeyCodes.ENTER)return f._performInternal(d);return f._keyNav(d)},getOwnerControl:function(d){for(var f,b=this.__getAllNodes(),k=this.get("el")[0];d&&d!==k;){if(f=b[d.id])return f;d=d.parentNode}return this},_uiSetSelectedItem:function(d,f){f.prevVal&&f.prevVal.set("selected",false);d.set("selected",true)},_uiSetFocused:function(d){this.constructor.superclass._uiSetFocused.call(this,d);d&&!this.get("selectedItem")&&this.select()}});return h},{requires:["event"]});
KISSY.add("tree/treemgrrender",function(g){function e(){}e.ATTRS={showRootNode:{}};g.augment(e,{__renderUI:function(){this.get("el").attr("role","tree")[0].hideFocus=true;this.get("rowEl").addClass(this.getCls("tree-root-row"))},_uiSetShowRootNode:function(h){this.get("rowEl")[h?"show":"hide"]()},_uiSetFocused:function(h){this.get("el")[h?"addClass":"removeClass"](this.getCls("tree-item-focused"))}});return e});
KISSY.add("tree/treerender",function(g,e,h,d,f){return e.create(d,[f],{},{TREE_CLS:"tree-root"})},{requires:["uibase","component","./basenoderender","./treemgrrender"]});KISSY.add("tree",function(g,e,h,d,f){e.Node=h;e.CheckNode=d;e.CheckTree=f;return e},{requires:["tree/tree","tree/basenode","tree/checknode","tree/checktree"]});
