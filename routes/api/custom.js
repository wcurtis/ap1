
var mongoose = require('mongoose')
  , Resource = mongoose.model('Resource')
  , Entity = mongoose.model('Entity');

exports.list = function(req, res) {


  var path = req.params;
  if (path.length === 0 || path[0].lenth === 0) {
    res.send(404);
  }

  path = path[0];
  console.log('Path: ' + path);

  return Resource.findOne({path:path}, function(err, doc) {
    if (err) { 
      return res.send(500, err.message); 
    }

    if (!doc) {
      return res.send(404);
    }

    Entity.find({'_resourceId':doc._id}, function(err, docs) {
      return res.send(docs);
    });
  });
};