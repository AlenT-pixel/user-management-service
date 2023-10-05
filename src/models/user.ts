import { Model, DataTypes } from "sequelize";
import { sequelizeDbConnection } from "../services/database.service";

export const User = sequelizeDbConnection.define<any>("users", {
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
});