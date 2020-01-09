'use strict'
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {})
  role.associate = function (models) {
    // associations can be defined here
    role.hasMany(models.role_permission, { as: 'RolePermissions', foreignKey: 'role_id' })
    role.belongsToMany(models.user, { through: 'user_role', foreignKey: 'role_id', as: 'User' })
  }
  // Roles List
  role.rolesList = function (options) {
    let query = 'SELECT id, name, description, is_active, created_at FROM role WHERE 1 = 1 '
    if (options.dropdown === 'true') {
      query += 'AND is_active = true '
    }
    if (options && options.name) {
      query += ' AND name LIKE "%' + options.name + '%" '
    }
    if (options.dropdown !== 'true') {
      query += 'ORDER BY ' + options.sortBy + ' ' + options.sortType + ' LIMIT ' + (+options.limit) + ' OFFSET ' + ((+options.page - 1) * +options.limit)
    }
    return sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
  }
  // Add New Role
  role.createRole = function (data) {
    return this.create(data)
  }
  // Update Role
  role.updateRole = function (data, roleid) {
    return this.update(data, {
      where: {
        id: roleid
      }
    })
  }
  // Total Roles Count
  role.totalRolesCount = function () {
    return this.count()
  }
  return role
}
