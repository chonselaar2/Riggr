/* Part of the Riggr SPA framework <https://github.com/Fluidbyte/Riggr> and released under the MIT license. This notice must remain intact. */
!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.router=b()}(this,function(){var a=function(){var a=this;window.onhashchange=function(){a.process()},window.onload=function(){a.process()}};a.prototype.routes={},a.prototype.history=[],a.prototype.process=function(){var a,b,c,d=this,e=window.location.hash.replace("#","").replace(/^\/|\/$/g,""),f=!1,g=[];e="/"!==e.substr(0)?"/"+e:e,a=d.match(),b=a.route,c=a.args,0!==d.history.length&&(f=d.routes[d.history[d.history.length-1].matcher]),g=d.routes[b],f&&f.unload&&f.unload.apply(this),g.hasOwnProperty("before")&&"function"==typeof g.before?g.before(function(a){a&&g.load?(g.load.apply(this,c),d.history.push({matcher:b,fragment:e})):d.go(d.history[d.history.length-1].fragment)}):(g.load.apply(this,c),d.history.push({matcher:b,fragment:e})),g.load&&!g.hasOwnProperty("before")&&(g.load.apply(this,c),d.history.push({matcher:b,fragment:e}))},a.prototype.match=function(){var a,b,c,d,e=this,f=window.location.hash.replace("#","").replace(/^\/|\/$/g,""),g=[],h=!1;if(f="/"!==f.substr(0)?"/"+f:f,"/"===f&&e.routes.hasOwnProperty("/"))h={route:"/",args:null};else for(b in e.routes)if(a=f.match(new RegExp(b.replace(/:[^\s/]+/g,"([\\w-]+)"))),null!==a&&a[0]===f){if(g=[],a.length>1)for(c=1,d=a.length;d>c;c++)g.push(a[c]);h={route:b,args:g}}return h||e.routes.hasOwnProperty("/404")&&(h={route:"/404",args:[f]}),h},a.prototype.reload=function(){this.process()},a.prototype.on=function(a,b){if(this.routes[a]={},b&&"function"==typeof b)this.routes[a].before=!1,this.routes[a].load=b,this.routes[a].unload=!1;else{if(!b||"object"!=typeof b)throw"Error creating route";this.routes[a].before=b.before?b.before:!1,this.routes[a].load=b.load?b.load:!1,this.routes[a].unload=b.unload?b.unload:!1}},a.prototype.go=function(a){var b,c=window.location,d=c.pathname.replace(/[^\/]$/,"$&"),e=this;b=a.length?d+c.search+"#"+a:d+c.search,history.pushState?(history.pushState(null,document.title,b),e.process()):(c.replace(d+b),e.process())};var b=new a;return b});