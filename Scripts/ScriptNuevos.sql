USE [Estudiantes]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Kevin Nuñez>
-- Create date: <30/05/2025>
-- Description:	<SE CREA EL SP PARA GUARDAR O ACTUALIZAR EL REGISTRO DEL ESTUDIANTE>
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
-- Description:	<SE CREA EL SP PARA GUARDAR O ACTUALIZAR EL REGISTRO DEL ESTUDIANTE>
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
