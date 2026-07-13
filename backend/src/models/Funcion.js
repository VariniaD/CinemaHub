const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");


// CREA EL MODELO FUNCIÓN

const Funcion = sequelize.define(
    "Funcion",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        hora: {
            type: DataTypes.TIME,
            allowNull: false
        },

        estado: {
            type: DataTypes.ENUM(
                "disponible",
                "agotada",
                "cancelada"
            ),
            allowNull: false,
            defaultValue: "disponible"
        },

        peliculaId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        salaId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "funciones",
        timestamps: true
    }
);


module.exports = Funcion;