!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.store=b()}(this,function(){var a={checkType:function(a){return{}.toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase()},set:function(a,b){("object"===this.checkType(b)||"array"===this.checkType(b))&&(b=JSON.stringify(b)),localStorage.setItem(a,b)},get:function(a){var b;try{b=JSON.parse(localStorage.getItem(a))}catch(c){b=localStorage.getItem(a)}return b},remove:function(a){localStorage.removeItem(a)}};return a});