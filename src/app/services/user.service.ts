import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/user';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient, private router: Router) { }

  register(user: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  isLoggedIn(): boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  logout (): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

}
