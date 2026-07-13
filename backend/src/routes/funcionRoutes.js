const express =
    require("express");

const {
    obtenerAsientosPorFuncion
} = require(
    "../controllers/asientoController"
);


// CREA EL ENRUTADOR

const router =
    express.Router();


// OBTIENE LOS ASIENTOS DE UNA FUNCIÓN

router.get(
    "/:id/asientos",
    obtenerAsientosPorFuncion
);


// EXPORTA LAS RUTAS

module.exports = router;