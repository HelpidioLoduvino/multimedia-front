import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = environment.backendUrl;
  private token = localStorage.getItem('token');
  private refreshToken: string | null = localStorage.getItem('refreshToken');

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post<any>(`${this.backendUrl}/api/users`, user, {observe: "response"});
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.backendUrl}/api/users/login`, credentials);
  }

  refreshTokenRequest(): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/api/users/refresh`, { refreshToken: this.refreshToken }).pipe(
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
    this.router.navigate(['']);
  }

  allClients(){
    return this.http.get<any>(`${this.backendUrl}/api/users/clients`);
  }

  delete(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.delete(`${this.backendUrl}/api/users`, {params, observe: "response"})
  }

}
