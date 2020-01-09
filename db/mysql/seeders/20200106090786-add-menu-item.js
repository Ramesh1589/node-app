'use strict'

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
    return queryInterface.bulkInsert('menu_item', [
      { menu_id: 1, name: 'Manage Users', description: 'user management', sequence: 1, image_filename: 'team', route: '/manage-user', is_active: true, created_at: new Date(), updated_at: new Date() },
      { menu_id: 2, name: 'Role Management', description: 'Role Management', sequence: 2, image_filename: 'role', route: '/role-management', is_active: true, created_at: new Date(), updated_at: new Date() },
      { menu_id: 3, name: 'Create Customer 1', description: 'Create Customer 1', sequence: 3, image_filename: 'news', route: '/create-customer1', is_active: true, created_at: new Date(), updated_at: new Date() },
      { menu_id: 4, name: 'Report 1', description: 'Report 1', sequence: 4, image_filename: 'category', route: '/video-master/category-master', is_active: true, created_at: new Date(), updated_at: new Date() },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('menu_item', null, {})
  }
}
