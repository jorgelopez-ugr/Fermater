# Dockerfile de ejemplo para Test
# Ejemplo
FROM denoland/deno:alpine

WORKDIR /app

# Copiar los archivos del proyecto
COPY . .

# Usar el usuario 'deno' por seguridad
USER deno

# Comando por defecto (ejecuta el chequeo de tipos definido en deno.json)
CMD ["deno", "task", "check"]