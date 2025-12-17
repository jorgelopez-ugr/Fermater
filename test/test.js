// Tests para el scraper usando Deno.test nativo
// Cada test prueba una parte específica del código

import { 
    extraerFechaDeFila,
} from "../lib/domain/Scraper.js";

import { 
    assertEquals,
    assertStrictEquals,
    assertThrows,
    assert
} from "@std/assert";

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