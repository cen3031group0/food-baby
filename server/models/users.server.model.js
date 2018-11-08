var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  pass: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
