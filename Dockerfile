FROM denoland/deno:alpine

RUN adduser -D user_sin_permisos
USER user_sin_permisos

WORKDIR /app/test

RUN mkdir -p /app/.deno_cache && chmod 777 /app/.deno_cache

ENV DENO_DIR=/app/.deno_cache

COPY  --chown=user_sin_permisos:user_sin_permisos deno.json deno.lock ./

RUN deno cache deno.json

RUN rm deno.lock deno.json 

ENTRYPOINT ["deno","task", "test"]  