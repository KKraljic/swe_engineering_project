'use strict';

const express = require('express');
const mongoose = require('mongoose');

const eventManager = require('../Database/events');

const event = express.Router();

event.get('/', function(req, res) {
    console.log("/events/ Get all events");
    eventManager.getAllEvents(function (err, event){
        if (err) {
            res.sendStatus(500);
        } else {
            console.log("no error while callback: /event/ get all events");
            res.status(200).json(event);
        }
    });
});

event.post('/', function(req, res) {
        eventManager.newEvent(req.body, function(err, user) {
			if (err) {
                console.log(err);
                res.body = err;
				res.status(500).send(err);
			} else {
                console.log("no error while callback postEvent: /.");
				res.status(200).send("Event added.");
			}
		});
});



module.exports = event;
