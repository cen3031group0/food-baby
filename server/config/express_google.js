var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20'),
    cookieSession = require('cookie-session'),
    config = require('./config'),
    User = require('../models/users.server.model.js')
    eventsRouter = require('../routes/events.server.routes'),
    usersRouter = require('../routes/users.server.routes');

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  //initialize app
  var app = express();

  app.set('views', __dirname + '/../../client');
  app.engine('html', require('ejs').renderFile);

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser.json());

  // middleware to redirect trailing slashes
  app.use((req, res, next) => {
    const test = /\?[^]*\//.test(req.url);
    if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
      res.redirect(301, req.url.slice(0, -1));
    else
      next();
  });

  // cookieSession config
  app.use(cookieSession({
      maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
      keys: ['randomstringhere']
  }));

  app.use(passport.initialize()); // Used to initialize passport
  app.use(passport.session()); // Used to persist login sessions

  // Strategy config
  passport.use(new GoogleStrategy({
          clientID: '238871557533-nklm86gqctbr046l5gsqhp86atlpmuga.apps.googleusercontent.com',
          clientSecret: 'chsJXf9T_wFLSeEoN-17jeDu',
          callbackURL: 'http://localhost:8080/auth/google/callback'
      },
      (accessToken, refreshToken, profile, done) => {
          User.create({ name: profile.id }, function (err, user) {
              return done(err, user);
          });
      }
  ));

  // Used to stuff a piece of information into a cookie
  passport.serializeUser((user, done) => {
      done(null, user);
  });

  // Used to decode the received cookie and persist session
  passport.deserializeUser((user, done) => {
      done(null, user);
  });

  // middleware to check if the user is authenticated
  function isUserAuthenticated(req, res, next) {
      if (req.user) {
          next();
      } else {
          res.redirect('/login');
      }
  }

  // passport.authenticate middleware is used here to authenticate the request
  app.get('/auth/google', passport.authenticate('google', {
      scope: ['profile'] // require profile info from Google account
  }));

  // The middleware receives the data from Google and runs the function on Strategy config
  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
      res.redirect('/add_event');
  });

  // Secret route
  app.get('/add_event', isUserAuthenticated, (req, res) => {
      // res.render('add_event.html');
      res.render('add_event.html', {username: req.user.username});
  });

  // Logout route
  app.get('/logout', (req, res) => {
      req.logout(); 
      res.redirect('/');
  });

  // Serve static files
  app.use('/', express.static('client', {
      extensions: ['html', 'htm']}
  ))

  // API routing
  app.use('/api/events', eventsRouter);
  app.use('/api/users', usersRouter);

  return app;
};  