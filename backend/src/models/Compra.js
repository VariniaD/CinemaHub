const { DataTypes } =
    require("sequelize");

const sequelize =
    require("../config/database");


// CREA EL MODELO COMPRA

const Compra =
    sequelize.define(
        "Compra",
        {
            id: {
                type:
                    DataTypes.INTEGER,

                autoIncrement:
                    true,

                primaryKey:
                    true
            },

            codigoTicket: {
                type:
                    DataTypes.STRING(40),

                allowNull:
                    false,

                unique:
                    true
            },

            nombre: {
                type:
                    DataTypes.STRING(100),

                allowNull:
                    false
            },

            correo: {
                type:
                    DataTypes.STRING(120),

                allowNull:
                    false
            },

            telefono: {
                type:
                    DataTypes.STRING(30),

                allowNull:
                    false
            },

            cantidadEntradas: {
                type:
                    DataTypes.INTEGER,

                allowNull:
                    false
            },

            subtotal: {
                type:
                    DataTypes.DECIMAL(10, 2),

                allowNull:
                    false
            },

            cargoServicio: {
                type:
                    DataTypes.DECIMAL(10, 2),

                allowNull:
                    false
            },

            total: {
                type:
                    DataTypes.DECIMAL(10, 2),

                allowNull:
                    false
            },

            metodoPago: {
                type:
                    DataTypes.STRING(30),

                allowNull:
                    false
            },

            fechaCompra: {
                type:
                    DataTypes.DATE,

                allowNull:
                    false,

                defaultValue:
                    DataTypes.NOW
            },

            funcionId: {
                type:
                    DataTypes.INTEGER,

                allowNull:
                    false
            }
        },
        {
            tableName:
                "compras",

            timestamps:
                true
        }
    );


module.exports =
    Compra;