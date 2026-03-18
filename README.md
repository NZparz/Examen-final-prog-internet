# LaLiga Manager Pro 

Bienvenido a **LaLiga Manager Pro**, un sistema integral de gestión deportiva diseñado bajo criterios de arquitectura profesional para el manejo de equipos, jugadores y cuerpo técnico de la Liga Española.

##  Arquitectura del Proyecto

Este proyecto implementa dos pilares fundamentales de la ingeniería de software:

1.  **Modelo-Vista-Controlador (MVC)**:
    *   **Model**: Entidades C# en el backend que representan la estructura de datos (Equipos, Jugadores, Staff).
    *   **View**: Componentes de React en el frontend que sirven de interfaz para el usuario final.
    *   **Controller**: Endpoints de API en C# que procesan las peticiones y orquestan la comunicación.
2.  **Cliente-Servidor**:
    *   **Cliente**: Aplicación SPA (Single Page Application) desarrollada con **React + TypeScript + Vite**.
    *   **Servidor**: Backend robusto con **ASP.NET Core 9.0** y base de datos relacional **PostgreSQL**.

##  Tecnologías Utilizadas

*   **Backend**: C# .NET 9.0, Entity Framework Core (Npgsql).
*   **Frontend**: React 18, TypeScript, Custom Premium CSS (Premium UI / Glassmorphism).
*   **Base de Datos**: PostgreSQL 15.
*   **Contenerización**: Docker & Docker Compose.

##  Cómo Ejecutar el Proyecto (Paso a Paso)

El proyecto está diseñado para ser desplegado de forma sencilla mediante contenedores. Sigue estos pasos detallados:

### 1. Requisitos Previos
Asegúrate de tener instalado en tu sistema:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2. Preparación del Entorno
Sitúate en la carpeta raíz del proyecto donde se encuentra el archivo `docker-compose.yml`:
```bash
cd Examen-final-prog-internet
```

### 3. Construcción y Despliegue
Ejecuta el siguiente comando para construir las imágenes y levantar los servicios en segundo plano:
```bash
docker-compose up -d --build
```

### 4. Verificación de los Contenedores
Puedes verificar que los 3 servicios están corriendo correctamente con el comando:
```bash
docker ps
```
Deberías ver los contenedores `sport_frontend_app`, `sport_backend_api` y `postgres_sportdb` en estado "Up".

### 5. Inicialización de Datos
No es necesario realizar ninguna acción manual en la base de datos. El backend aplicará automáticamente las **migraciones de Entity Framework** y realizará un **Seeding** (carga inicial) de los equipos, jugadores y cuerpo técnico de La Liga en cuanto el servicio esté listo.

##  Enlaces de Acceso

Una vez que los contenedores estén en estado `Running`, podrás acceder a:

*   **Frontend**: [http://localhost:4000](http://localhost:4000) (Gestión Visual)
*   **Backend API**: [http://localhost:5000](http://localhost:5000)
*   **Swagger Docs**: [http://localhost:5000/swagger](http://localhost:5000/swagger)

##  Características Especiales

*   **Seeding Automático**: Al iniciar por primera vez, el sistema se precarga con los 5 equipos principales de La Liga, sus jugadores estrella (Mbappé, Yamal, Griezmann, etc.) y sus respectivos entrenadores.
*   **Diseño Premium**: Interfaz moderna con modo oscuro, efectos de desenfoque (Glassmorphism) y animaciones fluidas.
*   **Validaciones**: Backend tipado y frontend con validaciones de formulario para garantizar la integridad de los datos deportivos.

---
*Este proyecto fue desarrollado íntegramente como Examen Final siguiendo los lineamientos de arquitectura MVC y Cliente-Servidor.*
