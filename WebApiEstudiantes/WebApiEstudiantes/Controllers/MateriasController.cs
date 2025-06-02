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
    public class MateriasController : Controller
    {
        private readonly EstudiantesContext _Context;
        private readonly Utilidades _Utilidades;

        public MateriasController(EstudiantesContext context, Utilidades utilidades)
        {
            _Context = context;
            _Utilidades = utilidades;
        }

        [HttpGet("GetMaterias/{IdEstudiante}")]
        [ProducesResponseType(typeof(SpGetMateriasResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<IActionResult> GetMaterias(int IdEstudiante)
        {
            try
            {
                var materiasService = new MateriasService(_Context, _Utilidades);
                var Materias = await materiasService.GetMaterias(IdEstudiante);

                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, value = Materias });
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }

        [HttpPost("AsignarMaterias")]
        [ProducesResponseType(typeof(SpAsignarMateriasResult), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(ResponseHttp), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Unauthorized)]
        public async Task<IActionResult> AsignarMaterias([FromBody] AsignarMaterias AsignarMaterias)
        {
            try
            {
                var materiasService = new MateriasService(_Context, _Utilidades);
                var Materias = await materiasService.AsignarMaterias(AsignarMaterias);

                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, message = Materias.Mensaje, value = Materias.Asingado });
            }
            catch (Exception ex)
            {
                var responseHttp = ExceptionHelperServices.HandleException(ex);
                return BadRequest(responseHttp);
            }
        }
    }
}
