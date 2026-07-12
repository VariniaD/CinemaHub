// OBTIENE LOS PARÁMETROS DE LA DIRECCIÓN

const parametros =
    new URLSearchParams(window.location.search);


// OBTIENE EL ID DE LA PELÍCULA

let peliculaId = parametros.get("id");


// UTILIZA LA PELÍCULA 1 SI NO LLEGA UN ID

if (!peliculaId) {
    peliculaId = "1";
}


// BUSCA LA PELÍCULA DENTRO DE datos.js

const pelicula = buscarPelicula(peliculaId);


// BUSCA LOS ELEMENTOS DEL DETALLE

const fondoPelicula =
    document.getElementById("fondo-pelicula");

const posterDetalle =
    document.getElementById("poster-detalle");

const generoPelicula =
    document.getElementById("genero-pelicula");

const duracionPelicula =
    document.getElementById("duracion-pelicula");

const clasificacionPelicula =
    document.getElementById("clasificacion-pelicula");

const tituloPelicula =
    document.getElementById("titulo-pelicula");

const sinopsisPelicula =
    document.getElementById("sinopsis-pelicula");

const calificacionPelicula =
    document.getElementById("calificacion-pelicula");

const resenasPelicula =
    document.getElementById("resenas-pelicula");


// MUESTRA LOS DATOS DE LA PELÍCULA

document.title =
    "CinemaHub - " + pelicula.titulo;

fondoPelicula.style.backgroundImage =
    "url('" + pelicula.imagen + "')";

posterDetalle.src = pelicula.imagen;

posterDetalle.alt =
    "Póster de la película " + pelicula.titulo;

generoPelicula.textContent =
    pelicula.genero;

duracionPelicula.textContent =
    pelicula.duracion;

clasificacionPelicula.textContent =
    pelicula.clasificacion;

tituloPelicula.textContent =
    pelicula.titulo;

sinopsisPelicula.textContent =
    pelicula.sinopsis;

calificacionPelicula.textContent =
    pelicula.calificacion;

resenasPelicula.textContent =
    pelicula.resenas;


// BUSCA LOS BOTONES DE FECHA

const botonesFecha =
    document.querySelectorAll(".fecha");


// GUARDA LA FECHA SELECCIONADA

let fechaSeleccionada = "";


// NOMBRES ABREVIADOS DE LOS DÍAS

const diasSemana = [
    "DOM",
    "LUN",
    "MAR",
    "MIÉ",
    "JUE",
    "VIE",
    "SÁB"
];


// PREPARA LAS SIETE FECHAS A PARTIR DE HOY

botonesFecha.forEach(function (boton, posicion) {

    // Crea una fecha tomando hoy como inicio
    const fecha = new Date();

    // Suma la posición del botón
    fecha.setDate(fecha.getDate() + posicion);


    // Obtiene las partes de la fecha
    const anio = fecha.getFullYear();

    const mes =
        String(fecha.getMonth() + 1).padStart(2, "0");

    const dia =
        String(fecha.getDate()).padStart(2, "0");


    // Forma el valor que viajará por la URL
    const fechaValor =
        anio + "-" + mes + "-" + dia;


    // Guarda la fecha dentro del botón
    boton.dataset.fecha = fechaValor;


    // Busca los textos internos
    const textoDia =
        boton.querySelector(".dia-semana");

    const numeroDia =
        boton.querySelector(".numero-dia");


    // El primer botón muestra HOY
    if (posicion === 0) {

        textoDia.textContent = "HOY";

        fechaSeleccionada = fechaValor;

    } else {

        textoDia.textContent =
            diasSemana[fecha.getDay()];
    }


    // Muestra el número del día
    numeroDia.textContent =
        fecha.getDate();


    // Detecta cuando se selecciona otra fecha
    boton.addEventListener("click", function () {

        // Quita la clase activa de todas las fechas
        botonesFecha.forEach(function (otraFecha) {
            otraFecha.classList.remove("fecha-activa");
        });


        // Activa la fecha presionada
        boton.classList.add("fecha-activa");


        // Guarda la nueva fecha
        fechaSeleccionada =
            boton.dataset.fecha;
    });
});


// BUSCA TODOS LOS HORARIOS DISPONIBLES

const horarios =
    document.querySelectorAll(".horario-funcion");


// CONECTA CADA HORARIO CON LA PÁGINA DE ASIENTOS

horarios.forEach(function (horario) {

    horario.addEventListener("click", function (evento) {

        // Evita utilizar el enlace incompleto
        evento.preventDefault();


        // Obtiene los datos guardados en el horario
        const cine = horario.dataset.cine;

        const sala = horario.dataset.sala;

        const hora = horario.dataset.hora;


        // Forma la dirección de asientos
        const direccion =
            "asientos.html?id=" +
            peliculaId +
            "&cine=" +
            encodeURIComponent(cine) +
            "&sala=" +
            encodeURIComponent(sala) +
            "&hora=" +
            encodeURIComponent(hora) +
            "&fecha=" +
            encodeURIComponent(fechaSeleccionada);


        // Abre la selección de asientos
        window.location.href = direccion;
    });
});