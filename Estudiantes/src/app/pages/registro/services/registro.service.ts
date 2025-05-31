import { Injectable, model } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Estudiante } from '../../../shared/models/Estudiante';
import { ResponseRegistro } from '../../../shared/models/Responses';
import { REQUIRES_AUTH } from '../../../core/interceptors/auth-context';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = environment.urlWebApiEstudiantes;
  constructor(private http: HttpClient) { }

  Registro(Estudiante: Estudiante){
    return this.http.post<ResponseRegistro>(`${this.apiUrl}/api/Login/RegistrarEstudiante`, Estudiante);
  }
}
