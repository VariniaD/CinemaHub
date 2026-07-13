const Pelicula =
    require("./Pelicula");

const Cine =
    require("./Cine");

const Sala =
    require("./Sala");

const Funcion =
    require("./Funcion");

const Asiento =
    require("./Asiento");


// RELACIÓN ENTRE CINE Y SALA

Cine.hasMany(
    Sala,
    {
        foreignKey: "cineId",
        as: "salas"
    }
);


Sala.belongsTo(
    Cine,
    {
        foreignKey: "cineId",
        as: "cine"
    }
);


// RELACIÓN ENTRE PELÍCULA Y FUNCIÓN

Pelicula.hasMany(
    Funcion,
    {
        foreignKey: "peliculaId",
        as: "funciones"
    }
);


Funcion.belongsTo(
    Pelicula,
    {
        foreignKey: "peliculaId",
        as: "pelicula"
    }
);


// RELACIÓN ENTRE SALA Y FUNCIÓN

Sala.hasMany(
    Funcion,
    {
        foreignKey: "salaId",
        as: "funciones"
    }
);


Funcion.belongsTo(
    Sala,
    {
        foreignKey: "salaId",
        as: "sala"
    }
);


// RELACIÓN ENTRE FUNCIÓN Y ASIENTO

Funcion.hasMany(
    Asiento,
    {
        foreignKey: "funcionId",
        as: "asientos"
    }
);


Asiento.belongsTo(
    Funcion,
    {
        foreignKey: "funcionId",
        as: "funcion"
    }
);


// EXPORTA TODOS LOS MODELOS

module.exports = {
    Pelicula,
    Cine,
    Sala,
    Funcion,
    Asiento
};