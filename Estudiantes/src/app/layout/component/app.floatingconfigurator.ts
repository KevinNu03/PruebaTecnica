import { Component, computed, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
    selector: 'app-floating-configurator',
    standalone: true,
    imports: [ButtonModule, StyleClassModule, AppConfigurator],
    template: `
        <div class="fixed flex gap-4 top-8 right-8">
            <p-button type="button" (onClick)="toggleDarkMode(true)" [rounded]="true" [icon]="isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" />
            <div class="relative">
                <p-button icon="pi pi-palette" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true" type="button" rounded />
                <app-configurator />
            </div>
        </div>
    `
})
export class AppFloatingConfigurator implements OnInit {
    modoOscuro: boolean = false;
    LayoutService = inject(LayoutService);
    localStorage = inject(LocalStorageService);

    isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

    ngOnInit(): void {
    if(this.localStorage.getModoOscuro() == 1){
      this.modoOscuro = true;
    }
    this.toggleDarkMode(false);
  }

    toggleDarkMode(id: boolean) {
    if(id){
      this.modoOscuro = !this.modoOscuro;
    }
    this.localStorage.setModoOscuro(this.modoOscuro? 1: 0);
    this.LayoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: this.modoOscuro,
    }));
    }
}
