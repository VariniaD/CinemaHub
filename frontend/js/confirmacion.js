// BUSCA LOS BLOQUES PRINCIPALES

const mensajeSinTicket =
    document.getElementById(
        "mensaje-sin-ticket"
    );

const mensajeConfirmacion =
    document.getElementById(
        "mensaje-confirmacion"
    );

const ticketDigital =
    document.getElementById(
        "ticket-digital"
    );


// RECUPERA EL ÚLTIMO TICKET

const ticketGuardadoTexto =
    localStorage.getItem(
        "ultimoTicket"
    );


let ticketGuardado =
    null;


// CONVIERTE EL TEXTO EN OBJETO

if (ticketGuardadoTexto) {

    try {

        ticketGuardado =
            JSON.parse(
                ticketGuardadoTexto
            );

    } catch (error) {

        ticketGuardado =
            null;
    }
}


// REVISA SI EL TICKET ES VÁLIDO

const hayTicketValido =
    ticketGuardado !== null &&
    ticketGuardado.codigoTicket &&
    ticketGuardado.pelicula &&
    ticketGuardado.fecha &&
    ticketGuardado.hora &&
    ticketGuardado.sala &&
    Array.isArray(
        ticketGuardado.asientos
    ) &&
    ticketGuardado.asientos.length > 0 &&
    ticketGuardado.nombre &&
    ticketGuardado.total;


// SI NO EXISTE TICKET

if (!hayTicketValido) {

    mensajeSinTicket.style.display =
        "block";

    mensajeConfirmacion.style.display =
        "none";

    ticketDigital.style.display =
        "none";

} else {

    mensajeSinTicket.style.display =
        "none";

    mensajeConfirmacion.style.display =
        "block";

    ticketDigital.style.display =
        "block";


    // BUSCA LOS ELEMENTOS DEL TICKET

    const fondoTicket =
        document.getElementById(
            "fondo-ticket"
        );

    const peliculaTicket =
        document.getElementById(
            "pelicula-ticket"
        );

    const cineTicket =
        document.getElementById(
            "cine-ticket"
        );

    const fechaTicket =
        document.getElementById(
            "fecha-ticket"
        );

    const horaTicket =
        document.getElementById(
            "hora-ticket"
        );

    const salaTicket =
        document.getElementById(
            "sala-ticket"
        );

    const asientosTicket =
        document.getElementById(
            "asientos-ticket"
        );

    const compradorTicket =
        document.getElementById(
            "comprador-ticket"
        );

    const totalTicket =
        document.getElementById(
            "total-ticket"
        );

    const codigoTicket =
        document.getElementById(
            "codigo-ticket"
        );


    // MUESTRA LA IMAGEN

    if (ticketGuardado.imagen) {

        fondoTicket.style.backgroundImage =
            "url('" +
            ticketGuardado.imagen +
            "')";

    } else {

        fondoTicket.style.backgroundImage =
            "none";
    }


    // MUESTRA LOS DATOS

    peliculaTicket.textContent =
        ticketGuardado.pelicula;


    cineTicket.textContent =
        ticketGuardado.cine;


    horaTicket.textContent =
        ticketGuardado.hora;


    salaTicket.textContent =
        ticketGuardado.sala;


    asientosTicket.textContent =
        ticketGuardado.asientos.join(
            ", "
        );


    compradorTicket.textContent =
        ticketGuardado.nombre;


    totalTicket.textContent =
        "Bs " +
        ticketGuardado.total;


    codigoTicket.textContent =
        ticketGuardado.codigoTicket;


    // FORMATEA LA FECHA

    function formatearFecha(
        fechaTexto
    ) {

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
                day:
                    "2-digit",

                month:
                    "short",

                year:
                    "numeric"
            }
        );
    }


    fechaTicket.textContent =
        formatearFecha(
            ticketGuardado.fecha
        );
}