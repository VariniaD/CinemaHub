const { Pelicula } =
    require("../models");


// OBTIENE TODAS LAS PELÍCULAS

async function obtenerPeliculas(req, res) {

    try {

        const peliculas =
            await Pelicula.findAll({
                order: [
                    ["id", "ASC"]
                ]
            });


        res.status(200).json({
            mensaje: "Películas obtenidas correctamente",
            cantidad: peliculas.length,
            peliculas: peliculas
        });

    } catch (error) {

        console.error(
            "Error al obtener las películas:",
            error
        );


        res.status(500).json({
            mensaje:
                "No se pudieron obtener las películas"
        });
    }
}


// OBTIENE UNA PELÍCULA POR SU ID

async function obtenerPeliculaPorId(req, res) {

    try {

        const id =
            req.params.id;


        const pelicula =
            await Pelicula.findByPk(id);


        if (!pelicula) {

            return res.status(404).json({
                mensaje:
                    "La película solicitada no existe"
            });
        }


        res.status(200).json({
            mensaje:
                "Película obtenida correctamente",
            pelicula: pelicula
        });

    } catch (error) {

        console.error(
            "Error al obtener la película:",
            error
        );


        res.status(500).json({
            mensaje:
                "No se pudo obtener la película"
        });
    }
}


// EXPORTA LAS FUNCIONES

module.exports = {
    obtenerPeliculas,
    obtenerPeliculaPorId
};