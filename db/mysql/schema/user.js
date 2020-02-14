'use strict'
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
      defaultValue: 'male'
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    verification: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_super: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {})
  
  user.beforeCreate(function (instance, options) {
    const salt = bcrypt.genSaltSync(5)
    instance.password = bcrypt.hashSync(instance.password, salt)
    return Promise.resolve(instance)
  })
  // instance methods are defined on the model's .prototype
  user.prototype.comparePassword = function (passwordAttempt) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
        err ? reject(err) : resolve(isMatch)
      )
    })
  }
  user.createUser = function (record) {
    return this.create(record)
  }
  user.validateUser = function (uniqueField, uniqueValue) {
    return this.findOne({
      where: {
        [uniqueField]: uniqueValue
      },
      attributes: ['id', 'email', 'first_name', 'last_name', 'password', 'gender', 'phone', 'is_super', 'is_active']
      // raw: true
    })
  }
  user.updatePassword = function (userid, newPassword) {
    return this.update({
      password: newPassword
    }, {
      where: {
        id: userid
      }
    })
  }
  // Users List
  user.listUsers = function (options) {
    let query = 'SELECT usr.id, usr.email, usr.first_name, usr.last_name, usr.gender, usr.phone, usr.is_super, usr.is_active, (SELECT rol.name FROM user_role as url JOIN role as rol ON rol.id = url.role_id WHERE url.user_id = usr.id) as role, usr.created_at, usr.updated_at, (SELECT first_name FROM user WHERE id = usr.id) as updated_by FROM user as usr ' +
      'WHERE 1 = 1 '
    if (options && options.first_name) {
      query += ' AND usr.first_name LIKE "%' + options.first_name + '%" '
    }
    if (options && options.last_name) {
      query += ' AND usr.last_name LIKE "%' + options.last_name + '%" '
    }
    if (options && options.phone) {
      query += ' AND usr.phone LIKE "%' + options.phone + '%" '
    }
    if (options && options.email) {
      query += ' AND usr.email LIKE "%' + options.email + '%" '
    }
    if (options && options.gender) {
      query += ' AND usr.gender = "' + options.gender + '" '
    }
    if (options && options.is_active) {
      query += ' AND usr.is_active = "' + options.is_active + '" '
    }
    query += 'ORDER BY ' + options.orderPrefix + options.sortBy + ' ' + options.sortType + ' LIMIT ' + (+options.limit) + ' OFFSET ' + ((+options.page - 1) * +options.limit)
    return sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
  }
  // Update User
  user.updateUser = function (data, userid) {
    return this.update(data, {
      where: {
        id: userid
      }
    })
  }
  // Get User Details
  user.userDetails = function (options) {
    let query = 'SELECT u.id, u.email, u.first_name, u.last_name, u.gender, u.phone, u.is_super, u.is_active, u.created_at '
    if (!options.is_super) {
      query += ', JSON_ARRAYAGG(JSON_OBJECT("role_id", ur.role_id, "role_name", rl.name)) as role_details '
    }
    query += 'FROM user as u '
    if (!options.is_super) {
      query += 'JOIN user_role as ur ON ur.user_id = u.id ' +
      'JOIN role as rl ON rl.id = ur.role_id '
    }
    query += 'WHERE u.id = ' + options.userid
    return sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
  }
  // Total Users Count
  user.totalUsersCount = function () {
    return this.count()
  }
  return user
}
