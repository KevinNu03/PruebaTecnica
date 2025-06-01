import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from "primeng/floatlabel"
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { UsuarioService } from '../../services/usuario.service';
import { tap } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { publicRoutes } from '../../../../core/interceptors/public-private-routes';
import { Estudiante } from '../../../../shared/models/Estudiante';

@Component({
  selector: 'app-usuario',
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    ConfirmDialog,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class UsuarioComponent implements OnInit {
  idEstudiante!: number;
  usuarioForm!: FormGroup;
  coincidePassword: boolean = true;
  constructor(
    private localStorage: LocalStorageService,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      identificacion: ['', [Validators.required, Validators.max(999999999999999)]],
      nombreEstudiante: ['', [Validators.required, Validators.maxLength(50)]],
      contrasena: ['',],
      confirmarContrasena: ['',]
    });

    //se trae el idEstudiante
    this.idEstudiante = this.localStorage.getIdEstudiante();

    //se trae la informacion del estudiante
    this.usuarioService.GetEstudiante(this.idEstudiante)
      .pipe(
        tap(response => {
          this.usuarioForm = this.fb.group({
            identificacion: [response.value.identificacion, [Validators.required, Validators.max(999999999999999)]],
            nombreEstudiante: [response.value.nombreEstudiante, [Validators.required, Validators.maxLength(50)]],
            contrasena: ['',],
            confirmarContrasena: ['',]
          });
        })
      )
      .subscribe({
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: err });
        }
      });
  }

  validarContrasenas() {
    const contrasena = this.usuarioForm.get('contrasena')?.value;
    const confirmarContrasena = this.usuarioForm.get('confirmarContrasena')?.value;

    if (contrasena != confirmarContrasena) {
      this.coincidePassword = false;
    } else {
      this.coincidePassword = true;
    }
  }

  eliminarEstudiante() {
    this.confirmationService.confirm({
      header: 'Esta Seguro?',
      message: 'Por favor continuar para proceder',
      accept: () => {
        this.usuarioService.DeleteEstudiante(this.idEstudiante)
          .pipe(
            tap(response => {
              if (response.value) {
                alert(response.message);
                this.router.navigate([`/${publicRoutes.LOGIN}`])
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
        this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Transaccion Cancelada' });
      },
    });
  }

  actualizarEstudiante() {
    this.validarContrasenas();
    const Estudiante: Estudiante = {
      IdEstudiante: this.idEstudiante,
      identificacion: String(this.usuarioForm.get('identificacion')?.value) || '',
      nombreEstudiante: String(this.usuarioForm.get('nombreEstudiante')?.value) || '',
      contrasena: !this.coincidePassword || String(this.usuarioForm.get('contrasena')?.value) == '' || String(this.usuarioForm.get('confirmarContrasena')?.value) == '' ? '': String(this.usuarioForm.get('contrasena')?.value) || '',
    }

    this.usuarioService.UpdateEstudiante(Estudiante)
      .pipe(
        tap(response => {
          if (response.value) {
            alert(response.message);
            window.location.reload();
          }
        })
      )
      .subscribe({
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: err });
        }
      });
  }
}
