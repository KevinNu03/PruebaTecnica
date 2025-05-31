import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../../shared/models/Estudiante';
import { ResponseLogin } from '../../../shared/models/Responses';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.urlWebApiEstudiantes;
  constructor(private http: HttpClient) { }

  Login(Login: Login){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/Login/Login`, Login);
  }
}
