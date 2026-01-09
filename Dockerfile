FROM denoland/deno:alpine

WORKDIR /app/test

RUN adduser -D -s /bin/sh user_sin_permisos

RUN mkdir -p /app/.deno_cache
RUN chown -R user_sin_permisos:user_sin_permisos /app/.deno_cache
ENV DENO_DIR=/app/.deno_cache

USER user_sin_permisos

CMD ["deno", "test"]