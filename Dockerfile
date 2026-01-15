# A partir de la imagen decidida anteriormente
FROM denoland/deno:alpine
# Paso previo: Creamos user para no ejecutar con Root que sería el usado por omisión.
RUN adduser -D user_sin_permisos
USER user_sin_permisos
# Capa 1 Seteamos el workdir
WORKDIR /app/test
# Capa 2 Creamos el directorio de cache de deno
RUN mkdir -p /app/.deno_cache && chmod 777 /app/.deno_cache
# Capa 3 Seteamos ese directorio como el DENO_DIR, deno lo usará para cachear los módulos
ENV DENO_DIR=/app/.deno_cache
# Capa 4 pasamos los archivos de configuración
COPY  --chown=user_sin_permisos:user_sin_permisos deno.json deno.lock ./
# Capa 5 cacheamos los archivos pasados
RUN deno cache deno.json
# Capa 6 limpiamos los archivos por seguridad y eficiencia
RUN rm deno.lock deno.json 
# Creamos el entrypoint que lanzará los test
ENTRYPOINT ["deno","task", "test"]  