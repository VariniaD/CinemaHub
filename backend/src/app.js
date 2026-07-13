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

// OBTIENE LAS FUNCIONES DE UNA PELÍCULA

async function obtenerFuncionesApi(
    peliculaId,
    fecha
) {

    try {

        // Forma la dirección de la API

        let direccion =
            API_URL +
            "/peliculas/" +
            peliculaId +
            "/funciones";


        // Agrega la fecha cuando fue enviada

        if (fecha) {

            direccion =
                direccion +
                "?fecha=" +
                encodeURIComponent(fecha);
        }


        // Realiza la consulta

        const respuesta =
            await fetch(direccion);


        // Verifica la respuesta

        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron obtener las funciones"
            );
        }


        // Convierte la respuesta a JSON

        const datos =
            await respuesta.json();


        // Devuelve solamente la lista de funciones

        return datos.funciones;

    } catch (error) {

        console.error(
            "Error al consultar las funciones:",
            error
        );


        return [];
    }
}