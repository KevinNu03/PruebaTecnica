using DalEstudiantes.Models;
using WebApiEstudiantes.Custom;
using WebApiEstudiantes.Models;

namespace WebApiEstudiantes.Services
{
    public class LoginService
    {
        private readonly EstudiantesContext _Context;
        private readonly Utilidades _Utilidades;

        public LoginService(EstudiantesContext context, Utilidades utilidades)
        {
            _Context = context;
            _Utilidades = utilidades;
        }

        public async Task<SpIniciarSesionResult> IniciarSesion(Login model)
        {
            try
            {
                
                var IniciarSesion = (await _Context.Procedures.SpIniciarSesionAsync(model.Identificacion!, model.contrasena!)).FirstOrDefault();

                return IniciarSesion!;
            }
            catch
            {
                throw;
            }
        }

        public async Task<SpRegistrarEstudianteResult> RegistrarEstudiante (Estudiante model)
        {
            try
            {
                var Registro = (await _Context.GetProcedures().SpRegistrarEstudianteAsync(
                    model.Identificacion!.ToUpper(),
                    model.NombreCompleto!.ToUpper(),
                    _Utilidades.EncriptarSHA256(model.Contrasena!)
                )).FirstOrDefault();


                return Registro!;
            }
            catch
            {
                throw;
            }
        }
    }
}
