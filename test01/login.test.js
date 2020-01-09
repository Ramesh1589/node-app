'use strict';

global.sqlInstance = require('../handlers/sqlORMConnection');
const config = require('../config/config-test.json');

const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;

const LoginServices = require('../components/login/login.service');
const schemaUserData = require('./schema/login');

describe('Begin Login Unit-Test', function() {
	try{
		let users = Object.keys(schemaUserData);
		if(users && users.length){
			for (var i = 0; i < users.length; i++) {
				let user = users[i];
				it(`# ${schemaUserData[user].title}`, () => {
					schemaUserData[user].language = config.language;
					return LoginServices.checkLogin(schemaUserData[user], (error, response) => {
						if(!error && response){
							let username = schemaUserData[user].expected.username ? schemaUserData[user].expected.username.toLowerCase() : '',
								password = schemaUserData[user].expected.password ? schemaUserData[user].expected.password : '';

							response.username.should.equal(username);
							response.password.should.equal(password);
						}
						if(error){
							should.not.exist(error.message);
							error.should.equal(schemaUserData[user].expected.message);
						}
					})
				});
			}
		}
	} catch(e) {
		console.log(e);
	}
});
