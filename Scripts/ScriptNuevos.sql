USE [Estudiantes]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <30/05/2025>
-- Description:	<SE CREA EL SP PARA REGISTAR A LOS ESTUDIANTES>
-- =============================================
CREATE OR ALTER PROCEDURE [SpRegistrarEstudiante]
	-- Add the parameters for the stored procedure here
	@Identificacion VARCHAR(15),
	@NombreCompleto VARCHAR(50),
	@Contrasena VARCHAR(500)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @Creado BIT = 0
    -- Insert statements for procedure here
    --SE CREA UN MERGE PARA CREAR O ACTUALIZAR LA INFORMACIÓN DEL ESTUDIANTE 
	IF NOT EXISTS(SELECT * FROM Estudiantes WHERE Identificacion = @Identificacion AND Estado = 1 )
		BEGIN
			INSERT INTO Estudiantes (Identificacion, NombreEstudiante, Contrasena, FechaCreacion, Estado)
			VALUES (@Identificacion, @NombreCompleto, @Contrasena, GETDATE(), 1)

			SET @Creado = 1
		END


	SELECT @Creado AS Creado
END
GO


USE [Estudiantes]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <30/05/2025>
-- Description:	<SE CREA EL SP PARA INICIAR SESION>
-- =============================================
CREATE OR ALTER PROCEDURE [SpIniciarSesion]
	-- Add the parameters for the stored procedure here
	@Identificacion VARCHAR(15),
	@Contrasena VARCHAR(500)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    DECLARE @Ingreso BIT = 0
    DECLARE @IdEstudiante INT;

    -- Insert statements for procedure here
    --se valida si existe un registro en donde coincida la identificacion y la contraseña
    IF EXISTS(SELECT * FROM Estudiantes WHERE Identificacion = @Identificacion AND Contrasena = @Contrasena AND Estado = 1)
        BEGIN
            SET @Ingreso = 1
            SET @IdEstudiante = (SELECT TOP (1) IdEstudiante FROM Estudiantes WHERE Identificacion = @Identificacion AND Contrasena = @Contrasena AND Estado = 1)
        END

    SELECT @Ingreso AS Ingreso, @IdEstudiante AS IdEstudiante

END
GO

USE [Estudiantes]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <31/05/2025>
-- Description:	<SE CREA EL SP PARA TRAER LA INFORMACION DE CADA ESTUDIANTE>
-- =============================================
CREATE OR ALTER PROCEDURE [SpGetEstudiante]
	-- Add the parameters for the stored procedure here
	@IdEstudiante INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    SELECT 
		Identificacion,
		NombreEstudiante
	FROM
		Estudiantes
	WHERE
		IdEstudiante = @IdEstudiante
		AND Estado = 1

END
GO

USE [Estudiantes]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <01/06/2025>
-- Description:	<SE CREA EL SP PARA ACTUALIZAR LA INFORMACION DEL ESTUDIANTE>
-- =============================================
CREATE OR ALTER PROCEDURE [SpUpdateEstudiante]
	-- Add the parameters for the stored procedure here
	@IdEstudiante INT,
	@Identificacion VARCHAR(15),
	@NombreEstudiante VARCHaR(50),
	@Contrasena VARCHAR(500)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    IF(@Contrasena = NULL)
		BEGIN
			UPDATE 
				Estudiantes
			SET
				Identificacion = @Identificacion,
				NombreEstudiante = @NombreEstudiante
			WHERE
				IdEstudiante = @IdEstudiante
		END
	ELSE
		BEGIN
			UPDATE 
				Estudiantes
			SET
				Identificacion = @Identificacion,
				NombreEstudiante = @NombreEstudiante,
				Contrasena = @Contrasena
			WHERE
				IdEstudiante = @IdEstudiante
		END

END
GO

USE [Estudiantes]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <01/06/2025>
-- Description:	<SE CREA EL SP PARA ELIMINAR O INACTIVAR A LOS ESTUDIANTES>
-- =============================================
CREATE OR ALTER PROCEDURE [SpDeleteEstudiante]
	-- Add the parameters for the stored procedure here
	@IdEstudiante INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    UPDATE
		Estudiantes 
	SET
		Estado = 0
	WHERE
		IdEstudiante = @IdEstudiante
END
GO

USE [Estudiantes]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <01/06/2025>
-- Description:	<SE CREA EL SP PARA TRAER LOS ESTUDIANTES CON RESPECTO A LAS MATERIAS ASIGNADAS>
-- =============================================
CREATE OR ALTER PROCEDURE [SpGetEstudianteXMaterias]
	-- Add the parameters for the stored procedure here
	@IdEstudiante INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    SELECT 
		E.Identificacion,
		E.NombreEstudiante,
		STRING_AGG(M.Materia, ', ') AS Materias
	FROM 
		MateriasXEstudiantes ME
		INNER JOIN Estudiantes E ON ME.IdEstudiante = E.IdEstudiante AND E.Estado = 1
		INNER JOIN Materias M ON M.IdMateria = ME.IdMateria AND M.Estado = 1
	WHERE
		ME.IdMateria IN (
			SELECT IdMateria 
			FROM MateriasXEstudiantes 
			WHERE IdEstudiante = @IdEstudiante AND Estado = 1
		)
		AND ME.Estado = 1
	GROUP BY 
		E.Identificacion,
		E.NombreEstudiante
	ORDER BY
		E.Identificacion ASC
END
GO

USE [Estudiantes]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <01/06/2025>
-- Description:	<SE CREA EL SP PARA TRAER TODAS LAS MATERIAS CON SU RESPECTIVO PROFESOR ASIGNADO Y SI EL ESTUDIANTE TIENE O NO ASIGNADA ESTA MATERIA>
-- =============================================
CREATE OR ALTER PROCEDURE [SpGetMaterias]
	-- Add the parameters for the stored procedure here
	@IdEstudiante INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    SELECT
		M.IdMateria,
		M.Materia,
		M.Creditos,
		P.NombreProfesor,
		CONVERT(BIT,CASE WHEN ME.IdMateriasXEstudiantes IS NULL THEN 0 ELSE 1 END) AS Asignada
	FROM
		Materias M
		INNER JOIN MateriasXProfesores MP ON MP.IdMateria = M.IdMateria AND MP.Estado = 1
		INNER JOIN Profesores P ON P.IdProfesor = MP.IdProfesor
		LEFT JOIN MateriasXEstudiantes ME ON ME.IdMateria = M.IdMateria AND ME.IdEstudiante = @IdEstudiante AND ME.Estado = 1
	WHERE
		M.Estado = 1
END
GO

USE [Estudiantes]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <01/06/2025>
-- Description:	<SE CREA EL SP PARA ASIGNAR LAS MATERIAS SELECCIONADAS POR EL ESTUDIANTE
-- =============================================
CREATE OR ALTER PROCEDURE [SpAsignarMaterias]
	-- Add the parameters for the stored procedure here
	@IdEstudiante INT,
	@IdMateria INT,
	@Asignado BIT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @Mensaje VARCHAR(200)
	--SE VALIDA SI ES UNA ASIGNACION O PARA QUITAR UNA ASIGNACION
    IF(@Asignado = 1)
		BEGIN
			--COMO ES UNA ASIGNACION SE VALIDA SI NO TIENE 3 MATERIAS YA QUE ESTE ES EL MAXIMO A ASIGNAR
			IF((SELECT COUNT(IdMateriasXEstudiantes) FROM MateriasXEstudiantes WHERE IdEstudiante = @IdEstudiante AND Estado = 1) < 3)
				BEGIN
					--TRAEMOS EL PROFESOR QUE RDEBEMOS VALIDAR
					DECLARE @IdProfesor INT = (SELECT TOP (1) IdProfesor FROM MateriasXProfesores WHERE IdMateria = @IdMateria AND Estado = 1)

					--VALIDAMOS QUE EL PROFESOR NO DICTE NINGUNA DE LAS MATERIAS QUE YA TIENE ASIGNADAS EL ESTUDIANTE
					IF NOT EXISTS(SELECT * FROM MateriasXProfesores MF INNER JOIN MateriasXEstudiantes ME ON ME.IdMateria = MF.IdMateria AND ME.Estado = 1 AND ME.IdEstudiante = @IdEstudiante WHERE MF.IdProfesor = @IdProfesor AND MF.Estado = 1)
						BEGIN
							--POR ULTIMO VALIDAMOS QUE NO TENGA ASIGNADA YA LA MATERIA
							IF NOT EXISTS(SELECT * FROM MateriasXEstudiantes ME WHERE ME.IdEstudiante = @IdEstudiante AND ME.IdMateria = @IdMateria AND Estado = 1)
								BEGIN
									INSERT INTO MateriasXEstudiantes (IdEstudiante, IdMateria, Estado, FechaCreacion)
									VALUES (@IdEstudiante, @IdMateria, 1, GETDATE())

									SET @Mensaje = 'Materia asignada exitosamente.'
								END
							ELSE
								BEGIN 
									--SE ENVIA UN MENSAJE DE QUE YA TIENE ASIGNADA ESTA CLASE
									SET @Mensaje = 'El estudiante ya esta asignado a la clase seleccionada.'
									SET @Asignado = 0
								END
						END
					ELSE
						BEGIN
							--SE ENVIA UN MENSAJE DE QUE YA TIENE ASIGNADA UNA CLASE CON EL PROFESOR
							SET @Mensaje = 'El estudiante ya cuenta con una asignacion con este profesor.'
							SET @Asignado = 0
						END
				END
			ELSE
				BEGIN
					--SE ENVIA UN MENSAJE DE QUE YA CUENTA CON 3 MATERIAS ASIGNADAS
					SET @Mensaje = 'El estudiante ya cuenta con 3  materias asignadas.'
					SET @Asignado = 0
				END
		END
	ELSE
		BEGIN 
		--SE QUITA LA ASIGNACION DE LA MATERIA SELECIONADA
			UPDATE 
				MateriasXEstudiantes
			SET
				Estado = 0
			WHERE 
				IdEstudiante = @IdEstudiante
				AND 
				IdMateria = @IdMateria

			SET @Mensaje = 'ya no tienes asignada la materia seleccionada.'
		END

		SELECT @Mensaje AS Mensaje, CONVERT(BIT, @Asignado) AS Asingado
	
END
GO