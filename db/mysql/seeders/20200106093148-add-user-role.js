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
    return queryInterface.bulkInsert('role', [
      { name: 'super_admin', description: 'This is super admin role', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'admin', description: 'This admin role', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'developer', description: 'This is developers role', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'tester', description: 'This is testers role', is_active: true, created_at: new Date(), updated_at: new Date() 
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
