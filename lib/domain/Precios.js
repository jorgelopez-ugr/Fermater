//Importación del enumerado de variedades.
const VARIEDADES = require('./Variedades');

/**
 * Representación del precio actual de cada tipo de aceite.
 */
class Precios{
    /**
     * Diccionario que almacena el precio de las distintas variedades
     * Clave: Variedad - Un valor del enum VARIEDADES
     * Valor: Precio correspondiente
     * @type {Map<string, number>}
     */
    #precios = new Map();
}

module.exports = Precios;