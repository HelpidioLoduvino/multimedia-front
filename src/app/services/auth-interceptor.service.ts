import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // If 401 error, try to refresh the token
          return this.userService.refreshTokenRequest().pipe(
            switchMap((response) => {
              // Save the new tokens
              localStorage.setItem('token', response.token);
              localStorage.setItem('refreshToken', response.refreshToken);

              // Clone the failed request with the new token
              const newAuthReq = req.clone({
                setHeaders: { Authorization: `Bearer ${response.token}` }
              });

              // Retry the failed request
              return next.handle(newAuthReq);
            }),
            catchError((err) => {
              // If refresh token request fails, log out the user
              this.userService.logout();
              return throwError(() => err);
            })
          );
        } else {
          return throwError(() => error);
        }
      })
    );
  }

}
