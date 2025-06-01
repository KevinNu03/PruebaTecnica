import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { publicRoutes } from '../../core/interceptors/public-private-routes';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [{ label: 'Inicio', icon: PrimeIcons.HOME, routerLink: [`/${publicRoutes.HOME}`] }]
            },
            {
                label: 'Estudiantes',
                items: [
                    { label: 'Estudiantes', icon: PrimeIcons.ID_CARD, routerLink: [`/${publicRoutes.ESTUDIANTES}`] },
                    { label: 'Materias', icon: PrimeIcons.LIST, routerLink: [`/${publicRoutes.MATERIAS}`] },
                ]
            }
        ];
    }
}
