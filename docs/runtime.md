### RUNTIME:

El Runtime es el entorno donde el código JavaScript se ejecuta. Dicho entorno proporciona todo lo necesario para que el código JavaScript se ejecute y aporte valor.

## Vamos a valorar los siguientes criterios:
- **Rendimiento**
- **Herramientas integradas**
- **Seguridad**:
- **Compatibilidad con estándares**
- **Facilidad de despliegue**
- **Madurez del proyecto**

# Las principales opciones son:

- **Node.js**
    - Pros: 
        - Usa el ecosistema npm que está ampliamente desarrollado. -> **Madurez del proyecto**
        - Muy compatible con los estándares -> **Compatibilidad con estándares**
    - Contras: 
        - Es un estándar antiguo y como tal cuenta con poca seguridad. -> **Seguridad**
        - No está actualizado a estándares actuales y su rendimiento, pese a ser bueno, deja mucho que desear. -> **Rendimiento**
        - Falta de integración automática con herramientas. -> **Herramientas integradas**

- Deno
    - Pros: 
        - Soluciona los problemas de seguridad de node. -> **Seguridad**
        - Cuenta con herramientas integradas de mucha calidad para test,lint,etc. Este aspecto lo convierte en extremadamente favorable frente a node para este proyecto. -> **Herramientas integradas**
        - También cuenta con compatibilidad con npm. -> **Compatibilidad con estándares**
        - Cuenta con despliegue sencillo -> comando Deno Deploy. -> **Facilidad de despliegue**
        - Proyecto consolidado -> **Madurez del proyecto**
        - Supera con creces el rendimiento de Node.js -> **Rendimiento**
    - Contras: 
        - No es el más rápido de los 3 -> **Rendimiento**

- Bun
    - Pros: 
        - Rendimiento extremadamente alto -> **Rendimiento**
        - Runtime y test runner integrados -> **Herramientas integradas**
        - Compatible con npm. -> **Compatibilidad con estándares**
    - Contras: 
        - Proyecto muy nuevo y poco consolidado aun. -> **Madurez del proyecto**


**Elección final es Deno por ser el más balanceado.**

Motivación:
- Implementa seguridad por defecto a diferencia de Node.js (Deno nace como solución a los problemas implícitos de node.js) 
- Está perfectamente consolidado y alineado con los estándares Web.
- Su tooling nativo es muy potente y cumple con lo que necesita este proyecto.
- Es compatible con el ecosistema de npm.

