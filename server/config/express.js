var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    eventsRouter = require('../routes/events.server.routes'),
    usersRouter = require('../routes/users.server.routes');

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
  
  // API routing
  app.use('/api/events', eventsRouter);
  app.use('/api/users', usersRouter);

  // Go to homepage for all routes not specified
  app.use('*', express.static('client'))

  return app;
};  