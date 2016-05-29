'use strict';

const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  "nickname": String,
  "password": String,
  "firstname": String,
  "lastname": String,
  "properties": {
      "mobilephone": String,
      "email": String,
      "facebook" : String,
      "birthday" : String,
      "registertime": Number
  },
  "participateevents": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }],
  "ownevents": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }]
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
