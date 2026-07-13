// BUSCA LOS BLOQUES PRINCIPALES DE LA PÁGINA

const mensajeSinTicket =
    document.getElementById("mensaje-sin-ticket");

const mensajeConfirmacion =
    document.getElementById("mensaje-confirmacion");

const ticketDigital =
    document.getElementById("ticket-digital");


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


// REVISA SI EL TICKET GUARDADO ES VÁLIDO

const hayTicketValido =
    ticketGuardado !== null &&
    ticketGuardado.pelicula &&
    ticketGuardado.fecha &&
    ticketGuardado.hora &&
    ticketGuardado.sala &&
    ticketGuardado.asientos &&
    ticketGuardado.nombre &&
    ticketGuardado.total;


// SI NO EXISTE UNA COMPRA VÁLIDA

if (!hayTicketValido) {

    // Muestra únicamente el mensaje vacío
    mensajeSinTicket.style.display =
        "block";

    // Oculta el mensaje de agradecimiento
    mensajeConfirmacion.style.display =
        "none";

    // Oculta completamente el ticket
    ticketDigital.style.display =
        "none";

} else {

    // Oculta el mensaje vacío
    mensajeSinTicket.style.display =
        "none";

    // Muestra el mensaje de compra correcta
    mensajeConfirmacion.style.display =
        "block";

    // Muestra el ticket
    ticketDigital.style.display =
        "block";


    // BUSCA LOS ELEMENTOS INTERNOS DEL TICKET

    const fondoTicket =
        document.getElementById("fondo-ticket");

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


    // MUESTRA LA IMAGEN DE LA PELÍCULA

    if (ticketGuardado.imagen) {

        fondoTicket.style.backgroundImage =
            "url('" +
            ticketGuardado.imagen +
            "')";

    } else {

        fondoTicket.style.backgroundImage =
            "none";
    }


    // MUESTRA EL NOMBRE DE LA PELÍCULA

    peliculaTicket.textContent =
        ticketGuardado.pelicula;


    // MUESTRA EL CINE

    if (ticketGuardado.cine === "norte") {

        cineTicket.textContent =
            "CinemaHub Norte";

    } else {

        cineTicket.textContent =
            "CinemaHub Centro";
    }


    // MUESTRA LA HORA

    horaTicket.textContent =
        ticketGuardado.hora;


    // MUESTRA LA SALA

    salaTicket.textContent =
        ticketGuardado.sala;


    // PREPARA LOS ASIENTOS

    const asientos =
        ticketGuardado.asientos.split("-");


    // MUESTRA LOS ASIENTOS

    asientosTicket.textContent =
        asientos.join(", ");


    // MUESTRA EL COMPRADOR

    compradorTicket.textContent =
        ticketGuardado.nombre;


    // MUESTRA EL TOTAL

    totalTicket.textContent =
        "Bs " + ticketGuardado.total;


    // FORMATEA LA FECHA

    function formatearFecha(fechaTexto) {

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
        formatearFecha(
            ticketGuardado.fecha
        );


    // REVISA SI EL TICKET YA TIENE CÓDIGO

    let codigoFinal =
        ticketGuardado.codigo;


    // SI TODAVÍA NO TIENE, GENERA UNO

    if (!codigoFinal) {

        const numeroTicket =
            Math.floor(
                Math.random() * 9000
            ) + 1000;


        const anio =
            new Date().getFullYear();


        const codigoAsientos =
            asientos.join("");


        codigoFinal =
            "CH-" +
            anio +
            "-" +
            codigoAsientos +
            "-" +
            numeroTicket;


        // GUARDA EL CÓDIGO PARA QUE NO CAMBIE AL RECARGAR

        ticketGuardado.codigo =
            codigoFinal;


        localStorage.setItem(
            "ultimoTicket",
            JSON.stringify(ticketGuardado)
        );
    }


    // MUESTRA EL CÓDIGO DEL TICKET

    codigoTicket.textContent =
        codigoFinal;
}