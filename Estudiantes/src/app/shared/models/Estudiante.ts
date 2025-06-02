export interface Login {
    identificacion: string;
    contrasena: string;
}

export interface Estudiante {
    IdEstudiante?: number;
    identificacion: string;
    nombreEstudiante: string;
    contrasena: string;
};

export interface EstudiantesXMaterias{
    identificacion: string;
    nombreEstudiante: string;
    materias: string;
}