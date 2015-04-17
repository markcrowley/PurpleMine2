var PurpleMine=PurpleMine||{};PurpleMine.HistoryTabs=function(){"use strict";function a(){b=this,this.$tabsContainer=null,this.$tabs=null,this.$history=$("#history"),this.lang=document.documentElement.lang,"undefined"==typeof c[this.lang]&&(this.lang="en"),this._=c[this.lang],this.$history.length>0&&(this.buildTabs(),this.markFirstOfTypes())}var b,c={en:{all:"All",notes:"Notes",details:"Changes"},pl:{all:"Wszystko",notes:"Notatki",details:"Zmiany"}};return a.prototype.buildTabs=function(){var a="",b='<li><a href="javascript:;" class="',c='history-tab" data-tab="',d="</a></li>";a+='<div class="tabs"><ul>',a+=b+"selected "+c+'all">'+this._.all+d,a+=b+c+'notes">'+this._.notes+d,a+=b+c+'details">'+this._.details+d,a+="</ul></div>",this.$tabsContainer=$(a),$("#history > h3").after(this.$tabsContainer),this.$tabs=this.$tabsContainer.find(".history-tab"),this.$tabs.on("click",this.tabClick)},a.prototype.markFirstOfTypes=function(){this.$history.find(".has-notes:first").addClass("first-of-notes"),this.$history.find(".has-details:first").addClass("first-of-details")},a.prototype.tabClick=function(){var a=$(this),c=a.attr("data-tab");b.$tabs.removeClass("selected"),a.addClass("selected"),b.$history.removeClass("hide-details").removeClass("hide-notes"),"notes"===c?b.$history.addClass("hide-details"):"details"===c&&b.$history.addClass("hide-notes")},a}();var PurpleMine=PurpleMine||{};PurpleMine.MenuCollapse=function(){"use strict";function a(){if(e)return e;e=this,this.lang=document.documentElement.lang,"undefined"==typeof f[this.lang]&&(this.lang="en"),this._=f[this.lang],this.menus={top:{$el:$("#top-menu")},main:{$el:$("#main-menu")}};for(var a in this.menus)this.menus.hasOwnProperty(a)&&this.menus[a].$el.length>0&&b(a)}function b(a){return"none"===e.menus[a].$el.css("maxHeight")?!1:(e.menus[a].collapsed=!0,window.localStorage&&(e.menus[a].collapsed=null===localStorage.getItem(c(a))),d(a),void(!1===e.isCollapsed(a)&&e.expandMenu(a)))}function c(a){return"PurpleMine:"+a+"MenuExpanded"}function d(a){var b,c=a+"-menu-toggler",d=e._[a+"MenuToggler"];b='<a href="javascript:;" class="'+c+'" title="'+d+'"></a>',e.menus[a].$toggler=$(b),e.menus[a].$el.prepend(e.menus[a].$toggler),e.menus[a].$toggler.on("click",{menu:a},e.toggleMenu)}var e,f={en:{topMenuToggler:"Expand/collapse top menu",mainMenuToggler:"Expand/collapse main menu"},pl:{topMenuToggler:"Zwiń/rozwiń górne menu",mainMenuToggler:"Zwiń/rozwiń główne menu"}};return a.prototype.toggleMenu=function(a){var b=a.data.menu||"";e.isCollapsed(b)?e.expandMenu(b):e.collapseMenu(b)},a.prototype.isCollapsed=function(a){return this.menus[a].collapsed},a.prototype.expandMenu=function(a){this.menus[a].$el.addClass("expanded"),this.menus[a].$toggler.addClass("expanded"),this.menus[a].collapsed=!1,window.localStorage&&localStorage.setItem(c(a),"x")},a.prototype.collapseMenu=function(a){this.menus[a].$el.removeClass("expanded"),this.menus[a].$toggler.removeClass("expanded"),this.menus[a].collapsed=!0,window.localStorage&&localStorage.removeItem(c(a))},a}();var PurpleMine=PurpleMine||{};PurpleMine.RevisionGraph=function(a,b,c){"use strict";var d=20,e=17,f=b,g=$.map(f,function(a){return a}),h=g.length-1,i=$("table.changesets tr.changeset");null!==revisionGraph?revisionGraph.clear():revisionGraph=new Raphael(a);var j=revisionGraph.set(),k=i.first().find("td").first().position().left-$(a).position().left,l=$(a).position().top,m=k+(c+1)*d,n=i.last().position().top+i.last().height()-l;revisionGraph.setSize(m,n);var o=["#e74c3c","#584492","#019851","#ed820c","#4183c4"];if(c>=o.length){Raphael.getColor.reset();for(var p=0;c>=p;p++)o.push(Raphael.getColor(.9))}var q,r,s,t,u,v,w,x;$.each(g,function(a,b){b.hasOwnProperty("space")||(b.space=0),s=i.eq(h-b.rdmid).position().top-l+e,r=k+d/2+d*b.space,revisionGraph.circle(r,s,3.5).attr({fill:o[b.space],stroke:"none"}).toFront(),$.each(b.parent_scmids,function(a,c){q=f[c],q?(q.hasOwnProperty("space")||(q.space=0),u=i.eq(h-q.rdmid).position().top-l+e,t=k+d/2+d*q.space,v=revisionGraph.path(q.space===b.space?["M",r,s,"V",u]:["M",r,s,"C",r,s,r,s+(u-s)/2,r+(t-r)/2,s+(u-s)/2,"C",r+(t-r)/2,s+(u-s)/2,t,u-(u-s)/2,t,u])):v=revisionGraph.path(["M",r,s,"V",n]),v.attr({stroke:o[b.space],"stroke-width":1.5}).toBack()}),x=revisionGraph.circle(r,s,10),x.attr({fill:"#000",opacity:0,cursor:"pointer",href:b.href}),null!==b.refs&&b.refs.length>0&&(w=document.createElementNS(revisionGraph.canvas.namespaceURI,"title"),w.appendChild(document.createTextNode(b.refs)),x.node.appendChild(w)),j.push(x)}),j.toFront()},$(function(){"use strict";window.drawRevisionGraph&&(window.drawRevisionGraph=PurpleMine.RevisionGraph,$(window).resize())});var PurpleMine=PurpleMine||{};PurpleMine.SidebarToggler=function(){"use strict";function a(){b=this,this.sidebarVisible=!0,this.sidebarHiding=null,this.$toggler=null,this.$main=$("#main"),this.$sidebar=$("#sidebar"),this.lang=document.documentElement.lang,"undefined"==typeof c[this.lang]&&(this.lang="en"),this._=c[this.lang],"relative"===this.$main.css("position")&&$("#context-menu").appendTo("#wrapper3"),window.localStorage&&(this.sidebarVisible=null===localStorage.getItem("PurpleMine:sidebarHidden")),this.$sidebar.length>0&&!1===this.$main.hasClass("nosidebar")&&(this.buildButton(),this.bindKeyHandler(),!1===this.sidebarVisible&&this.hideSidebar(!0))}var b,c={en:{toggler:"Toggle sidebar"},pl:{toggler:"Pokaż/ukryj panel boczny"}};return a.prototype.bindKeyHandler=function(){var a=document.getElementsByTagName("body")[0];window.onkeydown=function(c){a===c.target&&83===c.keyCode&&!1===c.ctrlKey&&!1===c.altKey&&!1===c.shiftKey&&b.toggleSidebar()}},a.prototype.buildButton=function(){var a,b="sidebar-toggler";a='<a href="javascript:;" class="'+b+'" title="'+this._.toggler+'"></a>',this.$toggler=$(a),this.$main.append(this.$toggler),this.$toggler.on("click",this.toggleSidebar)},a.prototype.toggleSidebar=function(){b.sidebarVisible?b.hideSidebar():b.showSidebar()},a.prototype.hideSidebar=function(a){!0===a?this.$sidebar.addClass("sidebar-hiding sidebar-hidden"):(this.$sidebar.addClass("sidebar-hiding"),this.sidebarHiding=setTimeout(function(){b.$sidebar.addClass("sidebar-hidden")},500)),this.$toggler.addClass("sidebar-hidden"),this.sidebarVisible=!1,window.localStorage&&localStorage.setItem("PurpleMine:sidebarHidden","x")},a.prototype.showSidebar=function(){clearTimeout(this.sidebarHiding),this.$sidebar.removeClass("sidebar-hidden",0).removeClass("sidebar-hiding"),this.$toggler.removeClass("sidebar-hidden"),this.sidebarVisible=!0,window.localStorage&&localStorage.removeItem("PurpleMine:sidebarHidden")},a}(),$(function(){"use strict";new PurpleMine.SidebarToggler,new PurpleMine.HistoryTabs,new PurpleMine.MenuCollapse});