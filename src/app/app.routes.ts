import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { HomeComponent } from './pages/home/home.component';
import { Landing } from './pages/landing/landing';
import { Notfound } from './pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: HomeComponent },
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
