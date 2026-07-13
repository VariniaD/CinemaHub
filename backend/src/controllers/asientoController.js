const {
    Funcion,
    Asiento,
    Pelicula,
    Sala,
    Cine
} = require("../models");


// OBTIENE LOS ASIENTOS DE UNA FUNCIÓN

async function obtenerAsientosPorFuncion(
    req,
    res
) {

    try {

        // OBTIENE EL ID DE LA FUNCIÓN

        const funcionId =
            req.params.id;


        // BUSCA LA FUNCIÓN

        const funcion =
            await Funcion.findByPk(
                funcionId,
                {
                    include: [
                        {
                            model: Pelicula,
                            as: "pelicula"
                        },

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
                    ]
                }
            );


        // VERIFICA QUE EXISTA

        if (!funcion) {

            return res.status(404).json({
                mensaje:
                    "La función solicitada no existe"
            });
        }


        // BUSCA LOS ASIENTOS

        const asientos =
            await Asiento.findAll({
                where: {
                    funcionId: funcionId
                },

                order: [
                    ["fila", "ASC"],
                    ["numero", "ASC"]
                ]
            });


        // DEVUELVE LA RESPUESTA

        res.status(200).json({
            mensaje:
                "Asientos obtenidos correctamente",

            funcion: {
                id:
                    funcion.id,

                fecha:
                    funcion.fecha,

                hora:
                    funcion.hora,

                estado:
                    funcion.estado,

                pelicula: {
                    id:
                        funcion.pelicula.id,

                    titulo:
                        funcion.pelicula.titulo,

                    imagen:
                        funcion.pelicula.imagen
                },

                sala: {
                    id:
                        funcion.sala.id,

                    nombre:
                        funcion.sala.nombre,

                    cine: {
                        id:
                            funcion.sala.cine.id,

                        nombre:
                            funcion.sala.cine.nombre,

                        codigo:
                            funcion.sala.cine.codigo
                    }
                }
            },

            cantidad:
                asientos.length,

            asientos:
                asientos
        });

    } catch (error) {

        console.error(
            "Error al obtener los asientos:",
            error
        );


        res.status(500).json({
            mensaje:
                "No se pudieron obtener los asientos"
        });
    }
}


// EXPORTA LA FUNCIÓN

module.exports = {
    obtenerAsientosPorFuncion
};