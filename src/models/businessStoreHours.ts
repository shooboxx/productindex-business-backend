"use strict";
const { Model } = require("sequelize");

export interface StoreHoursAttributes {
    id: number;
    business_store_id: number;
    monday_open?: string;
    monday_closed?: string;
    tuesday_open?: string;
    tuesday_closed?: string;
    wednesday_open?: string;
    wednesday_closed?: string;
    thursday_open?: string;
    thursday_closed?: string;
    friday_open?: string;
    friday_closed?: string;
    saturday_open?: string;
    saturday_closed?: string;
    sunday_open?: string;
    sunday_closed?: string;
    insert_date: Date;
    update_date: Date;
  }

  module.exports = (sequelize, DataTypes) => {class StoreHours extends Model<StoreHoursAttributes> implements StoreHoursAttributes {
    id!: number;
    business_store_id!: number;
    monday_open?: string;
    monday_closed?: string;
    tuesday_open?: string;
    tuesday_closed?: string;
    wednesday_open?: string;
    wednesday_closed?: string;
    thursday_open?: string;
    thursday_closed?: string;
    friday_open?: string;
    friday_closed?: string;
    saturday_open?: string;
    saturday_closed?: string;
    sunday_open?: string;
    sunday_closed?: string;
    insert_date!: Date;
    update_date!: Date;

    static associate(models) {
      StoreHours.belongsTo(models.BusinessStore, { foreignKey: "business_store_id"});

    }
  }
    StoreHours.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      business_store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'business_store',
          key: 'id'
        }
      },
      monday_open: {
        type: DataTypes.TIME,
        allowNull: true
      },
      monday_closed: {
        type: DataTypes.TIME,
        allowNull: true
      },
      tuesday_open: {
        type: DataTypes.TIME,
        allowNull: true
      },
      tuesday_closed: {
        type: DataTypes.TIME,
        allowNull: true
      },
      wednesday_open: {
        type: DataTypes.TIME,
        allowNull: true
      },
      wednesday_closed: {
        type: DataTypes.TIME,
        allowNull: true
      },
      thursday_open: {
        type: DataTypes.TIME,
        allowNull: true
      },
      thursday_closed: {
        type: DataTypes.TIME,
        allowNull: true
      },
      friday_open: {
        type: DataTypes.TIME,
        allowNull: true
      },
      friday_closed: {
        type: DataTypes.TIME,
        allowNull: true
      },
      saturday_open: {
        type: DataTypes.TIME,
        allowNull: true
      },
      saturday_closed: {
        type: DataTypes.TIME,
        allowNull: true
      },
      sunday_open: {
        type: DataTypes.TIME,
        allowNull: true
      },
      sunday_closed: {
        type: DataTypes.TIME,
        allowNull: true
      },
      insert_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'business_store_hours',
      schema: 'public',
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "business_store_hours_pkey",
          unique: true,
          fields: [
            { name: "id" },
          ]
        },
      ]
    });
      return StoreHours;
    }
