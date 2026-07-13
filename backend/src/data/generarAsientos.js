// GENERA LOS 64 ASIENTOS DE UNA FUNCIÓN

function generarAsientos(funcionId) {

    const asientos = [];

    const filas = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H"
    ];


    // ASIENTOS OCUPADOS DE PRUEBA

    const ocupados = [
        "A3",
        "C2",
        "C3",
        "C7",
        "C8"
    ];


    // RECORRE LAS FILAS

    for (
        let i = 0;
        i < filas.length;
        i++
    ) {

        const fila =
            filas[i];


        // CREA LOS ASIENTOS 1 AL 8

        for (
            let numero = 1;
            numero <= 8;
            numero++
        ) {

            const codigo =
                fila + numero;


            let estado =
                "disponible";


            if (
                ocupados.includes(codigo)
            ) {

                estado =
                    "ocupado";
            }


            asientos.push({
                codigo: codigo,
                fila: fila,
                numero: numero,
                estado: estado,
                funcionId: funcionId
            });
        }
    }


    return asientos;
}


module.exports = generarAsientos;