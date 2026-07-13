const express =
    require("express");

const {
    registrarCompra
} = require(
    "../controllers/compraController"
);


// CREA EL ENRUTADOR

const router =
    express.Router();


// REGISTRA UNA NUEVA COMPRA

router.post(
    "/",
    registrarCompra
);


// EXPORTA LAS RUTAS

module.exports = router;