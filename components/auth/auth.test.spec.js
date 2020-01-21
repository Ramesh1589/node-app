const { operations } = require('./auth.test.schema');

// start our app
const server = require('../../app');
const should = require('chai').should();
const expect = require('chai').expect;
const assert = require('chai').assert;



 for (const operation of operations) {
  describe(`# ${operation.title}`, function() {
    const {tests} = operation
    for (const test  of tests) {
      it(`# ${test.description}`, async function(done) {
        done()
      });
    }
    // it("Auth Component Test", async function(done) {
    //   done()
    // });
    // it("Auth Component Test", async function(done) {
    //   done()
    // });
    // it("Auth Component Test", async function(done) {
    //   done()
    // });
  });     
 }
