const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");


// CREA EL MODELO SALA

const Sala = sequelize.define(
    "Sala",
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

        tipo: {
            type: DataTypes.ENUM(
                "Premium",
                "Estándar"
            ),
            allowNull: false
        },

        capacidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        cineId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "salas",
        timestamps: true
    }
);


module.exports = Sala;