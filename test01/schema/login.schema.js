const { ERROR_MESSAGE } = require('../../helpers.js');
const config = require('../../config/config-test.json');
let ERR = ERROR_MESSAGE[config.language];

module.exports = {

    operations : [
        {
            title: 'Login Unit Tests',
            api : '/api/auth/login',
            method: 'post',
            payload: {},
            tests : [
                {
                    httpCode: 200,
                    statusCode: 400,
                    payload : {},
                    description : ERR.VALID_PARAM + ' - Empty username & password'
                },
                {
                    httpCode: 200,
                    statusCode: 400,
                    payload : {
                        'email' : 'U2FsdGVkX180BScoXzC+u/y0xsHwlcF2toFkJ9IWkHG8UMJFsgfBHBzWsl/FyxhK',
                        'password' : ''
                    },
                    description : ERR.VALID_PARAM + ' - Empty password'
                },
                {
                    httpCode: 200,
                    statusCode: 500,
                    payload : {
                        "email":"U2FsdGVkX180BScoXzC+u/y0xsHwlcF2toFkJ9IWkHG8UMJFsgfBHBzWsl/FyxhK_asdasdasdasdsadsad",
                        "password":"U2FsdGVkX19kEYLIt4Dudv2FRPvHv4wG9z1l5z2BtE0="
                    },
                    description : ERR.WRONG_USER_PASS  + ' - Wrong username'
                },
                {
                    httpCode: 200,
                    statusCode: 401,
                    payload : {
                        "email":"U2FsdGVkX180BScoXzC+u/y0xsHwlcF2toFkJ9IWkHG8UMJFsgfBHBzWsl/FyxhK",
                        "password":"asdasdasdas_U2FsdGVkX19kEYLIt4Dudv2FRPvHv4wG9z1l5z2BtE0="
                    },
                    description : ERR.WRONG_USER_PASS  + ' - Wrong password'
                },
                {
                    httpCode: 200,
                    statusCode: 500,
                    payload : {
                        "email":"*",
                        "password":"*"
                    },
                    description : ERR.WRONG_USER_PASS + ' - SQL Injection'
                },
                {
                    httpCode: 200,
                    statusCode: 200,
                    payload : {
                        "email":"U2FsdGVkX180BScoXzC+u/y0xsHwlcF2toFkJ9IWkHG8UMJFsgfBHBzWsl/FyxhK",
                        "password":"U2FsdGVkX19kEYLIt4Dudv2FRPvHv4wG9z1l5z2BtE0="
                    },
                    description : 'Correct username + Correct password - Succeed'
                }
            ]

        }
    ]
}