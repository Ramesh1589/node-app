'use strict'
module.exports = (sequelize, DataTypes) => {
  const menu_item = sequelize.define('menu_item', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { // menu item belongsTo menu 1:1
        model: 'menu',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    hindi_name: {
      type: DataTypes.STRING(40),
      allowNull: false
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
  menu_item.associate = function (models) {
    // associations can be defined here
  }
  // Menu Items List
  menu_item.getMenuItemsList = function (userid, menu_id, is_super) {
    let query = 'SELECT mi.id AS menu_item_id, mi.name AS menu_item_name, mi.image_filename AS icon, mi.route, '
    if (is_super) {
      query += '1 as can_create, 1 as can_update, 1 as can_view, 1 as can_status_update '
    } else {
      query += 'rp.can_create, rp.can_update, rp.can_view, rp.can_block as can_status_update '
    }
    query += 'FROM menu_item AS mi '
    if (!is_super) {
      query += 'JOIN role_permission AS rp ON rp.menu_item_id = mi.id AND rp.is_active = 1 ' +
      'JOIN user_role AS ur ON ur.role_id = rp.role_id AND ur.user_id = ' + userid + ' '
    }
    query += 'WHERE mi.is_active = 1 AND mi.id = ' + menu_id + ' ' +
    'ORDER BY mi.sequence asc'
    return sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
  }
  return menu_item
}
