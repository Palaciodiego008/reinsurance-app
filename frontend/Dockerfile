# Usa una imagen base de Nginx para servir archivos estáticos
FROM nginx:alpine

# Copia los archivos del proyecto al directorio de Nginx
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]