import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { publicRoutes } from './core/interceptors/public-private-routes';

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
        path: publicRoutes.HOME,
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },
        ]
    },
    { path: publicRoutes.LOGIN, component: LoginComponent },
    { path: '**', redirectTo: `/${publicRoutes.LOGIN}` }
];
