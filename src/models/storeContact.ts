"use strict";
const { Model } = require("sequelize");

export interface storeContactsAttributes {
  id: number;
  business_store_id : number;
  email?: string;
  phone?: string;
  phone_2?: string;
  phone_3?: string;
  facebook_url?: string;
  twitter_url?: string;
  instagram_url?: string;
  business_website?: string;
  insert_date: Date;
  update_date: Date;
}

module.exports = (sequelize, DataTypes) => {
  class StoreContacts
    extends Model<storeContactsAttributes>
    implements storeContactsAttributes
  {
    id!: number;
    business_store_id!: number;
    email?: string;
    phone?: string;
    phone_2?: string;
    phone_3?: string;
    facebook_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    business_website?: string;
    insert_date!: Date;
    update_date!: Date;
    
    static associate(models) {
      StoreContacts.belongsTo(models.BusinessStore, {foreignKey: "business_store_id"});

    }
  }
  StoreContacts.init(
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
      facebook_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      twitter_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      instagram_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      business_website: {
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
    },
    {
      sequelize,
      tableName: "store_contact",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "store_contact_pkey",
          unique: true,
          fields: [{ name: "id" }],
        }
      ],
    }
  );
  return StoreContacts;
};
