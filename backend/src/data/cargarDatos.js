require("dotenv").config();

const sequelize =
    require("../config/database");

const Pelicula =
    require("../models/Pelicula");

const peliculasIniciales =
    require("./peliculasIniciales");


// CARGA LOS DATOS INICIALES

async function cargarDatos() {

    try {

        // CONECTA CON MYSQL

        await sequelize.authenticate();


        // CREA LA TABLA SI NO EXISTE

        await sequelize.sync();


        // REVISA CUÁNTAS PELÍCULAS EXISTEN

        const cantidadPeliculas =
            await Pelicula.count();


        // EVITA INSERTAR PELÍCULAS DUPLICADAS

        if (cantidadPeliculas > 0) {

            console.log(
                "Las películas ya fueron cargadas anteriormente"
            );

            return;
        }


        // INSERTA TODAS LAS PELÍCULAS

        await Pelicula.bulkCreate(
            peliculasIniciales
        );


        console.log(
            "Películas cargadas correctamente"
        );

    } catch (error) {

        console.error(
            "Error al cargar las películas:"
        );

        console.error(error.message);

    } finally {

        // CIERRA LA CONEXIÓN

        await sequelize.close();
    }
}


// EJECUTA LA CARGA

cargarDatos();