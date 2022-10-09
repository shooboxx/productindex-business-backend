"use strict";
const { Model } = require("sequelize");

export interface EmployeeAttributes {
  id: number;
  business_id: number;
  user_id : number;
  business_access_level_id: number;
  employee_verified_code?: string;
  verified_date?: Date;
  insert_date: Date;
  update_date: Date;
  deleted_date: Date;
}

module.exports = (sequelize, DataTypes) => {
  class Employee
    extends Model<EmployeeAttributes>
    implements EmployeeAttributes
  {
    id!: number;
    business_id!: number;
    user_id!: number;
    business_access_level_id!: number;
    employee_verified_code?: string;
    verified_date?: Date;
    insert_date!: Date;
    update_date!: Date;
    deleted_date!: Date;
    
    static associate(models) {
      Employee.belongsTo(models.Business, {foreignKey: "business_id"}); 
      Employee.belongsTo(models.Users, {foreignKey: "user_id"}); 
    }
  }
  Employee.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      business_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "business",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      business_access_level: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      employee_verify_code: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      verified_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      insert_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "employee",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "employee_pkey",
          unique: true,
          fields: [{ name: "id" }],
        }
      ],
    }
  );
  return Employee;
};
