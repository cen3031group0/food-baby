var mongoose = require('mongoose'), 
    Event = require('../models/events.server.model.js');

exports.create = function(req, res) {
  var db_event = new Event(req.body);
  db_event.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(db_event);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.db_event);
};

exports.update = function(req, res) {
  var db_event = req.db_event;
  Event.findOneAndUpdate(
    {'code': db_event.code},
    {$set: req.body},
    {new: true},
    function (err, db_event) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send(db_event);
    }
  });
};

exports.delete = function(req, res) {
  var db_event = req.db_event;
  Event.deleteOne(db_event, function (err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
};

exports.list = function(req, res) {
  Event.find({}, null, {sort: {'code': 1}}, function (err, db_events) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(db_events);
    }
  });
};

exports.eventByID = function(req, res, next, id) {
  Event.findById(id).exec(function(err, db_event) {
    console.log(id)
    if(err) {
      res.status(400).send(err);
    } else {
      req.db_event = db_event;
      next();
    }
  });
};
