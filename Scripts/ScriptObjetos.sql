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
    WHERE TABLE_NAME = 'Materias' AND TABLE_SCHEMA = 'dbo'
)
BEGIN
    CREATE TABLE Materias (
        IdMateria INT IDENTITY(1,1) PRIMARY KEY,
        Materia VARCHAR(50),
        Creditos INT,
        Estado BIT
    );
END
GO

--SE CREA LA TABLA DE ASIGNACION DE MATERIAS CON PROFESORES
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_NAME = 'MateriasXProfesores' AND TABLE_SCHEMA = 'dbo'
)
BEGIN
    CREATE TABLE MateriasXProfesores (
        IdMateriasXProfesores INT IDENTITY(1,1) PRIMARY KEY,
        IdMateria INT,
        IdProfesor INT,
        Estado BIT,

        CONSTRAINT FK_Materia_MateriasXProfesores FOREIGN KEY (IdMateria)
        REFERENCES Materias(IdMateria),
        CONSTRAINT FK_Profesores_MateriasXProfesores FOREIGN KEY (IdProfesor)
        REFERENCES Profesores(IdProfesor)
    );
END
GO

--SE CREA LA TABLA DE ASIGNACION DE MATERIAS CON ESTUDIANTES
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_NAME = 'MateriasXEstudiantes' AND TABLE_SCHEMA = 'dbo'
)
BEGIN
    CREATE TABLE MateriasXEstudiantes (
        IdMateriasXEstudiantes INT IDENTITY(1,1) PRIMARY KEY,
        IdMateria INT,
        IdEstudiante INT,
        Estado BIT,

        CONSTRAINT FK_Materia_MateriasXEstudiantes FOREIGN KEY (IdMateria)
        REFERENCES Materias(IdMateria),
        CONSTRAINT FK_Estudiante_MateriasXEstudiantes FOREIGN KEY (IdEstudiante)
        REFERENCES Estudiantes(IdEstudiante)
    );
END
GO