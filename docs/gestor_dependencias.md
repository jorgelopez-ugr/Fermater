### GESTOR DE DEPENDENCIAS:

Un gestor de dependencias define cómo se manejan las librerías de terceros que usa el proyecto.

## Vamos a valorar los siguientes criterios:
- **Rendimiento**
- **Compatibilidad con el runtime**
- **Herramientas integradas**

# Las principales opciones son:

**Deno**
    - Pros:
        - Más rápido y eficiente en memoria al evitar el uso del clásico node_modules de npm.
        - Integración total con el runtime elegido.
        - Incluye herramientas nativas eliminando la necesidad de configuraciones externas.

    - Contras:
        - Ecosistema más limitado en comparación con npm.

**npm**
    - Pros:
        - Ecosistema inmenso y probado, con una amplia variedad de paquetes disponibles.

    - Contras:
        - Instalaciones más pesadas y lentas debido al uso de node_modules y diversas dependencias.

**Elección final es el gestor nativo de Deno.**

Motivación:
- Flujo de trabajo ligero y eficiente mejorando mucho el rendimiento.
- Compatibilidad con el runtime total.
- Herramientas nativas integradas y modernas.

