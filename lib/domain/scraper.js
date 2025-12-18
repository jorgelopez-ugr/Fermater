
// --- Lógica del Parser ---

function extraerFechaDeFila(fila) {

    if (typeof fila !== 'string') {
        throw new TypeError("[Error] Se esperaba un string como input y se ha recibido un tipo " + typeof fila);
    }
    
    if (fila.trim() === '') {
        throw new Error("[Error] Se ha introducido un " + fila + " que no es correcto porque tras limpiar espacios está vacío");
    }

    const regexFecha = /(\d{2})-(\d{2})-(\d{4})/;
    const match = fila.match(regexFecha);
    
    if (!match) {
        throw new Error("[Error] No se encontró una fecha válida en " + fila + ", error de formato.");
    }

    // Comprobamos que match es un objeto fecha dentro de los rangos válidos.
    const dia = match[1];
    const mes = match[2];
    const anio = match[3];

    if (dia < 1 || dia > 31) {
        throw new Error("[Error] El día " + dia + " no es válido. Debe estar entre 01 y 31.");
    }

    if (mes < 1 || mes > 12) {
        throw new Error("[Error] El mes " + mes + " no es válido. Debe estar entre 01 y 12.");
    }

    if (anio < 1900 || anio > 2999) {
        throw new Error("[Error] El año " + anio + " no es válido. Debe estar entre 1900 y 2999.");
    }

    return match[0];
    
}

export { 
    extraerFechaDeFila,
};