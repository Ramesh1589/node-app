'use strict'
module.exports = (sequelize, DataTypes) => {
  const user_role = sequelize.define('user_role', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { // user hasMany roles n:n
        model: 'user',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { // role hasMany users n:n
        model: 'role',
        key: 'id'
      }
    }
  }, {
    timestamps: false
  })
  user_role.associate = function (models) {
    // associations can be defined here
    user_role.belongsTo(models.user, { foreignKey: 'user_id' })
    user_role.belongsTo(models.role, { foreignKey: 'role_id' })
  }
  // Add User Role
  user_role.addRole = function (record) {
    return this.bulkCreate(record)
  }
  // Update User Role
  user_role.updateRole = function (role_id, user_id) {
    return this.update({
      role_id: role_id
    }, {
      where: {
        user_id: user_id
      }
    })
  }
  // Remove User Role
  user_role.destroyRole = function (userid) {
    return this.destroy({
      where: {
        user_id: userid
      }
    })
  }
  return user_role
}
