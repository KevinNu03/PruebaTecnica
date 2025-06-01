using DalEstudiantes.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using WebApiEstudiantes.Custom;
using WebApiEstudiantes.Models;
using WebApiEstudiantes.Services;
using WebApiUsuarios.Models;
using WebApiUsuarios.Services;

namespace WebApiEstudiantes.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class LoginController : Controller
    {

        private readonly EstudiantesContext _Context;
        private readonly Utilidades _Utilidades;

        public LoginController(EstudiantesContext context, Utilidades utilidades)
        {
            _Context = context;
            _Utilidades = utilidades;
        }

        [HttpPost("Login")]
        [ProducesResponseType(typeof(SpIniciarSesionResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<IActionResult> Login([FromBody] Login Model)
        {
            try
            {
                var loginUsuario = new Login
                {
                    Identificacion = Model.Identificacion,
                    contrasena = _Utilidades.EncriptarSHA256(Model.contrasena!)
                };

                var loginService = new LoginService(_Context, _Utilidades);
                var login = await loginService.IniciarSesion(loginUsuario);

                if (!(bool)login.Ingreso!)
                {
                    return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "", message = "Las credenciales no coinciden." });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _Utilidades.generarJWT(loginUsuario), message = "Bienvenid@" , idEstudiante = login.IdEstudiante});
                }
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }

        //se realiza el registro del estudiante
        [HttpPost("RegistrarEstudiante")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<IActionResult> RegistrarEstudiante(Estudiante model)
        {
            try
            {

                var loginService = new LoginService(_Context, _Utilidades);
                var Registro = await loginService.RegistrarEstudiante(model);

                if ((bool)Registro.Creado!)
                {
                    return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, message = "Estudiante registrado exitosamente." });
                }
                else
                {
                    return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, message = "El estudiante ya se encuentra registrado." });
                }

                
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }
    }
}
