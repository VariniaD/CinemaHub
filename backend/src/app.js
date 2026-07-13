const express = require("express");
const cors = require("cors");


// CREA LA APLICACIÓN DE EXPRESS

const app = express();


// PERMITE QUE EL FRONTEND CONSULTE EL BACKEND

app.use(cors());


// PERMITE RECIBIR DATOS EN FORMATO JSON

app.use(express.json());


// RUTA PRINCIPAL DE PRUEBA

app.get("/", function (req, res) {

    res.json({
        mensaje: "Servidor de CinemaHub funcionando correctamente"
    });
});


// RUTA DE PRUEBA PARA LA API

app.get("/api", function (req, res) {

    res.json({
        nombre: "CinemaHub API",
        estado: "activo"
    });
});


// EXPORTA LA APLICACIÓN

module.exports = app;