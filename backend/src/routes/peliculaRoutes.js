const express =
    require("express");

const {
    obtenerPeliculas,
    obtenerPeliculaPorId
} = require(
    "../controllers/peliculaController"
);

const {
    obtenerFuncionesPorPelicula
} = require(
    "../controllers/funcionController"
);


// CREA EL ENRUTADOR

const router =
    express.Router();


// OBTIENE TODAS LAS PELÍCULAS

router.get(
    "/",
    obtenerPeliculas
);


// OBTIENE LAS FUNCIONES DE UNA PELÍCULA

router.get(
    "/:id/funciones",
    obtenerFuncionesPorPelicula
);


// OBTIENE UNA PELÍCULA POR ID

router.get(
    "/:id",
    obtenerPeliculaPorId
);


// EXPORTA LAS RUTAS

module.exports = router;