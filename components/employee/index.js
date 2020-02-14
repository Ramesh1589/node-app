'use strict';

const express = require('express');
const router = express.Router();
const { catchErrors } = require('../../handlers/errors')
const controller = require('./employee.controller');


/*
* Platform: Web
* Create Employee Route
* method: POST
* path: /api/employee
* headers: "Content-Type": "application/json"
* output: Object
*/
router.post('/employee', catchErrors(controller.createEmployee));

/*
* Platform: Web
* Categories List Route
* method: GET
* path: /api/employee
* headers: "Content-Type": "application/json"
* output: Object
*/
router.get('/employee', catchErrors(controller.getEmployeeList));

/*
* Platform: Web
* Update Details Route
* method: PUT
* path: /employee
* headers: "Content-Type": "application/json"
* body: id, fullName, empCode, mobile, position
*/
router.put('/employee/:id', catchErrors(controller.updatedetails));


/*
* Platform: Web
* Update Details Route
* method: PUT
* path: /employee
* headers: "Content-Type": "application/json"
* body: id, fullName, empCode, mobile, position
*/
router.delete('/employee/:id', catchErrors(controller.deleteRecord));

module.exports =  router;

