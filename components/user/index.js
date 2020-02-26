'use strict';

const express = require('express');
const router = express.Router();
const { catchErrors } = require('../../handlers/errors')
const controller = require('./user.controller');


/*
* Platform: Web
* Create User Route
* method: POST
* path: /api/user
* headers: "Content-Type": "application/json"
* output: Object
*/
router.post('/', catchErrors(controller.createUser));

/*
* Platform: Web
* User List Route
* method: GET
* path: /api/user
* headers: "Content-Type": "application/json"
* output: Object
*/
router.get('/', catchErrors(controller.getUserList));


/*
* Platform: Web
* User Details Route
* method: GET
* path: /api/user
* headers: "Content-Type": "application/json"
* output: Object
*/
router.get('/:id', catchErrors(controller.getUserDetails));

/*
* Platform: Web
* Update Details Route
* method: PUT
* path: /user
* headers: "Content-Type": "application/json"
* body: fullname, lastname,  email
*/
router.put('/:id', catchErrors(controller.updateUserDetails));


/*
* Platform: Web
* Update Details Route
* method: PUT
* path: /user
* headers: "Content-Type": "application/json"
* param: _id
*/
router.delete('/:id', catchErrors(controller.deleteUser));

module.exports =  router;

