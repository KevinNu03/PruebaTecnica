# Aplicación de Estudiantes

Este proyecto es una aplicación de gestión de estudiantes desarrollada con **.NET (Web API)** para el backend y **Angular** para el frontend. A continuación se detallan los pasos para su correcta instalación y ejecución.

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) instalado
- [SQL Server](https://www.microsoft.com/en-us/sql-server/) instalado y configurado
- [Visual Studio](https://visualstudio.microsoft.com/) para backend (.NET)
- [Visual Studio Code](https://code.visualstudio.com/) para frontend (Angular)
- Git (opcional, para clonar el repositorio)

---

##  Pasos para la Instalación y Ejecución

### 1. Clonar o Descargar el Repositorio

  Puedes clonar este repositorio o descargarlo como archivo ZIP y extraerlo en tu equipo.

### 2. Base de Datos
  Abrir SQL Server Management Studio y ejecutar los siguientes scripts en orden:
  
  ScriptObjetos.sql - Creación de tablas y relaciones
  
  ScriptDatos.sql - Inserción de datos iniciales
  
  ScriptNuevos.sql - Inserción de datos adicionales o actualizaciones

### 3. Backend (WebApiEstudiantes)
  Abrir la solución WebApiEstudiantes en Visual Studio.
  
  Configurar la cadena de conexión en el archivo appsettings.json:
  
  Ejecutar el proyecto para iniciar la API.

### 4. Frontend (Angular - carpeta Estudiantes)
  Abrir la carpeta Estudiantes en Visual Studio Code.
  
  Instalar las dependencias del proyecto:
    npm install
    npm install primeng @primeng/themes
  
  Iniciar el servidor de desarrollo:
    npm run start


### 5. Uso de la Aplicación
Accede a la aplicación desde tu navegador (por defecto: http://localhost:4200).

Regístrate como nuevo usuario.

Inicia sesión para acceder a las funcionalidades.

```bash
git clone https://github.com/KevinNu03/PruebaTecnica.git
