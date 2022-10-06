"use strict";
const { Model } = require("sequelize");

export interface BusinessActivityAttributes {
  id: number;
  user_id: number;
  business_id: number;
  activity: string;
  insert_date: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class BusinessActivity
    extends Model<BusinessActivityAttributes>
    implements BusinessActivityAttributes
  {
    id!: number;
    user_id!: number;
    business_id!: number;
    activity!: string;
    insert_date!: Date;
    update_date?: Date;
    
    static associate(models) {
      BusinessActivity.belongsTo(models.Business, {foreignKey: "business_id"}); 
      BusinessActivity.belongsTo(models.Users, {foreignKey: "user_id"}); 
    }
  }
  BusinessActivity.init(
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
      activity: {
        type: DataTypes.STRING(500),
        allowNull: false
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
      tableName: "business_activity",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
    }
  );
  return BusinessActivity;
};
