// OBTIENE LOS DATOS ENVIADOS EN LA URL

const parametros =
    new URLSearchParams(window.location.search);


// RECUPERA EL ÚLTIMO TICKET GUARDADO

const ticketGuardadoTexto =
    localStorage.getItem("ultimoTicket");


// CREA UNA VARIABLE PARA GUARDAR EL TICKET

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


// VERIFICA SI LLEGARON DATOS DESDE LA COMPRA

const hayDatosEnUrl =
    parametros.has("pelicula") &&
    parametros.has("asientos");


// VERIFICA SI EXISTE UN TICKET GUARDADO

const hayTicketGuardado =
    ticketGuardado !== null;


// BUSCA LOS BLOQUES PRINCIPALES DE LA PÁGINA

const mensajeSinTicket =
    document.getElementById("mensaje-sin-ticket");

const mensajeConfirmacion =
    document.getElementById("mensaje-confirmacion");

const ticketDigital =
    document.getElementById("ticket-digital");


// SI NO EXISTEN DATOS NI TICKET GUARDADO,
// MUESTRA EL ESTADO VACÍO

if (!hayDatosEnUrl && !hayTicketGuardado) {

    mensajeSinTicket.style.display =
        "block";

    mensajeConfirmacion.style.display =
        "none";

    ticketDigital.style.display =
        "none";

} else {

    // OCULTA EL MENSAJE VACÍO

    mensajeSinTicket.style.display =
        "none";

    mensajeConfirmacion.style.display =
        "block";

    ticketDigital.style.display =
        "block";


    // OBTIENE LOS DATOS DE LA URL
    // SI NO EXISTEN, UTILIZA EL TICKET GUARDADO

    const pelicula =
        parametros.get("pelicula") ||
        ticketGuardado.pelicula;

    const cine =
        parametros.get("cine") ||
        ticketGuardado.cine;

    const hora =
        parametros.get("hora") ||
        ticketGuardado.hora;

    const sala =
        parametros.get("sala") ||
        ticketGuardado.sala;

    const fecha =
        parametros.get("fecha") ||
        ticketGuardado.fecha;

    const asientosTexto =
        parametros.get("asientos") ||
        ticketGuardado.asientos;

    const nombreComprador =
        parametros.get("nombre") ||
        ticketGuardado.nombre;

    const total =
        parametros.get("total") ||
        ticketGuardado.total;


    // CREA UN ARREGLO PARA LOS ASIENTOS

    let asientos = [];


    // VERIFICA SI SE RECIBIERON ASIENTOS

    if (asientosTexto) {

        asientos =
            asientosTexto.split("-");
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

    peliculaTicket.textContent =
        pelicula || "Sin película";


    // MUESTRA EL NOMBRE DEL CINE

    if (cine === "norte") {

        cineTicket.textContent =
            "CinemaHub Norte";

    } else {

        cineTicket.textContent =
            "CinemaHub Centro";
    }


    // MUESTRA LA HORA

    horaTicket.textContent =
        hora || "--:--";


    // MUESTRA LA SALA

    salaTicket.textContent =
        sala || "Sin sala";


    // MUESTRA LOS ASIENTOS

    if (asientos.length > 0) {

        asientosTicket.textContent =
            asientos.join(", ");

    } else {

        asientosTicket.textContent =
            "Sin asientos";
    }


    // MUESTRA EL NOMBRE DEL COMPRADOR

    compradorTicket.textContent =
        nombreComprador ||
        "Cliente CinemaHub";


    // MUESTRA EL TOTAL PAGADO

    if (total) {

        totalTicket.textContent =
            "Bs " + total;

    } else {

        totalTicket.textContent =
            "Bs 0.00";
    }


    // FORMATEA LA FECHA SELECCIONADA

    function formatearFecha(fechaTexto) {

        if (!fechaTexto) {
            return "Sin fecha";
        }


        const partes =
            fechaTexto.split("-");


        const fechaObjeto =
            new Date(
                Number(partes[0]),
                Number(partes[1]) - 1,
                Number(partes[2])
            );


        return fechaObjeto.toLocaleDateString(
            "es-BO",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }


    // MUESTRA LA FECHA

    fechaTicket.textContent =
        formatearFecha(fecha);


    // GENERA UN CÓDIGO PARA EL TICKET

    const numeroTicket =
        Math.floor(Math.random() * 9000) + 1000;


    const anio =
        new Date().getFullYear();


    let codigoAsientos =
        "SINASIENTO";


    if (asientos.length > 0) {

        codigoAsientos =
            asientos.join("");
    }


    const codigoFinal =
        "CH-" +
        anio +
        "-" +
        codigoAsientos +
        "-" +
        numeroTicket;


    // MUESTRA EL CÓDIGO

    codigoTicket.textContent =
        codigoFinal;
}