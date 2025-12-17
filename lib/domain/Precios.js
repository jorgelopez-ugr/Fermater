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

    // /**
    //  * Convierte el objeto VariedadPrecio a una representación en string legible
    //  * @returns {string}
    //  */
    // toString() {
    //     resultado = "Variedad : Precio";
    //     resultado += `${this.variedad}: ${this.valor} €`;
    //     return resultado;
    // }
}

class FechasPrecios {

    // Almacena los distintos conjuntos Variedad-Precio degún su fecha, la cual actúa como clave.

    // @type {Map<string, VariedadPrecio[]>}
    listaPrecios;

    /**
     * Constructores para la clase FechasPrecios
     */

    constructor() {
        /** @type {Map<string, VariedadPrecio>} */
        this.listaPrecios = new Map();
    }

    // constructor(listaPrecios) {
    //     this.listaPrecios = listaPrecios;
    // }

    // constructor(key, value) {
    //     this.listaPrecios = new Map();
    //     this.listaPrecios.set(key, value);
    // }

    // /**
    //  * Convierte el objeto FechasPrecios a una representación en string legible
    //  * @returns {string}
    //  */
    // toString() {
    //     let resultado = "FechasPrecios:\n";
    //     resultado += `Total de fechas: ${this.listaPrecios.size}\n\n`;
        
    //     for (const [fecha, variedades] of this.listaPrecios) {
    //         resultado += `${fecha}:\n`;
    //         resultado += `Variedades (${variedades.length}):\n`;
    //         variedades.forEach((vp, index) => {
    //             resultado += `${index + 1}. ${vp.toString()}\n`;
    //         });
    //         resultado += '\n';
    //     }

    //     return resultado;
    // }
}

export { FechasPrecios, VariedadPrecio };