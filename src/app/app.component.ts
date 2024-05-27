import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthInterceptorService} from "./services/auth-interceptor.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'multimediaFront';
}
