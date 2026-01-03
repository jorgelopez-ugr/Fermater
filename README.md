# Fermater

## Descripción del problema y conocimientos básicos:

Cada año los dueños y encargados de fincas destinadas a la producción de aceite se encuentran en la tesitura de cuando es un momento óptimo para proceder al cobro de lo recolectado. Cuando se recoge una cantidad de aceituna suficiente la persona designada para ello debe pesar la cosecha en una almazara o molino. Al pesarla se obtiene un recibo certificando la cantidad y la variedad de lo pesado. Se puede pesar aceituna de principalmente 3 variedades (ordenados de mayor a menor calidad).
    - Virgen extra
    - Virgen
    - Lampante

El tipo de aceite lo determina la calidad de la aceituna pesada, siendo el factor determinante, la acidez del mismo. La variedad del aceite depende de la fecha en la que se recoja la aceituna, si es sucia (del suelo) o limpia (de la rama), dependiendo del rendimiento (cuanto jugo se obtiene de cada oliva), etc.

Al final de la campaña, con todos los recibos, tienes una cosecha que te pertenece y puedes elegir cuando quieres proceder al cobro. Tus aceitunas ya se habrán convertido en aceite y puede que tu aun no hayas cobrado ese dinero.


## Ejemplo con cliente:

### Cliente:
Agricultor que no sabe cuando cobrar su aceite.
### Su situación:
Como agricultor es muy importante saber cuando es buen momento para cobrar la cosecha. La ley permite cobrar lo recolectado en un plazo de 5 años desde el pesaje. Los precios, de media, suben los años de sequía y bajan los años de mucha agua. El precio va oscilando cada día y siempre queda la duda de cuando es buen momento para vender intentando maximizar beneficios.

## Planteamiento del proyecto:

Este proyecto se ha planificado para comenzar a trabajar con el usuario más cotidiano. A medida que avancen las HU se escalarán los usuarios (que ya no serán personas sino empresas). Con esto se pretende que las etapas del desarrollo sean guiadas por usuarios cada vez más exigentes.

Puede consultarse un ejemplo de informe de precios en el [pdf de infaoliva](./documentos_extra/www.infaoliva.com.pdf) de los días 25/09/2025 - 02/10/2025.


## Descripción del proyecto en el hito actual:

El proyecto actualmente se encuentra en fase de consolidación. Está pendiente de la aprobación de los revisores y por último de JJ para poder proceder a implementarlo. Este instante corresponde a la **Etapa de desarrollo:** [M0](./docs/M0.md)

## Información relevante:

### Elección del lenguaje
Para el proyecto se ha acordado y decidido escribir el código necesario usando el lenguaje JavaScript, esta decisión se ha tomado debido a su sencillez de sintaxis, muy orientada a lo que estamos acostumbrados a trabajar anteriormente. Además ofrece un amplio abanico de posibilidades con un ecosistema grande y muy trabajado. De igual forma, también presenta muchas facilidades a la hora de utilizar y crear los archivos de configuración del proyecto, así como la integración en la nube. 

## Gestores Utilizados - Objetivo 3:

Por lo mencionado en los archivos de justificación se ha optado por los siguientes gestores:
1. Deno como Runtime.
2. Deno task como gestor de tareas.
3. Deno como gestor de dependencias gracias a su implementación nativa en el runtime.

Justificaciones: 
- [Runtime](./docs/runtime.md)
- [Gestor de Tareas](./docs/gestor_tareas.md)
- [Gestor de dependencias](./docs/gestor_dependencias.md)

## Guía de comandos Deno:
1. Ejecutar JS con deno: deno run [un archivo]
2. Gestor de Tareas: deno task [una tarea definida en deno.json]
3. Comprobar tipos: deno task check
4. Testear: deno test
5. Gestor de dependencias: [imports en el deno.json, luego se importan como nativamente en JS]

```bash
deno task check check
deno task check test
test
```

### Tests:

Pueden consultarse las decisiones sobre las herramientas de test seleccionadas en el siguiente archivo: [docs/tests.md](./docs/tests.md)

# Guía de uso para los Tests

## Ejecutar tests

### Ejecutar todos los tests
```bash
deno test
```

### Filtrar tests por nombre
```bash
# Ejecutar solo tests cuyo nombre contenga "<nombre>"
deno test --filter "<nombre>"
```

### Historias de Usuario:
[HU001](https://github.com/jorgelopez-ugr/Fermater/issues/2#issue-3493083132)
### User journeys:
[UJ001](./docs/UJ001.md)
### Milestones:
[M0](./docs/M0.md)
[M1](./docs/M1.md)
[M2](./docs/M2.md)
### Enlaces a los issues:
- [Issue HU001](https://github.com/jorgelopez-ugr/Fermater/issues/2)
- [Issue HU002](https://github.com/jorgelopez-ugr/Fermater/issues/8)
- [Issue UJ001](https://github.com/jorgelopez-ugr/Fermater/issues/6)
- [Issue M0](https://github.com/jorgelopez-ugr/Fermater/issues/7)
- [Issue M1](https://github.com/jorgelopez-ugr/Fermater/issues/4)

## Configuración: [documentos extra](./documentos_extra/docs-objetivo-0.md)



keep an eye:

criterios:
- velocidad -> tiempo en arrancar el contenedor
- velocidad en correr los tests -> una vez arrancado el contenedor
- tamaño imagen -> una vez creada la base cuanto pesa
- tamaño del contenedor generado -> distintas imagenes base misma instrumentacion deno
- seguridad -> que tan seguro es el entorno generado -> mirar en synk, dockerhub
- las imagenes son para test, deben tener contexto de test e infraestructura de test.
- Para la infraestructura de test:
    - Definir un usuario sin privilegios
    - Tienes que asumir que cuando lanzas el contenedor no va a tener permisos de escritura sobre el directorio que tienes mapeado del local al contenedor.
    - esto se debe a que cuando lo lancemos en GH petará si escribirmos en el directorio que vayamos a montar-> ASUMIR QUE ES SOLO LECTURA
    - dentro del contenedor si puedes escribir
    - proteger el despliegue de contenedores con un nginx

- Gestores de versiones -> decidir de antemano que version del lenguaje es la que se va a usar -> importante a la hora de elegir la imagen base
- imagenes se construyen por capas -> optimizar las capas -> agrupar instrucciones en el dockerfile
- imagenes puede ser:
    - la oficial
    - usar un SO e instalarle deno
    - las extraoficiales pero oficiales en si
    - empresas dedicadas a crear imagenes
    - un menda que sepa mucho y haya hecho una imagen (no recomendable)
- tags para numerar versiones

[denoland](https://hub.docker.com/r/denoland/deno)
[docu deno docker](https://docs.deno.com/runtime/reference/docker/)
[POC docker deno oficial](https://docs.deno.com/examples/deploying_deno_with_docker/)
[articulo interesante](https://geshan.com.np/blog/2024/07/deno-docker/)
[alpine](https://hub.docker.com/_/alpine)
[debian slim]()
