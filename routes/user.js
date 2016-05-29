'use strict';

const express = require('express');
const mongoose = require('mongoose');

const userManager = require('../Database/user');
const eventManager = require('../Database/events');
const users = express.Router();

users.get('/', function(req, res) {
    res.status(200).send('true');
});

users.get('/login', function(req, res) {
    console.log("\login params: ",req.query);
    userManager.login(req.query, function(err, user) {
        if (err) {
            res.sendStatus(500);
        } else {
            console.log("no error while callback: /login");
            res.status(200).json(user);
        }
    });
});


users.get('/:nickname', function(req, res) {
        console.log("Get user with name: ", req.params)
//    if (req.params.username === req.jwt.username) {
        userManager.getUser(req.params.nickname, function(err, user) {
			if (err) {
				res.sendStatus(500);
			} else {
                console.log("no error while callback: /"+req.params.nickname);
				res.status(200).json(user);
			}
		});
    /*} else {
        res.sendStatus(401);
    }*/
});

users.get('/:nickname/events', function(req, res) {
    userManager.getUserID(req.params, function(err, user) {
        if (err) {
            res.sendStatus(500);
        } else {
            console.log("Get userevents with name: "+ req.params.nickname +" ("+user.id+")");
            userManager.getUserEvents(user.id, function(err, events) {
    			if (err) {
    				res.sendStatus(500);
    			} else {
                    var tmpownevents=[];
                    events.owneventslist.forEach(function(eventid){
                        eventManager.getEvent(mongoose.Types.ObjectId(eventid), function(err, event){
                            if (err) {
                				throw(err);
                			}else {
                                tmpownevents.push(event);
                            }
                        });
                    });
                    events.owneventslist = tmpownevents;
                    var tmppartevents=[{}];
                    console.log(events.participateevents);
                    events.participateeventslist.forEach(function(eventid){
                        eventManager.getEvent(mongoose.Types.ObjectId(eventid), function(err, event){
                            if (err) {
                				throw(err);
                			}else {
                                tmppartevents.push(event);
                            }
                        });
                    });
                    events.participateevents = tmppartevents;
                    // wait for forEah
                    console.log("no error while callback: /"+req.query.nickname+"/events");
    				res.status(200).json(events);
    			}
    		});
        }
    });
});

users.post('/', function(req, res) {
        userManager.newUser(req.body, function(err, user) {
			if (err) {
                console.log(err);
                res.body = err;
				res.status(500).send(err);
			} else {
                console.log("no error while callback: /.");
				res.status(200).send("User added.");
			}
		});
});

users.post('/:nickname/events', function(req, res) {
    userManager.getUserID(req.params, function(err, user) {
        if (err) {
            res.sendStatus(500);
        } else {
            console.log("Add userevent: "+ req.params.nickname +" ("+user.id+")");
            var params ={
                    userid: user.id,
                    eventid: mongoose.Types.ObjectId(req.body.eventid)
            };
            userManager.addEvent(params, function(err, events) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    console.log("no error while callback: /"+req.query.nickname+"/events");
                    res.status(200).json(events);
                }
            });
        }
    });
});




module.exports = users;
