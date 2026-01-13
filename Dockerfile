# docker run -u 1001 -t -v `pwd`:/app/test jorgelopez17/fermater:latest

FROM denoland/deno:alpine

WORKDIR /app/test

RUN mkdir -p /app/.deno_cache
RUN chmod 777 /app/.deno_cache
ENV DENO_DIR=/app/.deno_cache

COPY deno.json deno.lock ./

RUN deno cache deno.json

RUN rm deno.lock deno.json

ENTRYPOINT ["deno","task", "test"]