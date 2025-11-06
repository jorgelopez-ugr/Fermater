//Importación del enumerado de variedades.
const VARIEDADES = require('./Variedades');


/**
 * Representación del precio actual de cada tipo de aceite.
 */
class Precio{
    /**
     * Crea una nueva instancia Precio.
     * @param {number} importe : Indica el importe al que se vende el aceite a día de hoy.
     * @param {number} variedad : Indica la variedad a la que se le asocia el precio.
     */
    constructor(importe, variedad){
        
        //Comprueba si la variedad es válida dentro de las definidas.
        if (!Object.values(VARIEDADES).includes(variedad)) {
            throw new Error("Variedad no valida");
        }

        this.importe = importe;
        this.variedad = variedad;
    }
}

module.exports = Precio;