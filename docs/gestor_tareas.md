### GESTOR DE TAREAS:

Un gestor de tareas permite definir, organizar y ejecutar scripts para automatizar tareas comunes del ciclo de vida del desarrollo, como iniciar la aplicación, ejecutar tests, o hacer linting.

## Vamos a valorar los siguientes criterios:
- **Integración nativa con el runtime**

# Las principales opciones son para mi runtime Deno:

- **Deno Task**
    - Totalmente integrado en el runtime de Deno a través del fichero deno.json. No requiere dependencias externas.

- **npm Scripts**
    - Puede integrarse con deno pero no es nativo.
    - Requiere introducción de herramientas no nativas al ecosistema Deno.

**Elección final es Deno Task.**

Motivación:
- Es la herramienta nativa, lo que garantiza una integración perfecta y elimina la necesidad de dependencias externas.

 