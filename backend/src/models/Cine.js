const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");


// CREA EL MODELO CINE

const Cine = sequelize.define(
    "Cine",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        codigo: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },

        direccion: {
            type: DataTypes.STRING(200),
            allowNull: false
        },

        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "cines",
        timestamps: true
    }
);


module.exports = Cine;