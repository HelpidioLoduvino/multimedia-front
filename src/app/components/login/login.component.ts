import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UserService],
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  registerForm!: FormGroup;
  loginForm!: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      userRole: ['CLIENT', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    if(this.registerForm.valid){
      const user = this.registerForm.value;
      this.userService.register(user).subscribe({
        next: (response) => {
          this.snackBar.open('Registo Feito Com Sucesso', 'Fechar', {
            duration: 3000, panelClass: ['snackbar-success']
          });
          this.router.navigate(['/login']).then(r => {})
        }, error: (error) => {
          this.snackBar.open('Erro ao Fazer Registo!', 'Fechar', {
            duration: 3000, panelClass: ['snackbar-error']
          });
          console.error("Erro ao fazer registro", error);
        }
      })
    }else{
      this.snackBar.open('Formulário Inválido!', 'Fechar', {
        duration: 3000, panelClass: ['snackbar-error']
      });
    }
  }

  login(){
    if(this.loginForm.valid){
      const credentials = this.loginForm.value;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.userService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('email', response.email);
          if(response.userRole === "ADMIN"){

          } else if (response.userRole === "CLIENT"){
            this.router.navigate(['']);
          } else if (response.userRole === "MANAGER"){

          }
        },
        error: (error) => {
          this.snackBar.open('Erro ao Iniciar Sessão!', 'Fechar', {
            duration: 3000, panelClass: ['snackbar-error']
          });
          console.error("Erro ao fazer login", error);
        }
      })
    } else {
      this.snackBar.open('Formulário Inválido!', 'Fechar', {
        duration: 3000, panelClass: ['snackbar-error']
      });
      console.error("Formulario invalido")
    }
  }

}
