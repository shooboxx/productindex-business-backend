"use strict";
const { Model } = require("sequelize");

export interface reportedReviewAttributes {
  review_id: number;
  reported_by: number;
  reported_reason: string;
  insert_date: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class ReportedReview extends Model<reportedReviewAttributes> implements reportedReviewAttributes {
    review_id!: number;
    reported_by!: number;
    reported_reason!: string;
    insert_date!: Date;
    update_date?: Date;

    static associate(models) {
      ReportedReview.belongsTo(models.Review, {foreignKey: "review_id"});
    }
  }
  ReportedReview.init(
    {
      review_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      reported_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      reported_reason: {
        type: DataTypes.STRING(255),
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
      modelName: "ReportedReview",
      tableName: "reported_reviews",
      schema: "public",
      timestamps: true,
      createdAt: 'insert_date',
      updatedAt: 'update_date',
    }
  );
  return ReportedReview;
};
