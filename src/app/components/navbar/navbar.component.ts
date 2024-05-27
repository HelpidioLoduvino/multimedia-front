import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {UserService} from "../../services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-navbar',
  standalone: true,
  providers: [UserService],
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatButton
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isSidebarClosed: boolean = true;

  constructor(private userService: UserService) {
  }

  isLogged(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.logout();
  }


  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
}
