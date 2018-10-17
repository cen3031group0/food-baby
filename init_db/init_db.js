'use strict';

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Event = require('../server/models/events.server.model.js'), 
    config = require('../server/config/config.js');

var rawEvents = fs.readFileSync('./events.json');  
var events = JSON.parse(rawEvents);  

mongoose.connect(config.db.uri, {
  useMongoClient: true
});

for (var i in events.entries) {
  var entry = events.entries[i];
  var dbEntry = Event(entry);
  dbEntry.save(function(err) {
    if (err) throw err;
  });
}
