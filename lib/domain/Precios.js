/**
 * Diccionario que almacena el precio de las distintas variedades
 * Clave: Variedad - Cuatro claves fijas, no se deberá modificar, elimiar o añadir ninguna más.
 * Valor: Precio correspondiente(Si es nulo, no hay precio registrado o se ha establecido como "Sin cierre de operaciones")
 * @type {Map<string, number>}
 */
const precios = new Map([
    ["Aceite de oliva lampante", null],
    ["Aceite de oliva virgen", null],
    ["AOVE - Noviembre", null],
    ["AOVE - Diciembre", null]
]);

module.exports = precios;