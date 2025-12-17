### Ecosistema para tests:

Para el desarrollo del objetivo se precisa decidir las sigueintes herramientas de tests:

1. **Aserciones:** Son funciones que comparan la salida obtenida con la deseada, añadiendo un mensaje personalizado si la comparación es positiva. Las aserciones son simplemente funciones que validan condiciones específicas dentro de los tests.

2. **Test runner:** Agrupa las aserciones en subtest. Ayudan a organizar y estructurar los tests, facilitando su ejecución y haciendo los resultados mas descriptivos.

3. **Herramientas de CLI:** Facilitan la ejecución, depuración y reporte de resultados permitiendo trabajarlos desde linea de comandos. Por lo mencionado en el guión no habrá que establecer un criterio para elegirlo, porque la mejor práctica es usar la herramienta nativa de Deno. Se describirá más adelante.

El criterio elegido es la **integración nativa con el runtime seleccionado** que en este caso es Deno. Un framework de tests que se integre de forma nativa con el runtime elegido minimizará la necesidad de configuraciones adicionales.

## Análisis de opciones:

# 1. Biblioteca de aserciones:
- **Deno Assertions**
    [link](https://docs.deno.com/runtime/reference/std/assert/)
    - Integración total con el runtime Deno. 
- **Jest**
    [link](https://jestjs.io/)  
    - La integración con Deno no es nativa y requiere configuraciones adicionales.
- **Vitest**
    [link](https://vitest.dev/)
    - La integración con Deno no es nativa y requiere configuraciones adicionales.

**Elección final es Deno Assertions.**

# 2. Framework de tests:
- **Deno Test**
    [link](https://docs.deno.com/runtime/fundamentals/testing/)
    - Integración total con el runtime elegido.
- **Jest**
    [link](https://jestjs.io/)  
    - La integración con Deno no es nativa y requiere configuraciones adicionales.
- **Vitest**
    [link](https://vitest.dev/)
    - La integración con Deno no es nativa y requiere configuraciones adicionales.

**Elección final es Deno Test.**

# 3. Herramientas de CLI:

Por lo mencionado en el guión, la opción más lógica es usar las herramientas de CLI nativas de Deno.
- **Deno CLI**
    [link](https://docs.deno.com/runtime/reference/cli/test/)
    - Integración total con el runtime elegido.