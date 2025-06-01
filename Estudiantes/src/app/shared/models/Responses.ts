import { Estudiante } from "./Estudiante";

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