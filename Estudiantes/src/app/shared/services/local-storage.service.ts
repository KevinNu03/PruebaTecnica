import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  setToken(token: string | null){
    localStorage.setItem('token', token || "")
  }

  setIdEstudiante(IdEstudiante: number | null){
    localStorage.setItem('IdEstudiante', String(IdEstudiante) || "")
  }

  getIdEstudiante(): number{
    return Number(localStorage.getItem('IdEstudiante'));
  }
}
