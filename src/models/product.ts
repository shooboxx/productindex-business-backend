"use strict";
const { Model } = require("sequelize");

export interface ProductAttributes {
  id: number;
  business_id: number;
  product_name: string;
  product_type?: string;
  sku?: string;
  category?: string;
  image_url?: string;
  insert_date: Date;
  update_date: Date;
}

module.exports = (sequelize, DataTypes) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes {
    id!: number;
    business_id!: number;
    product_name!: string;
    product_type?: string;
    sku?: string;
    category?: string;
    image_url?: string;
    insert_date!: Date;
    update_date!: Date;

    static associate(models) {
        Product.hasMany(models.InventoryItem, { as: "inventory_items", foreignKey: "product_id"});
        Product.belongsTo(models.Business, { as: "business", foreignKey: "business_id"});
    }
  }

  Product.init(
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
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      product_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      sku: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      tag: {
        type: DataTypes.STRING(255),
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
      }
    },
    {
      sequelize,
      tableName: "product",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "product_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  return Product;
};
