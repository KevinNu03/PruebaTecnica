import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpContext } from '@angular/common/http';
import { ResponseAsignarMaterias, ResponseEstudianteXMaterias, ResponseGetMaterias } from '../../../shared/models/Responses';
import { REQUIRES_AUTH } from '../../../core/interceptors/auth-context';
import { AsignarMaterias } from '../../../shared/models/Materias';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private apiUrl = environment.urlWebApiEstudiantes;
  constructor(private http: HttpClient) { }

  GetMaterias(idEstudiante: number) {
    return this.http.get<ResponseGetMaterias>(`${this.apiUrl}/api/Materias/GetMaterias/${idEstudiante}`, {
      context: new HttpContext().set(REQUIRES_AUTH, true)
    });
  }

  AsignarMaterias(asignarMateria: AsignarMaterias){
    return this.http.post<ResponseAsignarMaterias>(`${this.apiUrl}/api/Materias/AsignarMaterias`, asignarMateria, {
      context: new HttpContext().set(REQUIRES_AUTH, true)
    });
  }
}
