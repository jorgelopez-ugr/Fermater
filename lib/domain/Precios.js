/**
 * @typedef {'Aceite de oliva lampante' | 'Aceite de oliva virgen' | 'AOVE - Noviembre' | 'AOVE - Diciembre'} Variedad
 */

class VariedadPrecio {
    Error_PrecioNulo = new Error ("El precio no puede ser nulo o 0")

    /**
     * @param {Variedad} variedad // De tipo de dato Variedad, solo puede corresponderse con una de las 4 existentes
     * @param {number} valor // El precio en euros
     */
    constructor(variedad, valor) {
        this.variedad = variedad;
        this.valor = valor;
        Object.freeze(this);
    }
}


class FechaPrecios {
    /**
     * @param {string} fecha - El identificador de la clase
     */
    constructor() {

        // Almacena los distintos conjuntos Variedad-Precio degún su fecha, la cual actúa como clave.
        /** @type {Map<string, VariedadPrecio>} */
        this.listaPrecios = new Map();
    }
}

module.exports = { FechaPrecios, VariedadPrecio};