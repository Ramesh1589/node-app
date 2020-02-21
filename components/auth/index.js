'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');

// authantication login for users
router.post('/login', controller.userLogin);
router.get('/users', controller.userList);


module.exports =  router;