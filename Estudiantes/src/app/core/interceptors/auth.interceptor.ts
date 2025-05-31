import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { REQUIRES_AUTH } from './auth-context';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //leer el valor si requiere o no token
  const requiresAuth = req.context.get(REQUIRES_AUTH);

  //validamos si no requiere enviamos la peticion sin el token 
  if(!requiresAuth)return next(req);
   
  const localStorage = inject(LocalStorageService)
  //de lo contrario tomamos el token y lo enviamos en la peticion
  const token = localStorage.getToken();

  if (token == null) {
    return throwError(() => new HttpErrorResponse({
      error: 'Token not found',
      status: 401,
      statusText: 'Unauthorized'
    }));
  }

  const clonedRequest = req.clone({
    setHeaders: {
      authorization: `Bearer ${token}`
    }
  });

  return next(clonedRequest);
};
