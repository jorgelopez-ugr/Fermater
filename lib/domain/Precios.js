/**
 * @typedef {'Aceite de oliva lampante' | 'Aceite de oliva virgen' | 'AOVE - Noviembre' | 'AOVE - Diciembre'} Variedad
 */

/**
 * OBJETO VALOR
 * No tiene identidad
 */
class VariedadPrecio {
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

/**
 * ENTIDAD
 * La identidad es fecha
 */
class FechaPrecios {
    /**
     * @param {string} fecha - El identificador de la clase
     */
    constructor(fecha) {
        // Identidad
        this.id = fecha; 

        // ATRIBUTOS (Estado)
        // Esta Entidad gestiona una lista de Variedades con su precio correspondiente
        /** @type {Set<VariedadPrecio>} */
        this.listaPrecios = new Set();
    }
}

module.exports = { FechaPrecios, VariedadPrecio};