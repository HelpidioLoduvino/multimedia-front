import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {UserService} from "../../services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {Subscription} from "rxjs";
import {WebSocketService} from "../../services/web-socket.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-navbar',
  standalone: true,
  providers: [UserService, WebSocketService],
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatButton,
    NgForOf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{
  isSidebarOpened: boolean = false;
  messages: string[] = [];
  private subscription!: Subscription;

  constructor(private userService: UserService,
              private websocketService: WebSocketService,
              private snackBar: MatSnackBar
              ) {
  }

  ngOnInit() {
    this.subscription = this.websocketService.connect('ws://localhost:8080/ws').subscribe((event: MessageEvent) => {
      const message = event.data;
      this.messages.push(message);
      this.snackBar.open(message, 'Fechar', {
        duration: 10000,
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.websocketService.close();
  }

  isLogged(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.logout();
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

}
