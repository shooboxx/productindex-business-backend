import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface BusinessPortfolioAttributes {
  id: number;
  business_id: number;
  media_url?: string;
  media_type?: string;
  title?: string;
  description?: string;
  insert_date?: Date;
  update_date?: Date;
}

module.exports = (sequelize, DataTypes) => {
  class BusinessPortfolio
    extends Model<BusinessPortfolioAttributes>
    implements BusinessPortfolioAttributes
  {
    id!: number;
    business_id!: number;
    media_url?: string;
    media_type?: string;
    title?: string;
    description?: string;
    insert_date?: Date;
    update_date?: Date;
    
    static associate(models) {
        BusinessPortfolio.belongsTo(models.Business, {foreignKey: "business_id"});
    }
  }
  BusinessPortfolio.init(
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
      media_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      media_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
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
      tableName: "business_portfolio",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "business_portfolio_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  return BusinessPortfolio;
};
