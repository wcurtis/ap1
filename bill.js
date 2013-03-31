
console.log('START\n');

var Faker = require('Faker');
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

    switch(type) {
      case 'object':
        return new ObjectBlueprint(options);
      case 'string':
        return new StringBlueprint(options);
      case 'fullName':
        return new FullNameBlueprint(options);
      default:
        throw new TypeError("Invalid blueprintJson, type '" + type + "' not recognized");    
    }

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
    console.log(JSON.stringify(this.generate(), null, 2));
  }

});

/**
 * Generates an object with sub blueprints as defined
 * by the 'structure' field in options
 */
var ObjectBlueprint = Blueprint.extend({

  init: function(options) {
    this._super(options);

    if (_.isUndefined(this.options) || _.isUndefined(this.options.structure)) {
      throw new TypeError("ObjectBlueprint requires the field 'structure'");
    }

    this.structure = this.options.structure;
  },

  generate: function() {

    var structure = this.structure;

    var result = {};
    _.each(structure, function(element, key) {
      result[key] = factory.create(element).generate();
    });

    return result;
  }

});

var StringBlueprint = Blueprint.extend({

  generate: function() {
    return Faker.Name.findName();
  }

});

/**
 * Generates a random full name
 */
var FullNameBlueprint = StringBlueprint.extend({

  generate: function() {
    return Faker.Name.findName();
  }

});

var bResource = {
  "type": "object",
  "options": {
    "structure": {
      "name": {
        "type": "fullName"
      },
      "partnerName": {
        "type": "fullName"
      }
    }
  }
};

var bString = {
  "type": "fullName"
};

factory = new BlueprintFactory();

var obj = factory.create(bResource);
// var obj = new ObjectBlueprint(blueprint.options);

// var str = factory.create(bString);

obj.print();


 
console.log('\nEND');
