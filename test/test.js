// Tests simples para el scraper
// Cada función prueba una parte específica de mi codigo

import { 
    limpiarHTML,
    extraerFechaDeFila,
    extraerVariedadDeColumna,
    extraerPrecioDeColumna,
    parsearPrecio,
    myOwnParser,
    esFilaFecha,
    obtenerColumnasDeFila,
    htmlInputSample
} from "../lib/domain/Scraper.js";

import { 
    assertEquals,
    assertStrictEquals,
    assertThrows,
    assert
} from "@std/assert";

// --- Tests individuales ---

// Tests para limpiarHTML
function testLimpiarHTML_Optimo() {
    const input = "<strong>AOVE - Noviembre</strong>";
    const esperado = "AOVE - Noviembre";
    const resultado = limpiarHTML(input);

    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testLimpiarHTML_Optimo: PASS");
    return true;
}

function testLimpiarHTML_ConEspacios() {
    const input = "  <td><strong>Aceite de oliva virgen</strong></td>  ";
    const esperado = "Aceite de oliva virgen";
    const resultado = limpiarHTML(input);

    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testLimpiarHTML_ConEspacios: PASS");
    return true;
}

function testLimpiarHTML_Ruido() {
    const input = "asd<strdasdong>asjdkh bakj ahs</stdsdrong>asdasd";
    const esperado = "asjdkh bakj ahs";
    const resultado = limpiarHTML(input);

    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testLimpiarHTML_Ruido: PASS");
    return true;
}

function testLimpiarHTML_VacioTotal() {
    const input = "";
    
    assertThrows(
        () => limpiarHTML(input),
        Error,
        "Input no puede estar vacío",
        "debería lanzar error por input vacío"
    );
    console.log("[OK] testLimpiarHTML_VacioTotal: PASS - Error lanzado correctamente");
    return true;
}

function testLimpiarHTML_VacioParcial() {
    const input = "<strong></strong>";
    
    assertThrows(
        () => limpiarHTML(input),
        Error,
        "Input no puede estar vacío",
        "debería lanzar error por contenido vacío después de limpiar"
    );
    console.log("[OK] testLimpiarHTML_VacioParcial: PASS - Error lanzado correctamente");
    return true;
}

function testLimpiaHTML_badType() {
    const input = 2;

    assertThrows(
        () => limpiarHTML(input),
        Error,
        "Input debe ser",
        "debería lanzar error por tipo incorrecto"
    );
    console.log("[OK] testLimpiarHTML_badType: PASS - Error lanzado correctamente");
    return true;
}

// Tests para extraerFechaDeFila
function testExtraerFechaDeFila_Optimo() {
    const input = '<td colspan="3" class="pt-1 pb-1"><strong>04-12-2025</strong></td>';
    const esperado = "04-12-2025";
    const resultado = extraerFechaDeFila(input);
    
    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testExtraerFechaDeFila_Optimo: PASS");
    return true;
}

function testExtraerFechaDeFila_SinFecha() {
    const input = '<td><strong>AOVE - Noviembre</strong></td>';
    
    assertThrows(
        () => extraerFechaDeFila(input),
        Error,
        "no fecha valida",
        "debería lanzar error cuando no hay fecha válida"
    );
    console.log("[OK] testExtraerFechaDeFila_SinFecha: PASS - Error lanzado correctamente");
    return true;
}

function testExtraerFechaDeFila_Ruido() {
    const input = 'asdasd04-12-2025asdsd';
    const esperado = "04-12-2025";
    const resultado = extraerFechaDeFila(input);
    
    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testExtraerFechaDeFila_Ruido: PASS");
    return true;
}

// Tests para extraerVariedadDeColumna
function testExtraerVariedadDeColumna_Optimo() {
    const input = "<strong>AOVE - Diciembre</strong></td>";
    const esperado = "AOVE - Diciembre";
    const resultado = extraerVariedadDeColumna(input);
    
    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testExtraerVariedadDeColumna_Optimo: PASS");
    return true;
}

function testExtraerVariedadDeColumna_ConEspacios() {
    const input = "  <td><strong>  Aceite de oliva lampante  </strong></td>  ";
    const esperado = "Aceite de oliva lampante";
    const resultado = extraerVariedadDeColumna(input);
    
    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testExtraerVariedadDeColumna_ConEspacios: PASS");
    return true;
}

function testExtraerVariedadDeColumna_Ruido() {
    const input = "  <td><strong>jasdjkashd</strong></td>  ";
    
    assertThrows(
        () => extraerVariedadDeColumna(input),
        Error,
        "no es válida",
        "debería lanzar error cuando la variedad no es válida"
    );
    console.log("[OK] testExtraerVariedadDeColumna_Ruido: PASS - Error lanzado correctamente");
    return true;
}

// Tests para extraerPrecioDeColumna
function testExtraerPrecioDeColumna_Optimo() {
    const input = '<strong>4.450 €</strong></td>';
    const esperado = "4.450 €";
    const resultado = extraerPrecioDeColumna(input);
    
    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testExtraerPrecioDeColumna_Optimo: PASS");
    return true;
}

function testExtraerPrecioDeColumna_ConEspacios() {
    const input = '  <td align="right"><strong>  3.750 €  </strong></td>  ';
    const esperado = "3.750 €";
    const resultado = extraerPrecioDeColumna(input);
    
    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testExtraerPrecioDeColumna_ConEspacios: PASS");
    return true;
}

function testExtraerPrecioDeColumna_Ruido() {
    const input = '  <td align="right"><strong>asdasd</strong></td>  ';
    const esperado = "asdasd";
    const resultado = extraerPrecioDeColumna(input);
    
    assertEquals(resultado, esperado, `esperado "${esperado}", obtenido "${resultado}"`);
    console.log("[OK] testExtraerPrecioDeColumna_Ruido: PASS");
    return true;
}

// Tests para parsearPrecio
function testParsearPrecio_Optimo() {
    const input = "4.450 €";
    const esperado = 4.450;
    const resultado = parsearPrecio(input);
    
    assertStrictEquals(resultado, esperado, `esperado ${esperado}, obtenido ${resultado}`);
    console.log("[OK] testParsearPrecio_Optimo: PASS");
    return true;
}

function testParsearPrecio_SinDecimales() {
    const input = "4 €";
    const esperado = 4.0;
    const resultado = parsearPrecio(input);
    
    assertStrictEquals(resultado, esperado, `esperado ${esperado}, obtenido ${resultado}`);
    console.log("[OK] testParsearPrecio_SinDecimales: PASS");
    return true;
}

function testParsearPrecio_badType() {
    const input = "alskdja";
    
    assertThrows(
        () => parsearPrecio(input),
        Error,
        "número válido",
        "debería lanzar error cuando el precio no es válido"
    );
    console.log("[OK] testParsearPrecio_badType: PASS - Error lanzado correctamente");
    return true;
}

function testParsearPrecio_SinSimbolo() {
    const input = "1.111";
    const esperado = 1.111;
    const resultado = parsearPrecio(input);
    
    assertStrictEquals(resultado, esperado, `esperado ${esperado}, obtenido ${resultado}`);
    console.log("[OK] testParsearPrecio_SinSimbolo: PASS");
    return true;
}

function testEsFilaFecha_Optimo() {
    const input = '<tr class="table-secondary"><td colspan="3" class="pt-1 pb-1"><strong>04-12-2025</strong></td></tr>';
    const esperado = true;
    const resultado = esFilaFecha(input);
    
    assertStrictEquals(resultado, esperado, `esperado ${esperado}, obtenido ${resultado}`);
    console.log("[OK] testEsFilaFecha_Optimo: PASS");
    return true;
}

function testEsFilaFecha_Negativo() {
    const input = '<tr><td colspan="3" class="pt-1 pb-1"><strong>04-12-2025</strong></td></tr>';
    const esperado = false;
    const resultado = esFilaFecha(input);
    
    assertStrictEquals(resultado, esperado, `esperado ${esperado}, obtenido ${resultado}`);
    console.log("[OK] testEsFilaFecha_Negativo: PASS");
    return true;
}

function testEsFilaFecha_badType() {
    const input = 5;
    
    assertThrows(
        () => esFilaFecha(input),
        Error,
        "Input debe ser",
        "debería lanzar error por tipo incorrecto"
    );
    console.log("[OK] testEsFilaFecha_badType: PASS - Error lanzado correctamente");
    return true;
}

function testEsFilaFecha_VacioCompleto() {
    const input = '';
    
    assertThrows(
        () => esFilaFecha(input),
        Error,
        "Input no puede estar vacío",
        "debería lanzar error por input vacío"
    );
    console.log("[OK] testEsFilaFecha_VacioCompleto: PASS - Error lanzado correctamente");
    return true;
}

function testEsFilaFecha_VacioParcial() {
    const input = '<tr class="table-ndary"><td colspan="3" class="pt-1 pb-1"><strong>fecha</strong></td></tr>';
    const esperado = false;
    const resultado = esFilaFecha(input);
    
    assertStrictEquals(resultado, esperado, `esperado ${esperado}, obtenido ${resultado}`);
    console.log("[OK] testEsFilaFecha_VacioParcial: PASS");
    return true;
}

function testObtenerColumnasDeFila_Optimo() {
    const input = '<tr><td><strong>AOVE - Noviembre</strong></td><td align="center">Picual</td><td align="right"><strong>4.450 €</strong></td></tr>';
    const esperado = [
        '<strong>AOVE - Noviembre</strong></td>',
        'Picual</td>',
        '<strong>4.450 €</strong></td></tr>'
    ];
    const resultado = obtenerColumnasDeFila(input);
    
    assertEquals(resultado, esperado, `arrays deberían ser iguales`);
    console.log("[OK] testObtenerColumnasDeFila_Optimo: PASS");
    return true;
}

function testObtenerColumnasDeFila_VacioCompleto() {
    const input = '';
    
    assertThrows(
        () => obtenerColumnasDeFila(input),
        Error,
        "Input no puede estar vacío",
        "debería lanzar error por input vacío"
    );
    console.log("[OK] testObtenerColumnasDeFila_VacioCompleto: PASS - Error lanzado correctamente");
    return true;
}

function testObtenerColumnasDeFila_VacioParcial() {
    const input = '<tr></tr>';
    const esperado = [];
    const resultado = obtenerColumnasDeFila(input);
    
    assertEquals(resultado, esperado, `arrays deberían ser iguales`);
    console.log("[OK] testObtenerColumnasDeFila_Optimo: PASS");
    return true;
}

// Tests atómicos para myOwnParser
function testMyOwnParser_EsObjetoValido() {
    const resultado = myOwnParser(htmlInputSample);
    
    assert(resultado && resultado.listaPrecios instanceof Map, "debe ser un objeto FechasPrecios válido");
    console.log("[OK] testMyOwnParser_EsObjetoValido: PASS");
    return true;
}

function testMyOwnParser_TieneUnaFecha() {
    const resultado = myOwnParser(htmlInputSample);
    const esperado = 1;
    const numFechas = resultado.listaPrecios.size;
    
    assertStrictEquals(numFechas, esperado, `esperado ${esperado} fecha, obtenido ${numFechas}`);
    console.log(`[OK] testMyOwnParser_TieneUnaFecha: PASS`);
    return true;
}

function testMyOwnParser_FechaCorrecta() {
    const resultado = myOwnParser(htmlInputSample);
    const fechaEsperada = "04-12-2025";
    
    assert(resultado.listaPrecios.has(fechaEsperada), `debe contener la fecha '${fechaEsperada}'`);
    console.log(`[OK] testMyOwnParser_FechaCorrecta: PASS`);
    return true;
}

function testMyOwnParser_TieneCuatroVariedades() {
    const resultado = myOwnParser(htmlInputSample);
    const fechaEsperada = "04-12-2025";
    const variedades = resultado.listaPrecios.get(fechaEsperada);
    const esperado = 4;
    const numVariedades = variedades ? variedades.length : 0;
    
    assertStrictEquals(numVariedades, esperado, `esperado ${esperado}, obtenido ${numVariedades}`);
    console.log(`[OK] testMyOwnParser_TieneCuatroVariedades: PASS`);
    return true;
}

function testMyOwnParser_NombresVariedadesCorrectos() {
    const resultado = myOwnParser(htmlInputSample);
    const fechaEsperada = "04-12-2025";
    const variedades = resultado.listaPrecios.get(fechaEsperada);
    
    assert(variedades && variedades.length === 4, "debe haber 4 variedades para verificar");
    
    const nombresEsperados = [
        "AOVE - Noviembre",
        "AOVE - Diciembre",
        "Aceite de oliva virgen",
        "Aceite de oliva lampante"
    ];
    
    const nombresObtenidos = variedades.map(v => v.variedad);
    
    assertEquals(nombresObtenidos, nombresEsperados, "los nombres de las variedades deben coincidir");
    console.log("[OK] testMyOwnParser_NombresVariedadesCorrectos: PASS");
    return true;
}

function testMyOwnParser_PreciosCorrectos() {
    const resultado = myOwnParser(htmlInputSample);
    const fechaEsperada = "04-12-2025";
    const variedades = resultado.listaPrecios.get(fechaEsperada);
    
    assert(variedades && variedades.length === 4, "debe haber 4 variedades para verificar");
    
    const preciosEsperados = [4.450, 4.100, 3.750, 3.667];
    const preciosObtenidos = variedades.map(v => v.valor);
    
    assertEquals(preciosObtenidos, preciosEsperados, "los precios deben coincidir");
    console.log("[OK] testMyOwnParser_PreciosCorrectos: PASS");
    return true;
}

// Función unificadora que ejecuta todos los tests de myOwnParser
function testMyOwnParser() {
    console.log("\n-----------------------------------------------------------------------\n");
    console.log("[TEST] myOwnParser - Test definitivo - Representa la interaccion de la HU1\n");
    console.log("-------------------------------------------------------------------------\n");
    
    const tests = [
        testMyOwnParser_EsObjetoValido,
        testMyOwnParser_TieneUnaFecha,
        testMyOwnParser_FechaCorrecta,
        testMyOwnParser_TieneCuatroVariedades,
        testMyOwnParser_NombresVariedadesCorrectos,
        testMyOwnParser_PreciosCorrectos
    ];
    
    let totalTests = 0;
    let testsPassados = 0;
    
    tests.forEach(test => {
        totalTests++;
        if (test()) {
            testsPassados++;
        }
    });
    
    console.log("\n----------------------------------");
    console.log(`Subtests: ${testsPassados}/${totalTests} pasados`);
    
    if (testsPassados === totalTests) {
        console.log("[OK] testMyOwnParser: PASS - Todos los subtests correctos");
        console.log("----------------------------------\n");
        return true;
    } else {
        console.log("[ERROR] testMyOwnParser: FAIL - Algunos subtests fallaron");
        console.log("----------------------------------\n");
        return false;
    }
}

// --- Catálogo de tests disponibles ---
const testsDisponibles = {
    "limpiarHTML_Optimo": testLimpiarHTML_Optimo,
    "limpiarHTML_ConEspacios": testLimpiarHTML_ConEspacios,
    "limpiarHTML_Ruido": testLimpiarHTML_Ruido,
    "limpiarHTML_VacioTotal": testLimpiarHTML_VacioTotal,
    "limpiarHTML_VacioParcial": testLimpiarHTML_VacioParcial,
    "limpiarHTML_badType": testLimpiaHTML_badType,
    "extraerFechaDeFila_Optimo": testExtraerFechaDeFila_Optimo,
    "extraerFechaDeFila_SinFecha": testExtraerFechaDeFila_SinFecha,
    "extraerFechaDeFila_Ruido": testExtraerFechaDeFila_Ruido,
    "extraerFechaDeFila_VacioCompleto": testEsFilaFecha_VacioCompleto,
    "extraerVariedadDeColumna_Optimo": testExtraerVariedadDeColumna_Optimo,
    "extraerVariedadDeColumna_ConEspacios": testExtraerVariedadDeColumna_ConEspacios,
    "extraerVariedadDeColumna_Ruido": testExtraerVariedadDeColumna_Ruido,
    "extraerPrecioDeColumna_Optimo": testExtraerPrecioDeColumna_Optimo,
    "extraerPrecioDeColumna_ConEspacios": testExtraerPrecioDeColumna_ConEspacios,
    "extraerPrecioDeColumna_Ruido": testExtraerPrecioDeColumna_Ruido,
    "parsearPrecio_Optimo": testParsearPrecio_Optimo,
    "parsearPrecio_SinDecimales": testParsearPrecio_SinDecimales,
    "parsearPrecio_SinSimbolo": testParsearPrecio_SinSimbolo,
    "parsearPrecio_badType": testParsearPrecio_badType,
    "esFilaFecha_Optimo": testEsFilaFecha_Optimo,
    "esFilaFecha_Negativo": testEsFilaFecha_Negativo,
    "esFilaFecha_VacioCompleto": testEsFilaFecha_VacioCompleto,
    "esFilaFecha_VacioParcial": testEsFilaFecha_VacioParcial,
    "esFilaFecha_badType": testEsFilaFecha_badType,
    "obtenerColumnasDeFila_Optimo": testObtenerColumnasDeFila_Optimo,
    "obtenerColumnasDeFila_VacioCompleto": testObtenerColumnasDeFila_VacioCompleto,
    "obtenerColumnasDeFila_VacioParcial": testObtenerColumnasDeFila_VacioParcial,
    "myOwnParser": testMyOwnParser,
    "myOwnParser_EsObjetoValido": testMyOwnParser_EsObjetoValido,
    "myOwnParser_TieneUnaFecha": testMyOwnParser_TieneUnaFecha,
    "myOwnParser_FechaCorrecta": testMyOwnParser_FechaCorrecta,
    "myOwnParser_TieneCuatroVariedades": testMyOwnParser_TieneCuatroVariedades,
    "myOwnParser_NombresVariedadesCorrectos": testMyOwnParser_NombresVariedadesCorrectos,
    "myOwnParser_PreciosCorrectos": testMyOwnParser_PreciosCorrectos
};

// --- Ejecutar todos los tests ---
function ejecutarTodosLosTests() {
    console.log("\n=== Ejecutando tests del Scraper ===\n");
    
    let totalTests = 0;
    let testsPassados = 0;
        
    Object.values(testsDisponibles).forEach(test => {
        totalTests++;
        if (test()) {
            testsPassados++;
        }
    });
    
    console.log("\n=== Resumen ===");
    console.log(`Total: ${totalTests} tests`);
    console.log(`Pasados: ${testsPassados}`);
    console.log(`Fallados: ${totalTests - testsPassados}`);
    
    if (testsPassados === totalTests) {
        console.log("\n[OK] Todos los tests pasaron!\n");
    } else {
        console.log("\n[ERROR] Algunos tests fallaron\n");
    }
}

// --- Ejecutar test específico ---
function ejecutarTestEspecifico(nombreTest) {
    if (testsDisponibles[nombreTest]) {
        console.log(`\n=== Ejecutando test: ${nombreTest} ===\n`);
        const resultado = testsDisponibles[nombreTest]();
        console.log("");
        return resultado;
    } else {
        console.log(`\n[ERROR] Test "${nombreTest}" no encontrado.`);
        mostrarTestsDisponibles();
        return false;
    }
}

// --- Mostrar lista de tests disponibles ---
function mostrarTestsDisponibles() {
    console.log("\nTests disponibles:");
    Object.keys(testsDisponibles).forEach((nombre, index) => {
        console.log(`  ${index + 1}. ${nombre}`);
    });
    console.log("\nUso:");
    console.log("  deno run test/test.js              # Ejecuta todos los tests");
    console.log("  deno run test/test.js <nombre>     # Ejecuta un test específico");
    console.log("  deno run test/test.js --list       # Lista todos los tests disponibles");
    console.log("\nEjemplo:");
    console.log("  deno run test/test.js limpiarHTML");
    console.log("\n");
}

// --- Main: Determinar qué ejecutar según argumentos ---
const args = Deno.args;

if (args.length === 0) {
    // Sin argumentos: ejecutar todos los tests
    ejecutarTodosLosTests();
} else if (args[0] === "--list" || args[0] === "-l") {
    // Listar tests disponibles
    mostrarTestsDisponibles();
} else {
    // Ejecutar test específico
    const nombreTest = args[0];
    ejecutarTestEspecifico(nombreTest);
}
