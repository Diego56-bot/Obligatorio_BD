# Obligatorio_BD
Obligatorio de Base de Datos

## Instrucciones para usar la API:

Una vez obtenido el link al repo de Github, se tienen dos ociones: clonar el repositorio, o descargarlo como ZIP, esta segunda opción posiblemente sea la mejor ya que al clonar el repositorio de git se instalan más paquetes, los cuales necesarios para poder subir posibles cambios al repositorio, sin embargo, si no se van a realizar cambios esto último es innecesario. Una vez teniendo el proyecto descargado, es necesario tener instalada la aplicación Docker Desktop (aunque también es posible correr la API sin este, lo mejor es usarlo para mayor eficiencia). Una vez instalado el Docker, se tiene que hacer lo siguiente:

1. Ejecutar la aplicación  
2. Abrir la carpeta con el proyecto en la terminal  
3. Ejecutar el comando `docker compose up`  
4. Abrir en el navegador (cualquiera): http://localhost:5173/  

5. Una vez estando dentro de la API, se necesita ingresar correo y contraseña, para esto es necesario usar alguno de los ingresados en los inserts de la base de datos. Todos tienen como contraseña: contraseña_segura y el mail varía dependiendo del usuario, pero para ejemplos de cada rol: 

facundo.piriz@correo.ucu.edu.uy = Administrador

diego.deoliveira@correo.ucu.edu.uy = Funcionario

agustin.garciab@correo.ucu.edu.uy = Participante común

6. Una vez iniciado sesión, es posible usar todas las funcionalidades. Para cerrar sesión se puede presionar el botón de “cerrar sesión” 
