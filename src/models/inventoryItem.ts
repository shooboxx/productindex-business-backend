"use strict";
const { Model } = require("sequelize");

export interface InventoryItemAttributes {
  id: number;
  product_id: number;
  business_store_id: number;
  quantity?: number;
  price?: number;
  public: boolean;
  discounted_price?: number;
  show_price: boolean;
  insert_date?: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class InventoryItem
    extends Model<InventoryItemAttributes>
    implements InventoryItemAttributes
  {
    id!: number;
    product_id!: number;
    business_store_id!: number;
    quantity?: number;
    price?: number;
    public!: boolean;
    discounted_price?: number;
    show_price!: boolean;
    insert_date?: Date;
    update_date?: Date;

    static associate(models) {
      InventoryItem.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
      InventoryItem.belongsTo(models.BusinessStore, {
        foreignKey: "business_store_id",
      });
    }
  }

  InventoryItem.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
      },
      business_store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "business_store",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      discounted_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      public: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      show_price: {
        type: DataTypes.BOOLEAN,
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
      tableName: "inventory_item",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "inventory_item_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  return InventoryItem
};
