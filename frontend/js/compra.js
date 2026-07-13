// PRECIOS UTILIZADOS EN LA COMPRA

const precioEntrada = 24;

const cargoServicio = 5;


// OBTIENE LOS DATOS DE LA URL

const parametros =
    new URLSearchParams(window.location.search);

    // OBTIENE EL IDENTIFICADOR DE LA FUNCIÓN

let funcionId =
    parametros.get("funcionId");


// GUARDA LOS DATOS RECIBIDOS

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


// COLOCA VALORES BÁSICOS

if (!peliculaId) {
    peliculaId = "1";
}

if (!cine) {
    cine = "centro";
}

if (!sala) {
    sala = "Sala Premium";
}

if (!hora) {
    hora = "19:30";
}


// BUSCA LA PELÍCULA

const pelicula =
    buscarPelicula(peliculaId);


// PREPARA LOS ASIENTOS

let asientos = [];

if (asientosTexto) {
    asientos = asientosTexto.split("-");
}


// CALCULA LOS PRECIOS

const cantidadAsientos =
    asientos.length;

const subtotal =
    cantidadAsientos * precioEntrada;


let servicio = 0;

if (cantidadAsientos > 0) {
    servicio = cargoServicio;
}


const total =
    subtotal + servicio;


// BUSCA LOS ELEMENTOS DEL RESUMEN

const posterCompra =
    document.getElementById("poster-compra");

const tituloCompra =
    document.getElementById("titulo-compra");

const fechaCompra =
    document.getElementById("fecha-compra");

const horaCompra =
    document.getElementById("hora-compra");

const cineCompra =
    document.getElementById("cine-compra");

const salaCompra =
    document.getElementById("sala-compra");

const cantidadAsientosTexto =
    document.getElementById("cantidad-asientos");

const asientosCompra =
    document.getElementById("asientos-compra");

const subtotalCompra =
    document.getElementById("subtotal-compra");

const cargoCompra =
    document.getElementById("cargo-compra");

const totalCompra =
    document.getElementById("total-compra");


// MUESTRA LA PELÍCULA

posterCompra.src =
    pelicula.imagen;

posterCompra.alt =
    "Póster de la película " + pelicula.titulo;

tituloCompra.textContent =
    pelicula.titulo;


// MUESTRA LOS DATOS DE LA FUNCIÓN

fechaCompra.textContent =
    fecha || "Hoy";

horaCompra.textContent =
    hora;

salaCompra.textContent =
    sala;


if (cine === "norte") {

    cineCompra.textContent =
        "CinemaHub Norte";

} else {

    cineCompra.textContent =
        "CinemaHub Centro";
}


// MUESTRA LOS ASIENTOS Y PRECIOS

cantidadAsientosTexto.textContent =
    "Asientos (" + cantidadAsientos + ")";


if (cantidadAsientos > 0) {

    asientosCompra.textContent =
        asientos.join(", ");

} else {

    asientosCompra.textContent =
        "Sin seleccionar";
}


subtotalCompra.textContent =
    "Bs " + subtotal.toFixed(2);

cargoCompra.textContent =
    "Bs " + servicio.toFixed(2);

totalCompra.textContent =
    "Bs " + total.toFixed(2);


// BUSCA LOS MÉTODOS DE PAGO

const opcionesPago =
    document.querySelectorAll(".opcion-pago");

const metodosPago =
    document.querySelectorAll(
        'input[name="metodo"]'
    );


// BUSCA LOS DATOS DE TARJETA

const datosTarjeta =
    document.querySelector(".datos-tarjeta");

const numeroTarjeta =
    document.getElementById("numero-tarjeta");

const vencimiento =
    document.getElementById("vencimiento");

const cvv =
    document.getElementById("cvv");


// CAMBIA EL MÉTODO DE PAGO

metodosPago.forEach(function (metodo) {

    metodo.addEventListener("change", function () {

        // Quita el estilo activo
        opcionesPago.forEach(function (opcion) {
            opcion.classList.remove("opcion-activa");
        });


        // Activa la opción elegida
        metodo.parentElement.classList.add(
            "opcion-activa"
        );


        if (metodo.value === "tarjeta") {

            datosTarjeta.style.display = "flex";

            numeroTarjeta.required = true;

            vencimiento.required = true;

            cvv.required = true;

        } else {

            datosTarjeta.style.display = "none";

            numeroTarjeta.required = false;

            vencimiento.required = false;

            cvv.required = false;
        }
    });
});


// BUSCA EL FORMULARIO

const formularioCompra =
    document.getElementById("formulario-compra");


// PROCESA LA COMPRA

formularioCompra.addEventListener(
    "submit",
    function (evento) {

        // Evita el envío tradicional del formulario
        evento.preventDefault();


        // Verifica que existan asientos
        if (cantidadAsientos === 0) {

            alert(
                "Debes seleccionar al menos un asiento."
            );

            return;
        }


        // Obtiene los datos personales
        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const telefono =
            document.getElementById("telefono").value.trim();

        const metodo =
            document.querySelector(
                'input[name="metodo"]:checked'
            ).value;


        // CREA EL OBJETO DE LA COMPRA
        // Este objeto luego podrá enviarse al backend.

        const datosCompra = {
            funcionId: funcionId,
            peliculaId: peliculaId,
            pelicula: pelicula.titulo,
            imagen: pelicula.imagen,
            cine: cine,
            sala: sala,
            fecha: fecha,
            hora: hora,
            asientos: asientosTexto,
            subtotal: subtotal.toFixed(2),
            cargo: servicio.toFixed(2),
            total: total.toFixed(2),
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            metodo: metodo
        };


        // GUARDA TEMPORALMENTE EL TICKET EN EL NAVEGADOR

        localStorage.setItem(
            "ultimoTicket",
            JSON.stringify(datosCompra)
        );


        /*
        FUTURA CONEXIÓN CON EL BACKEND:

        fetch("http://localhost:3000/api/compras", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosCompra)
        });
        */


        // PREPARA SOLAMENTE LOS DATOS SEGUROS
        // No se envía el número de tarjeta ni el CVV.

        const datosDireccion =
            new URLSearchParams();

        datosDireccion.set(
            "pelicula",
            pelicula.titulo
        );

        datosDireccion.set(
            "cine",
            cine
        );

        datosDireccion.set(
            "sala",
            sala
        );

        datosDireccion.set(
            "fecha",
            fecha || ""
        );

        datosDireccion.set(
            "hora",
            hora
        );

        datosDireccion.set(
            "asientos",
            asientosTexto
        );

        datosDireccion.set(
            "total",
            total.toFixed(2)
        );

        datosDireccion.set(
            "nombre",
            nombre
        );


        // ABRE LA CONFIRMACIÓN

        window.location.href =
            "confirmacion.html?" +
            datosDireccion.toString();
    }
);