'use strict';

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    User = require('../server/models/users.server.model.js'), 
    config = require('../server/config/config.js');

var rawUsers = fs.readFileSync('./users.json');  
var users = JSON.parse(rawUsers);  

mongoose.connect(config.db.uri, {
  useMongoClient: true
});

for (var i in users.entries) {
  var entry = users.entries[i];
  var dbEntry = User(entry);
  dbEntry.save(function(err) {
    if (err) throw err;
  });
}
