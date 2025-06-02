import { Estudiante } from "./Estudiante";
import { Materias } from "./Materias";

export interface ResponseRegistro{
    isSuccess: boolean;
    message: string;
}

export interface ResponseLogin{
    isSuccess: boolean;
    token: string;
    message: string;
    idEstudiante: number;
}

export interface ResponseEstudiante{
    isSuccess: boolean;
    value: Estudiante;
}

export interface ResponseUpdateDeleteEstudiante{
    isSuccess: boolean;
    message: string;
    value: boolean;
}

export interface ResponseEstudianteXMaterias{
    isSuccess: boolean;
    value: Estudiante[];
}

export interface ResponseGetMaterias{
    isSuccess: boolean;
    value: Materias[];
}

export interface ResponseAsignarMaterias{
    isSuccess: boolean;
    message: string;
    value: boolean;
}