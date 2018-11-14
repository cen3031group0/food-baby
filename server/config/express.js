var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
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

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware 
  app.use(bodyParser());

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
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      keys: ['randomstringhere']
  }));

  app.use(passport.initialize()); // initialize passport
  app.use(passport.session()); // persist login sessions

  // Strategy config
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ name: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.pass != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
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

  app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login'})
  );

  // add event - only for authenticated users
  app.get('/add_event', isUserAuthenticated, (req, res) => {
      res.render('add_event.jade', {name: req.user.name});
  });

  // logout route
  app.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/');
  });

  app.get('/', function (req, res) {
    if (req.user) {
      res.render('index.jade', { name: req.user.name })
    } else {
      res.render('index.jade')
    }
  });

  app.get('/profile', function (req, res) {
    if (req.user) {
      res.render('profile.jade', { name: req.user.name })
    } else {
      res.redirect('/login')
    }
  });

  app.get('/register', function (req, res) {
    if (req.user) {
      res.redirect('/');
    } else {
      res.render('register.jade')
    }
  });

  app.get('/login', function (req, res) {
    if (req.user) {
      res.redirect('/');
    } else {
      res.render('login.jade')
    }
  });

  // Serve static files
  app.use('/', express.static('client', {
      extensions: ['html', 'htm']}
  ))

  // API routing
  app.use('/api/events', eventsRouter);
  app.use('/api/users', usersRouter);

  app.use('*', function(req, res) {
    res.render('404.jade')
  })

  return app;
};  