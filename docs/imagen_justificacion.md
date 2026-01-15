### Elección de la imagen base para los contenedores:

Por lo comentado en clase se han decidido tomar los siguientes criterios para seleccionar la imagen base. Sobre esta imagen se construirá mi Dockerfile custom y posterior imagen custom para el contenedor de testing en docker propio del objetivo 5.

1. Seguridad:
    - Se usará Snyk para analizar reportes de vulnerabilidades de las imagenes base y valorar su seguridad.
    - No se seguirán probando imágenes que presenten vulnerabilidades high severity.
    - Se priorizarán imágenes sin vulnerabilidades conocidas.
2. Tamaño del contenedor generado:
    - Una cosa es la imagen base y otra cosa es la imagen con la intrumentación mínima que le permita correr test. De esta forma imágenes más ligeras podrían requerir más instalaciones secundarias para correr Deno y en úlitima instancia los tests.
    - Se medirá el tamaño de la imagen con capacidad de correr los test para ser comparado con el resto.
3. Velocidad en correr los tests:
    - Se medirá el tiempo que tarda el contenedor en correr los test. Contenedores más ligeros puede tener peor desempeño en este sentido.

Dichos criterios sedan medidos numéricamente a fin de obtener una comparativa objetiva entre las diferentes imagenes base. Se busca quedarse con aquella que ofrezca la más óptima combinación de los distintos criterios.

## Imagenes base sometidas al benchmark:

Dado que deno ya tiene denoland que es la imagen oficial distribuida y auditada por los desarrolladores de deno vamos a tomar esta como referencia para comparar contra ella el resto de imagenes construidas. 

Referencias a denoland:
- [Dockerhub](https://hub.docker.com/r/denoland/deno)
- [Docu oficial de deno](https://docs.deno.com/runtime/reference/docker/)

Denoland ofrece varias versiones de su imagen oficial. La default esta construida sobre debian slim. Compararemos también las versiones sobre alpine y ubuntu para ver si ofrecen mejor rendimiento en base a los criterios de nuestra decisión.

Por otra parte se proponen otros 2 casos. Constan de un sistema operativo base sobre el que instalaremos manualmente como una capa del Doclerfile la última version de deno. Probaremos debian slim y almalinux minimal como bases para las instalaciones manuales. De esta forma comprobamos si partir de una imagen mas ligera puede ser mejor opción.

No se contemplan imágenes no mínimas por ser de gran importancia el peso de la imagen final y del contenedor. Se pretende usar la última versión y más recientemente actualizada de cada imagen base para mejorar la seguridad. No se contemplan imágenes desactualizadas (lo tomaremos como aquellas que lleven 1 mes o más sin actualizaciones). 

Por lo comentado anteriormente y para presentar un reparto muy variado en lo que a bases se refiere, se opta por probar las siguientes opciones:

1. La imagen de deno por excelencia (base debian slim): [denoland/deno:latest](https://hub.docker.com/layers/denoland/deno/latest/images/sha256-964a7ad8c0b41129e8e7bd75f3097317d809cf17e6278566340c1bb6ee7da215)
2. La imagen de deno con base en alpine: [denoland/deno:alpine](https://hub.docker.com/layers/denoland/deno/alpine/images/sha256-46b494c16c3661483ac7bb9be439eeb10eab630d0afa42a37ad8f62236d960da)
3. La imagen de deno con base en ubuntu: [denoland/deno:ubuntu](https://hub.docker.com/layers/denoland/deno/ubuntu/images/sha256-e1dc84939f653ceb46aacf4a964582c17fa022174ffd13973167c1c9382580ca)
4. Una base debian slim a la que le instalamos lo indispensable: [debian:stable-slim](https://hub.docker.com/layers/library/debian/stable-slim/images/sha256-4db0b259ee0d43dc0f52da06d125969a0b28dbb02201f3ee1615a8f9850d259f) + instalación manual de deno
5. Una base almalinux (RHEL) sobre la que instalamos los paquetes de deno: [almalinux:minimal](https://hub.docker.com/layers/library/almalinux/minimal/images/sha256-ed51273dd3e525ae42200416fd24e53c24514cc76ca98d5be5a6ffdf4169d83e) + instalación manual de deno

## Fases de benchmarking:

### 1. Seguridad: análisis de vulnerabilidades con Snyk.
[Documentación seguida para realizar los test](https://docs.snyk.io/developer-tools/snyk-cli/commands/container-test)

Reportes de vulnerabilidades obtenidos del análisis Snyk:
    - [denoland/deno:latest](../documentos_extra/reportes_seguridad/reporte_denoland_latest.txt)
    - [denoland/deno:alpine](../documentos_extra/reportes_seguridad/reporte_denoland_alpine.txt)
    - [denoland/deno:ubuntu](../documentos_extra/reportes_seguridad/reporte_denoland_ubuntu.txt)
    - [debian:stable-slim](../documentos_extra/reportes_seguridad/reporte_debian_stable_slim.txt)
    - [almalinux:minimal](../documentos_extra/reportes_seguridad/reporte_almalinux_minimal.txt)

Los reportes arrojan una información que puede resumirse en la siguiente tabla:
| Imagen Base               | Vulnerabilidades High | Vulnerabilidades Medium | Vulnerabilidades Low |
|--------------------------|----------------------|------------------------|----------------------|
| denoland/deno:latest     | 0                    | 0                      | 23                    |
| **denoland/deno:alpine**     | **0**                    | **0**                      | **0**                    |
| denoland/deno:ubuntu     | 0                    | 2                      | 14                    |
| debian:stable-slim       | 0                    | 0                      | 23                   |
| **almalinux:minimal**       | **0**                    | **0**                      | **0**                    |

Como podemos observar en seguridad la ganadora es la imagen denoland/deno:alpine y almalinux:minimal ya que no presentan vulnerabilidades conocidas en el análisis de seguridad.

### 2. Comparación de tamaños:

**Tamaño de las imagenes con los paquetes de deno**

Estas imágenes cuentan con la instrumentación que permitiría correr los test.

Los archivos del proyecto son montados con un volumen de la misma forma que se haría en producción a fin de obtener una comparativa más realista.

Se construyen las imagenes completas con:

```bash
docker build -f <ruta al Dockerfile> -t <nombre imagen> .
```

<!-- 
docker build -f Imagenes_testing/Dockerfile_debian_stable_slim -t fermater-debianslim-deno .
docker build -f Imagenes_testing/Dockerfile_almalinux_minimal -t fermater-almalinux-deno .
docker build -f Imagenes_testing/Dockerfile_denoland_latest -t fermater-denoland-latest .
docker build -f Imagenes_testing/Dockerfile_denoland_alpine -t fermater-denoland-alpine .
docker build -f Imagenes_testing/Dockerfile_denoland_ubuntu -t fermater-denoland-ubuntu .
-->

_**Aclaración**: Se entiende una imagen completa como aquella con capacidad de correr los test y ofrecer una respuesta. Tiene capacidad en tanto y en cuanto posee los archivos del proyecto y un deploy de deno completamente funcional._ 

Se consulta el tamaño con:

```bash
docker images | grep -Ei "nombre de la imagen"
```

| Imagen Base               | Real Size |
|--------------------------|----------------------|
| denoland/deno:latest     | 282MB |
| denoland/deno:alpine     | **184MB** |
| denoland/deno:ubuntu     | 282MB |
| debian:stable-slim + deno       | 348MB |
| almalinux:minimal + deno       | 312MB |

**Tamaño del contenedor generado por cada imagen antes de correr los test**

<!-- 
docker run -u 1001 -t -v `pwd`:/fermater fermater-almalinux-deno:latest &
docker run -u 1001 -t -v `pwd`:/fermater fermater-almalinux-deno:latest &
docker run -u 1001 -t -v `pwd`:/fermater fermater-debianslim-deno:latest &
docker run -u 1001 -t -v `pwd`:/fermater fermater-denoland-latest:latest &
docker run -u 1001 -t -v `pwd`:/fermater fermater-denoland-alpine:latest &
docker run -u 1001 -t -v `pwd`:/fermater fermater-denoland-ubuntu:latest &
 -->

Se prueba el contendor con:

```bash
docker run -u 1001 -t -v `pwd`:/fermater <imagen> &
```

Se consulta el tamaño del contenedor con:

```bash
docker ps -s
```

| Imagen Base               | Size |
|--------------------------|----------------------|
| denoland/deno:latest     | 4.1kB (virtual 203MB) |
| denoland/deno:alpine     | **4.1kB (virtual 130MB)** |
| denoland/deno:ubuntu     | 4.1kB (virtual 204MB) |
| debian:stable-slim + deno       | 4.1kB (virtual 246MB) |
| almalinux:minimal + deno       | 4.1kB (virtual 219MB) |


### 3. Comparación de velocidades:

**Velocidad en realizar los test**

La velocidad se ha medido usando el siguiente comando dentro de cada cotenedor:

```bash
deno eval 'const t=performance.now(); await Deno.run({cmd:["deno","test"]}).status(); console.log((performance.now()-t).toFixed(3)+" ms");'
```

Velocidad de cada cotenedor en correr los test:

| Imagen Base               | 1º Run (ms) | 2º Run (ms) | 3º Run (ms) | average (ms) |
|--------------------------|--------|--------|--------|---------|--------------| 
| denoland/deno:latest     | 645.276 | 644.527 | 661.380 | 650.394 | 
| **denoland/deno:alpine**     | 639.923 | 648.334 | 643.810 | 644.022 |
| denoland/deno:ubuntu     | 696.996 | 655.581 | 646.094 | 666.224 | 
| debian:stable-slim + deno       | 724.264 | 675.800 | 653.091 | 684.385 | 
| almalinux:minimal + deno       | 665.428 | 645.793 | 636.910 | 649.377 |

## Resultados finales y elección de la imagen base:

Por los resultados obtenidos en las distintas fases del benchmark podemos concluir que la mejor opción es denoland/deno:alpine. Denoland/deno:alpine empata como la mejor en funcion del número de vulnerabilidades conocidas. El tamaño de imagen y contenedor , 184MB y 130MB, es el más reducido con diferencia. Su velocidad en correr los test, si bien no es mucha diferencia, es la mejor.

