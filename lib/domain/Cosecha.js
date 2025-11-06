//Importación del enumerado de variedades.
const VARIEDADES = require('./Variedades');

/**
 * Representación de la cosecha anual.
 */
class Cosecha{

    /**
     * Crea una nueva instancia Cosecha.
     * @param {number} anio : Indica el año en el que se recogió la cosecha.
     * @param {number} peso : Indica el peso total en kg de la cosecha recogida.
     * @param {string} variedad : Indica el tipo de aceite de la cosecha.
     * @throws {Error} Si la variedad no es válida.
     */
    constructor(anio, peso, variedad){

        //Comprueba si la variedad es válida dentro de las definidas.
        if (!Object.values(VARIEDADES).includes(variedad)) {
            throw new Error("Variedad no valida");
        }

        this.anio = anio;
        this.peso = peso;
        this.variedad = variedad;
    }
}

module.exports = Cosecha;