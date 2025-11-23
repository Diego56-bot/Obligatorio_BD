# Sistema en donde se hace la app
FROM python:3.12 
# Configurar UTF-8 en el contenedor
ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    PYTHONIOENCODING=utf-8 \
    PYTHONUNBUFFERED=1
#Directorio en donde runea la app, se crea uno nuevo
WORKDIR /API
#Copia el archivo con los requerimientos específicamente para que Docker no tenga que volver a instalar todas las dependencias.
COPY requirements.txt .
# Copia a dicho directorio todo lo necesario
COPY . .
#Ejecuta este comando al final para instalar las dependencias
RUN pip install -r requirements.txt
#Documenta que usará el puerto 5000 (el puerto del contenedor definido en el docker compose)
EXPOSE 5000
# Lo que se debe ejecutar cuando arranque el docker
CMD ["python", "app.py"]