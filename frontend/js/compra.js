// PRECIOS MOSTRADOS EN EL RESUMEN

const precioEntrada =
    24;

const cargoServicio =
    5;


// OBTIENE LOS DATOS DE LA URL

const parametros =
    new URLSearchParams(
        window.location.search
    );


// OBTIENE EL IDENTIFICADOR DE LA FUNCIÓN

const funcionId =
    parametros.get("funcionId");


// OBTIENE LOS DEMÁS DATOS

let peliculaId =
    parametros.get("id");

let cine =
    parametros.get("cine");

let sala =
    parametros.get("sala");

let hora =
    parametros.get("hora");

let fecha =
    parametros.get("fecha");

const asientosTexto =
    parametros.get("asientos");


// PREPARA LOS ASIENTOS

let asientos = [];


if (asientosTexto) {

    asientos =
        asientosTexto
            .split("-")
            .filter(
                function (codigo) {

                    return codigo.trim() !== "";
                }
            );
}


// BUSCA LA PELÍCULA LOCAL PARA MOSTRAR EL RESUMEN

let pelicula =
    buscarPelicula(
        peliculaId
    );


// CALCULA LOS PRECIOS VISUALES

const cantidadAsientos =
    asientos.length;

const subtotal =
    cantidadAsientos *
    precioEntrada;


let servicio = 0;


if (cantidadAsientos > 0) {

    servicio =
        cargoServicio;
}


const total =
    subtotal +
    servicio;


// BUSCA LOS ELEMENTOS DEL RESUMEN

const posterCompra =
    document.getElementById(
        "poster-compra"
    );

const tituloCompra =
    document.getElementById(
        "titulo-compra"
    );

const fechaCompra =
    document.getElementById(
        "fecha-compra"
    );

const horaCompra =
    document.getElementById(
        "hora-compra"
    );

const cineCompra =
    document.getElementById(
        "cine-compra"
    );

const salaCompra =
    document.getElementById(
        "sala-compra"
    );

const cantidadAsientosTexto =
    document.getElementById(
        "cantidad-asientos"
    );

const asientosCompra =
    document.getElementById(
        "asientos-compra"
    );

const subtotalCompra =
    document.getElementById(
        "subtotal-compra"
    );

const cargoCompra =
    document.getElementById(
        "cargo-compra"
    );

const totalCompra =
    document.getElementById(
        "total-compra"
    );


// BUSCA LOS ELEMENTOS DEL FORMULARIO

const formularioCompra =
    document.getElementById(
        "formulario-compra"
    );

const botonFinalizar =
    document.getElementById(
        "boton-finalizar"
    );

const mensajeErrorCompra =
    document.getElementById(
        "mensaje-error-compra"
    );


// BUSCA LOS MÉTODOS DE PAGO

const opcionesPago =
    document.querySelectorAll(
        ".opcion-pago"
    );

const metodosPago =
    document.querySelectorAll(
        'input[name="metodo"]'
    );


// BUSCA LOS DATOS DE TARJETA

const datosTarjeta =
    document.querySelector(
        ".datos-tarjeta"
    );

const numeroTarjeta =
    document.getElementById(
        "numero-tarjeta"
    );

const vencimiento =
    document.getElementById(
        "vencimiento"
    );

const cvv =
    document.getElementById(
        "cvv"
    );


// MUESTRA UN MENSAJE DE ERROR

function mostrarErrorCompra(mensaje) {

    mensajeErrorCompra.textContent =
        mensaje;

    mensajeErrorCompra.style.display =
        "block";
}


// OCULTA EL MENSAJE DE ERROR

function ocultarErrorCompra() {

    mensajeErrorCompra.textContent =
        "";

    mensajeErrorCompra.style.display =
        "none";
}


// MUESTRA LOS DATOS DE LA COMPRA

function mostrarResumenCompra() {

    if (pelicula) {

        posterCompra.src =
            pelicula.imagen;

        posterCompra.alt =
            "Póster de la película " +
            pelicula.titulo;

        tituloCompra.textContent =
            pelicula.titulo;
    }


    fechaCompra.textContent =
        fecha || "Fecha no disponible";

    horaCompra.textContent =
        hora || "Hora no disponible";

    salaCompra.textContent =
        sala || "Sala no disponible";


    if (cine === "norte") {

        cineCompra.textContent =
            "CinemaHub Norte";

    } else if (cine === "centro") {

        cineCompra.textContent =
            "CinemaHub Centro";

    } else {

        cineCompra.textContent =
            cine || "CinemaHub";
    }


    cantidadAsientosTexto.textContent =
        "Asientos (" +
        cantidadAsientos +
        ")";


    if (cantidadAsientos > 0) {

        asientosCompra.textContent =
            asientos.join(", ");

    } else {

        asientosCompra.textContent =
            "Sin seleccionar";
    }


    subtotalCompra.textContent =
        "Bs " +
        subtotal.toFixed(2);

    cargoCompra.textContent =
        "Bs " +
        servicio.toFixed(2);

    totalCompra.textContent =
        "Bs " +
        total.toFixed(2);
}


// CAMBIA EL MÉTODO DE PAGO

metodosPago.forEach(
    function (metodo) {

        metodo.addEventListener(
            "change",
            function () {

                opcionesPago.forEach(
                    function (opcion) {

                        opcion.classList.remove(
                            "opcion-activa"
                        );
                    }
                );


                metodo.parentElement.classList.add(
                    "opcion-activa"
                );


                if (
                    metodo.value ===
                    "tarjeta"
                ) {

                    datosTarjeta.style.display =
                        "flex";

                    numeroTarjeta.required =
                        true;

                    vencimiento.required =
                        true;

                    cvv.required =
                        true;

                } else {

                    datosTarjeta.style.display =
                        "none";

                    numeroTarjeta.required =
                        false;

                    vencimiento.required =
                        false;

                    cvv.required =
                        false;
                }
            }
        );
    }
);


// PROCESA LA COMPRA

formularioCompra.addEventListener(
    "submit",
    async function (evento) {

        evento.preventDefault();


        ocultarErrorCompra();


        // VERIFICA LA FUNCIÓN

        if (!funcionId) {

            mostrarErrorCompra(
                "No se recibió una función válida. Vuelve a seleccionar un horario."
            );

            return;
        }


        // VERIFICA LOS ASIENTOS

        if (asientos.length === 0) {

            mostrarErrorCompra(
                "Debes seleccionar al menos un asiento."
            );

            return;
        }


        // OBTIENE LOS DATOS PERSONALES

        const nombre =
            document
                .getElementById(
                    "nombre"
                )
                .value
                .trim();

        const correo =
            document
                .getElementById(
                    "correo"
                )
                .value
                .trim();

        const telefono =
            document
                .getElementById(
                    "telefono"
                )
                .value
                .trim();

        const metodoSeleccionado =
            document.querySelector(
                'input[name="metodo"]:checked'
            );


        if (!metodoSeleccionado) {

            mostrarErrorCompra(
                "Debes seleccionar un método de pago."
            );

            return;
        }


        const metodoPago =
            metodoSeleccionado.value;


        // PREPARA ÚNICAMENTE LOS DATOS NECESARIOS

        const datosCompra = {
            funcionId:
                Number(funcionId),

            asientos:
                asientos,

            nombre:
                nombre,

            correo:
                correo,

            telefono:
                telefono,

            metodoPago:
                metodoPago
        };


        // DESHABILITA EL BOTÓN

        botonFinalizar.disabled =
            true;

        botonFinalizar.innerHTML =
            "Procesando compra...";


        // ENVÍA LA COMPRA AL BACKEND

        const resultado =
            await registrarCompraApi(
                datosCompra
            );


        if (!resultado.correcto) {

            mostrarErrorCompra(
                resultado.mensaje
            );


            botonFinalizar.disabled =
                false;

            botonFinalizar.innerHTML =
                'Finalizar compra <span>→</span>';


            return;
        }


        // OBTIENE EL TICKET REAL DEL BACKEND

        const ticket =
            resultado.datos.ticket;


        // GUARDA EL TICKET REAL

        localStorage.setItem(
            "ultimoTicket",
            JSON.stringify(ticket)
        );


        // ABRE LA CONFIRMACIÓN

        window.location.href =
            "confirmacion.html";
    }
);


// INICIA LA PÁGINA

mostrarResumenCompra();