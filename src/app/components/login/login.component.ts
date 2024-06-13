import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UserService],
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FooterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
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
            this.router.navigate(['/home']);
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
