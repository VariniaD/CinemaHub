// DATOS TEMPORALES DE LAS PELÍCULAS
// Más adelante estos datos podrán llegar desde el backend.

window.peliculas = [
    {
        id: "1",
        titulo: "Comer, rezar y amar",
        imagen: "img/comer-rezar-amar.jpeg",
        genero: "Drama romántico",
        duracion: "133 min",
        clasificacion: "+13",
        calificacion: "8.9",
        resenas: "325 reseñas",
        sinopsis:
            "Una mujer decide dejar atrás su vida cotidiana para emprender un viaje por Italia, India e Indonesia. Durante el recorrido busca reencontrarse consigo misma y encontrar un nuevo sentido para su vida."
    },
    {
        id: "2",
        titulo: "Dune: Parte Dos",
        imagen: "img/dune2.jpeg",
        genero: "Ciencia ficción",
        duracion: "166 min",
        clasificacion: "+13",
        calificacion: "9.1",
        resenas: "480 reseñas",
        sinopsis:
            "Paul Atreides continúa su viaje mientras se une al pueblo Fremen y enfrenta decisiones que pueden cambiar el destino de Arrakis."
    },
    {
        id: "3",
        titulo: "Los Juegos del Hambre",
        imagen: "img/juegos-del-hambre.jpeg",
        genero: "Acción y aventura",
        duracion: "142 min",
        clasificacion: "+13",
        calificacion: "7.5",
        resenas: "298 reseñas",
        sinopsis:
            "Una joven participa en una competencia donde deberá utilizar su inteligencia y valentía para sobrevivir."
    },
    {
        id: "4",
        titulo: "Minions",
        imagen: "img/minion.jpeg",
        genero: "Animación y comedia",
        duracion: "91 min",
        clasificacion: "ATP",
        calificacion: "8.6",
        resenas: "216 reseñas",
        sinopsis:
            "Los Minions emprenden una divertida aventura para encontrar a un nuevo líder y terminan involucrados en situaciones inesperadas."
    },
    {
        id: "5",
        titulo: "Proyecto X",
        imagen: "img/proyectox.jpeg",
        genero: "Comedia",
        duracion: "88 min",
        clasificacion: "+18",
        calificacion: "9.0",
        resenas: "351 reseñas",
        sinopsis:
            "Tres estudiantes organizan una fiesta que rápidamente crece hasta convertirse en un evento completamente fuera de control."
    }
];


// BUSCA UNA PELÍCULA MEDIANTE SU IDENTIFICADOR

window.buscarPelicula = function (id) {

    // Recorre la lista de películas
    for (let i = 0; i < window.peliculas.length; i++) {

        // Devuelve la película que tenga el mismo id
        if (window.peliculas[i].id === id) {
            return window.peliculas[i];
        }
    }

    // Si no encuentra el id, devuelve la primera película
    return window.peliculas[0];
};