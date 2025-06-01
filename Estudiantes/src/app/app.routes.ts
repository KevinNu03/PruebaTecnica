import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { publicRoutes } from './core/interceptors/public-private-routes';
import { authenticationGuard } from './core/guards/authentication.guard';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { MateriasComponent } from './pages/materias/materias.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: publicRoutes.LOGIN,
        component: LoginComponent,
    },
    {
        path: publicRoutes.REGISTRO,
        component: RegistroComponent,
    },
    {
        path: '',
        component: AppLayout,
        children: [
            { path: publicRoutes.HOME, component: HomeComponent },
            { path: publicRoutes.ESTUDIANTES, component: EstudiantesComponent },
            { path: publicRoutes.MATERIAS, component: MateriasComponent },
        ],
        canActivate: [authenticationGuard]
    },
    { path: publicRoutes.LOGIN, component: LoginComponent },
    { path: '**', redirectTo: `/${publicRoutes.LOGIN}` }
];
