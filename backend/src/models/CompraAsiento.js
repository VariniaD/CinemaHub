const { DataTypes } =
    require("sequelize");

const sequelize =
    require("../config/database");


// CREA EL MODELO COMPRA ASIENTO

const CompraAsiento =
    sequelize.define(
        "CompraAsiento",
        {
            id: {
                type:
                    DataTypes.INTEGER,

                autoIncrement:
                    true,

                primaryKey:
                    true
            },

            precio: {
                type:
                    DataTypes.DECIMAL(10, 2),

                allowNull:
                    false
            },

            compraId: {
                type:
                    DataTypes.INTEGER,

                allowNull:
                    false
            },

            asientoId: {
                type:
                    DataTypes.INTEGER,

                allowNull:
                    false
            }
        },
        {
            tableName:
                "compra_asientos",

            timestamps:
                true,

            indexes: [
                {
                    unique:
                        true,

                    fields: [
                        "compraId",
                        "asientoId"
                    ]
                }
            ]
        }
    );


module.exports =
    CompraAsiento;