// OBTIENE LOS DATOS ENVIADOS DESDE LA PÁGINA ANTERIOR

const parametros =
    new URLSearchParams(window.location.search);


// GUARDA LOS DATOS DE LA FUNCIÓN

let peliculaId =
    parametros.get("id");

let cineSeleccionado =
    parametros.get("cine");

let salaSeleccionada =
    parametros.get("sala");

let horaSeleccionada =
    parametros.get("hora");

let fechaSeleccionada =
    parametros.get("fecha");


// COLOCA VALORES BÁSICOS SI NO LLEGA ALGÚN DATO

if (!peliculaId) {
    peliculaId = "1";
}

if (!cineSeleccionado) {
    cineSeleccionado = "centro";
}

if (!salaSeleccionada) {
    salaSeleccionada = "Sala Premium";
}

if (!horaSeleccionada) {
    horaSeleccionada = "19:30";
}

if (!fechaSeleccionada) {

    const fechaActual = new Date();

    const anio = fechaActual.getFullYear();

    const mes =
        String(fechaActual.getMonth() + 1).padStart(2, "0");

    const dia =
        String(fechaActual.getDate()).padStart(2, "0");

    fechaSeleccionada =
        anio + "-" + mes + "-" + dia;
}


// BUSCA LA PELÍCULA

const pelicula =
    buscarPelicula(peliculaId);


// PRECIO DE CADA ASIENTO

const precioEntrada = 24;


// CARGO FIJO POR SERVICIO

const cargoServicio = 5;


// BUSCA LOS DATOS DE LA PELÍCULA EN EL RESUMEN

const posterAsientos =
    document.getElementById("poster-asientos");

const tituloAsientos =
    document.getElementById("titulo-asientos");

const fechaAsientos =
    document.getElementById("fecha-asientos");

const horaAsientos =
    document.getElementById("hora-asientos");

const cineAsientos =
    document.getElementById("cine-asientos");

const salaAsientos =
    document.getElementById("sala-asientos");


// MUESTRA LA PELÍCULA

posterAsientos.src =
    pelicula.imagen;

posterAsientos.alt =
    "Póster de la película " + pelicula.titulo;

tituloAsientos.textContent =
    pelicula.titulo;


// CONVIERTE LA FECHA A UN TEXTO MÁS CLARO

function formatearFecha(fechaTexto) {

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


// MUESTRA LOS DATOS DE LA FUNCIÓN

fechaAsientos.textContent =
    formatearFecha(fechaSeleccionada);

horaAsientos.textContent =
    horaSeleccionada;

salaAsientos.textContent =
    salaSeleccionada;


// MUESTRA EL NOMBRE DEL CINE

if (cineSeleccionado === "norte") {

    cineAsientos.textContent =
        "CinemaHub Norte";

} else {

    cineAsientos.textContent =
        "CinemaHub Centro";
}


// BUSCA TODOS LOS ASIENTOS DISPONIBLES

const asientosDisponibles =
    document.querySelectorAll(".asiento.disponible");


// BUSCA LOS ELEMENTOS DEL RESUMEN

const listaSeleccionados =
    document.getElementById("lista-seleccionados");

const cantidadEntradas =
    document.getElementById("cantidad-entradas");

const subtotalTexto =
    document.getElementById("subtotal");

const cargoServicioTexto =
    document.getElementById("cargo-servicio");

const totalCompraTexto =
    document.getElementById("total-compra");

const botonContinuar =
    document.getElementById("boton-continuar");


// GUARDA LOS ASIENTOS ELEGIDOS

let asientosSeleccionados = [];


// RECORRE TODOS LOS ASIENTOS DISPONIBLES

asientosDisponibles.forEach(function (asiento) {

    asiento.addEventListener("click", function () {

        // Obtiene el nombre del asiento
        const nombreAsiento =
            asiento.textContent.trim();


        // Si ya estaba seleccionado, lo elimina
        if (asiento.classList.contains("seleccionado")) {

            asiento.classList.remove("seleccionado");

            asiento.classList.add("disponible");


            const posicion =
                asientosSeleccionados.indexOf(nombreAsiento);


            if (posicion !== -1) {

                asientosSeleccionados.splice(
                    posicion,
                    1
                );
            }

        } else {

            // Si estaba disponible, lo selecciona
            asiento.classList.remove("disponible");

            asiento.classList.add("seleccionado");

            asientosSeleccionados.push(nombreAsiento);
        }


        // Actualiza el resumen
        actualizarResumen();
    });
});


// ACTUALIZA LOS DATOS DEL RESUMEN

function actualizarResumen() {

    const cantidad =
        asientosSeleccionados.length;

    const subtotal =
        cantidad * precioEntrada;


    let servicio = 0;

    if (cantidad > 0) {
        servicio = cargoServicio;
    }


    const total =
        subtotal + servicio;


    cantidadEntradas.textContent =
        cantidad + " × General";

    subtotalTexto.textContent =
        "Bs " + subtotal.toFixed(2);

    cargoServicioTexto.textContent =
        "Bs " + servicio.toFixed(2);

    totalCompraTexto.textContent =
        "Bs " + total.toFixed(2);


    // Limpia los asientos mostrados anteriormente
    listaSeleccionados.innerHTML = "";


    // Muestra cada asiento seleccionado
    asientosSeleccionados.forEach(function (nombreAsiento) {

        const asientoTexto =
            document.createElement("span");

        asientoTexto.textContent =
            nombreAsiento;

        listaSeleccionados.appendChild(
            asientoTexto
        );
    });


    actualizarBoton();
}


// HABILITA O DESHABILITA EL BOTÓN

function actualizarBoton() {

    if (asientosSeleccionados.length > 0) {

        botonContinuar.classList.remove(
            "deshabilitado"
        );


        const asientosTexto =
            asientosSeleccionados.join("-");


        botonContinuar.href =
            "compra.html?id=" +
            peliculaId +
            "&cine=" +
            encodeURIComponent(cineSeleccionado) +
            "&sala=" +
            encodeURIComponent(salaSeleccionada) +
            "&hora=" +
            encodeURIComponent(horaSeleccionada) +
            "&fecha=" +
            encodeURIComponent(fechaSeleccionada) +
            "&asientos=" +
            encodeURIComponent(asientosTexto);

    } else {

        botonContinuar.classList.add(
            "deshabilitado"
        );

        botonContinuar.href =
            "compra.html";
    }
}


// MUESTRA EL ESTADO INICIAL

actualizarResumen();