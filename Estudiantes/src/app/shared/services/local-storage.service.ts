import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getToken(){
    localStorage.getItem('token');
  }

  setToken(token: string){
    localStorage.setItem('token', token)
  }
}
