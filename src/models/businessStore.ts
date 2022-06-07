"use strict";
const { Model } = require("sequelize");

export interface BusinessStoreAttributes {
  id: number;
  business_id: number;
  unique_name: string;
  email?: string;
  phone?: string;
  phone_2?: string;
  phone_3?: string;
  address_line_1?: string;
  address_line_2?: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  is_primary?: boolean;
  temp_or_perm_closure?: string;
  reopen_date?: string;
  insert_date: Date;
  update_date: Date;
}

module.exports = (sequelize, DataTypes) => {
  class BusinessStore
    extends Model<BusinessStoreAttributes>
    implements BusinessStoreAttributes
  {
    id!: number;
    business_id!: number;
    unique_name!: string;
    email?: string;
    phone?: string;
    phone_2?: string;
    phone_3?: string;
    address_line_1?: string;
    address_line_2?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    city!: string;
    state!: string;
    postal_code?: string;
    is_primary?: boolean;
    temp_or_perm_closure?: string;
    reopen_date?: string;
    insert_date!: Date;
    update_date!: Date;
    
    static associate(models) {
      // BusinessStore.belongsTo(models.Business, {foreignKey: "business_id"});
      // BusinessStore.hasMany(models.StoreHours, { foreignKey: "business_store_id"});
      // BusinessStore.hasMany(models.InventoryItem, {foreignKey: "business_store_id"});
      // BusinessStore.hasMany(models.Review, {foreignKey: "store_id"});

    }
  }
  BusinessStore.init(
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
      unique_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "business_store_unique_name_key",
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone_2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone_3: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address_line_1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      address_line_2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      latitude: {
        type: DataTypes.REAL,
        allowNull: true,
      },
      longitude: {
        type: DataTypes.REAL,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      temp_or_perm_closure: {
        type: DataTypes.CHAR(4),
        allowNull: true,
      },
      reopen_date: {
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
      tableName: "business_store",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "business_store_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "business_store_unique_name_key",
          unique: true,
          fields: [{ name: "unique_name" }],
        },
      ],
    }
  );
  return BusinessStore;
};
