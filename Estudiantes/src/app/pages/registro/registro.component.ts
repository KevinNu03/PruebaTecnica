import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { publicRoutes } from '../../core/interceptors/public-private-routes';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { RegistroService } from './services/registro.service';
import { Estudiante } from '../../shared/models/Estudiante';
import { tap } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-registro',
  imports: [
    ButtonModule, 
    InputTextModule, 
    PasswordModule, 
    AppFloatingConfigurator,
    ReactiveFormsModule,
    RippleModule,
    CommonModule,
    ToastModule,
    ConfirmDialog,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class RegistroComponent implements OnInit{
  registerForm!: FormGroup;
  coincidePassword:boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registroService: RegistroService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
          identificacion: ['', [Validators.required, Validators.maxLength(15)]],
          nombre: ['', [Validators.required, Validators.maxLength(50)]],
          contrasena: ['', Validators.required],
          confirmacionContrasena: ['', Validators.required]
        });
  }

  cancel(){
    this.router.navigate([`${publicRoutes.LOGIN}`])
  }

  validarContrasenas(){
    const contrasena = this.registerForm.get('contrasena')?.value;
    const confirmarContrasena = this.registerForm.get('confirmacionContrasena')?.value;

    if(contrasena != confirmarContrasena){
      this.coincidePassword = true;
    }else{
      this.coincidePassword = false;
    }
  }

  onRegister(){
    this.confirmationService.confirm({
            header: 'Esta seguro?',
            message: 'Por favor confirmar para continuar.',
            accept: () => {
                const estudiante: Estudiante = {
                  identificacion: String(this.registerForm.get('identificacion')?.value),
                  nombreCompleto: String(this.registerForm.get('nombre')?.value),
                  contrasena: String(this.registerForm.get('contrasena')?.value),
                }

                this.registroService.Registro(estudiante)
                .pipe(
                  tap(response => {
                    alert(response.message);
                    if(response.isSuccess){
                      this.router.navigate([`${publicRoutes.LOGIN}`]);
                    }
                  })
                )
                .subscribe({
                  error: (err) => {
                    this.messageService.add({ severity: 'error', summary: 'Error!', detail: err });
                  }
                });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rechazado!', detail: 'Valide Nuevamente' });
            },
        });
  }
}
