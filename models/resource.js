
var Faker = require('Faker');

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , Entity = mongoose.model('Entity');

var ResourceSchema = new Schema({
    path: String,
    structure: Schema.Types.Mixed,
});

ResourceSchema.methods.generate = function (callback) {

  if (typeof this.structure === "undefined") {
    // TODO: Find out what's standard for errors in callbacks
    console.log('No structure in resource');
    callback();
  }

  var resource = this.toJSON();
  var structure = resource.structure;  

  var entityData = {};

  _.each(structure, function(val, key) {
    // TODO: Instanciate field class and call generate()
    var type = val.type;

    if (type == 'name') {
      entityData[key] = Faker.Name.findName();
    } else if (type == 'email') {
      entityData[key] = Faker.Internet.email();
    }
  });

  var entity = new Entity({
    _resourceId: resource._id,
    data: entityData
  });

  entity.save(function (err, entity) {
    callback(entity);
  });
};

mongoose.model('Resource', ResourceSchema);
