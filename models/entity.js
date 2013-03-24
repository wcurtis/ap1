
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var EntitySchema = new Schema({
    _resourceId: Schema.Types.ObjectId,
    data: Schema.Types.Mixed
});

mongoose.model('Entity', EntitySchema);
