'use strict';

const express = require('express');
const mongoose = require('mongoose');

const UserModel = require('../models/user');
const EventModel = require('../models/events');

exports.getUser = function(owner, callback) {
    console.log("Get user: ", owner);
    UserModel.findOne({
        nickname: owner
    }, function(err, user) {
        if (err) {
            if (typeof callback === 'function') {
                callback(err);
            }
        } else {
            console.log("DB getUser: ", user);
            callback(null, {
                user: {
                    nickname: user.nickname,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: user.password,
                    properties: {
                        mobilephone: user.properties.mobilephone,
                        email: user.properties.email,
                        facebook : user.properties.facebook,
                        birthday : user.properties.birthday,
                        registertime: user.properties.registertime
                    },
                    participateevents: user.participateevents,
                    ownevents: user.ownevents
                }
            });
        }
    });
};

exports.newUser = function(user, callback) {
    console.log("New user:", user);
    const _user =  new UserModel({
        nickname: user.nickname,
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
        properties: {
            mobilephone: user.properties.mobilephone,
            email: user.properties.email,
            facebook : user.properties.facebook,
            birthday : user.properties.birthday,
            registertime: user.properties.registertime
        }
    });

    UserModel.findOne({
        nickname: user.nickname
    }, function(err, user) {
        if (err || user === null) {
            _user.save(function(err, user) {
                console.log("Save new user");
        		if (err) {
                    if (typeof callback === 'function') {
                        callback(err);
                    }
        		} else {
                    console.log("No Error while saving.");
                    callback(null, user);
                }
            });
        }
        else {
            callback("User already registered");
        }
    });
};

exports.login = function (user, callback) {
    console.log("Login: ",user);
    UserModel.findOne({
        nickname: user.nickname,
        password: user.password
    }, function(err, user) {
        if (err || user == null) {
            if (typeof callback === 'function') {
                console.log("Error while DB login: ",err);
                callback("Error: ",err);
            }
        } else {
            console.log("DB login: ", user);
            callback(null, {
                user: {
                    id: user._id,
                    nickname: user.nickname
                }
            });
        }
    });
};

exports.getUserID = function (user, callback) {
    console.log("getUserID: ",user);
    UserModel.findOne({
        nickname: user.nickname
    }, function(err, user) {
        if (err || user == null) {
            if (typeof callback === 'function') {
                console.log("Error while DB getUserID: ",err);
                callback("Error: ",err);
            }
        } else {
            console.log("DB getUserID: ", user);
            callback(null, {
                id: user._id,
                nickname: user.nickname
            });
        }
    });
};


exports.addEvent = function(params, callback) {
    console.log("Add event to user:", params);
    UserModel.findByIdAndUpdate(
        params.userid,{
            $push: {"participateevents":  params.eventid }
        },
        {safe: true, upsert: true},
        function(err, user) {
            if (err || user == null) {
                if (typeof callback === 'function') {
                    console.log("Error while DB addEvent: ",err);
                    callback("Error: ",err);
                }
            } else {
                console.log("DB addEvent: ", params);
                callback(null, {
                    id: user._id,
                    events: user.events
                });
            }
        });
};


exports.getUserEvents = function(ruserid, callback) {
    console.log("Get User events for "+ruserid);
    UserModel.findById(
        ruserid,
        function(err, user) {
            if (err || user == null) {
                if (typeof callback === 'function') {
                    console.log("Error while DB getUserEvents: ",err);
                    callback("Error: ",err);
                }
            } else {
                console.log("DB getUserEvents("+ruserid+")");
                var rtime = new Date();
                callback(null, {
                    querytime: rtime,
                    userid: ruserid,
                    owneventslist: user.ownevents,
                    participateeventslist: user.participateevents
                });
            }
        });
};
