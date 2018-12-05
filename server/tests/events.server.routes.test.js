var should = require('should'), 
    request = require('supertest'), 
    express = require('../config/express'), 
    Event = require('../models/events.server.model.js');

/* Global variables */
var app, agent, event, id;

/* Unit tests for testing server side routes for the events API */
describe('Events CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init();
    agent = request.agent(app);

    done();
  });


  it('should it able to retrieve all events', function(done) {
    agent.get('/api/events')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        res.body.should.have.length(12);
        done();
      });
  });
  it('should be able to retrieve a single event', function(done) {
    Event.findOne({name: 'Friendsgiving Feast'}, function(err, event) {
      if(err) {
        console.log(err);
      } else {
        agent.get('/api/events/' + event._id)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.name.should.equal('Friendsgiving Feast');
            res.body.building.should.equal('123');
            res.body.address.should.equal('505 SW 2nd Ave, Gainesville, FL 32601');
            res.body._id.should.equal(event._id.toString());
            done();
          });
      }
    });
  });

  it('should be able to save a event', function(done) {
    var event = {
      name: 'Software Engineering Pizza Party', 
      address: '432 Newell Dr, Gainesville, FL 32611',
      created_by: 'Ross'
    };
    agent.post('/api/events')
      .send(event)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.name.should.equal('Software Engineering Pizza Party');
        res.body.address.should.equal('432 Newell Dr, Gainesville, FL 32611');
        res.body.created_by.should.equal('Ross');
        id = res.body._id;
        done();
      });
  });

  it('should be able to update a event', function(done) {
    var updatedEvent = {
      name: 'Food Event?', 
      address: '433 Newell Dr, Gainesville, FL 32611',
      created_by: 'Ross'
    };

    agent.put('/api/events/' + id)
      .send(updatedEvent)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.name.should.equal('Food Event?');
        res.body.address.should.equal('433 Newell Dr, Gainesville, FL 32611');
        res.body.created_by.should.equal('Ross');
        done();
      });
  });

  it('should be able to delete a event', function(done) {
    agent.delete('/api/events/' + id)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);

        agent.get('/api/events/' + id) 
          .expect(400)
          .end(function(err, res) {
            id = undefined;
            done();
          });
      })
  });

  after(function(done) {
    if(id) {
      Event.remove({_id: id}, function(err){
        if(err) throw err;
        done();
      })
    }
    else {
        done();
    }
  });
});
