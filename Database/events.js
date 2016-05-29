'use strict';

const express = require('express');
const mongoose = require('mongoose');

const EventModel = require('../models/events');
const UserModel = require('../models/user');

exports.newEvent = function(event, callback) {
    console.log("New event:", event);
    const _event =  new EventModel({
        "eventowner": mongoose.Types.ObjectId(event.eventowner),
        "title": event.title,
        "description": event.description,
        "eventdate": event.date,
        "eventtime": event.eventtime,
        "onFacebook": event.onFacebook,
        "public": event.public
    });
    _event.save(function(err, event) {
        console.log("Save new Event");
		if (err) {
            if (typeof callback === 'function') {
                callback(err);
            }
		} else {
            console.log("No Error while saving Event.");
            UserModel.findByIdAndUpdate(
                event.eventowner,{
                    $push: {"ownevents":  event._id }
                },
                {safe: true, upsert: true},
                function(err, user) {
                    if (err || user == null) {
                        if (typeof callback === 'function') {
                            console.log("Error while DB addEvent ownEvent: ",err);
                            throw(err)
                        }
                    } else {
                        console.log("added event to users ownevents");
                    }
                });
            callback(null, event);
        }
    });
};

exports.getAllEvents = function(callback) {
    console.log("Get all events");
    EventModel.find({},function(err, events) {
        if (err) {
            if (typeof callback === 'function') {
                callback(err);
            }
        } else {
            console.log("DB getAllEvents: ", events);
            var rtime = new Date();
            var rpage = 0;
            callback(null, {
                querytime: rtime,
                page: rpage,
                eventlist: events
            });
        }
    });
};

exports.getEvent = function(eventid, callback) {
    console.log("Get event", eventid);
    EventModel.findById(eventid,
        function(err, event) {
        if (err) {
            if (typeof callback === 'function') {
                callback(err);
            }
        } else {
        //    console.log("DB getEvent: ", event);
            callback(null, event);
        }
    });
};
