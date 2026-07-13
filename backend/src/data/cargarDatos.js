require("dotenv").config();

const sequelize =
    require("../config/database");

const {
    Pelicula,
    Cine,
    Sala,
    Funcion
} = require("../models");

const peliculasIniciales =
    require("./peliculasIniciales");

const cinesIniciales =
    require("./cinesIniciales");

const salasIniciales =
    require("./salasIniciales");

const funcionesIniciales =
    require("./funcionesIniciales");


// OBTIENE UNA FECHA SUMANDO DÍAS A LA FECHA ACTUAL

function obtenerFechaConDiferencia(diasDespues) {

    const fecha =
        new Date();

    fecha.setDate(
        fecha.getDate() +
        Number(diasDespues || 0)
    );


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


    return (
        anio +
        "-" +
        mes +
        "-" +
        dia
    );
}


// CARGA LOS DATOS INICIALES

async function cargarDatos() {

    try {

        // PRUEBA LA CONEXIÓN

        await sequelize.authenticate();

        console.log(
            "Conexión con MySQL realizada correctamente"
        );


        // CREA LAS TABLAS QUE TODAVÍA NO EXISTEN

        await sequelize.sync();


        // CARGA LAS PELÍCULAS

        const cantidadPeliculas =
            await Pelicula.count();


        if (cantidadPeliculas === 0) {

            await Pelicula.bulkCreate(
                peliculasIniciales,
                {
                    validate: true
                }
            );

            console.log(
                "Películas cargadas correctamente"
            );

        } else {

            console.log(
                "Las películas ya existen"
            );
        }


        // CARGA LOS CINES

        const cantidadCines =
            await Cine.count();


        if (cantidadCines === 0) {

            await Cine.bulkCreate(
                cinesIniciales,
                {
                    validate: true
                }
            );

            console.log(
                "Cines cargados correctamente"
            );

        } else {

            console.log(
                "Los cines ya existen"
            );
        }


        // CARGA LAS SALAS

        const cantidadSalas =
            await Sala.count();


        if (cantidadSalas === 0) {

            for (
                let i = 0;
                i < salasIniciales.length;
                i++
            ) {

                const salaInicial =
                    salasIniciales[i];


                // BUSCA EL CINE MEDIANTE SU CÓDIGO

                const cine =
                    await Cine.findOne({
                        where: {
                            codigo:
                                salaInicial.cineCodigo
                        }
                    });


                if (!cine) {

                    throw new Error(
                        "No se encontró el cine " +
                        salaInicial.cineCodigo
                    );
                }


                // CREA LA SALA

                await Sala.create({
                    nombre:
                        salaInicial.nombre,

                    tipo:
                        salaInicial.tipo,

                    capacidad:
                        salaInicial.capacidad,

                    estado:
                        salaInicial.estado,

                    cineId:
                        cine.id
                });
            }


            console.log(
                "Salas cargadas correctamente"
            );

        } else {

            console.log(
                "Las salas ya existen"
            );
        }


        // CARGA LAS FUNCIONES

        const cantidadFunciones =
            await Funcion.count();


        if (cantidadFunciones === 0) {

            for (
                let i = 0;
                i < funcionesIniciales.length;
                i++
            ) {

                const funcionInicial =
                    funcionesIniciales[i];


                // BUSCA EL CINE

                const cine =
                    await Cine.findOne({
                        where: {
                            codigo:
                                funcionInicial.cineCodigo
                        }
                    });


                if (!cine) {

                    throw new Error(
                        "No se encontró el cine " +
                        funcionInicial.cineCodigo
                    );
                }


                // BUSCA LA SALA DEL CINE

                const sala =
                    await Sala.findOne({
                        where: {
                            nombre:
                                funcionInicial.salaNombre,

                            cineId:
                                cine.id
                        }
                    });


                if (!sala) {

                    throw new Error(
                        "No se encontró la sala " +
                        funcionInicial.salaNombre +
                        " en el cine " +
                        funcionInicial.cineCodigo
                    );
                }


                // VERIFICA QUE EXISTA LA PELÍCULA

                const pelicula =
                    await Pelicula.findByPk(
                        funcionInicial.peliculaId
                    );


                if (!pelicula) {

                    throw new Error(
                        "No se encontró la película con id " +
                        funcionInicial.peliculaId
                    );
                }


                // CALCULA LA FECHA DE LA FUNCIÓN

                const fechaFuncion =
                    obtenerFechaConDiferencia(
                        funcionInicial.diasDespues
                    );


                // CREA LA FUNCIÓN

                await Funcion.create({
                    fecha:
                        fechaFuncion,

                    hora:
                        funcionInicial.hora,

                    estado:
                        funcionInicial.estado,

                    peliculaId:
                        pelicula.id,

                    salaId:
                        sala.id
                });
            }


            console.log(
                "Funciones cargadas correctamente"
            );

        } else {

            console.log(
                "Las funciones ya existen"
            );
        }


        console.log(
            "Carga inicial finalizada correctamente"
        );

    } catch (error) {

        console.error(
            "Error al cargar los datos:"
        );

        console.error(error);

    } finally {

        await sequelize.close();
    }
}


// EJECUTA LA CARGA

cargarDatos();