const express =
    require("express");

const {
    obtenerPeliculas,
    obtenerPeliculaPorId
} = require("../controllers/peliculaController");


// CREA EL ENRUTADOR

const router =
    express.Router();


// RUTA PARA OBTENER TODAS LAS PELÍCULAS

router.get(
    "/",
    obtenerPeliculas
);


// RUTA PARA OBTENER UNA PELÍCULA POR ID

router.get(
    "/:id",
    obtenerPeliculaPorId
);


// EXPORTA LAS RUTAS

module.exports = router;