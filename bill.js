
console.log('start');

GLOBAL._ = require('underscore');
GLOBAL.clah = require('clah');
Class = clah.Class;

var Blueprint = Class.extend({

  init: function(options) {
    this.options = options;
  },

  /**
   * Abstract function for children to implement based on their type
   * @return a randomly generated json object based on blueprint 
   */
  generate: function() {
    return {};
  },

  print: function() {
    console.log(this.generate());
  }

});

var StringBlueprint = Blueprint.extend({

  generate: function() {
    return 'mystring';
  }

});

var str = new StringBlueprint();
str.print();



 
console.log('end');
