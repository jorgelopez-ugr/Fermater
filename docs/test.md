### Ecosistema para tests:

Para el desarrollo del objetivo se precisa decidir las sigueintes herramientas de test:

1. **Aserciones**
2. **Test runner**
3. **Herramientas de CLI**

El criterio elegido es la **integración nativa con el runtime seleccionado** que en este caso es Deno. Un framework de tests que se integre de forma nativa con el runtime elegido minimizará la necesidad de configuraciones adicionales y, más importante, de instalar paquetes extra por todo lo que ello conlleva.

Si se usa un ecosistema de muchos elementos mal integrados entre ellos al final terminan acumulandose archivos de configuración, dependencias externas y posibles conflictos entre versiones de paquetes. Además los paquetes pueden quedar desactualizados o que se detecten vulnerabilidades en ellos. Todo ello puede derivar en problemas de mantenimiento, seguridad y rendimiento del proyecto.

Por ello el criterio de selección es claro: **integración nativa con Deno**.
Eso podemos dividirlo en 2 partes:
    1. **Que no requieran archivos de configuración adicionales**.
    2. **Prioridad a Paquetes reconocidos y auditados por el equipo de deno**

## Análisis de opciones:

# 1. Biblioteca de aserciones:

- **Chai**
    [link](https://www.chaijs.com/)
    - Assertion Styles de Chai: [link](https://www.chaijs.com/guide/styles/)
    - Necesitas extensiones e instalar paquetes nuevos con npm para poder usar la API assert. Definitivamente no es una integración nativa con Deno.

- **Paquete @std/assert de jsr auditado por deno**
    - Para esta no es necesario añadir nada extra. Viene integrada de forma nativa con Deno.
    - No necesita más paquetes ni configuraciones adicionales.
    - Sin duda alguna la mejor opción para este proyecto en base a la integración nativa con Deno.

**Elección final es Deno Assertions.**

- La biblioteca que usaremos es `std/assert` 
- Link a la documentación oficial de la biblioteca: [link](https://docs.deno.com/runtime/reference/std/assert/)

# 2. Framework de tests:

- **Jest**
    [link](https://jestjs.io/)
    [Status Sink Advisor Jest](https://snyk.io/advisor/npm-package/jest)
    - Necesita de archivo de configuración extra para configuraciones personalizadas: [link](https://jestjs.io/docs/getting-started#additional-configuration)
    - Necesita configuraciones extra también si lo usamos con babel: [link](https://jestjs.io/docs/getting-started#using-babel)  
    - En general nos va a requerir descargar paquetes adicionales y archivos de condiguración custom si realmente queremos sacarle partido. No es una integración nativa con Deno.
- **Vitest**
    [link](https://vitest.dev/)
    [Status Sink Advisor Vitest](https://snyk.io/advisor/npm-package/vitest)
    - Necesita archivo de configuración extra: [link](https://vitest.dev/config/).
    - Necesita descargar paquetes adicionales para su instalación y uso.
    - No es una integración nativa con Deno.

- **Deno Test**
    [link](https://docs.deno.com/runtime/fundamentals/testing/)
    - Viene integrado de forma nativa con Deno.
    - No necesita paquetes adicionales ni configuraciones extra.
    - Permite ejecutar pruebas directamente desde la línea de comandos sin necesidad de herramientas externas (CLI nativa).

**Elección final es Deno Test.**

# 3. Herramientas de CLI:

Por lo mencionado en el guión, la opción más lógica es usar las herramientas de CLI nativas de Deno.
- **Deno CLI**
    [link](https://docs.deno.com/runtime/reference/cli/test/)
    [CLI Reference Guide](https://docs.deno.com/runtime/reference/cli/)
    - Integración total y transparente con el runtime elegido.