const { DataTypes } = require("sequelize");

const sequelize =
    require("../config/database");


// CREA EL MODELO ASIENTO

const Asiento = sequelize.define(
    "Asiento",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        codigo: {
            type: DataTypes.STRING(10),
            allowNull: false
        },

        fila: {
            type: DataTypes.STRING(2),
            allowNull: false
        },

        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        estado: {
            type: DataTypes.ENUM(
                "disponible",
                "ocupado"
            ),
            allowNull: false,
            defaultValue: "disponible"
        },

        funcionId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "asientos",

        timestamps: true,

        indexes: [
            {
                unique: true,
                fields: [
                    "funcionId",
                    "codigo"
                ]
            }
        ]
    }
);


module.exports = Asiento;