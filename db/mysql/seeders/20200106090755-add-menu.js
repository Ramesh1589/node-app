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
    return queryInterface.bulkInsert('menu', [
      { name: 'Manage Users', description: 'User Management', sequence: 1, image_filename: 'team', route: '/manage-user', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'Role Management', description: 'Role Management', sequence: 2, image_filename: 'role', route: '/role-management', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'Manage Customers', description: 'Customer Management', sequence: 3, image_filename: 'team', route: '/manage-customers', is_active: true, created_at: new Date(), updated_at: new Date() },
      { name: 'Reports', description: 'Reports', sequence: 4, image_filename: 'dreports', route: null, is_active: true, created_at: new Date(), updated_at: new Date() 
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
