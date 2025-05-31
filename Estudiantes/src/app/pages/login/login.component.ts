import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { publicRoutes } from '../../core/interceptors/public-private-routes';
import { Login } from '../../shared/models/Estudiante';
import { LoginService } from './services/login.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [
    ButtonModule, 
    InputTextModule, 
    PasswordModule, 
    AppFloatingConfigurator,
    RippleModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
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
        alert(response.message);
      })
    )
    .subscribe({
      error: (err) => {
        alert(err);
      }
    })
  }
}
