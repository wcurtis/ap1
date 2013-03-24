
var Faker = require('Faker');

exports.list = function(req, res) {

  var name = Faker.Name.findName();
  res.send(name);
};