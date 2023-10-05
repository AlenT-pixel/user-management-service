import { Sequelize, Dialect } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const sequelizeDbConnection = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DRIVE as Dialect,
  }
);

sequelizeDbConnection.authenticate();