# Obligatorio_BD
Obligatorio de Base de Datos

## Instrucciones para usar la API:

Una vez obtenido el link al repo de Github, se tienen dos ociones: clonar el repositorio, o descargarlo como ZIP, esta segunda opción posiblemente sea la mejor ya que al clonar el repositorio de git se instalan más paquetes, los cuales son necesarios para poder subir posibles cambios al repositorio, sin embargo, si no se van a realizar cambios esto último es innecesario. Una vez teniendo el proyecto descargado, es necesario tener instalada la aplicación Docker Desktop (aunque también es posible correr la API sin este, lo mejor es usarlo para mayor eficiencia). Una vez instalado el Docker, se tiene que hacer lo siguiente:

### Pasos para ejecutar el proyecto
1. Ejecutar la aplicación  
2. Abrir la carpeta con el proyecto en la terminal  
3. Ejecutar el comando `docker compose up`  
4. Abrir en el navegador (cualquiera): http://localhost:5173/  

### Acceso a la página

Una vez estando dentro de la API, se necesita ingresar correo y contraseña. Para esto es necesario usar alguno de los ingresados en los *inserts* de la base de datos.  
Todos tienen como contraseña: **contraseña_segura** <br>
Y el mail varía dependiendo del usuario. A continuación, ejemplos para cada rol:

| Rol               | Correo                                      |
|-------------------|----------------------------------------------|
| Administrador      | `facundo.piriz@correo.ucu.edu.uy`           |
| Funcionario        | `diego.deoliveira@correo.ucu.edu.uy`        |
| Participante común | `agustin.garciab@correo.ucu.edu.uy`         |

### Inicio y cierre de sesión
Una vez iniciado sesión, es posible usar todas las funcionalidades. Para cerrar sesión se puede presionar el botón de “cerrar sesión” 

Repo original de Frontend: https://github.com/FacundoPiriz17/Frontend_BD
Repo original de Backend: https://github.com/FacundoPiriz17/Backend_BD
