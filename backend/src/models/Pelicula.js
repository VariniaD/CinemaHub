const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");


// CREA EL MODELO PELÍCULA

const Pelicula = sequelize.define(
    "Pelicula",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        titulo: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        imagen: {
            type: DataTypes.STRING(255),
            allowNull: false
        },

        genero: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        duracion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        clasificacion: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        calificacion: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false,
            defaultValue: 0
        },

        resenas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        sinopsis: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        estado: {
            type: DataTypes.ENUM(
                "cartelera",
                "proximamente",
                "inactiva"
            ),
            allowNull: false,
            defaultValue: "cartelera"
        }
    },
    {
        tableName: "peliculas",

        timestamps: true
    }
);


// EXPORTA EL MODELO

module.exports = Pelicula;