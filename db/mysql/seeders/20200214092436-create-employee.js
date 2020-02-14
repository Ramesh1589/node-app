'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

   return queryInterface.bulkInsert('employee', [
    { first_name: 'Ramesh Rathod', emp_code: 'EMP-101', mobile: "123456789", position: "Developer", created_at: new Date(), updated_at: new Date() },
    { first_name: 'Rajat Gupta', emp_code: 'EMP-101', mobile: "123456789", position: "Developer", created_at: new Date(), updated_at: new Date() },
    { first_name: 'Devjyoti Sarkar', emp_code: 'EMP-101', mobile: "123456789", position: "Developer", created_at: new Date(), updated_at: new Date() },
    { first_name: 'Debadatta mahanta', emp_code: 'EMP-101', mobile: "123456789", position: "Developer", created_at: new Date(), updated_at: new Date() 
  }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
