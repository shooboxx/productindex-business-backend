"use strict";
const { Model } = require("sequelize");

export interface BusinessAttributes {
  id: number;
  created_by: number;
  business_name: string;
  description?: string;
  profile_pic_url?: string;
  active: boolean;
  category?: string;
  insert_date: Date;
  update_date?: Date;
  deleted_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class Business
    extends Model<BusinessAttributes>
    implements BusinessAttributes
  {
    id!: number;
    created_by!: number;
    business_name!: string;
    description?: string;
    profile_pic_url?: string;
    active!: boolean;
    category?: string;
    insert_date!: Date;
    update_date?: Date;
    deleted_date?: Date;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Business.belongsTo(models.Users, { foreignKey: "created_by" });
      Business.hasMany(models.BusinessStore, { foreignKey: "business_id" });
      Business.hasMany(models.BusinessTags, { foreignKey: "business_id" });
      Business.hasMany(models.Product, {foreignKey: "business_id"});
      Business.hasMany(models.BusinessPortfolio, {foreignKey: "business_id"});
      Business.hasMany(models.Employee, {foreignKey: "business_id"});
    }
  }
  Business.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      business_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profile_pic_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      insert_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Business",
      tableName: "business",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "business_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  return Business;
};
