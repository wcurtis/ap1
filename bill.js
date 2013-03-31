
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
      case 'array':
        return new ArrayBlueprint(options);
      case 'string':
        return new StringBlueprint(options);
      case 'number':
        return new NumberBlueprint(options);
      case 'fullName':
        return new FullNameBlueprint(options);
      case 'phone':
        return new PhoneBlueprint(options);
      case 'email':
        return new EmailBlueprint(options);
      case 'sentence':
        return new SentenceBlueprint(options);
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

    var factory = new BlueprintFactory();
    var structure = this.structure;

    var result = {};
    _.each(structure, function(element, key) {
      result[key] = factory.create(element).generate();
    });

    return result;
  }
});

/**
 * Generates an array of elements based on the child blueprint
 * 
 * options
 * {
 *   "child": blueprint,  // A blueprint definition (required)
 *   "count": 2             // Number of elements in the array
 * }
 */
var ArrayBlueprint = Blueprint.extend({

  init: function(options) {
    this._super(options);

    if (_.isUndefined(this.options) || _.isUndefined(this.options.child)) {
      throw new TypeError("ObjectBlueprint requires the field 'child'");
    }

    this.child = this.options.child;
  },

  generate: function() {

    var count = (_.isUndefined(this.options) || _.isUndefined(this.options.count)) ? 3 : this.options.count;
    var child = this.child;

    var factory = new BlueprintFactory();
    var result = [];

    var i = 0;
    while (i < count) {

      var blueprint = factory.create(child);
      result.push(blueprint.generate());
      i++;
    }

    return result;
  }
});

/**
 * Generates a random string.
 * 
 * options
 * {
 *   "length": 50,    // Length of string (ignores min/max options)
 *   "min": 1,        // Min length of string
 *   "max": 500       // Max length of string
 * }
 */
var StringBlueprint = Blueprint.extend({

  generate: function() {
    // TODO: Generate a random string according to spec
    return "sjE82s0qyxj3FQ22";
  }
});

/**
 * Generates a random number based on blueprint.
 * 
 * options
 * {
 *   "min": 0,
 *   "max": 100
 * }
 */
var NumberBlueprint = Blueprint.extend({

  generate: function() {

    var min = (_.isUndefined(this.options) || _.isUndefined(this.options.min)) ? 0 : this.options.min;
    var max = (_.isUndefined(this.options) || _.isUndefined(this.options.max)) ? 100 : this.options.max;

    var range = max - min;

    return Math.floor(min + (Math.random() * range));
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

/**
 * Generates a random phone number
 * 
 * TODO: Add support for a specific format
 */
var PhoneBlueprint = StringBlueprint.extend({

  generate: function() {
    return Faker.PhoneNumber.phoneNumber();
  }
});

/**
 * Generates a random email address
 */
var EmailBlueprint = StringBlueprint.extend({

  generate: function() {
    return Faker.Internet.email();
  }
});

/**
 * Generates random words
 */
var SentenceBlueprint = StringBlueprint.extend({

  generate: function() {
    return Faker.Lorem.sentence();
  }
});

var testBlueprint = {
  "type": "object",
  "options": {
    "structure": {
      "number": {
        "type": "number",
        "options": {
          "min": 100,
          "max": 200
        }
      },
      "phone": {
        "type": "phone"
      },
      "email": {
        "type": "email"
      },
      "sentence": {
        "type": "sentence"
      },
      "array": {
        "type": "array",
        "options": {
          "child": {
            "type": "number"
          },
          "count": 2
        }
      },
      "object": {
        "type": "object",
        "options": {
          "structure": {
            "name": {
              "type": "fullName"
            },
            "email": {
              "type": "email"
            }
          }
        }
      }
    }
  }
};
  
var factory = new BlueprintFactory();
var blueprint = factory.create(testBlueprint);

blueprint.print();

