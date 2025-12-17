
import { VariedadPrecio, FechasPrecios } from "./Precios.js";
import { errorInvalidType, missingValue, errorParsing } from "./Error.js";

// --- Lógica del Parser ---

const htmlInputSample = `
<html>
<body>
<table>
<tr class="table-secondary">
  <td colspan="3" class="pt-1 pb-1"><strong>04-12-2025</strong></td>
</tr>
<tr>
  <td><strong>AOVE - Noviembre</strong></td>
  <td align="center">Picual</td>
  <td align="right"><strong>4.450 €</strong></td>
</tr>
<tr>
  <td><strong>AOVE - Diciembre</strong></td>
  <td align="center">Picual</td>
  <td align="right"><strong>4.100 €</strong></td>
</tr>
<tr>
  <td><strong>Aceite de oliva virgen</strong></td>
  <td align="center">Picual</td>
  <td align="right"><strong>3.750 €</strong></td>
</tr>
<tr>
  <td><strong>Aceite de oliva lampante</strong></td>
  <td align="center">Picual</td>
  <td align="right"><strong>3.667 €</strong></td>
</tr>
</table>
</body>
</html>
`;


/**
 * 
 * @param {string} rawString 
 * @returns {string}
 */
function limpiarHTML(rawString) {
    if (typeof rawString !== 'string') {
        throw errorInvalidType("Input debe ser una cadena de texto");
    }
    
    if (rawString.trim() === '') {
        throw missingValue("Input no puede estar vacío");
    }
    
    // Caso problematico: asd<strdasdong>asjdkh bakj ahs</stdsdrong>asd
    // Limpiamos todo lo que haya antes y despues de las etiquetas html
    rawString = rawString.substring(rawString.indexOf('<'), rawString.lastIndexOf('>') + 1);
    // Limpiamos las propias etiquetas HTML
    rawString = rawString.replace(/<[^>]*>/g, '').trim();
    // Eliminamos posibles espacios en blanco que hayan podido quedar al principio o final
    rawString = rawString.trim();
    
    // Validación adicional: si después de limpiar queda vacío, lanzar error
    if (rawString === '') {
        throw missingValue("Input no puede estar vacío");
    }

    return rawString;
}

function extraerFechaDeFila(fila) {

    if (typeof fila !== 'string') {
        throw errorInvalidType("Input debe ser una cadena de texto");
    }
    
    if (fila.trim() === '') {
        throw missingValue("Input no puede estar vacío");
    }

    // Es el formato de la fecha: XX-XX-XXXX
    const regexFecha = /(\d{2}-\d{2}-\d{4})/;
    // Buscamos la coincidencia de la subcadena con ese formato en la fila
    const match = fila.match(regexFecha);
    
    if (match && match[1]) {
        // Si la ha encontrado que la devuelva
        return match[1]; 
    }
    
    throw errorParsing("Formato no correcto o no fecha valida en toda la fila");
}

function extraerVariedadDeColumna(columna) {
    
    if (typeof columna !== 'string') {
        throw errorInvalidType("Input debe ser una cadena de texto");
    }
    
    if (columna.trim() === '') {
        throw missingValue("Input no puede estar vacío");
    }
    
    const rawVariedad = columna; 
    const cleanVariedad = limpiarHTML(rawVariedad);
    
    // Variedades válidas según el typedef de Precios.js
    const variedadesValidas = [
        'Aceite de oliva lampante',
        'Aceite de oliva virgen',
        'AOVE - Noviembre',
        'AOVE - Diciembre'
    ];
    
    // Validar que la variedad extraída sea una de las válidas
    if (!variedadesValidas.includes(cleanVariedad)) {
        throw errorInvalidType(`La variedad "${cleanVariedad}" no es válida. Debe ser una de: ${variedadesValidas.join(', ')}`);
    }

    return cleanVariedad;
}

function extraerPrecioDeColumna(columna) {
    if (typeof columna !== 'string') {
        throw errorInvalidType("Input debe ser una cadena de texto");
    }
    
    if (columna.trim() === '') {
        throw missingValue("Input no puede estar vacío");
    }
    
    const rawPrecio = columna; 
    const precioTexto = limpiarHTML(rawPrecio); // "3.667 €"
    return precioTexto;
}

function parsearPrecio(precioTexto) {
    
    if (typeof precioTexto !== 'string') {
        throw errorInvalidType("Input debe ser una cadena de texto");
    }
    
    if (precioTexto.trim() === '') {
        throw missingValue("Input no puede estar vacío");
    }
    
    let precioString = precioTexto.replace('€', '').trim();
    const numeric = parseFloat(precioString);

    if (isNaN(numeric) || numeric <= 0) {
        throw errorParsing(`El precio "${precioTexto}" no es un número válido mayor que 0.`);
    }

    return numeric;
}

function esFilaFecha(fila) {

    if (typeof fila !== 'string') {
        throw errorInvalidType("Input debe ser una cadena de texto");
    }
    
    if (fila.trim() === '') {
        throw missingValue("Input no puede estar vacío");
    }

    if (fila.includes('class="table-secondary"')) {
        return true;
    }
    return false;
}

function obtenerColumnasDeFila(fila) {

    if (typeof fila !== 'string') {
        throw errorInvalidType("Input debe ser una cadena de texto");
    }
    
    if (fila.trim() === '') {
        throw missingValue("Input no puede estar vacío");
    }

    const columnas = fila.split(/<td[^>]*>/).slice(1); // Ignorar la primera parte antes del primer <td>
    return columnas;
}

// Exportar funciones para testing
export { 
    limpiarHTML, 
    extraerFechaDeFila,
    extraerVariedadDeColumna, 
    extraerPrecioDeColumna,
    parsearPrecio,
    esFilaFecha,
    obtenerColumnasDeFila,
    htmlInputSample
};