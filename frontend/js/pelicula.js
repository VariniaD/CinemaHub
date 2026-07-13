// OBTIENE LOS PARÁMETROS DE LA URL

const parametros =
    new URLSearchParams(window.location.search);


// OBTIENE EL ID DE LA PELÍCULA

let peliculaId =
    parametros.get("id");


if (!peliculaId) {
    peliculaId = "1";
}


// CARGA LOS DATOS DE LA PELÍCULA

async function cargarPelicula() {

    // INTENTA OBTENER LA PELÍCULA DESDE EL BACKEND

    let pelicula =
        await obtenerPeliculaPorIdApi(
            peliculaId
        );


    // SI EL BACKEND FALLA, USA LOS DATOS LOCALES

    if (!pelicula) {

        pelicula =
            buscarPelicula(
                peliculaId
            );
    }


    // BUSCA LOS ELEMENTOS DEL DETALLE

    const fondoPelicula =
        document.getElementById(
            "fondo-pelicula"
        );

    const posterDetalle =
        document.getElementById(
            "poster-detalle"
        );

    const generoPelicula =
        document.getElementById(
            "genero-pelicula"
        );

    const duracionPelicula =
        document.getElementById(
            "duracion-pelicula"
        );

    const clasificacionPelicula =
        document.getElementById(
            "clasificacion-pelicula"
        );

    const tituloPelicula =
        document.getElementById(
            "titulo-pelicula"
        );

    const sinopsisPelicula =
        document.getElementById(
            "sinopsis-pelicula"
        );

    const calificacionPelicula =
        document.getElementById(
            "calificacion-pelicula"
        );

    const resenasPelicula =
        document.getElementById(
            "resenas-pelicula"
        );


    // MUESTRA LOS DATOS

    document.title =
        "CinemaHub - " +
        pelicula.titulo;

    fondoPelicula.style.backgroundImage =
        "url('" +
        pelicula.imagen +
        "')";

    posterDetalle.src =
        pelicula.imagen;

    posterDetalle.alt =
        "Póster de la película " +
        pelicula.titulo;

    generoPelicula.textContent =
        pelicula.genero;

    duracionPelicula.textContent =
        pelicula.duracion +
        " min";

    clasificacionPelicula.textContent =
        pelicula.clasificacion;

    tituloPelicula.textContent =
        pelicula.titulo;

    sinopsisPelicula.textContent =
        pelicula.sinopsis;

    calificacionPelicula.textContent =
        pelicula.calificacion;

    resenasPelicula.textContent =
        pelicula.resenas +
        " reseñas";
}


// EJECUTA LA CARGA

cargarPelicula();


// BUSCA LOS BOTONES DE FECHA

const botonesFecha =
    document.querySelectorAll(".fecha");

let fechaSeleccionada = "";

const diasSemana = [
    "DOM",
    "LUN",
    "MAR",
    "MIÉ",
    "JUE",
    "VIE",
    "SÁB"
];


// PREPARA LAS FECHAS

botonesFecha.forEach(
    function (boton, posicion) {

        const fecha =
            new Date();

        fecha.setDate(
            fecha.getDate() +
            posicion
        );


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


        const fechaValor =
            anio +
            "-" +
            mes +
            "-" +
            dia;


        boton.dataset.fecha =
            fechaValor;


        const textoDia =
            boton.querySelector(
                ".dia-semana"
            );

        const numeroDia =
            boton.querySelector(
                ".numero-dia"
            );


        if (posicion === 0) {

            textoDia.textContent =
                "HOY";

            fechaSeleccionada =
                fechaValor;

        } else {

            textoDia.textContent =
                diasSemana[
                    fecha.getDay()
                ];
        }


        numeroDia.textContent =
            fecha.getDate();


        boton.addEventListener(
            "click",
            function () {

                botonesFecha.forEach(
                    function (otraFecha) {

                        otraFecha.classList.remove(
                            "fecha-activa"
                        );
                    }
                );


                boton.classList.add(
                    "fecha-activa"
                );


                fechaSeleccionada =
                    boton.dataset.fecha;
            }
        );
    }
);


// BUSCA LOS HORARIOS

const horarios =
    document.querySelectorAll(
        ".horario-funcion"
    );


// CONECTA LOS HORARIOS CON ASIENTOS

horarios.forEach(
    function (horario) {

        horario.addEventListener(
            "click",
            function (evento) {

                evento.preventDefault();


                const cine =
                    horario.dataset.cine;

                const sala =
                    horario.dataset.sala;

                const hora =
                    horario.dataset.hora;


                const direccion =
                    "asientos.html?id=" +
                    peliculaId +
                    "&cine=" +
                    encodeURIComponent(cine) +
                    "&sala=" +
                    encodeURIComponent(sala) +
                    "&hora=" +
                    encodeURIComponent(hora) +
                    "&fecha=" +
                    encodeURIComponent(
                        fechaSeleccionada
                    );


                window.location.href =
                    direccion;
            }
        );
    }
);