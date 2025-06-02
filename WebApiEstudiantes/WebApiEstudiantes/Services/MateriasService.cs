using DalEstudiantes.Models;
using WebApiEstudiantes.Custom;
using WebApiEstudiantes.Models;

namespace WebApiEstudiantes.Services
{
    public class MateriasService
    {
        private readonly EstudiantesContext _Context;
        private readonly Utilidades _Utilidades;

        public MateriasService(EstudiantesContext context, Utilidades utilidades)
        {
            _Context = context;
            _Utilidades = utilidades;
        }

        public async Task<List<SpGetMateriasResult>> GetMaterias(int IdEstudiante)
        {
            try
            {
                var materias = await _Context.GetProcedures().SpGetMateriasAsync(IdEstudiante);
                return materias;
            }
            catch
            {
                throw;
            }
        }

        public async Task<SpAsignarMateriasResult> AsignarMaterias(AsignarMaterias asignarMaterias)
        {
            try
            {
                var materias = (await _Context.GetProcedures().SpAsignarMateriasAsync(asignarMaterias.IdEstudiante,
                                                                                    asignarMaterias.IdMaterias,
                                                                                    asignarMaterias.Asignado)).FirstOrDefault();
                return materias!;
            }
            catch
            {
                throw;
            }
        }
    }
}
