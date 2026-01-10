FROM denoland/deno:alpine

# Situamos el diretorio de trabajo en /app/test
WORKDIR /app/test

# Creamos la carpeta para la cache de deno con permisos solo para el usuario propietario
RUN mkdir -p /app/.deno_cache
RUN chmod u=rwx,g=rwx,o= /app/.deno_cache
ENV DENO_DIR=/app/.deno_cache

# Creamos un usuario sin permisos que va a ser propietario de la carpeta de cache
RUN adduser -D -s /bin/sh user_sin_permisos
RUN chown user_sin_permisos:user_sin_permisos /app/.deno_cache

# Pasamos los ficheros de dependencias
COPY deno.json .
COPY deno.lock .

# Cacheamos dichas dependencias
RUN deno cache deno.json

# Eliminamos los ficheros para cumplir con el criterio de dejar solo lo necesario. Una vez
# cacheadas las dependencias no son necesarias implicitamente.
RUN rm deno.json deno.lock
# Cambiamos al usuario sin permisos que es el propietario de la carpeta de cache. Al correr
# los test con este usuario que tiene permisos sobre la carpeta protegemos la cache de deno
# para cuandos e ejecute desde GH.
USER user_sin_permisos
ENTRYPOINT ["deno", "test"]