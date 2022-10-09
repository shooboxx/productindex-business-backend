"use strict";
const { Model } = require("sequelize");

export interface EmployeeAssignmentAttributes {
  id: number;
  employee_id: number;
  business_store_id: number;
  insert_date: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class EmployeeAssignment
    extends Model<EmployeeAssignmentAttributes>
    implements EmployeeAssignmentAttributes
  {
    id!: number;
    employee_id!: number;
    business_store_id!: number;
    insert_date!: Date;
    update_date?: Date;
    
    static associate(models) {
      EmployeeAssignment.belongsTo(models.Employee, {foreignKey: "employee_id"}); 
      EmployeeAssignment.belongsTo(models.BusinessStore, {foreignKey: "business_store_id"}); 
    }
  }
  EmployeeAssignment.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      business_store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "business_store",
          key: "id",
        },
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "employee",
          key: "id",
        },
      },
      insert_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "employee_assignment",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "employee_assignment_pkey",
          unique: true,
          fields: [{ name: "id" }],
        }
      ],
    }
  );
  return EmployeeAssignment;
};
