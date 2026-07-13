const express =
    require("express");

const cors =
    require("cors");

const peliculaRoutes =
    require("./routes/peliculaRoutes");

const funcionRoutes =
    require("./routes/funcionRoutes");

const compraRoutes =
    require("./routes/compraRoutes");


// CREA LA APLICACIÓN

const app =
    express();


// PERMITE LA COMUNICACIÓN CON EL FRONTEND

app.use(
    cors()
);


// PERMITE RECIBIR JSON

app.use(
    express.json()
);


// RUTA PRINCIPAL

app.get(
    "/",
    function (req, res) {

        res.json({
            mensaje:
                "Servidor de CinemaHub funcionando correctamente"
        });
    }
);


// RUTA GENERAL DE LA API

app.get(
    "/api",
    function (req, res) {

        res.json({
            nombre:
                "CinemaHub API",

            estado:
                "activo"
        });
    }
);


// RUTAS DE PELÍCULAS

app.use(
    "/api/peliculas",
    peliculaRoutes
);


// RUTAS DE FUNCIONES Y ASIENTOS

app.use(
    "/api/funciones",
    funcionRoutes
);


// RUTAS DE COMPRAS

app.use(
    "/api/compras",
    compraRoutes
);


// EXPORTA LA APLICACIÓN

module.exports = app;