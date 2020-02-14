const Joi = require('@hapi/joi');
const SQLDB = require('../../db/mysql')
const { catchErrors } = require('../../handlers/errors')
const { registerEmployee, updateEmployee } = require('./employee.validate')
const constant = require('../../utils/constant')

/*********************
 * Private functions *
 *********************/

/** Platform: Web
 * Resister Employee API
 * @param  {String} fullName - Employee Name
 * @param  {string} empCode - Employee Code
 * @param  {string} mobile - Employee Mobile Number
 * @param  {string} position - Employee Position
 * @return {Object} success - Success message
 */
exports.createEmployee = async function (req, res, next) {
    const lang = req.headers.language || 'en';
    let {error, value} =  registerEmployee.validate(req.body);
    if(!error){
        const created = await SQLDB.employee.creatEmployee(value)
        if(!created){
            return next(new Error('Employee Creation Failed!'))
        }else{
            res.status(constant.httpStatusCode.success).json({
                status:constant.responseCodes.successfulOperation,
                data: created,
                message: "Employee Ceated Successfully"
            })
        }
        
    }else{
        res.status(constant.httpStatusCode.badRequest).json({
            status: constant.responseCodes.revalidation,
            message: error.details[0].message.replace(/['"]/g, '')
        });
    }

}

/**
 * Fetch All Employee List
 * @return {Array} List - all employee list
 */
exports.getEmployeeList = async function (req, res, next) {
    const lang = req.headers.language || 'en';
    const employees = await SQLDB.employee.getAllEmployee()
    if (!employees) {

        return next(new Error('Get employee list Failed!'))

    } else {
        console.log("Request Came in Employee Controller", req.body)
        res.status(constant.httpStatusCode.success).json({
            status: constant.responseCodes.successfulOperation,
            data: employees,
            message: "Successfully Operation"
        })
    }
}

/** Platform: Web
 * Update Employee Details API
 * @param  {Number} empCode - Employee no
 * @param  {String} fullName - Employee Name
 * @param  {string} empCode - Employee Code
 * @param  {string} mobile - Employee Mobile Number
 * @param  {string} position - Employee Position
 * @return {Object} success - Success message
 */
exports.updatedetails = async function (req, res, next) {
    const lang = req.headers.language || 'en';
    const id = req.params.id;
    let {error, value} =  updateEmployee.validate(req.body);
    if(!error){
        const updated = await SQLDB.employee.updateEmployee(value, id)
        if (!updated) {

            return next(new Error('Unable to Delete Employee!'))

        } else {
            res.status(constant.httpStatusCode.success).json({
                status: constant.responseCodes.successfulOperation,
                message: "Successfully Operation"
            })
        }
        res.status(constant.httpStatusCode.success).json({
            status:constant.responseCodes.successfulOperation,
            data: req.body,
            message: "Update Successfully"
        })
    }else{
        res.status(constant.httpStatusCode.badRequest).json({
            status: constant.responseCodes.revalidation,
            message: error.details[0].message.replace(/['"]/g, '')
        });
    }

}


/** Platform: Web
 * Update Employee Details API
 * @param  {Number} empCode - Employee no
 * @param  {String} fullName - Employee Name
 * @param  {string} empCode - Employee Code
 * @param  {string} mobile - Employee Mobile Number
 * @param  {string} position - Employee Position
 * @return {Object} success - Success message
 */
exports.deleteRecord = async function (req, res, next) {
    const lang = req.headers.language || 'en';
    const empId = req.params.id
    const deleted = await SQLDB.employee.deleteEmployee(empId)
    if (!deleted) {

        return next(new Error('Unable to Delete Employee!'))

    } else {
        res.status(constant.httpStatusCode.success).json({
            status: constant.responseCodes.successfulOperation,
            message: "Successfully Operation"
        })
    }

}