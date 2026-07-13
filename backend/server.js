require("dotenv").config();

const app =
    require("./src/app");

const sequelize =
    require("./src/config/database");


// IMPORTA LOS MODELOS Y SUS RELACIONES

require("./src/models");


// OBTIENE EL PUERTO

const PORT =
    process.env.PORT || 3000;


// INICIA EL SERVIDOR Y PRUEBA LA BASE DE DATOS

async function iniciarServidor() {

    try {

        // COMPRUEBA LA CONEXIÓN CON MYSQL

        await sequelize.authenticate();

        console.log(
            "Conexión con MySQL realizada correctamente"
        );


        // CREA O SINCRONIZA LAS TABLAS

        await sequelize.sync();

        console.log(
            "Tablas sincronizadas correctamente en la base de datos"
        );


        // INICIA EXPRESS

        app.listen(
            PORT,
            function () {

                console.log(
                    "Servidor de CinemaHub funcionando en http://localhost:" +
                    PORT
                );
            }
        );

    } catch (error) {

        console.error(
            "No se pudo conectar con MySQL:"
        );

        console.error(
            error.message
        );
    }
}


// EJECUTA LA FUNCIÓN

iniciarServidor();