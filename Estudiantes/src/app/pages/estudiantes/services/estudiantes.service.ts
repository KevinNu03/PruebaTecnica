import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpContext } from '@angular/common/http';
import { ResponseEstudianteXMaterias } from '../../../shared/models/Responses';
import { REQUIRES_AUTH } from '../../../core/interceptors/auth-context';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private apiUrl = environment.urlWebApiEstudiantes;
  constructor(private http: HttpClient) { }

  GetEstudianteXMaterias(IdEstudiante: number){
    return this.http.get<ResponseEstudianteXMaterias>(`${this.apiUrl}/api/Estudiante/GetEstudianteXMaterias/${IdEstudiante}`,{
      context: new HttpContext().set(REQUIRES_AUTH, true)
    });
  }
}
