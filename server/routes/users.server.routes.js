var db_users = require('../controllers/users.server.controller.js'), 
    express = require('express'), 
    router = express.Router();

router.route('/')
  .get(db_users.list)
  .post(db_users.create);

router.route('/:userId')
  .get(db_users.read)
  .delete(db_users.delete);

router.param('userId', db_users.userByID);

module.exports = router;
