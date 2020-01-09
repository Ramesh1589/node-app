'use strict'
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_filename: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    route: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {})
  menu.associate = function (models) {
    // associations can be defined here
    menu.hasMany(models.menu_item, { as: 'menuItems', foreignKey: 'menu_id' })
  }
  menu.getMenusList = function (user_id, is_super) {
    let query = 'SELECT mn.id AS menu_id, mn.name AS menu_name, mn.sequence, mn.image_filename AS icon, mn.route, ' +
    'JSON_ARRAYAGG(JSON_OBJECT("menu_item_id", mi.id, "menu_item_name", mi.name, "icon", mi.image_filename, "route", mi.route, "sequence", mi.sequence)) AS menu_item_list ' +
    'FROM menu AS mn ' +
    'JOIN menu_item AS mi ON mi.menu_id = mn.id AND mi.is_active = 1 '
    if (!is_super) {
      query += 'JOIN role_permission AS rp ON rp.menu_item_id = mi.id AND rp.is_active = 1 ' +
        'JOIN user_role AS ur ON ur.role_id = rp.role_id AND ur.user_id = ' + user_id + ' '
    }
    query += 'WHERE mn.is_active = 1 ' +
    'GROUP BY mn.id, mi.menu_id ' +
    'ORDER BY mn.sequence ASC '
    return sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
  }
  return menu
}
