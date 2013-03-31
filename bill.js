
console.log('start');

GLOBAL._ = require('underscore');
GLOBAL.clah = require('clah');
Class = clah.Class;

var BlueprintFactory = Class.extend({

  create: function(blueprintJson) {
    var type = blueprintJson.type;
    var options = blueprintJson.options;

    // TOOD: Find the right syntax for this
    // var className = type + 'Blueprint';
    // var blueprint = new className(options);

    if (type == "object") {
      return new ObjectBlueprint(options);
    }

    throw new TypeError("Invalid blueprintJson, type '" + type + "' not recognized");    
  }

});

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

var ObjectBlueprint = Blueprint.extend({

  init: function(options) {
    this._super(options);

    if (_.isUndefined(this.options) || _.isUndefined(this.options.structure)) {
      throw new TypeError("ObjectBlueprint requires the field 'structure'");
    }

    this.structure = this.options.structure;
  },

  generate: function() {

    return this.structure;

    // TODO: Iterate over object and call genearte() on children
    var object = {};

    var fields = this.options.structure;
    return 'mystring';
  }

});

var StringBlueprint = Blueprint.extend({

  generate: function() {
    return 'mystring';
  }

});

var blueprint = {
  "type": "object",
  "options": {
    "structure": {
      "name": {
        "type": "fullName"
      }
    }
  }
};


var factory = new BlueprintFactory();

var obj = factory.create(blueprint);
// var obj = new ObjectBlueprint(blueprint.options);

obj.print();


 
console.log('end');
