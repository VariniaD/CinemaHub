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

const Compra =
    require("./Compra");

const CompraAsiento =
    require("./CompraAsiento");


// RELACIÓN ENTRE CINE Y SALA

Cine.hasMany(
    Sala,
    {
        foreignKey:
            "cineId",

        as:
            "salas"
    }
);


Sala.belongsTo(
    Cine,
    {
        foreignKey:
            "cineId",

        as:
            "cine"
    }
);


// RELACIÓN ENTRE PELÍCULA Y FUNCIÓN

Pelicula.hasMany(
    Funcion,
    {
        foreignKey:
            "peliculaId",

        as:
            "funciones"
    }
);


Funcion.belongsTo(
    Pelicula,
    {
        foreignKey:
            "peliculaId",

        as:
            "pelicula"
    }
);


// RELACIÓN ENTRE SALA Y FUNCIÓN

Sala.hasMany(
    Funcion,
    {
        foreignKey:
            "salaId",

        as:
            "funciones"
    }
);


Funcion.belongsTo(
    Sala,
    {
        foreignKey:
            "salaId",

        as:
            "sala"
    }
);


// RELACIÓN ENTRE FUNCIÓN Y ASIENTO

Funcion.hasMany(
    Asiento,
    {
        foreignKey:
            "funcionId",

        as:
            "asientos"
    }
);


Asiento.belongsTo(
    Funcion,
    {
        foreignKey:
            "funcionId",

        as:
            "funcion"
    }
);


// RELACIÓN ENTRE FUNCIÓN Y COMPRA

Funcion.hasMany(
    Compra,
    {
        foreignKey:
            "funcionId",

        as:
            "compras"
    }
);


Compra.belongsTo(
    Funcion,
    {
        foreignKey:
            "funcionId",

        as:
            "funcion"
    }
);


// RELACIÓN ENTRE COMPRA Y COMPRA ASIENTO

Compra.hasMany(
    CompraAsiento,
    {
        foreignKey:
            "compraId",

        as:
            "detallesAsientos"
    }
);


CompraAsiento.belongsTo(
    Compra,
    {
        foreignKey:
            "compraId",

        as:
            "compra"
    }
);


// RELACIÓN ENTRE ASIENTO Y COMPRA ASIENTO

Asiento.hasMany(
    CompraAsiento,
    {
        foreignKey:
            "asientoId",

        as:
            "detallesCompras"
    }
);


CompraAsiento.belongsTo(
    Asiento,
    {
        foreignKey:
            "asientoId",

        as:
            "asiento"
    }
);


// EXPORTA TODOS LOS MODELOS

module.exports = {
    Pelicula,
    Cine,
    Sala,
    Funcion,
    Asiento,
    Compra,
    CompraAsiento
};