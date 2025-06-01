import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { inject } from '@angular/core';
import { publicRoutes } from '../interceptors/public-private-routes';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const localStorage = inject(LocalStorageService);
  const router = inject(Router);
    //de lo contrario tomamos el token y lo enviamos en la peticion
    const token = localStorage.getToken() || "";
    const idEstudiante = localStorage.getIdEstudiante() || "";

    if(token == "" || idEstudiante == "") {
      router.navigate([`${publicRoutes.LOGIN}`]);
      return false;
    }

    return true;
};
