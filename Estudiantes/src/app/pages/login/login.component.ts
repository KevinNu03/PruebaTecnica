import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { publicRoutes } from '../../core/interceptors/public-private-routes';
import { Login } from '../../shared/models/Estudiante';
import { LoginService } from './services/login.service';
import { tap, TimeoutError } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { LocalStorageService } from '../../shared/services/local-storage.service';


@Component({
  selector: 'app-login',
  imports: [
    ButtonModule, 
    InputTextModule, 
    PasswordModule, 
    AppFloatingConfigurator,
    RippleModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,
    private localStorage: LocalStorageService
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      identificacion: ['', [Validators.required, Validators.maxLength(15)]],
      contrasena: ['', Validators.required]
    });
  }

  Registro(){
    this.router.navigate([`${publicRoutes.REGISTRO}`])
  }

  Login(){
    const login: Login = {
      identificacion: String(this.loginForm.get('identificacion')?.value),
      contrasena: String(this.loginForm.get('contrasena')?.value)
    }

    this.loginService.Login(login)
    .pipe(
      tap(response => {
        if(response.isSuccess){
          this.messageService.add({ severity: 'success', summary: 'Ingreso', detail: response.message });
          //se guarda el token y el id estudiante en el localstorage
          this.localStorage.setToken(response.token);
          this.localStorage.setIdEstudiante(response.idEstudiante);
          //se redirecciona a el home
          this.router.navigate([`/${publicRoutes.HOME}`])
        }else{
          this.messageService.add({ severity: 'error', summary: 'Error!', detail: response.message });
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
