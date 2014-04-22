/* Part of the Riggr SPA framework <https://github.com/Fluidbyte/Riggr> and released under the MIT license. This notice must remain intact. */
!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.indexed=b()}(this,function(){function indexed(dbstore){return{processCB:function(a,b){if(a&&"function"==typeof a){var c=b===!1?!0:!1;a(c,b)}else console.error("Improper callback")},parseQuery:function(a){var b={$gt:">",$lt:"<",$gte:">=",$lte:"<=",$ne:"!="},c=Object.keys(a);if("object"==typeof a[Object.keys(a)]){var d=Object.keys(a[Object.keys(a)]);return{field:c[0],operand:b[d],value:a[c][d]}}return{field:c[0],operand:"==",value:a[c]}},checkType:function(a){return{}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},create:function(a){var b=this,c=indexedDB.open(dbstore);c.onupgradeneeded=function(a){var b=a.target.result;if(b.objectStoreNames.contains(dbstore)){b.deleteObjectStore(dbstore)}b.createObjectStore(dbstore,{keyPath:"_id",autoIncrement:!1})},c.onsuccess=function(c){c.target.result.close(),b.processCB(a,!0)},c.onerror=function(){b.processCB(a,!1)}},insert:function(a,b){var c=this,d=indexedDB.open(dbstore);d.onsuccess=function(d){function e(){i<a.length?(a[i]._id=(new Date).getTime()+i,h.put(a[i]).onsuccess=e,console.log("data",a[i]),i++):c.find(j,b)}var f=d.target.result,g=f.transaction([dbstore],c.IDBTransactionModes.READ_WRITE),h=g.objectStore(dbstore);if("array"===c.checkType(a)){var i=0,j={_id:{$gte:(new Date).getTime()}};e()}else{a._id=(new Date).getTime();var k=h.put(a).onsuccess=function(){c.find({_id:a._id},b),f.close()};k.onerror=function(){c.processCB(b,!1)}}},d.onerror=function(){c.processCB(b,!1)}},traverse:function(query,data,cb){var self=this,request=indexedDB.open(dbstore);request.onsuccess=function(e){var db=e.target.result,trans=db.transaction([dbstore],self.IDBTransactionModes.READ_WRITE),store=trans.objectStore(dbstore),keyRange=IDBKeyRange.lowerBound(0),cursorRequest=store.openCursor(keyRange),results=[];cursorRequest.onsuccess=function(e){var result=e.target.result;if(!!result!=!1){if(query){var match=result.value[query.field],value=query.value,test="match"+query.operand+"value";if(eval(test)){if("object"===self.checkType(data)){for(var prop in data)result.value[prop]=data[prop];result.update(result.value)}"delete"===data&&result.delete(result.value._id),results.push(result.value)}}else{if("object"===self.checkType(data)){for(prop in data)result.value[prop]=data[prop];result.update(result.value)}"delete"===data&&result.delete(result.value._id),results.push(result.value)}result.continue()}},trans.oncomplete=function(){self.processCB(cb,results),db.close()},cursorRequest.onerror=function(){self.processCB(cb,!1)}},request.onerror=function(){self.processCB(cb,!1)}},find:function(){var a,b=!1;1===arguments.length&&"function"==typeof arguments[0]?a=arguments[0]:(b=this.parseQuery(arguments[0]),a=arguments[1]),this.traverse(b,!1,a)},update:function(){var a,b,c=!1;2===arguments.length&&"function"==typeof arguments[1]?(a=arguments[0],b=arguments[1]):(c=this.parseQuery(arguments[0]),a=arguments[1],b=arguments[2]),this.traverse(c,a,b)},"delete":function(){var a,b=!1;1===arguments.length&&"function"==typeof arguments[0]?a=arguments[0]:(b=this.parseQuery(arguments[0]),a=arguments[1]),this.traverse(b,"delete",a)},drop:function(a){var b=this,c=indexedDB.deleteDatabase(dbstore);c.onsuccess=function(){b.processCB(a,!0),b.create()},c.onblocked=function(){b.processCB(a,!1)},c.onerror=function(){b.processCB(a,!1)}},IDBTransactionModes:{READ_ONLY:"readonly",READ_WRITE:"readwrite",VERSION_CHANGE:"versionchange"}}}return window.indexedDB=window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB,indexed});