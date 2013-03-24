
var mongoose = require('mongoose')
  , Resource = mongoose.model('Resource')
  , Entity = mongoose.model('Entity');

exports.list = function(req, res) {


  var path = req.params;
  if (path.length === 0 || path[0].lenth === 0) {
    res.send(404);
  }

  path = path[0];

  return Resource.findOne({path:path}, function(err, doc) {
    if (err) { 
      return res.send(500, err.message); 
    }

    if (!doc) {
      return res.send(404);
    }

    // TODO: There's gotta be a way to do the mapping below in mongo
    Entity.find({'_resourceId':doc._id})
    .exec(function(err, entities) {

      // Map the data field to be the actual entity
      var result = _.map(entities, function(entity) {
        return entity.data;
      });

      return res.send(result);
    });
  });
};