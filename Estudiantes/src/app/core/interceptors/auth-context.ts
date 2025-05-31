import { HttpContextToken } from '@angular/common/http';

// validamos si requiere autenticacion y por defecto se pone en true
export const REQUIRES_AUTH = new HttpContextToken<boolean>(() => false);