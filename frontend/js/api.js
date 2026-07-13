// DIRECCIÓN PRINCIPAL DEL BACKEND

const API_URL =
    "http://localhost:3000/api";


// OBTIENE TODAS LAS PELÍCULAS

async function obtenerPeliculasApi() {

    try {

        const respuesta =
            await fetch(
                API_URL + "/peliculas"
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron obtener las películas"
            );
        }


        const datos =
            await respuesta.json();


        return datos.peliculas;

    } catch (error) {

        console.error(
            "Error al consultar las películas:",
            error
        );


        return [];
    }
}


// OBTIENE UNA PELÍCULA POR ID

async function obtenerPeliculaPorIdApi(id) {

    try {

        const respuesta =
            await fetch(
                API_URL +
                "/peliculas/" +
                id
            );


        if (!respuesta.ok) {

            throw new Error(
                "No se pudo obtener la película"
            );
        }


        const datos =
            await respuesta.json();


        return datos.pelicula;

    } catch (error) {

        console.error(
            "Error al consultar la película:",
            error
        );


        return null;
    }
}

// OBTIENE LAS FUNCIONES DE UNA PELÍCULA

async function obtenerFuncionesApi(
    peliculaId,
    fecha
) {

    try {

        let direccion =
            API_URL +
            "/peliculas/" +
            peliculaId +
            "/funciones";


        // AGREGA LA FECHA CUANDO SE RECIBE

        if (fecha) {

            direccion =
                direccion +
                "?fecha=" +
                encodeURIComponent(fecha);
        }


        const respuesta =
            await fetch(direccion);


        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron obtener las funciones"
            );
        }


        const datos =
            await respuesta.json();


        return datos.funciones;

    } catch (error) {

        console.error(
            "Error al consultar las funciones:",
            error
        );


        return [];
    }
}