USE [master]
GO

--se valida si existe la base de datos si no se crea
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'Estudiantes')
BEGIN
    CREATE DATABASE Estudiantes;
END
GO

USE [Estudiantes]
GO

--SE CREA LA TABLA DE ESTUDIANTES
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_NAME = 'Estudiantes' AND TABLE_SCHEMA = 'dbo'
)
BEGIN
    CREATE TABLE Estudiantes (
        IdEstudiante INT IDENTITY(1,1) PRIMARY KEY,
        Identificacion VARCHAR(15),
        NombreEstudiante VARCHAR(50),
        Contrasena VARCHAR(500),
        FechaCreacion DATETIME,
        Estado BIT
    );
END
GO

--SE CREA LA TABLA DE PROFESORES
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_NAME = 'Profesores' AND TABLE_SCHEMA = 'dbo'
)
BEGIN
    CREATE TABLE Profesores (
        IdProfesor INT IDENTITY(1,1) PRIMARY KEY,
        NombreProfesor VARCHAR(50),
        Estado BIT
    );
END
GO

--SE CREA LA TABLA DE MATERIAS
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_NAME = 'Profesores' AND TABLE_SCHEMA = 'dbo'
)
BEGIN
    CREATE TABLE Materias (
        IdMateria INT IDENTITY(1,1) PRIMARY KEY,
        Materia VARCHAR(50),
        Estado BIT
    );
END
GO
