const express =
    require("express");

const cors =
    require("cors");

const peliculaRoutes =
    require("./routes/peliculaRoutes");


// CREA LA APLICACIÓN DE EXPRESS

const app =
    express();


// PERMITE QUE EL FRONTEND CONSULTE EL BACKEND

app.use(
    cors()
);


// PERMITE RECIBIR DATOS EN FORMATO JSON

app.use(
    express.json()
);


// RUTA PRINCIPAL DE PRUEBA

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


// EXPORTA LA APLICACIÓN

module.exports = app;