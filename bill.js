
console.log('start');

GLOBAL.clah = require('clah');
GLOBAL._ = require('underscore');

var a = [ 'one', 'two', 'three'];

_.each(a, function(el) {
  console.log(el);
});

console.log('word');
