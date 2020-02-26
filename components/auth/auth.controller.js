const Joi = require('@hapi/joi');
const SQLDB = require('../../db/mysql');
const config = require('../../config');
const service = require('./auth.service');
const constant = require('../../utils/constant.js');
const { buildSuccessObject, handleSuccess, 
        handleError, buildErrObject } = require('../../handlers/errors')
const lruCache = require('lru-cache');
let {userLogin } = require('./validation')

// Cache options come from config.  If config does not define this, module using this library does not need cache services, so
// assume default values instead.
const cacheOptions = Object.assign(
    { max: 1000, maxAge: 3600000 }
  );
const cache = new lruCache(cacheOptions);

class AuthController {
    constructor(){}

 
    async userLogin(req, res) {
        const lang = req.headers.language || 'en';
        let {error, value} =  userLogin.validate(req.body);
        if(!error){
            const {username, password} =  req.body
            const cacheKey = username;
            const data = cache.get(username);
            if(data){
                console.log('Fetching from Cache', data)
                handleSuccess(res, buildSuccessObject(200, data, "Successfull fetching data from server cache"))
                // res.status(200).json({
                //     status: 200,
                //     data: data,
                //     message: 
                // })
            }else{
                console.log('Fetching from DB Service')
                let response ;
                response = await service.userLogin(req.body);
                response.token = "brainvire"
                cache.set(cacheKey, response);
                handleSuccess(res, buildSuccessObject(200, response, "Successfull fetching from from db server"))
               
                // res.status(200).json({
                //     status: 200,
                //     data: response,
                //     message: "Successfull fetching from from db server"
                // })
            }
        }else{
            handleError(res, buildErrObject(400, error.details[0].message.replace(/['"]/g, '')))
             
            // res.json({
            //     status: 400,
            //     message: error.details[0].message.replace(/['"]/g, '')
            // });
        }
        
    }

    async userList(req, res) {
        let lang = req.headers.language || 'en';
	    console.log("Getting JSON File", JSON.stringify(constant));
        // console.log("Get Users List", req.query);
        if(req.headers && req.headers.authorization){
            res.status(200).json({
                status: 200,
                data: req.query,
                message: "Successfull Operation"
            })
        }else{
            res.status(401).json({
                status: 401,
                message: "Unauthorized User"
            })
            
        }
        
        

    }

    async getDetails(){
        let {error, response } = await service.getDetails();
        if(!error){
            console.log('Reponse -->', JSON.stringify(response))
        }else{
            console.log('Error Reponse -->', JSON.stringify(error))
        }

    };

}


module.exports = new AuthController()