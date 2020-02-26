const Joi = require('@hapi/joi');
const User = require('../../db/mongo/schema/user')
const { handleError,
    buildErrObject
} = require('../../handlers/errors')
const { 
    ceeateUser, updateUser 
} = require('./user.validate')
const constant = require('../../utils/constant')

/*********************
 * Private functions *
 *********************/

/** Platform: Web
 * Resister Employee API
 * @param  {String} fullname - User first Name
 * @param  {string} lastname - User last Name
 * @param  {string} email - User email
 */
exports.createUser = async function (req, res, next) {
    let {error, value} =  ceeateUser.validate(req.body);
    if(!error){
        const created = await User.addUser(value)
        if(!created){
            return next(new Error('User Creation Failed!'))
        }else{
            res.status(constant.httpStatusCode.success).json({
                status:constant.responseCodes.successfulOperation,
                data: created,
                message: "User Ceated Successfully"
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
 * Fetch All Users List
 * @return {Array} List - all users list
 */
exports.getUserList = async function (req, res, next) {
    const users = await User.getUsers()
    if(!users){
        handleError(res, buildErrObject(400, 'User Creation Failed!'))
    }else{
        res.status(constant.httpStatusCode.success).json({
            status: true,
            code: constant.responseCodes.successfulOperation,
            data: users,
            message: "User fetched Successfully"
        })
    }
}

/** Platform: Web
 * Update User API
 * @param  {String} id - User id
 * @param  {String} fullname - User first Name
 * @param  {string} lastname - User last Name
 * @param  {string} email - User email
 */
exports.updateUserDetails = async function (req, res, next) {
    const id = req.params.id
    const {error, value} =  updateUser.validate(req.body);
    if(!error){
        const updated = await User.updateUser(id, req.body)
        if(!updated){
            handleError(res, buildErrObject(400, 'Failed update user Details'))
        }else{
            res.status(constant.httpStatusCode.success).json({
                status:  true,
                code:constant.responseCodes.successfulOperation,
                message: "User updated successfully"
            })
        }
    }else{
        res.status(constant.httpStatusCode.badRequest).json({
            status: constant.responseCodes.revalidation,
            message: error.details[0].message.replace(/['"]/g, '')
        });
    }
}

/** Platform: Web
 * User Details API
 * @param  {String} id - User id
 * @return {Object} user - user details
 */
exports.getUserDetails = async function (req, res, next) {
    const id = req.params.id
    const user = await User.getUserById(id)
    if(!user){
        handleError(res, buildErrObject(400, 'User not found'))
    }else{
        res.status(constant.httpStatusCode.success).json({
            status:  true,
            code: constant.responseCodes.successfulOperation,
            data: user
            //message: "User updated successfully"
        })
    }
}

/** Platform: Web
 * User Delete API
 * @param  {String} id - User id
 * @return {Object} user - user details
 */
exports.deleteUser = async function (req, res, next) {
    const id = req.params.id
    const user = await User.removeUser(id)
    if(!user){
        handleError(res, buildErrObject(400, 'User not found'))
    }else{
        res.status(constant.httpStatusCode.success).json({
            status:  true,
            code: constant.responseCodes.successfulOperation,
            //message: "User updated successfully"
        })
    }
}
