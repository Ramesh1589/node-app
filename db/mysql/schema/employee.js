'use strict';
module.exports = (sequelize, DataTypes) => {
  const employee = sequelize.define('employee', {
    first_name: DataTypes.STRING,
    emp_code: DataTypes.STRING,
    mobile: DataTypes.STRING,
    position: DataTypes.STRING
  }, {});
  employee.associate = function(models) {
    // associations can be defined here
  };

  // Add Employee
  employee.creatEmployee = function (data) {
    return this.create(data)
  }

   // Add Employee
   employee.getAllEmployee = function () {
    return this.findAll()
  }

  // Update Employee
  employee.updateEmployee = function (data, empId) {
    return this.update(data, {
      where: {
        id: empId
      }
    })
  }

  // Update Employee
  employee.deleteEmployee = function (empId) {
    return this.destroy({
      where: {
        id: empId
      }
    })
  }
  return employee;
};