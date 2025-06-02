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

  setModoOscuro(ModoOscuro: number){
    localStorage.setItem('DarkMode', String(ModoOscuro) || "")
  }

  getModoOscuro(): number{
    return Number(localStorage.getItem('DarkMode'));
  }

  setColor(Color: string){
    localStorage.setItem('Color', String(Color) || "")
  }

  getColor(): string{
    return String(localStorage.getItem('Color'));
  }

  setSurface(Color: string){
    localStorage.setItem('Surface', String(Color) || "")
  }

  getSurface(): string{
    return String(localStorage.getItem('Surface'));
  }

  setPresets(Color: string){
    localStorage.setItem('Presets', String(Color) || "Aura")
  }

  getPresets(): string{
    return String(localStorage.getItem('Presets'));
  }

  setMenuMode(Color: string){
    localStorage.setItem('MenuMode', String(Color) || "static")
  }

  getMenuMode(): string{
    return String(localStorage.getItem('MenuMode'));
  }
}
