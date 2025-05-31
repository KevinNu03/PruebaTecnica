import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { StyleClassModule } from 'primeng/styleclass';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CardModule, ButtonModule, StyleClassModule, ToastModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    providers: [MessageService]
})
export class HomeComponent {
    constructor(private messageService: MessageService
    ) {}

    show() {
        console.log('Show function called');
        this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Message Content', life: 3000 });
    }

}
