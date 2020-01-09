'use strict'

const { ERROR_MESSAGE } = require('../../helpers.js');
const config = require('../../config/config-test.json');
let ERR = ERROR_MESSAGE[config.language];

module.exports = {
	user1:{
		title: 'Correct username + Correct password',
		username: 'brainvire',
		password: 'systems',
		expected: {
			code: 200,
			status: true,
			username: 'brainvire',
			password: 'systems'
		}
	},
	user2:{
		title: 'Correct username + Correct password',
		username: 'Brainvire',
		password: 'systems',
		expected: {
			code: 200,
			status: true,
			username: 'brainvire',
			password: 'systems'
		}
	},
	user3:{
		title: 'Correct username + Wrong password',
		username: 'brainvire',
		password: 'Systems',
		expected: {
			code: 401,
			status: false,
			message: ERR.WRONG_USER_PASS
		}
	},
	user4:{
		title: 'Wrong username + Wrong password',
		username: 'brainwire',
		password: 'Systems',
		expected: {
			code: 401,
			status: false,
			message: ERR.WRONG_USER_PASS
		}
	},
	user5:{
		title: 'Wrong username + correct password',
		username: 'brainwire',
		password: 'systems',
		expected: {
			code: 401,
			status: false,
			message: ERR.WRONG_USER_PASS
		}
	},
	user6:{
		title: 'SQL injection',
		username: '*',
		password: '*',
		expected: {
			code: 401,
			status: false,
			message: ERR.WRONG_USER_PASS
		}
	},
	user7:{
		title: 'Username not exist',
		username: '',
		password: 'systems',
		expected: {
			code: 401,
			status: false,
			message: ERR.VALID_PARAM
		}
	},
	user8:{
		title: 'Password not exist',
		username: 'brainvire',
		password: '',
		expected: {
			code: 401,
			status: false,
			message: ERR.VALID_PARAM
		}
	},
	user9:{
		title: 'Username & Password not exist',
		username: '',
		password: '',
		expected: {
			code: 401,
			status: false,
			message: ERR.VALID_PARAM
		}
	}
}