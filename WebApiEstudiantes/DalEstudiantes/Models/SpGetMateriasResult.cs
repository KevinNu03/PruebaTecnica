﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DalEstudiantes.Models
{
    public partial class SpGetMateriasResult
    {
        public int IdMateria { get; set; }
        [StringLength(50)]
        public string Materia { get; set; }
        public int? Creditos { get; set; }
        [StringLength(50)]
        public string NombreProfesor { get; set; }
        public bool? Asignada { get; set; }
    }
}
