'use strict';

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    User = require('../server/models/users.server.model.js'), 
    config = require('../server/config/config.js');

mongoose.Promise = require('bluebird');

var rawUsers = fs.readFileSync('./users.json');  
var users = JSON.parse(rawUsers);  

mongoose.connect(config.db.uri, {
  useMongoClient: true
});

console.log('dropping `users` collection...')
User.collection.drop();

var promises = users.entries.map(function(user) {
  return new Promise(function(resolve, reject) {
    var entry = user;
    var dbEntry = User(entry);
    dbEntry.save(function(err) {
      if (err) throw err;
      resolve();
    });
  });
});

Promise.all(promises)
  .then(function() {
    console.log(`${users.entries.length} entries added to \`users\`.`);
    mongoose.disconnect();
  });
