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
    return queryInterface.bulkInsert('user', [{
      email: 'admin.bv@brainvire.com',
      password: '$2a$05$tJAtGWyJEtGaPTb2NDM1S.W92JV.Fu3tnBe78nvxYltJ13mMCv.Fe', // admin123
      first_name: 'Admin',
      last_name: ' News',
      created_at: new Date(),
      updated_at: new Date(),
      is_super: true,
      is_active: true,
      created_by: 1
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('user', null, {})
  }
}
