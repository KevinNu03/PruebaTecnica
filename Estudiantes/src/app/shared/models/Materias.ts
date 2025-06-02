export interface Materias{
    idMateria: number;
    materia: string;
    creditos: number;
    nombreProfesor: string;
    asignada: Boolean;
}

export interface AsignarMaterias{
    idEstudiante: number;
    idMaterias: number;
    asignado: boolean;
}