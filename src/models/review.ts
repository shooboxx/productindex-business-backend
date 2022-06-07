"use strict";
const { Model } = require("sequelize");

export interface reviewAttributes {
  id: number;
  user_id: number;
  store_id: number;
  rating_number: number;
  comment: string;
  flagged_inappropriate?: boolean;
  flagged_reason?: string;
  deleted_date?: Date;
  insert_date: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class Review extends Model<reviewAttributes> implements reviewAttributes {
    id!: number;
    user_id!: number;
    store_id!: number;
    rating_number!: number;
    comment!: string;
    flagged_inappropriate?: boolean;
    flagged_reason?: string;
    deleted_date?: Date;
    insert_date!: Date;
    update_date?: Date;

    static associate(models) {
        Review.belongsTo(models.BusinessStore, {foreignKey: "store_id"});
    }
  }
  Review.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "business_store",
          key: "id",
        },
      },
      rating_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      flagged_inappropriate: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      flagged_reason: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      deleted_date: {
        type: DataTypes.DATE,
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
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "review",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
      indexes: [
        {
          name: "review_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  return Review;
};
