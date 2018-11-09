'use strict';

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Event = require('../server/models/events.server.model.js'), 
    config = require('../server/config/config.js');

mongoose.Promise = require('bluebird');

var rawEvents = fs.readFileSync('./events.json');  
var events = JSON.parse(rawEvents);  

mongoose.connect(config.db.uri, {
  useMongoClient: true
});

console.log('dropping `events` collection...')
Event.collection.drop();

var promises = events.entries.map(function(event) {
  return new Promise(function(resolve, reject) {
    var entry = event;
    var dbEntry = Event(entry);
    dbEntry.save(function(err) {
      if (err) throw err;
      resolve();
    });
  });
});

Promise.all(promises)
  .then(function() {
    console.log(`${events.entries.length} entries added to \`events\`.`);
    mongoose.disconnect();
  });
