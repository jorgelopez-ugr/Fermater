// Tests para el scraper usando Deno.test nativo
// Cada test prueba una parte específica del código

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

// ============================================
// = Tests para limpiarHTML                   =
// ============================================

Deno.test("limpiarHTML - caso óptimo", () => {
    const input = "<strong>AOVE - Noviembre</strong>";
    const esperado = "AOVE - Noviembre";
    const resultado = limpiarHTML(input);
    assertEquals(resultado, esperado);
});

Deno.test("limpiarHTML - con espacios", () => {
    const input = "  <td><strong>Aceite de oliva virgen</strong></td>  ";
    const esperado = "Aceite de oliva virgen";
    const resultado = limpiarHTML(input);
    assertEquals(resultado, esperado);
});

Deno.test("limpiarHTML - con ruido", () => {
    const input = "asd<strdasdong>asjdkh bakj ahs</stdsdrong>asdasd";
    const esperado = "asjdkh bakj ahs";
    const resultado = limpiarHTML(input);
    assertEquals(resultado, esperado);
});

Deno.test("limpiarHTML - vacío total lanza error", () => {
    const input = "";
    assertThrows(
        () => limpiarHTML(input),
        Error,
        "Input no puede estar vacío"
    );
});

Deno.test("limpiarHTML - vacío parcial lanza error", () => {
    const input = "<strong></strong>";
    assertThrows(
        () => limpiarHTML(input),
        Error,
        "Input no puede estar vacío"
    );
});

Deno.test("limpiarHTML - tipo incorrecto lanza error", () => {
    const input = 2;
    assertThrows(
        () => limpiarHTML(input),
        Error,
        "Input debe ser"
    );
});

// =============================================
// = Tests para extraerFechaDeFila             =
// =============================================

Deno.test("extraerFechaDeFila - caso óptimo", () => {
    const input = '<td colspan="3" class="pt-1 pb-1"><strong>04-12-2025</strong></td>';
    const esperado = "04-12-2025";
    const resultado = extraerFechaDeFila(input);
    assertEquals(resultado, esperado);
});

Deno.test("extraerFechaDeFila - sin fecha lanza error", () => {
    const input = '<td><strong>AOVE - Noviembre</strong></td>';
    assertThrows(
        () => extraerFechaDeFila(input),
        Error,
        "no fecha valida"
    );
});

Deno.test("extraerFechaDeFila - con ruido", () => {
    const input = 'asdasd04-12-2025asdsd';
    const esperado = "04-12-2025";
    const resultado = extraerFechaDeFila(input);
    assertEquals(resultado, esperado);
});

Deno.test("extraerFechaDeFila - vacío completo lanza error", () => {
    const input = '';
    assertThrows(
        () => extraerFechaDeFila(input),
        Error,
        "Input no puede estar vacío"
    );
});

// =============================================
// = Tests para extraerVariedadDeColumna       =
// =============================================

Deno.test("extraerVariedadDeColumna - caso óptimo", () => {
    const input = "<strong>AOVE - Diciembre</strong></td>";
    const esperado = "AOVE - Diciembre";
    const resultado = extraerVariedadDeColumna(input);
    assertEquals(resultado, esperado);
});

Deno.test("extraerVariedadDeColumna - con espacios", () => {
    const input = "  <td><strong>  Aceite de oliva lampante  </strong></td>  ";
    const esperado = "Aceite de oliva lampante";
    const resultado = extraerVariedadDeColumna(input);
    assertEquals(resultado, esperado);
});

Deno.test("extraerVariedadDeColumna - variedad inválida lanza error", () => {
    const input = "  <td><strong>jasdjkashd</strong></td>  ";
    assertThrows(
        () => extraerVariedadDeColumna(input),
        Error,
        "no es válida"
    );
});

// ==============================================
// = Tests para extraerPrecioDeColumna          =
// ==============================================

Deno.test("extraerPrecioDeColumna - caso óptimo", () => {
    const input = '<strong>4.450 €</strong></td>';
    const esperado = "4.450 €";
    const resultado = extraerPrecioDeColumna(input);
    assertEquals(resultado, esperado);
});

Deno.test("extraerPrecioDeColumna - con espacios", () => {
    const input = '  <td align="right"><strong>  3.750 €  </strong></td>  ';
    const esperado = "3.750 €";
    const resultado = extraerPrecioDeColumna(input);
    assertEquals(resultado, esperado);
});

Deno.test("extraerPrecioDeColumna - con ruido", () => {
    const input = '  <td align="right"><strong>asdasd</strong></td>  ';
    const esperado = "asdasd";
    const resultado = extraerPrecioDeColumna(input);
    assertEquals(resultado, esperado);
});

Deno.test("extraerPrecioDeColumna - vacío completo lanza error", () => {
    const input = '';
    assertThrows(
        () => extraerPrecioDeColumna(input),
        Error,
        "Input no puede estar vacío"
    );
});

// ===============================================
// = Tests para parsearPrecio                    =
// ===============================================

Deno.test("parsearPrecio - caso óptimo", () => {
    const input = "4.450 €";
    const esperado = 4.450;
    const resultado = parsearPrecio(input);
    assertStrictEquals(resultado, esperado);
});

Deno.test("parsearPrecio - sin decimales", () => {
    const input = "4 €";
    const esperado = 4.0;
    const resultado = parsearPrecio(input);
    assertStrictEquals(resultado, esperado);
});

Deno.test("parsearPrecio - tipo inválido lanza error", () => {
    const input = "alskdja";
    assertThrows(
        () => parsearPrecio(input),
        Error,
        "número válido"
    );
});

Deno.test("parsearPrecio - sin símbolo euro", () => {
    const input = "1.111";
    const esperado = 1.111;
    const resultado = parsearPrecio(input);
    assertStrictEquals(resultado, esperado);
});

// ===============================================
// = Tests para esFilaFecha                      =
// ===============================================

Deno.test("esFilaFecha - caso óptimo", () => {
    const input = '<tr class="table-secondary"><td colspan="3" class="pt-1 pb-1"><strong>04-12-2025</strong></td></tr>';
    const esperado = true;
    const resultado = esFilaFecha(input);
    assertStrictEquals(resultado, esperado);
});

Deno.test("esFilaFecha - negativo", () => {
    const input = '<tr><td colspan="3" class="pt-1 pb-1"><strong>04-12-2025</strong></td></tr>';
    const esperado = false;
    const resultado = esFilaFecha(input);
    assertStrictEquals(resultado, esperado);
});

Deno.test("esFilaFecha - tipo incorrecto lanza error", () => {
    const input = 5;
    assertThrows(
        () => esFilaFecha(input),
        Error,
        "Input debe ser"
    );
});

Deno.test("esFilaFecha - vacío completo lanza error", () => {
    const input = '';
    assertThrows(
        () => esFilaFecha(input),
        Error,
        "Input no puede estar vacío"
    );
});

Deno.test("esFilaFecha - vacío parcial", () => {
    const input = '<tr class="table-ndary"><td colspan="3" class="pt-1 pb-1"><strong>fecha</strong></td></tr>';
    const esperado = false;
    const resultado = esFilaFecha(input);
    assertStrictEquals(resultado, esperado);
});

// ================================================
// = Tests para obtenerColumnasDeFila             =
// ================================================

Deno.test("obtenerColumnasDeFila - caso óptimo", () => {
    const input = '<tr><td><strong>AOVE - Noviembre</strong></td><td align="center">Picual</td><td align="right"><strong>4.450 €</strong></td></tr>';
    const esperado = [
        '<strong>AOVE - Noviembre</strong></td>',
        'Picual</td>',
        '<strong>4.450 €</strong></td></tr>'
    ];
    const resultado = obtenerColumnasDeFila(input);
    assertEquals(resultado, esperado);
});

Deno.test("obtenerColumnasDeFila - vacío completo lanza error", () => {
    const input = '';
    assertThrows(
        () => obtenerColumnasDeFila(input),
        Error,
        "Input no puede estar vacío"
    );
});

Deno.test("obtenerColumnasDeFila - vacío parcial", () => {
    const input = '<tr></tr>';
    const esperado = [];
    const resultado = obtenerColumnasDeFila(input);
    assertEquals(resultado, esperado);
});