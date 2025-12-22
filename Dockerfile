# Dockerfile de ejemplo para intentar pasar los Test
FROM denoland/deno:alpine

# Crear directorio de cache y dar permisos
RUN mkdir -p /deno-dir \
    && chmod 777 /deno-dir

ENV DENO_DIR=/deno-dir

# Asegurar usuario no-root
USER 1001

WORKDIR /app
COPY . .
CMD ["deno", "task", "check"]