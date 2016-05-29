'use strict';

const mongoose = require('mongoose');
const EventsSchema = mongoose.Schema({
    "eventowner": { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    "title": String,
    "description": String,
    "eventdate": { type: Date, default: Date.now },
    "eventtime": String,
    "onFacebook": Boolean,
    "public": Boolean
  });
const Events = mongoose.model('Events', EventsSchema);

module.exports = Events;
