"use strict";
const { Model } = require("sequelize");

export interface BusinessTagsAttributes {
  id: number;
  business_id: number;
  tag?: string;
  insert_date?: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class BusinessTags
    extends Model<BusinessTagsAttributes>
    implements BusinessTagsAttributes
  {
    id!: number;
    business_id!: number;
    tag?: string;
    insert_date?: Date;
    update_date?: Date;
    static associate(models) {
      BusinessTags.belongsTo(models.Business, { foreignKey: "business_id" });
    }
  }
  BusinessTags.init(
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
      tag: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      insert_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      update_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "business_tags",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "business_tags_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  return BusinessTags;
};
