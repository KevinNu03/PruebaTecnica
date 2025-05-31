import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return throwError(() => new HttpErrorResponse({
      error: 'Token not found',
      status: 401,
      statusText: 'Unauthorized'
    }));
  }

  const clonedRequest = req.clone({
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  });

  return next(clonedRequest);
};
