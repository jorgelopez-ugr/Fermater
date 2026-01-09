# Be using: docker run -u 1001 -t -v `pwd`:/app/test jorgelopez17/fermater
FROM denoland/deno:alpine

WORKDIR /app/test

# Capa 3: Creamos un usuario no privilegiado 'user_sin_permisos'
RUN adduser -D -s /bin/sh user_sin_permisos

# Configurar directorio de caché de Deno en un lugar escribible por el usuario
RUN mkdir -p /app/.deno_cache
RUN chown -R user_sin_permisos:user_sin_permisos /app/.deno_cache
ENV DENO_DIR=/app/.deno_cache

# Capa 5: La ejecucion la hacemos con el user sin permisos ya que es el unico que podemos garantizar
USER user_sin_permisos

CMD ["deno", "test"]