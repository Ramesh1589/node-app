const service = require('./auth.service');
const constant = require('../../utils/constant.js');

class AuthController {
    constructor(){}

 
    async userLogin(req, res) {
        let lang = req.headers.language || 'en';
	    let response = await service.userLogin(req.body);
        response.token = "brainvire"
        res.status(200).json({
            status: 200,
            data: response,
            message: "Successfull Operation"
        })
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
}


module.exports = new AuthController()