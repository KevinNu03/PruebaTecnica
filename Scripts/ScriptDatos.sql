USE [Estudiantes]
GO
--CREACION DE TODAS LAS MATERIAS
MERGE INTO Materias AS target
USING (
    VALUES
        (1, 'Matem�ticas', 3, 1),
        (2, 'Lengua', 3, 1),
        (3, 'Historia', 3, 1),
        (4, 'Biolog�a', 3, 1),
        (5, 'Qu�mica', 3, 1),
        (6, 'F�sica', 3, 1),
        (7, 'Ingl�s', 3, 1),
        (8, 'Arte', 3, 1),
        (9, 'Educaci�n F�sica', 3, 1),
        (10, 'Inform�tica', 3, 1)
) AS source (IdMateria, Materia, Creditos, Estado)
ON target.IdMateria = source.IdMateria
WHEN MATCHED THEN
    UPDATE SET 
        Materia = source.Materia,
        Estado = source.Estado,
        Creditos = source.Creditos
WHEN NOT MATCHED BY TARGET THEN
    INSERT (Materia, Creditos, Estado)
    VALUES (source.Materia, source.Creditos, source.Estado);

GO

--SE INSERTAN LOS PROCESORES
MERGE INTO Profesores AS target
USING (
    VALUES
        (1, 'Carlos G�mez', 1),
        (2, 'Laura Torres', 1),
        (3, 'Andr�s P�rez', 1),
        (4, 'Mariana Ruiz', 1),
        (5, 'Jorge S�nchez', 1)
) AS source (IdProfesor, NombreProfesor, Estado)
ON target.IdProfesor = source.IdProfesor
WHEN MATCHED THEN
    UPDATE SET 
        NombreProfesor = source.NombreProfesor,
        Estado = source.Estado
WHEN NOT MATCHED BY TARGET THEN
    INSERT (NombreProfesor, Estado)
    VALUES (source.NombreProfesor, source.Estado);

GO

--CRWACION DE ASIGNACION DE PROFESORES A MARTERIAS
MERGE INTO MateriasXProfesores AS target
USING (
    VALUES
        (1, 1, 1),  
        (2, 1, 1),  
        (3, 2, 1),  
        (4, 2, 1),  
        (5, 3, 1),  
        (6, 3, 1),  
        (7, 4, 1),  
        (8, 4, 1),  
        (9, 5, 1),  
        (10, 5, 1)  
) AS source (IdMateria, IdProfesor, Estado)
ON target.IdMateria = source.IdMateria AND target.IdProfesor = source.IdProfesor
WHEN MATCHED THEN
    UPDATE SET Estado = source.Estado
WHEN NOT MATCHED BY TARGET THEN
    INSERT (IdMateria, IdProfesor, Estado)
    VALUES (source.IdMateria, source.IdProfesor, source.Estado);


