var db_events = require('../controllers/events.server.controller.js'), 
    express = require('express'), 
    router = express.Router();

router.route('/')
  .get(db_events.list)
  .post(db_events.create);

router.route('/:eventId')
  .get(db_events.read)
  .put(db_events.update)
  .delete(db_events.delete);

router.param('eventId', db_events.eventByID);

module.exports = router;
