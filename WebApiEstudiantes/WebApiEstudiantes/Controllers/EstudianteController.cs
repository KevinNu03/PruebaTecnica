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
    [Authorize]
    [ApiController]
    public class EstudianteController : Controller
    {
        private readonly EstudiantesContext _Context;
        private readonly Utilidades _Utilidades;

        public EstudianteController(EstudiantesContext context, Utilidades utilidades)
        {
            _Context = context;
            _Utilidades = utilidades;
        }

        [HttpGet("GetEstudiante/{IdEstudiante}")]
        [ProducesResponseType(typeof(SpGetEstudianteResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<IActionResult> GetEstudiante(int IdEstudiante)
        {
            try
            {
                var estudianteService = new EstudianteService(_Context, _Utilidades);
                var Estudiante = await estudianteService.GetEstudiante(IdEstudiante);

                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, value = Estudiante });
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }

        [HttpDelete("DeleteEstudiante/{IdEstudiante}")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<IActionResult> DeleteEstudiante(int IdEstudiante)
        {
            try
            {
                var estudianteService = new EstudianteService(_Context, _Utilidades);
                var EstudianteEliminado = await estudianteService.DeleteEstudiante(IdEstudiante);

                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, message = "Estudiante eliminado.", value = EstudianteEliminado });
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }

        [HttpPost("UpdateEstudiante")]
        [ProducesResponseType(typeof(bool), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<IActionResult> UpdateEstudiante([FromBody] Estudiante estudiante)
        {
            try
            {
                var estudianteService = new EstudianteService(_Context, _Utilidades);
                var EstudianteActualizado = await estudianteService.UpdateEstudiante(estudiante);

                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, message = "Estudiante Actualizado.", value = EstudianteActualizado });
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }

        [HttpGet("GetEstudianteXMaterias/{IdEstudiante}")]
        [ProducesResponseType(typeof(SpGetEstudianteXMateriasResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<IActionResult> GetEstudianteXMaterias(int IdEstudiante)
        {
            try
            {
                var estudianteService = new EstudianteService(_Context, _Utilidades);
                var listEstudiantes = await estudianteService.GetEstudianteXMaterias(IdEstudiante);

                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true,  value = listEstudiantes });
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }
    }
}
