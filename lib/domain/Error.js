// Archivo para contemplar los errores que van a devolverse en la terminal
// en forma de funciones auxiliares para el Scraper.js

function errorParsing(message) {
    throw new Error(`Formato incorrecto en: ${message}`);
}

function errorInvalidType(message) {
    throw new Error(`Tipo erroneo: ${message}`);
}

function missingValue(message) {
    throw new Error(`Error, valor faltante: ${message}`);
}

export { errorParsing, errorInvalidType, missingValue };