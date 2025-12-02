### RUNTIME:

El Runtime es el entorno donde el código JavaScript se ejecuta. Dicho entorno proporciona todo lo necesario para que el código JavaScript se ejecute y aporte valor.

## Criterio de selección:
- **Herramientas integradas**

Debido a la naturaleza del proyecto, es fundamental que el runtime cuente con herramientas integradas.

En el proyecto cobran mucho valor las herramientas de testing, linting y comprobación de formato de código. Un runtime que integre estas herramientas de forma nativa simplifica el flujo de trabajo, reduce la necesidad de configuraciones adicionales y minimiza las dependencias externas, lo que a su vez mejora la seguridad y el rendimiento del proyecto.

# Las principales opciones son:

- **Node.js**
    - Usa el ecosistema npm que está ampliamente desarrollado.
    - No cuenta con herramientas integradas de calidad para test, lint, etc.
    - Requiere configuración adicional y dependencias externas para cubrir las necesidades del proyecto.

- **Deno** 
    - Herramientas integradas de testing, linting y formateo de código. -> **Herramientas integradas**

- **Bun**
    - Herramientas integradas, pero menos que Deno. -> **Herramientas integradas**


**Elección final es Deno**

Motivación:
- Proporciona un conjunto completo de herramientas integradas que cubren todas las necesidades del proyecto sin necesidad de configuraciones adicionales o dependencias externas.
- Si bien Bun también ofrece herramientas integradas, un rendimiento excesivo no es necesario ni valorado en este proyecto.

