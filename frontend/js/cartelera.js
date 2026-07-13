// BUSCA LOS BOTONES DE LOS FILTROS

const filtroHoy =
    document.getElementById("filtro-hoy");

const filtroProximos =
    document.getElementById("filtro-proximos");


// BUSCA LAS TARJETAS DE PELÍCULAS

const tarjetasPeliculas =
    document.querySelectorAll(".tarjeta-pelicula");


// BUSCA LA TARJETA DE PRÓXIMOS ESTRENOS

const tarjetaProximamente =
    document.querySelector(".tarjeta-proximamente");


// OBTIENE LA FECHA ACTUAL

function obtenerFechaActual() {

    const fecha =
        new Date();

    const anio =
        fecha.getFullYear();

    const mes =
        String(
            fecha.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            fecha.getDate()
        ).padStart(2, "0");

    return (
        anio +
        "-" +
        mes +
        "-" +
        dia
    );
}


// BUSCA UNA PELÍCULA DENTRO DE UNA LISTA

function buscarPeliculaEnLista(
    peliculas,
    peliculaId
) {

    for (
        let i = 0;
        i < peliculas.length;
        i++
    ) {

        if (
            String(peliculas[i].id) ===
            String(peliculaId)
        ) {

            return peliculas[i];
        }
    }


    return null;
}


// ACTUALIZA UNA TARJETA DE LA CARTELERA

function actualizarTarjeta(
    tarjeta,
    pelicula
) {

    // Busca la imagen
    const poster =
        tarjeta.querySelector(
            ".poster-pelicula"
        );


    // Busca el valor de la calificación
    const valorCalificacion =
        tarjeta.querySelector(
            ".valor-calificacion"
        );


    // Busca el botón de asientos
    const botonAsientos =
        tarjeta.querySelector(
            ".boton-asientos"
        );


    // Busca el botón de detalles
    const botonDetalles =
        tarjeta.querySelector(
            ".boton-detalles"
        );


    // Actualiza la imagen
    if (poster) {

        poster.src =
            pelicula.imagen;

        poster.alt =
            "Póster de la película " +
            pelicula.titulo;
    }


    // Actualiza la calificación
    if (valorCalificacion) {

        valorCalificacion.textContent =
            pelicula.calificacion;
    }


    // Actualiza el identificador de la tarjeta
    tarjeta.dataset.id =
        pelicula.id;


    // Actualiza el enlace de detalles
    if (botonDetalles) {

        botonDetalles.href =
            "pelicula.html?id=" +
            pelicula.id;
    }


   // ENVÍA AL DETALLE PARA SELECCIONAR UNA FUNCIÓN REAL

if (botonAsientos) {

    botonAsientos.dataset.id =
        pelicula.id;

    botonAsientos.href =
        "pelicula.html?id=" +
        pelicula.id +
        "#funciones";
}
}


// CARGA LAS PELÍCULAS

async function cargarCartelera() {

    // Intenta obtener las películas del backend
    let peliculas =
        await obtenerPeliculasApi();


    // Si el backend no responde,
    // usa los datos temporales de datos.js
    if (
        !peliculas ||
        peliculas.length === 0
    ) {

        peliculas =
            window.peliculas;
    }


    // Recorre las tarjetas que ya existen en el HTML
    tarjetasPeliculas.forEach(
        function (tarjeta) {

            const peliculaId =
                tarjeta.dataset.id;


            const pelicula =
                buscarPeliculaEnLista(
                    peliculas,
                    peliculaId
                );


            // Oculta la tarjeta si no existe
            // una película para ese identificador
            if (!pelicula) {

                tarjeta.style.display =
                    "none";

                return;
            }


            // Muestra la tarjeta
            tarjeta.style.display =
                "";


            // Coloca los datos recibidos
            actualizarTarjeta(
                tarjeta,
                pelicula
            );
        }
    );
}


// MUESTRA LAS PELÍCULAS ACTUALES

if (filtroHoy) {

    filtroHoy.addEventListener(
        "click",
        function () {

            filtroHoy.classList.add(
                "filtro-activo"
            );


            if (filtroProximos) {

                filtroProximos.classList.remove(
                    "filtro-activo"
                );
            }


            tarjetasPeliculas.forEach(
                function (tarjeta) {

                    tarjeta.style.display =
                        "";
                }
            );


            if (tarjetaProximamente) {

                tarjetaProximamente.style.display =
                    "none";
            }
        }
    );
}


// MUESTRA PRÓXIMOS ESTRENOS

if (filtroProximos) {

    filtroProximos.addEventListener(
        "click",
        function () {

            filtroProximos.classList.add(
                "filtro-activo"
            );


            if (filtroHoy) {

                filtroHoy.classList.remove(
                    "filtro-activo"
                );
            }


            tarjetasPeliculas.forEach(
                function (tarjeta) {

                    tarjeta.style.display =
                        "none";
                }
            );


            if (tarjetaProximamente) {

                tarjetaProximamente.style.display =
                    "flex";
            }
        }
    );
}


// OCULTA PRÓXIMOS ESTRENOS AL INICIAR

if (tarjetaProximamente) {

    tarjetaProximamente.style.display =
        "none";
}


// CARGA LA CARTELERA

cargarCartelera();