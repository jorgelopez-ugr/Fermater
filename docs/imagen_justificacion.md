### Elección de la imagen base para los contenedores:

Por lo comentado en clase se han decidido tomar los siguientes criterios para seleccionar la imagen base. Sobre esta imagen se construirá mi Dockerfile custom y posterior imagen custom para el contenedor de testing en docker propio del objetivo 5.

1. Seguridad:
    - Se usará Snyk para analizar reportes de vulnerabilidades de las imagenes base y valorar su seguridad.
    - No se seguirán probando imágenes que presenten vulnerabilidades medium severity y superiores.
    - Se priorizarán imágenes sin vulnerabilidades conocidas.
2. Tamaño de la imagen base:
    - Se va a valorar que la imagen base pese lo menos posible de cara a que la imagen final sea lo más ligera posible.
3. Tamaño del contenedor generado:
    - Una cosa es la imagen base y otra cosa es la imagen con la intrumentación mínima que le permita correr test. De esta forma imágenes más ligeras podrían requerir más instalaciones secundarias para correr Deno y en úlitima instancia los tests. De esta forma la imagen decidida como más ligera puede no ser la que genere el contenedor más ligero. Deberá comprobarse esto.
4. Velocidad de arranque del contenedor:
    - Se medirá el tiempo que tarda en arrancar un contenedor a partir de la imagen base para valorar objetivamente el desempeño de la imagen.
5. Velocidad en correr los tests:
    - Se medirá el tiempo que tarda el contenedor en correr los test una vez esta ya arrancado. Contenedores más ligeros puede tener peor performance en este sentido.

Dichos criterios sedan medidos numéricamente a fin de obtener una comparativa objetiva entre las diferentes imagenes base. Se busca quedarse con aquella que ofrezca la más óptima combinación de los distintos criterios.

## Imagenes base sometidas al benchmark:

Dado que deno ya tiene denoland que es la imagen oficial distribuida y auditada por los desarrolladores de deno vamos a tomar esta como referencia para comparar contra ella el resto de imagenes construidas. Dicho de otra forma, el rendimiento que obtenga denoland va a ser siempre 1 en puntuación de nuestro benchmark. El resto de casos se compararán contra este valor obteniendo porcentajes y puntuación relativa referente a denoland.

Referencias a denoland:
- [Dockerhub](https://hub.docker.com/r/denoland/deno)
- [Docu oficial de deno](https://docs.deno.com/runtime/reference/docker/)

Denoland ofrece varias versiones de su imagen oficial. La default esta construida sobre debian slim. Compararemos también las versiones sobre alpine y ubuntu para ver si ofrecen mejor rendimiento en base a los criterios de nuestra decisión.

Por otra parte se proponen otros 2 casos. Constan de un sistema operativo base sobre el que instalaremos manualmente como una capa del Doclerfile la version estable de deno que decidamos usar en el proyecto. Probaremos debian slim y almalinux minimal como bases para las instalaciones manuales. De esta forma comprobamos si partir de una imagen mas ligera puede ser mejor opción.

No se tendrán en cuenta imágenes extraoficiales por no poder garantizarse la seguridad de las mismas. No se contemplan imágenes no mínimas por ser de gran importancia el peso de la imagen final y del contenedor. Se pretende usar la última versión y más recientemente actualizada de cada imagen base para mejorar la seguridad. No se contemplan imágenes desactualizadas (lo tomaremos como aquellas que lleven 1 mes o más sin actualizaciones). 

Por lo comentado anteriormente y para presentar un reparto muy variado en lo que a bases se refiere, se opta por probar las siguientes opciones:

1. La imagen de deno por excelencia (base debian slim): [denoland/deno:latest](https://hub.docker.com/layers/denoland/deno/latest/images/sha256-964a7ad8c0b41129e8e7bd75f3097317d809cf17e6278566340c1bb6ee7da215)
2. La imagen de deno con base en alpine: [denoland/deno:alpine](https://hub.docker.com/layers/denoland/deno/alpine/images/sha256-46b494c16c3661483ac7bb9be439eeb10eab630d0afa42a37ad8f62236d960da)
3. La imagen de deno con base en ubuntu: [denoland/deno:ubuntu](https://hub.docker.com/layers/denoland/deno/ubuntu/images/sha256-e1dc84939f653ceb46aacf4a964582c17fa022174ffd13973167c1c9382580ca)
4. Una base debian slim a la que le instalamos lo indispensable: [debian:13.2-slim](https://hub.docker.com/layers/library/debian/13.2-slim/images/sha256-f0f544219ff82fd3f572c27af603e94887f2be3710eed9b1d500defe566a738b) + instalación manual de deno
5. Una base almalinux (RHEL) sobre la que instalamos los paquetes de deno: [almalinux:minimal](https://hub.docker.com/layers/library/almalinux/minimal/images/sha256-ed51273dd3e525ae42200416fd24e53c24514cc76ca98d5be5a6ffdf4169d83e) + instalación manual de deno

## Fases de benchmarking:

1. Seguridad: análisis de vulnerabilidades con Snyk.
[Documentación seguida para realizar los test](https://docs.snyk.io/developer-tools/snyk-cli/commands/container-test)

Reportes de vulnerabilidades obtenidos del análisis Snyk:
    - [denoland/deno:latest](../documentos_extra/reportes_seguridad/reporte_denoland_latest.txt)
    - [denoland/deno:alpine](../documentos_extra/reportes_seguridad/reporte_denoland_alpine.txt)
    - [denoland/deno:ubuntu](../documentos_extra/reportes_seguridad/reporte_denoland_ubuntu.txt)
    - [debian:13.2-slim](../documentos_extra/reportes_seguridad/reporte_debian_13-2_slim.txt)
    - [almalinux:minimal](../documentos_extra/reportes_seguridad/reporte_almalinux_minimal.txt)

Los reportes arrojan una información que puede resumirse en la siguiente tabla:
| Imagen Base               | Vulnerabilidades High | Vulnerabilidades Medium | Vulnerabilidades Low |
|--------------------------|----------------------|------------------------|----------------------|
| denoland/deno:latest     | 0                    | 0                      | 23                    |
| denoland/deno:alpine     | 0                    | 0                      | 0                    |
| denoland/deno:ubuntu     | 0                    | 2                      | 14                    |
| debian:13.2-slim       | 0                    | 0                      | 23                   |
| almalinux:minimal       | 0                    | 0                      | 0                    |

Como podemos observar en seguridad la ganadora es la imagen denoland/deno:alpine y almalinux:minimal ya que no presentan vulnerabilidades conocidas en el análisis de seguridad.

2. Comparación de tamaños:

**Tamaño de la imagen base raw**

Se crean las imagenes con:

```bash
docker build -f <ruta al Dockerfile> -t <nombre imagen> .
```

Se consulta el tamaño de las imagenes con:

```bash
docker images | grep -Ei "nombre de la imagen"
```

En este paso no vamos a comparar las imagenes de denoland porque no sería justo al contar estas ya con la instrumentación de deno instalada.

| Imagen Base               | Compressed Size (Dockerhub info) | Size once created locally |
|--------------------------|----------------------|--------------------------|
| debian:13.2-slim       | 29.84MB | 117MB |
| almalinux:minimal       | 29.69MB | 111MB |

**Tamaño del contenedor raw generado**

Se construyen los contenedores usando esas imágenes con:

```bash
docker run --rm <nombre imagen>
```

Se consulta el tamaño del contenedor corriendo con:

```bash
docker ps -s | grep -Ei "nombre o identificador del contendor"
```

Tamaño de la imagen creada y del contenedor base debian slim y base almalinux minimal:

| Imagen Base               | Container Size |
|--------------------------|----------------------|
| debian:13.2-slim       | 4.1kB (virtual 87.5MB) |
| almalinux:minimal       | 4.1kB (virtual 80.3MB) |

_**Aclaración**: el size normal es el peso del contenedor corriendo y virtual size es el peso real total de imagen + contenedor. Podemos entender el virtual size como "lo que este contenedor le pesa realmente al disco”_ 

**Tamaño de las imagenes con los paquetes de deno**

Estas imágenes ya cuentan con la instrumentación que permitiría correr los test.

Mis archivos desarrollados en anteriores objetivos son pasados a las imagenes usando COPY en el Dockerfile durante esta fase de testing/benchmarcking.

[WIP]

| Imagen Base               | Real Size |
|--------------------------|----------------------|
| denoland/deno:latest     |  |
| denoland/deno:alpine     |  |
| denoland/deno:ubuntu     |  |
| debian:13.2-slim + deno       |  |
| almalinux:minimal + deno       |  |

[WIP]