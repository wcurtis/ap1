
GLOBAL._ = require('underscore');

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , mongoose = require('mongoose');

// Kick up mongodb
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/ap1'; 
mongoose.connect(mongoUri);

// Bootstrap models
var models_path = __dirname + '/models'
  , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
  if (file.charAt(0) != '.') {
    require(models_path+'/'+file);
  }
});

// Configure Express server
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var apiResource = require('./routes/api/resource'),
  custom = require('./routes/api/custom');

// Setup routes
app.get('/', routes.index);

app.get('/api/resource', apiResource.list);
app.get('/api/resource/:id', apiResource.get);
app.post('/api/resource', apiResource.create);
app.put('/api/resource/:id', apiResource.update);
app.delete('/api/resource/:id', apiResource.delete);

app.get('/custom/*', custom.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
