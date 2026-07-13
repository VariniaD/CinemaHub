const {
    Pelicula,
    Funcion,
    Sala,
    Cine
} = require("../models");


// OBTIENE LAS FUNCIONES DE UNA PELÍCULA

async function obtenerFuncionesPorPelicula(req, res) {

    try {

        // Obtiene el identificador de la película
        const peliculaId =
            req.params.id;


        // Obtiene la fecha enviada opcionalmente
        const fecha =
            req.query.fecha;


        // Verifica que la película exista

        const pelicula =
            await Pelicula.findByPk(
                peliculaId
            );


        if (!pelicula) {

            return res.status(404).json({
                mensaje:
                    "La película solicitada no existe"
            });
        }


        // Prepara el filtro de búsqueda

        const filtro = {
            peliculaId: peliculaId
        };


        // Agrega la fecha cuando fue enviada

        if (fecha) {

            filtro.fecha =
                fecha;
        }


        // Busca las funciones con su sala y cine

        const funciones =
            await Funcion.findAll({
                where: filtro,

                include: [
                    {
                        model: Sala,
                        as: "sala",

                        include: [
                            {
                                model: Cine,
                                as: "cine"
                            }
                        ]
                    }
                ],

                order: [
                    ["fecha", "ASC"],
                    ["hora", "ASC"]
                ]
            });


        // Devuelve las funciones encontradas

        res.status(200).json({
            mensaje:
                "Funciones obtenidas correctamente",

            pelicula: {
                id: pelicula.id,
                titulo: pelicula.titulo
            },

            cantidad:
                funciones.length,

            funciones:
                funciones
        });

    } catch (error) {

        console.error(
            "Error al obtener las funciones:",
            error
        );


        res.status(500).json({
            mensaje:
                "No se pudieron obtener las funciones"
        });
    }
}


// EXPORTA LA FUNCIÓN

module.exports = {
    obtenerFuncionesPorPelicula
};