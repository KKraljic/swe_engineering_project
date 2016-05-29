'use strict';

const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./user');
/*const categoryRoute = require('./category');
const itemRoute = require('./item');*/
const eventsRoute = require('./events');

const api = express.Router();
api.get('/', function(req, res) {
    res.json({
        message: 'hello world bithces'
    });
});
api.use('/user', userRoute);
api.use('/events', eventsRoute);
/*
api.use('/item', itemRoute);
api.use('/category', categoryRoute);*/

module.exports = api;
