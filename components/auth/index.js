'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');

// authantication login for users
router.get('/auth/login', controller.userLogin);
router.get('/auth/users', controller.userList);


module.exports =  router;