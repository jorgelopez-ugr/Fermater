### GESTOR DE TAREAS:

Un gestor de tareas permite definir, organizar y ejecutar scripts para automatizar tareas comunes del ciclo de vida del desarrollo, como iniciar la aplicación, ejecutar tests, o hacer linting.

## Vamos a valorar los siguientes criterios:
- **Integración con el runtime**
- **Rendimiento**

# Las principales opciones son:

- **Deno Task**
    - Pros: 
        - Totalmente integrado en el runtime de Deno a través del fichero deno.json. No requiere dependencias externas. -> **Integración con el runtime**
        - Inicio de tareas muy rápido, sin la sobrecarga de un gestor de paquetes. -> **Rendimiento**
    - Contras: 
        - Para flujos de trabajo extremadamente complejos, puede ser menos potente que herramientas especializadas como Make.

- **npm Scripts**
    - Pros: 
        - Puede integrarse con deno -> **Integración con el runtime**
    - Contras: 
        - Requiere un fichero package.json y la instalación de Node.js/npm, introduciendo herramientas no nativas al ecosistema Deno. -> **Integración con el runtime**
        - Puede ser más lento al tener que pasar por el gestor de paquetes npm. -> **Rendimiento**

**Elección final es Deno Task.**

Motivación:
- Es la herramienta nativa, lo que garantiza una integración perfecta y elimina la necesidad de dependencias externas.
- El rendimiento es óptimo al no tener intermediarios.


 