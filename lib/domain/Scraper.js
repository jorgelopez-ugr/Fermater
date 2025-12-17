
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

// Exportar funciones para testing
export { 
    extraerFechaDeFila,
    htmlInputSample
};