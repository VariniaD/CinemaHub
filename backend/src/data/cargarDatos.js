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

        // PRUEBA LA CONEXIÓN CON MYSQL

        await sequelize.authenticate();

        console.log(
            "Conexión con MySQL realizada correctamente"
        );


        // CREA LA TABLA SI TODAVÍA NO EXISTE

        await sequelize.sync();


        // ELIMINA SOLAMENTE REGISTROS VACÍOS

        await Pelicula.destroy({
            where: {
                titulo: null
            }
        });


        // REVISA CUÁNTAS PELÍCULAS VÁLIDAS EXISTEN

        const cantidadPeliculas =
            await Pelicula.count();


        // EVITA DUPLICAR LOS DATOS

        if (cantidadPeliculas > 0) {

            console.log(
                "Ya existen " +
                cantidadPeliculas +
                " películas en la base de datos"
            );

            return;
        }


        // INSERTA TODAS LAS PELÍCULAS

        const peliculasCreadas =
            await Pelicula.bulkCreate(
                peliculasIniciales,
                {
                    validate: true
                }
            );


        console.log(
            peliculasCreadas.length +
            " películas cargadas correctamente"
        );

    } catch (error) {

        console.error(
            "Error al cargar las películas:"
        );

        console.error(error);

    } finally {

        await sequelize.close();
    }
}


// EJECUTA LA CARGA

cargarDatos();