import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/user';
  private token = localStorage.getItem('token');
  private refreshToken: string | null = localStorage.getItem('refreshToken');

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  refreshTokenRequest(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/refresh`, { refreshToken: this.refreshToken }).pipe(
      tap(tokens => {
        this.token = tokens.token;
        this.refreshToken = tokens.refreshToken;
        if (typeof this.refreshToken === "string") {
          localStorage.setItem('refreshToken', this.refreshToken);
        }
      })
    );
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  logout (): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

}
