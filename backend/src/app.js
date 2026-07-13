const express =
    require("express");

const cors =
    require("cors");

const peliculaRoutes =
    require("./routes/peliculaRoutes");

const funcionRoutes =
    require("./routes/funcionRoutes");


// CREA LA APLICACIÓN DE EXPRESS

const app =
    express();


// PERMITE QUE EL FRONTEND CONSULTE EL BACKEND

app.use(
    cors()
);


// PERMITE RECIBIR DATOS JSON

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


// RUTAS DE FUNCIONES

app.use(
    "/api/funciones",
    funcionRoutes
);


// EXPORTA LA APLICACIÓN

module.exports = app;