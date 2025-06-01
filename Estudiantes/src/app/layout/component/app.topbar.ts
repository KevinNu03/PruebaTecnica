import { Component } from '@angular/core';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { UsuarioComponent } from '../../pages/home/components/usuario/usuario.component';
import { ToastModule } from 'primeng/toast';
import { SplitButton } from 'primeng/splitbutton';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { publicRoutes } from '../../core/interceptors/public-private-routes';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    StyleClassModule, 
    AppConfigurator,
    Dialog,
    ButtonModule,
    UsuarioComponent,
    SplitButton, 
    ToastModule
  ],
    templateUrl: './app.topbar.html',
    providers: [MessageService]
})
export class AppTopbar {
  visualizarUsuario: boolean = false;
  items: MenuItem[];
  constructor(
    public layoutService: LayoutService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.items = [
      {
          label: 'Actualizar Estudiante',
          command: () => {
              this.usuario();
          },
          icon: PrimeIcons.USER
      },
      {
          label: 'Cerrar Sesión',
          command: () => {
              this.cerrarSesion();
          },
          icon: PrimeIcons.LOCK
      },
    ];
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }

  usuario(){
    this.visualizarUsuario = true;
  }

  cerrarSesion(){
    this.localStorage.setToken(null);
    this.localStorage.setIdEstudiante(null);
    this.router.navigate([`${publicRoutes.LOGIN}`])
  }
}
