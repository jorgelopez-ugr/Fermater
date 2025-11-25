/**
 * @typedef {'Aceite de oliva lampante' | 'Aceite de oliva virgen' | 'AOVE - Noviembre' | 'AOVE - Diciembre'} Variedad
 */

/**
 * Diccionario que almacena el precio de las distintas variedades
 * Clave: Variedad - Clave que debe ser de tipo Variedad obligatoriamente.
 * Valor: Precio correspondiente (Si es nulo, no hay precio registrado o se ha establecido como "Sin cierre de operaciones")
 * @type {Map<Variedad, number>}
 */
const precios = new Map();

module.exports = precios;