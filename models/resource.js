
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    path: String,
    structure: Schema.Types.Mixed,
});

mongoose.model('Resource', ResourceSchema);
