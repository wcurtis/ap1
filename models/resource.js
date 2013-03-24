
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    path: String,
    structure: Schema.Types.Mixed,
});

ResourceSchema.methods.generate = function (callback) {

  console.log('generate ' + this._id);
  callback(this);

};

mongoose.model('Resource', ResourceSchema);
