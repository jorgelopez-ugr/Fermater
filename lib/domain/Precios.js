/**
 * @typedef {'Aceite de oliva lampante' | 'Aceite de oliva virgen' | 'AOVE - Noviembre' | 'AOVE - Diciembre'} Variedad
 */

const FechasGuardadas = new Set();
const ERROR_FECHA_DUPLICADA = "Esa fecha ya está registrada";

class Precios {
    /**
     * Diccionario que almacena el precio de las distintas variedades
     * Clave: Variedad - De tipo de dato Variedad, si no incluye una de esas opciones será incorrecto.
     * Valor: Precio correspondiente(Si es nulo, no hay precio registrado o se ha establecido como "Sin cierre de operaciones")
     * @type {Map<Variedad, number>}
     */
    precios = new Map();

    /** @type {string} Actúa como identificador de la clase*/
    fecha = "";
}

module.exports = Precios;