// OBTIENE LOS PARÁMETROS DE LA URL

const parametros =
    new URLSearchParams(window.location.search);


// OBTIENE EL ID DE LA PELÍCULA

let peliculaId =
    parametros.get("id");


if (!peliculaId) {
    peliculaId = "2";
}


// GUARDA LA FECHA SELECCIONADA

let fechaSeleccionada = "";


// BUSCA LOS BOTONES DE FECHA

const botonesFecha =
    document.querySelectorAll(".fecha");


// BUSCA EL CONTENEDOR DE FUNCIONES

const listaFunciones =
    document.getElementById("lista-funciones");


// BUSCA EL MENSAJE SIN FUNCIONES

const mensajeSinFunciones =
    document.getElementById("mensaje-sin-funciones");


// NOMBRES DE LOS DÍAS

const diasSemana = [
    "DOM",
    "LUN",
    "MAR",
    "MIÉ",
    "JUE",
    "VIE",
    "SÁB"
];


// CARGA LOS DATOS DE LA PELÍCULA

async function cargarPelicula() {

    let pelicula =
        await obtenerPeliculaPorIdApi(
            peliculaId
        );


    // USA DATOS LOCALES COMO RESPALDO

    if (!pelicula) {

        pelicula =
            buscarPelicula(
                peliculaId
            );
    }


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


    let duracionTexto =
        String(pelicula.duracion);


    if (!duracionTexto.includes("min")) {

        duracionTexto =
            duracionTexto + " min";
    }


    duracionPelicula.textContent =
        duracionTexto;


    clasificacionPelicula.textContent =
        pelicula.clasificacion;


    tituloPelicula.textContent =
        pelicula.titulo;


    sinopsisPelicula.textContent =
        pelicula.sinopsis;


    calificacionPelicula.textContent =
        pelicula.calificacion;


    let resenasTexto =
        String(pelicula.resenas);


    if (!resenasTexto.includes("reseñas")) {

        resenasTexto =
            resenasTexto + " reseñas";
    }


    resenasPelicula.textContent =
        resenasTexto;
}


// FORMATEA LA HORA

function formatearHora(hora) {

    if (!hora) {
        return "";
    }


    return hora.substring(0, 5);
}


// AGRUPA LAS FUNCIONES POR CINE Y SALA

function agruparFunciones(funciones) {

    const grupos = {};


    funciones.forEach(
        function (funcion) {

            const cine =
                funcion.sala.cine;

            const sala =
                funcion.sala;


            const clave =
                cine.id +
                "-" +
                sala.id;


            if (!grupos[clave]) {

                grupos[clave] = {
                    cine: cine,
                    sala: sala,
                    funciones: []
                };
            }


            grupos[clave].funciones.push(
                funcion
            );
        }
    );


    return Object.values(grupos);
}


// CREA UNA TARJETA DE CINE

function crearTarjetaFuncion(grupo) {

    const tarjeta =
        document.createElement("article");

    tarjeta.classList.add(
        "tarjeta-cine"
    );


    const encabezado =
        document.createElement("div");

    encabezado.classList.add(
        "encabezado-cine"
    );


    const datosCine =
        document.createElement("div");


    const nombreCine =
        document.createElement("h3");

    nombreCine.textContent =
        grupo.cine.nombre;


    const direccionCine =
        document.createElement("p");

    direccionCine.textContent =
        grupo.cine.direccion;


    datosCine.appendChild(
        nombreCine
    );

    datosCine.appendChild(
        direccionCine
    );


    const tipoSala =
        document.createElement("span");

    tipoSala.classList.add(
        "tipo-sala"
    );

    tipoSala.textContent =
        grupo.sala.nombre;


    encabezado.appendChild(
        datosCine
    );

    encabezado.appendChild(
        tipoSala
    );


    const horarios =
        document.createElement("div");

    horarios.classList.add(
        "horarios-cine"
    );


    grupo.funciones.forEach(
        function (funcion) {

            const horaTexto =
                formatearHora(
                    funcion.hora
                );


            // FUNCIÓN AGOTADA

            if (
                funcion.estado ===
                "agotada"
            ) {

                const horarioAgotado =
                    document.createElement(
                        "span"
                    );

                horarioAgotado.classList.add(
                    "horario",
                    "horario-agotado"
                );

                horarioAgotado.textContent =
                    horaTexto;


                horarios.appendChild(
                    horarioAgotado
                );

                return;
            }


            // FUNCIÓN CANCELADA

            if (
                funcion.estado ===
                "cancelada"
            ) {

                return;
            }


            // FUNCIÓN DISPONIBLE

            const horario =
                document.createElement("a");

            horario.href =
                "asientos.html";

            horario.classList.add(
                "horario",
                "horario-funcion"
            );


            horario.textContent =
                horaTexto;


            horario.dataset.funcionId =
                funcion.id;

            horario.dataset.cine =
                grupo.cine.codigo;

            horario.dataset.sala =
                grupo.sala.nombre;

            horario.dataset.hora =
                horaTexto;


            horario.addEventListener(
                "click",
                function (evento) {

                    evento.preventDefault();


                    const direccion =
                        "asientos.html?funcionId=" +
                        encodeURIComponent(
                            funcion.id
                        ) +
                        "&id=" +
                        encodeURIComponent(
                            peliculaId
                        ) +
                        "&cine=" +
                        encodeURIComponent(
                            grupo.cine.codigo
                        ) +
                        "&sala=" +
                        encodeURIComponent(
                            grupo.sala.nombre
                        ) +
                        "&hora=" +
                        encodeURIComponent(
                            horaTexto
                        ) +
                        "&fecha=" +
                        encodeURIComponent(
                            fechaSeleccionada
                        );


                    window.location.href =
                        direccion;
                }
            );


            horarios.appendChild(
                horario
            );
        }
    );


    tarjeta.appendChild(
        encabezado
    );

    tarjeta.appendChild(
        horarios
    );


    return tarjeta;
}


// MUESTRA LAS FUNCIONES

function mostrarFunciones(funciones) {

    listaFunciones.innerHTML = "";


    if (
        !funciones ||
        funciones.length === 0
    ) {

        mensajeSinFunciones.style.display =
            "block";

        return;
    }


    mensajeSinFunciones.style.display =
        "none";


    const grupos =
        agruparFunciones(funciones);


    grupos.forEach(
        function (grupo) {

            const tarjeta =
                crearTarjetaFuncion(grupo);


            listaFunciones.appendChild(
                tarjeta
            );
        }
    );
}


// CARGA LAS FUNCIONES DE LA FECHA SELECCIONADA

async function cargarFunciones() {

    listaFunciones.innerHTML =
        '<p class="mensaje-cargando">Cargando funciones...</p>';


    mensajeSinFunciones.style.display =
        "none";


    const funciones =
        await obtenerFuncionesApi(
            peliculaId,
            fechaSeleccionada
        );


    mostrarFunciones(
        funciones
    );
}


// PREPARA LOS BOTONES DE FECHA

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


                cargarFunciones();
            }
        );
    }
);


// CARGA INICIAL

async function iniciarDetalle() {

    await cargarPelicula();

    await cargarFunciones();
}


iniciarDetalle();