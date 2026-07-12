// OBTIENE LOS DATOS ENVIADOS EN LA URL

const parametros = new URLSearchParams(window.location.search);


// GUARDA LOS DATOS RECIBIDOS DESDE COMPRA

const pelicula = parametros.get("pelicula");

const cine = parametros.get("cine");

const hora = parametros.get("hora");

const sala = parametros.get("sala");

const asientosTexto = parametros.get("asientos");

const nombreComprador = parametros.get("nombre");

const total = parametros.get("total");


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

if (cine === "centro") {

    cineTicket.textContent = "CinemaHub Centro";

} else {

    cineTicket.textContent = "CinemaHub";
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


// OBTIENE LA FECHA ACTUAL

const fechaActual = new Date();


// CREA UNA LISTA CON LOS NOMBRES DE LOS MESES

const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
];


// OBTIENE EL DÍA

const dia = fechaActual.getDate();


// OBTIENE EL NOMBRE DEL MES

const mes = meses[fechaActual.getMonth()];


// OBTIENE EL AÑO

const anio = fechaActual.getFullYear();


// FORMA EL TEXTO DE LA FECHA

const fechaTexto =
    dia + " " + mes + " " + anio;


// MUESTRA LA FECHA EN EL TICKET

fechaTicket.textContent = fechaTexto;


// GENERA UN NÚMERO SENCILLO PARA EL TICKET

const numeroTicket =
    Math.floor(Math.random() * 9000) + 1000;


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