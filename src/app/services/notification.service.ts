import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, of, switchMap} from "rxjs";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  pollNotifications(){
    return this.http.get<any>(`${this.backendUrl}/api/notifications`).pipe(
      catchError(error => {
        console.error('Polling error:', error);
        return of(null);
      }),
      switchMap(response => {
        return of(response).pipe(delay(5000));
      })
    );
  }

}
