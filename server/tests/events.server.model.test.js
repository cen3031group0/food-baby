var should = require('should'), 
    mongoose = require('mongoose'), 
    Event = require('../models/events.server.model'), 
    config = require('../config/config');

var event, id;

event =  {
  name: "",
  created_by: "",
  address: "",
  building: "",
  room: "",
  time: Date(18,11,21,0,0,0),
  host: "",
  dietary_prefs: "",
  created_at: Date(18,11,21,0,0,0),
  updated_at: Date(18,11,21,0,0,0)
}

describe('Events Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail 
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when name and created_by provided', function(done){
      new Event({
        name: event.name, 
        code: event.code
      }).save(function(err, event){
        should.not.exist(err);
        id = event._id;
        done();
      });
    });

    it('saves properly when all three properties provided', function(done){
      new Event(event).save(function(err, event){
        should.not.exist(err);
        id = event._id;
        done();
      });
    });

    it('throws an error when name not provided', function(done){
      new Event({
        address: event.address
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when created_by not provided', function(done){
      new Event({
        name: event.name
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

  });

  afterEach(function(done) {
    if(id) {
      Event.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});