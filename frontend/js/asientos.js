// OBTIENE LOS PARÁMETROS DE LA URL

const parametros =
    new URLSearchParams(
        window.location.search
    );


// OBTIENE EL IDENTIFICADOR DE LA FUNCIÓN

const funcionId =
    parametros.get("funcionId");


// PRECIO DE UNA ENTRADA

const precioEntrada = 24;


// CARGO FIJO POR SERVICIO

const cargoServicio = 5;


// GUARDA LOS DATOS DE LA FUNCIÓN

let peliculaId = "";

let cineSeleccionado = "";

let salaSeleccionada = "";

let horaSeleccionada = "";

let fechaSeleccionada = "";


// GUARDA LOS ASIENTOS SELECCIONADOS

let asientosSeleccionados = [];


// BUSCA LOS ELEMENTOS DEL MAPA

const mapaAsientos =
    document.getElementById(
        "mapa-asientos"
    );

const mensajeCargando =
    document.getElementById(
        "mensaje-cargando-asientos"
    );

const mensajeError =
    document.getElementById(
        "mensaje-error-asientos"
    );


// BUSCA LOS DATOS DEL RESUMEN

const posterAsientos =
    document.getElementById(
        "poster-asientos"
    );

const tituloAsientos =
    document.getElementById(
        "titulo-asientos"
    );

const fechaAsientos =
    document.getElementById(
        "fecha-asientos"
    );

const horaAsientos =
    document.getElementById(
        "hora-asientos"
    );

const cineAsientos =
    document.getElementById(
        "cine-asientos"
    );

const salaAsientos =
    document.getElementById(
        "sala-asientos"
    );


// BUSCA LOS ELEMENTOS DEL PRECIO

const listaSeleccionados =
    document.getElementById(
        "lista-seleccionados"
    );

const cantidadEntradas =
    document.getElementById(
        "cantidad-entradas"
    );

const subtotalTexto =
    document.getElementById(
        "subtotal"
    );

const cargoServicioTexto =
    document.getElementById(
        "cargo-servicio"
    );

const totalCompraTexto =
    document.getElementById(
        "total-compra"
    );

const botonContinuar =
    document.getElementById(
        "boton-continuar"
    );


// CONVIERTE LA FECHA A UN TEXTO MÁS CLARO

function formatearFecha(fechaTexto) {

    if (!fechaTexto) {

        return "";
    }


    const partes =
        fechaTexto.split("-");


    const fecha =
        new Date(
            Number(partes[0]),
            Number(partes[1]) - 1,
            Number(partes[2])
        );


    return fecha.toLocaleDateString(
        "es-BO",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


// FORMATEA LA HORA

function formatearHora(horaTexto) {

    if (!horaTexto) {

        return "";
    }


    return horaTexto.substring(
        0,
        5
    );
}


// MUESTRA LOS DATOS DE LA FUNCIÓN

function mostrarDatosFuncion(funcion) {

    peliculaId =
        String(
            funcion.pelicula.id
        );

    cineSeleccionado =
        funcion.sala.cine.codigo;

    salaSeleccionada =
        funcion.sala.nombre;

    horaSeleccionada =
        formatearHora(
            funcion.hora
        );

    fechaSeleccionada =
        funcion.fecha;


    posterAsientos.src =
        funcion.pelicula.imagen;

    posterAsientos.alt =
        "Póster de la película " +
        funcion.pelicula.titulo;


    tituloAsientos.textContent =
        funcion.pelicula.titulo;


    fechaAsientos.textContent =
        formatearFecha(
            funcion.fecha
        );


    horaAsientos.textContent =
        horaSeleccionada;


    cineAsientos.textContent =
        funcion.sala.cine.nombre;


    salaAsientos.textContent =
        funcion.sala.nombre;


    document.title =
        "CinemaHub - " +
        funcion.pelicula.titulo;
}


// CREA UN BOTÓN DE ASIENTO

function crearBotonAsiento(asiento) {

    const boton =
        document.createElement(
            "button"
        );


    boton.type =
        "button";


    boton.classList.add(
        "asiento"
    );


    boton.textContent =
        asiento.codigo;


    boton.dataset.id =
        asiento.id;

    boton.dataset.codigo =
        asiento.codigo;


    if (
        asiento.estado ===
        "ocupado"
    ) {

        boton.classList.add(
            "ocupado"
        );

        boton.disabled =
            true;

    } else {

        boton.classList.add(
            "disponible"
        );


        boton.addEventListener(
            "click",
            function () {

                seleccionarAsiento(
                    boton
                );
            }
        );
    }


    return boton;
}


// CREA UNA FILA DE ASIENTOS

function crearFilaAsientos(asientosFila) {

    const fila =
        document.createElement(
            "div"
        );


    fila.classList.add(
        "fila-asientos"
    );


    asientosFila.forEach(
        function (
            asiento,
            posicion
        ) {

            const boton =
                crearBotonAsiento(
                    asiento
                );


            fila.appendChild(
                boton
            );


            // AGREGA EL PASILLO DESPUÉS DEL CUARTO ASIENTO

            if (posicion === 3) {

                const pasillo =
                    document.createElement(
                        "span"
                    );


                pasillo.classList.add(
                    "pasillo"
                );


                fila.appendChild(
                    pasillo
                );
            }
        }
    );


    return fila;
}


// AGRUPA Y MUESTRA LOS ASIENTOS POR FILA

function mostrarAsientos(asientos) {

    mapaAsientos.innerHTML =
        "";


    const asientosPorFila =
        {};


    asientos.forEach(
        function (asiento) {

            if (
                !asientosPorFila[
                    asiento.fila
                ]
            ) {

                asientosPorFila[
                    asiento.fila
                ] = [];
            }


            asientosPorFila[
                asiento.fila
            ].push(
                asiento
            );
        }
    );


    const filas =
        Object.keys(
            asientosPorFila
        ).sort();


    filas.forEach(
        function (nombreFila) {

            const asientosFila =
                asientosPorFila[
                    nombreFila
                ];


            asientosFila.sort(
                function (
                    asientoA,
                    asientoB
                ) {

                    return (
                        asientoA.numero -
                        asientoB.numero
                    );
                }
            );


            const fila =
                crearFilaAsientos(
                    asientosFila
                );


            mapaAsientos.appendChild(
                fila
            );
        }
    );
}


// SELECCIONA O QUITA UN ASIENTO

function seleccionarAsiento(boton) {

    const codigoAsiento =
        boton.dataset.codigo;


    if (
        boton.classList.contains(
            "seleccionado"
        )
    ) {

        boton.classList.remove(
            "seleccionado"
        );

        boton.classList.add(
            "disponible"
        );


        const posicion =
            asientosSeleccionados.indexOf(
                codigoAsiento
            );


        if (posicion !== -1) {

            asientosSeleccionados.splice(
                posicion,
                1
            );
        }

    } else {

        boton.classList.remove(
            "disponible"
        );

        boton.classList.add(
            "seleccionado"
        );


        asientosSeleccionados.push(
            codigoAsiento
        );
    }


    actualizarResumen();
}


// ACTUALIZA LOS DATOS DEL RESUMEN

function actualizarResumen() {

    const cantidad =
        asientosSeleccionados.length;


    const subtotal =
        cantidad *
        precioEntrada;


    let servicio = 0;


    if (cantidad > 0) {

        servicio =
            cargoServicio;
    }


    const total =
        subtotal +
        servicio;


    cantidadEntradas.textContent =
        cantidad +
        " × General";


    subtotalTexto.textContent =
        "Bs " +
        subtotal.toFixed(2);


    cargoServicioTexto.textContent =
        "Bs " +
        servicio.toFixed(2);


    totalCompraTexto.textContent =
        "Bs " +
        total.toFixed(2);


    listaSeleccionados.innerHTML =
        "";


    asientosSeleccionados.forEach(
        function (codigoAsiento) {

            const asientoTexto =
                document.createElement(
                    "span"
                );


            asientoTexto.textContent =
                codigoAsiento;


            listaSeleccionados.appendChild(
                asientoTexto
            );
        }
    );


    actualizarBoton();
}


// HABILITA O DESHABILITA EL BOTÓN DE COMPRA

function actualizarBoton() {

    if (
        asientosSeleccionados.length >
        0
    ) {

        botonContinuar.classList.remove(
            "deshabilitado"
        );


        const asientosTexto =
            asientosSeleccionados.join(
                "-"
            );


        botonContinuar.href =
            "compra.html?funcionId=" +
            encodeURIComponent(
                funcionId
            ) +
            "&id=" +
            encodeURIComponent(
                peliculaId
            ) +
            "&cine=" +
            encodeURIComponent(
                cineSeleccionado
            ) +
            "&sala=" +
            encodeURIComponent(
                salaSeleccionada
            ) +
            "&hora=" +
            encodeURIComponent(
                horaSeleccionada
            ) +
            "&fecha=" +
            encodeURIComponent(
                fechaSeleccionada
            ) +
            "&asientos=" +
            encodeURIComponent(
                asientosTexto
            );

    } else {

        botonContinuar.classList.add(
            "deshabilitado"
        );


        botonContinuar.href =
            "compra.html";
    }
}


// MUESTRA UN ERROR

function mostrarError() {

    mensajeCargando.style.display =
        "none";


    mapaAsientos.style.display =
        "none";


    mensajeError.style.display =
        "block";


    botonContinuar.classList.add(
        "deshabilitado"
    );
}


// CARGA LOS ASIENTOS DESDE LA API

async function cargarAsientos() {

    mensajeCargando.style.display =
        "block";


    mensajeError.style.display =
        "none";


    mapaAsientos.style.display =
        "none";


    // DEBE EXISTIR UN ID DE FUNCIÓN

    if (!funcionId) {

        console.error(
            "No se recibió funcionId"
        );


        mostrarError();

        return;
    }


    const datos =
        await obtenerAsientosApi(
            funcionId
        );


    if (
        !datos ||
        !datos.funcion ||
        !datos.asientos
    ) {

        mostrarError();

        return;
    }


    mostrarDatosFuncion(
        datos.funcion
    );


    mostrarAsientos(
        datos.asientos
    );


    mensajeCargando.style.display =
        "none";


    mapaAsientos.style.display =
        "flex";
}


// INICIA LA PÁGINA

actualizarResumen();

cargarAsientos();