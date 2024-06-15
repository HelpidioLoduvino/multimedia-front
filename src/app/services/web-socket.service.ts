import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket!: WebSocket;
  private subject: Subject<MessageEvent>;

  constructor() {
    this.subject = new Subject<MessageEvent>();
  }

  connect(url: string): Observable<MessageEvent> {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      this.subject.next(event);
    };

    return this.subject.asObservable();
  }

  sendMessage(message: any) {
    this.socket.send(JSON.stringify(message));
  }

  close() {
    this.socket.close();
  }


}
