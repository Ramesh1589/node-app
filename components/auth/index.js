'use strict';

const express = require('express');
const router = express.Router();
const {signUpValidator} = require('./validate')
const controller = require('./auth.controller');

// authantication login for users
router.post('/signup', signUpValidator, controller.userSignUp);
router.post('/login', controller.userLogin);
router.get('/users', controller.userList);


module.exports =  router;