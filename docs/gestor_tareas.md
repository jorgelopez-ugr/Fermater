### GESTOR DE TAREAS:

Un gestor de tareas permite definir, organizar y ejecutar scripts para automatizar tareas comunes del ciclo de vida del desarrollo, como iniciar la aplicación, ejecutar tests, o hacer linting.

## Vamos a valorar los siguientes criterios:
- **Integración nativa con el runtime**

Por la naturaleza del proyecto y la elección del gestor de tareas, es crucial que el gestor de tareas se integre de forma nativa con dicho entorno. Esto minimiza la necesidad de configuraciones adicionales y reduce las dependencias externas, lo que a su vez mejora la seguridad y el rendimiento del proyecto.

# Las principales opciones son para mi runtime Deno:

- **Deno Task**
    - Totalmente integrado en el runtime de Deno a través del fichero deno.json. No requiere dependencias externas.

- **npm Scripts**
    - Deno permite ejecutar scripts de npm y trabajar con package.json, pero no es una integración nativa.

**Elección final es Deno Task.**

Motivación:
- Es la herramienta nativa, lo que garantiza una integración perfecta y elimina la necesidad de dependencias externas.

 