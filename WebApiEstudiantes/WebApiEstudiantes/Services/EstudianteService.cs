using DalEstudiantes.Models;
using WebApiEstudiantes.Custom;
using WebApiEstudiantes.Models;

namespace WebApiEstudiantes.Services
{
    public class EstudianteService
    {
        private readonly EstudiantesContext _Context;
        private readonly Utilidades _Utilidades;

        public EstudianteService(EstudiantesContext context, Utilidades utilidades)
        {
            _Context = context;
            _Utilidades = utilidades;
        }

        public async Task<SpGetEstudianteResult> GetEstudiante(int idEstudiante)
        {
            try
            {
                var estudiante = (await _Context.Procedures.SpGetEstudianteAsync(idEstudiante)).FirstOrDefault();
                return estudiante!;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> DeleteEstudiante(int idEstudiante)
        {
            try
            {
                await _Context.Procedures.SpDeleteEstudianteAsync(idEstudiante);
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> UpdateEstudiante(Estudiante Estudiante)
        {
            try
            {
                await _Context.Procedures.SpUpdateEstudianteAsync(Estudiante.IdEstudiante, 
                                                                    Estudiante.Identificacion, 
                                                                    Estudiante.NombreEstudiante,
                                                                    Estudiante.Contrasena == "" || Estudiante.Contrasena == null? null: Estudiante.Contrasena);

                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<SpGetEstudianteXMateriasResult>> GetEstudianteXMaterias(int IdEstudiante)
        {
            try
            {
                var listEstudiantes = await _Context.Procedures.SpGetEstudianteXMateriasAsync(IdEstudiante);

                return listEstudiantes;
            }
            catch
            {
                throw;
            }
        }
    }
}
