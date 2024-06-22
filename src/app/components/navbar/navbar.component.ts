import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {NotificationService} from "../../services/notification.service";
import {Subscription} from "rxjs";
import { IconsModule } from "../../icons/icons.module";
import {LucideAngularModule} from "lucide-angular";


@Component({
  selector: 'app-navbar',
  standalone: true,
  providers: [UserService, NotificationService],
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatButton,
    NgForOf,
    IconsModule,
    LucideAngularModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{

  isSidebarOpened: boolean = false;
  notifications: any[] = [];
  private pollingSubscription!: Subscription;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.startPolling();
  }

  startPolling() {
    this.pollingSubscription = this.notificationService.pollNotifications().subscribe({
      next: (response) =>{
        if(response){
          this.notifications.push(...response)
          console.log(response);
        }
        this.startPolling()
      }, error: (error) =>{
        console.error('Polling failed', error);
        setTimeout(() => this.startPolling(), 5000);
      }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  openGroup(id: number){
    this.router.navigate(['/group', id]);
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
