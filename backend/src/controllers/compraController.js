const crypto =
    require("crypto");

const { Op } =
    require("sequelize");

const sequelize =
    require("../config/database");

const {
    Pelicula,
    Cine,
    Sala,
    Funcion,
    Asiento,
    Compra,
    CompraAsiento
} = require("../models");


// PRECIO DE CADA ENTRADA

const PRECIO_ENTRADA =
    24;


// CARGO FIJO POR SERVICIO

const CARGO_SERVICIO =
    5;


// GENERA UN CÓDIGO ÚNICO PARA EL TICKET

function generarCodigoTicket() {

    const fecha =
        new Date();

    const anio =
        fecha.getFullYear();

    const mes =
        String(
            fecha.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            fecha.getDate()
        ).padStart(2, "0");


    const codigoAleatorio =
        crypto
            .randomBytes(3)
            .toString("hex")
            .toUpperCase();


    return (
        "CH-" +
        anio +
        mes +
        dia +
        "-" +
        codigoAleatorio
    );
}


// REGISTRA UNA COMPRA

async function registrarCompra(
    req,
    res
) {

    let transaccion;


    try {

        const {
            funcionId,
            asientos,
            nombre,
            correo,
            telefono,
            metodoPago
        } = req.body;


        // VALIDA LOS DATOS OBLIGATORIOS

        if (
            !funcionId ||
            !nombre ||
            !correo ||
            !telefono ||
            !metodoPago
        ) {

            return res.status(400).json({
                mensaje:
                    "Todos los datos de la compra son obligatorios"
            });
        }


        // VALIDA LA LISTA DE ASIENTOS

        if (
            !Array.isArray(asientos) ||
            asientos.length === 0
        ) {

            return res.status(400).json({
                mensaje:
                    "Debe seleccionar al menos un asiento"
            });
        }


        // LIMPIA Y NORMALIZA LOS CÓDIGOS

        const codigosAsientos =
            asientos.map(
                function (codigo) {

                    return String(codigo)
                        .trim()
                        .toUpperCase();
                }
            );


        // ELIMINA CÓDIGOS REPETIDOS

        const codigosUnicos =
            [
                ...new Set(
                    codigosAsientos
                )
            ];


        if (
            codigosUnicos.length !==
            codigosAsientos.length
        ) {

            return res.status(400).json({
                mensaje:
                    "La lista contiene asientos repetidos"
            });
        }


        // INICIA LA TRANSACCIÓN

        transaccion =
            await sequelize.transaction();


        // BUSCA LA FUNCIÓN

        const funcion =
            await Funcion.findByPk(
                funcionId,
                {
                    include: [
                        {
                            model:
                                Pelicula,

                            as:
                                "pelicula"
                        },

                        {
                            model:
                                Sala,

                            as:
                                "sala",

                            include: [
                                {
                                    model:
                                        Cine,

                                    as:
                                        "cine"
                                }
                            ]
                        }
                    ],

                    transaction:
                        transaccion
                }
            );


        if (!funcion) {

            await transaccion.rollback();


            return res.status(404).json({
                mensaje:
                    "La función seleccionada no existe"
            });
        }


        if (
            funcion.estado !==
            "disponible"
        ) {

            await transaccion.rollback();


            return res.status(409).json({
                mensaje:
                    "La función ya no está disponible"
            });
        }


        // BUSCA Y BLOQUEA LOS ASIENTOS DURANTE LA COMPRA

        const asientosEncontrados =
            await Asiento.findAll({
                where: {
                    funcionId:
                        funcion.id,

                    codigo: {
                        [Op.in]:
                            codigosUnicos
                    }
                },

                transaction:
                    transaccion,

                lock:
                    transaccion.LOCK.UPDATE
            });


        // VERIFICA QUE TODOS LOS ASIENTOS EXISTAN

        if (
            asientosEncontrados.length !==
            codigosUnicos.length
        ) {

            await transaccion.rollback();


            return res.status(400).json({
                mensaje:
                    "Uno o más asientos no pertenecen a esta función"
            });
        }


        // BUSCA ASIENTOS YA OCUPADOS

        const asientosNoDisponibles =
            asientosEncontrados.filter(
                function (asiento) {

                    return (
                        asiento.estado !==
                        "disponible"
                    );
                }
            );


        if (
            asientosNoDisponibles.length >
            0
        ) {

            await transaccion.rollback();


            return res.status(409).json({
                mensaje:
                    "Uno o más asientos ya fueron ocupados",

                asientosNoDisponibles:
                    asientosNoDisponibles.map(
                        function (asiento) {

                            return asiento.codigo;
                        }
                    )
            });
        }


        // CALCULA LOS PRECIOS EN EL BACKEND

        const cantidadEntradas =
            asientosEncontrados.length;


        const subtotal =
            cantidadEntradas *
            PRECIO_ENTRADA;


        const total =
            subtotal +
            CARGO_SERVICIO;


        // GENERA EL CÓDIGO DEL TICKET

        const codigoTicket =
            generarCodigoTicket();


        // CREA LA COMPRA

        const compra =
            await Compra.create(
                {
                    codigoTicket:
                        codigoTicket,

                    nombre:
                        String(nombre).trim(),

                    correo:
                        String(correo).trim(),

                    telefono:
                        String(telefono).trim(),

                    cantidadEntradas:
                        cantidadEntradas,

                    subtotal:
                        subtotal,

                    cargoServicio:
                        CARGO_SERVICIO,

                    total:
                        total,

                    metodoPago:
                        String(metodoPago).trim(),

                    funcionId:
                        funcion.id
                },
                {
                    transaction:
                        transaccion
                }
            );


        // PREPARA LOS DETALLES DE LOS ASIENTOS

        const detallesAsientos =
            asientosEncontrados.map(
                function (asiento) {

                    return {
                        compraId:
                            compra.id,

                        asientoId:
                            asiento.id,

                        precio:
                            PRECIO_ENTRADA
                    };
                }
            );


        // GUARDA LOS ASIENTOS DE LA COMPRA

        await CompraAsiento.bulkCreate(
            detallesAsientos,
            {
                validate:
                    true,

                transaction:
                    transaccion
            }
        );


        // MARCA LOS ASIENTOS COMO OCUPADOS

        const identificadoresAsientos =
            asientosEncontrados.map(
                function (asiento) {

                    return asiento.id;
                }
            );


        await Asiento.update(
            {
                estado:
                    "ocupado"
            },
            {
                where: {
                    id: {
                        [Op.in]:
                            identificadoresAsientos
                    }
                },

                transaction:
                    transaccion
            }
        );


        // CONFIRMA TODOS LOS CAMBIOS

        await transaccion.commit();


        // ORDENA LOS CÓDIGOS DE LOS ASIENTOS

        const asientosComprados =
            asientosEncontrados
                .map(
                    function (asiento) {

                        return asiento.codigo;
                    }
                )
                .sort();


        // DEVUELVE EL TICKET

        return res.status(201).json({
            mensaje:
                "Compra realizada correctamente",

            ticket: {
                compraId:
                    compra.id,

                codigoTicket:
                    compra.codigoTicket,

                funcionId:
                    funcion.id,

                peliculaId:
                    funcion.pelicula.id,

                pelicula:
                    funcion.pelicula.titulo,

                imagen:
                    funcion.pelicula.imagen,

                cine:
                    funcion.sala.cine.nombre,

                cineCodigo:
                    funcion.sala.cine.codigo,

                sala:
                    funcion.sala.nombre,

                fecha:
                    funcion.fecha,

                hora:
                    funcion.hora.substring(
                        0,
                        5
                    ),

                asientos:
                    asientosComprados,

                cantidadEntradas:
                    cantidadEntradas,

                precioEntrada:
                    PRECIO_ENTRADA.toFixed(2),

                subtotal:
                    subtotal.toFixed(2),

                cargoServicio:
                    CARGO_SERVICIO.toFixed(2),

                total:
                    total.toFixed(2),

                nombre:
                    compra.nombre,

                correo:
                    compra.correo,

                telefono:
                    compra.telefono,

                metodoPago:
                    compra.metodoPago,

                fechaCompra:
                    compra.fechaCompra
            }
        });

    } catch (error) {

        // DESHACE LOS CAMBIOS SI ALGO FALLA

        if (transaccion) {

            try {

                await transaccion.rollback();

            } catch (errorRollback) {

                console.error(
                    "No se pudo cancelar la transacción:",
                    errorRollback
                );
            }
        }


        console.error(
            "Error al registrar la compra:",
            error
        );


        return res.status(500).json({
            mensaje:
                "No se pudo registrar la compra"
        });
    }
}


// EXPORTA EL CONTROLADOR

module.exports = {
    registrarCompra
};