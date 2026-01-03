### Elección de la imagen base para los contenedores:

Por lo comentado en clase se han decidido tomar los siguientes criterios para seleccionar la imagen base. Sobre esta imagen se construirá mi Dockerfile custom y posterior imagen custom para el contenedor de testing en docker propio del objetivo 5.

1. Tamaño de la imagen base:
    - Se va a valorar que la imagen base pese lo menos posible de cara a que la imagen final sea lo más ligera posible.
2. Tamaño del contenedor generado:
    - Una cosa es la imagen base y otra cosa es la imagen con la intrumentación mínima que le permita correr test. De esta forma imágenes más ligeras podrían requerir más instalaciones secundarias para correr Deno y en úlitima instancia los tests. De esta forma la imagen decidida como más ligera puede no ser la que genere el contenedor más ligero. Deberá comprobarse esto.
3. Velocidad de arranque del contenedor:
    - Se medirá el tiempo que tarda en arrancar un contenedor a partir de la imagen base para valorar objetivamente el desempeño de la imagen.
4. Velocidad en correr los tests:
    - Se medirá el tiempo que tarda el contenedor en correr los test una vez esta ya arrancado. Contenedores más ligeros puede tener peor performance en este sentido.
5. Seguridad:
    - Se usará Synk para analizar reportes de vulnerabilidades de las imagenes base y valorar su seguridad.

Dichos criterios sedan medidos numéricamente a fin de obtener una comparativa objetiva entre las diferentes imagenes base. Se busca quedarse con aquella que ofrezca la más óptima combinación de los distintos criterios.

Dado que deno ya tiene denoland que es la imagen oficial distribuida y auditada por los desarrolladores de deno vamos a tomar esta como referencia para comparar contra ella el resto de imagenes construidas. Dicho de otra forma, el rendimiento que obtenga denoland va a ser siempre 1 en puntuación de nuestro benchmark. El resto de casos se compararán contra este valor obteniendo porcentajes y puntuación relativa referente a denoland.

Referencias a denoland:
- [Dockerhub](https://hub.docker.com/r/denoland/deno)
- [Docu oficial de deno](https://docs.deno.com/runtime/reference/docker/)

## Imagenes base sometidas al benchmark:

1. denoland/deno:latest
2. denoland/deno:alpine
3. denoland/deno:ubuntu
4. alpine:latest + instalación manual de deno
5. debian:slim + instalación manual de deno
6. ubuntu:minimal + instalación manual de deno

## Fases de benchmarking:


