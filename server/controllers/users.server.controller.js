var mongoose = require('mongoose'), 
    User = require('../models/users.server.model.js');

exports.create = function(req, res) {
  // create user from request body JSON
  var db_user = new User(req.body);
  db_user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(db_user);
    }
  });
};

exports.read = function(req, res) {
  // return user JSON
  res.json(req.db_user);
};

exports.delete = function(req, res) {
  // delete user in request
  var db_user = req.db_user;
  User.deleteOne(db_user, function (err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
};

exports.list = function(req, res) {
  // return JSON list of all users
  User.find({}, null, {sort: {'name': 1}}, function (err, db_users) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(db_users);
      res.json(db_users);
    }
  });
};

exports.userByID = function(req, res, next, id) {
  User.findById(id).exec(function(err, db_user) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.db_user = db_user;
      next();
    }
  });
};
