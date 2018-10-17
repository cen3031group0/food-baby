var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    eventsRouter = require('../routes/events.server.routes');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  
  // Serve static files
  app.use('/', express.static('client'))
  

  // Use the events router for requests to the api
  app.use('/api/events', eventsRouter);


  // Go to homepage for all routes not specified
  app.use('*', express.static('client'))

  return app;
};  