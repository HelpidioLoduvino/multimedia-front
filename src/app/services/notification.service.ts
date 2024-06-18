import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseNotificationUrl = 'http://localhost:8080/api/notification';

  constructor(private http: HttpClient) { }

  pollNotifications(){
    return this.http.get<any>(`${this.baseNotificationUrl}/notifications`).pipe(
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
