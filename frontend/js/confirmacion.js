// OBTIENE LOS DATOS ENVIADOS EN LA URL

const parametros = new URLSearchParams(window.location.search);


// RECUPERA EL ÚLTIMO TICKET GUARDADO

const ticketGuardadoTexto =
    localStorage.getItem("ultimoTicket");


// CREA UNA VARIABLE PARA EL TICKET

let ticketGuardado = null;


// CONVIERTE EL TEXTO GUARDADO EN UN OBJETO

if (ticketGuardadoTexto) {

    try {

        ticketGuardado =
            JSON.parse(ticketGuardadoTexto);

    } catch (error) {

        ticketGuardado = null;
    }
}


// OBTIENE LOS DATOS DE LA URL
// SI NO EXISTEN, UTILIZA EL ÚLTIMO TICKET GUARDADO

const pelicula =
    parametros.get("pelicula") ||
    (ticketGuardado && ticketGuardado.pelicula);

const cine =
    parametros.get("cine") ||
    (ticketGuardado && ticketGuardado.cine);

const hora =
    parametros.get("hora") ||
    (ticketGuardado && ticketGuardado.hora);

const sala =
    parametros.get("sala") ||
    (ticketGuardado && ticketGuardado.sala);

const fecha =
    parametros.get("fecha") ||
    (ticketGuardado && ticketGuardado.fecha);

const asientosTexto =
    parametros.get("asientos") ||
    (ticketGuardado && ticketGuardado.asientos);

const nombreComprador =
    parametros.get("nombre") ||
    (ticketGuardado && ticketGuardado.nombre);

const total =
    parametros.get("total") ||
    (ticketGuardado && ticketGuardado.total);


// CREA UN ARREGLO PARA LOS ASIENTOS

let asientos = [];


// VERIFICA SI SE RECIBIERON ASIENTOS

if (asientosTexto) {

    // Separa los asientos usando el guion
    asientos = asientosTexto.split("-");
}


// BUSCA LOS ELEMENTOS DEL TICKET

const peliculaTicket =
    document.getElementById("pelicula-ticket");

const cineTicket =
    document.getElementById("cine-ticket");

const fechaTicket =
    document.getElementById("fecha-ticket");

const horaTicket =
    document.getElementById("hora-ticket");

const salaTicket =
    document.getElementById("sala-ticket");

const asientosTicket =
    document.getElementById("asientos-ticket");

const compradorTicket =
    document.getElementById("comprador-ticket");

const totalTicket =
    document.getElementById("total-ticket");

const codigoTicket =
    document.getElementById("codigo-ticket");


// MUESTRA EL NOMBRE DE LA PELÍCULA

if (pelicula) {
    peliculaTicket.textContent = pelicula;
}


// MUESTRA EL NOMBRE DEL CINE

if (cine === "norte") {

    cineTicket.textContent = "CinemaHub Norte";

} else {

    cineTicket.textContent = "CinemaHub Centro";
}


// MUESTRA LA HORA

if (hora) {
    horaTicket.textContent = hora;
}


// MUESTRA LA SALA

if (sala) {
    salaTicket.textContent = sala;
}


// MUESTRA LOS ASIENTOS

if (asientos.length > 0) {

    // Une los asientos con una coma
    asientosTicket.textContent = asientos.join(", ");

} else {

    asientosTicket.textContent = "Sin asientos";
}


// MUESTRA EL NOMBRE DEL COMPRADOR

if (nombreComprador) {

    compradorTicket.textContent = nombreComprador;

} else {

    compradorTicket.textContent = "Cliente CinemaHub";
}


// MUESTRA EL TOTAL PAGADO

if (total) {

    totalTicket.textContent = "Bs " + total;

} else {

    totalTicket.textContent = "Bs 0.00";
}

// FORMATEA LA FECHA SELECCIONADA

function formatearFecha(fechaTexto) {

    // Verifica si se recibió una fecha
    if (!fechaTexto) {
        return "Sin fecha";
    }


    // Separa el año, mes y día
    const partes = fechaTexto.split("-");


    // Crea un objeto de fecha
    const fechaObjeto = new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );


    // Devuelve la fecha en formato legible
    return fechaObjeto.toLocaleDateString(
        "es-BO",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


// MUESTRA LA FECHA DE LA FUNCIÓN

fechaTicket.textContent =
    formatearFecha(fecha);

// GENERA UN NÚMERO SENCILLO PARA EL TICKET

const numeroTicket =
    Math.floor(Math.random() * 9000) + 1000;

// OBTIENE EL AÑO ACTUAL PARA EL CÓDIGO

const anio = new Date().getFullYear();

// UNE LOS ASIENTOS SIN GUIONES

let codigoAsientos = "SINASIENTO";

if (asientos.length > 0) {
    codigoAsientos = asientos.join("");
}


// CREA EL CÓDIGO FINAL DEL TICKET

const codigoFinal =
    "CH-" +
    anio +
    "-" +
    codigoAsientos +
    "-" +
    numeroTicket;


// MUESTRA EL CÓDIGO DEL TICKET

codigoTicket.textContent = codigoFinal;