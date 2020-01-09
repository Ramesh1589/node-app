'use strict'
module.exports = (sequelize, DataTypes) => {
  const role_permission = sequelize.define('role_permission', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // role permission hasMany role n:n
        model: 'role',
        key: 'id'
      }
    },
    menu_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // role permission hasMany menu items n:n
        model: 'menu_item',
        key: 'id'
      }
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    view: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    block: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {})
  role_permission.associate = function (models) {
    // associations can be defined here
  }
  // Add New Menu Permission
  role_permission.addMenu = function (data) {
    return this.bulkCreate(data)
  }
  // Get Role Details
  role_permission.roleDetails = function (roleId) {
    return this.findAll({
      where: {
        role_id: roleId
      },
      raw: true
    })
  }
  // Remove Menus
  role_permission.removeOldMenu = function (roleId) {
    return this.destroy({
      where: {
        role_id: roleId
      }
    })
  }
  return role_permission
}
