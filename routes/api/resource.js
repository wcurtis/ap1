
var mongoose = require('mongoose')
  , Resource = mongoose.model('Resource');

exports.list = function(req, res) {
  return Resource.find(function(err, collection) {
    if (err) { 
      return res.send(500, "Error fetching Resource"); 
    }
    return res.send(collection);
  });
};

exports.get = function(req, res) {
  return Resource.findById(req.params.id, function(err, doc) {
    if (err) { 
      return res.send(500, err.message); 
    }
    return res.send(doc);
  });
};

exports.create = function(req, res) {
  var doc = new Resource(req.body);
  doc.save(function(err) {
    if (err) {
      return res.send(500, err.message); 
    }
    return console.log("Created resource " + doc.id);
  });
  return res.send(doc);
};

exports.update = function(req, res) {

  var fields = req.body;
  delete fields._id;

  return Resource.findByIdAndUpdate(req.params.id, {$set: fields}, function(err, doc) {
    if (!err) {
      return res.send(doc);
    } else {
      return res.send(err);
    }
  });
};

exports.delete = function(req, res) {
  return Resource.findById(req.params.id, function(err, doc) {
    return doc.remove(function(err) {
      if (!err) {
        console.log("Deleted resource " + doc.id);
        return res.send('');
      }
    });
  });
};
