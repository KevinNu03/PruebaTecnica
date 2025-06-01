import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpContext } from '@angular/common/http';
import { ResponseEstudiante, ResponseUpdateDeleteEstudiante } from '../../../shared/models/Responses';
import { REQUIRES_AUTH } from '../../../core/interceptors/auth-context';
import { Estudiante } from '../../../shared/models/Estudiante';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.urlWebApiEstudiantes;
  constructor(private http: HttpClient) { }


  GetEstudiante(IdEstudiante: number){
    return this.http.get<ResponseEstudiante>(`${this.apiUrl}/api/Estudiante/GetEstudiante/${IdEstudiante}`,{
      context: new HttpContext().set(REQUIRES_AUTH, true)
    });
  }

  UpdateEstudiante(Estudiante: Estudiante){
    return this.http.post<ResponseUpdateDeleteEstudiante>(`${this.apiUrl}/api/Estudiante/UpdateEstudiante`, Estudiante ,{
      context: new HttpContext().set(REQUIRES_AUTH, true)
    });
  }

  DeleteEstudiante(IdEstudiante: number){
    return this.http.delete<ResponseUpdateDeleteEstudiante>(`${this.apiUrl}/api/Estudiante/DeleteEstudiante/${IdEstudiante}`,{
      context: new HttpContext().set(REQUIRES_AUTH, true)
    });
  }
}
