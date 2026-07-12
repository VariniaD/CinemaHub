// BUSCA LOS BOTONES DE LOS FILTROS

const filtroHoy = document.getElementById("filtro-hoy");

const filtroProximos = document.getElementById("filtro-proximos");


// BUSCA LAS PELÍCULAS ACTUALES Y LA TARJETA DE PRÓXIMOS ESTRENOS

const peliculasActuales =
    document.querySelectorAll(".tarjeta-pelicula");

const tarjetaProximamente =
    document.querySelector(".tarjeta-proximamente");


// BUSCA TODOS LOS BOTONES DE ASIENTOS

const botonesAsientos =
    document.querySelectorAll(".boton-asientos");


// OBTIENE LA FECHA ACTUAL EN FORMATO AÑO-MES-DÍA

function obtenerFechaActual() {

    const fecha = new Date();

    const anio = fecha.getFullYear();

    const mes = String(fecha.getMonth() + 1).padStart(2, "0");

    const dia = String(fecha.getDate()).padStart(2, "0");

    return anio + "-" + mes + "-" + dia;
}


// PREPARA EL ENLACE DIRECTO A LOS ASIENTOS

botonesAsientos.forEach(function (boton) {

    // Obtiene el id guardado en el botón
    const peliculaId = boton.dataset.id;

    // Forma un enlace con una función predeterminada
    boton.href =
        "asientos.html?id=" +
        peliculaId +
        "&cine=centro" +
        "&sala=Sala%20Premium" +
        "&hora=19%3A30" +
        "&fecha=" +
        obtenerFechaActual();
});


// MUESTRA LAS PELÍCULAS EN CARTELERA

filtroHoy.addEventListener("click", function () {

    // Activa visualmente el botón Hoy
    filtroHoy.classList.add("filtro-activo");

    filtroProximos.classList.remove("filtro-activo");


    // Muestra todas las películas actuales
    peliculasActuales.forEach(function (pelicula) {
        pelicula.style.display = "";
    });


    // Oculta la tarjeta de próximos estrenos
    tarjetaProximamente.style.display = "none";
});


// MUESTRA LA SECCIÓN DE PRÓXIMOS ESTRENOS

filtroProximos.addEventListener("click", function () {

    // Activa visualmente el segundo filtro
    filtroProximos.classList.add("filtro-activo");

    filtroHoy.classList.remove("filtro-activo");


    // Oculta las películas actuales
    peliculasActuales.forEach(function (pelicula) {
        pelicula.style.display = "none";
    });


    // Muestra la tarjeta de próximos estrenos
    tarjetaProximamente.style.display = "flex";
});


// ESTADO INICIAL

tarjetaProximamente.style.display = "none";