const service = require('./auth.service');


class AuthController {
    constructor(){}

    async userLogin(req, res) {
        let response = await service.userLogin(req.body);
        response.token = "brainvire"
        res.status(200).json({
            status: 200,
            data: response,
            message: "Successfull Operation"
        })
    }

    async userList(req, res) {
        console.log("Get Users List", req.headers);
        console.log("Get Users List", req.query);
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