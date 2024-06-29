import {Component, OnDestroy, OnInit} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";
import {IconsModule} from "../../icons/icons.module";

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  providers:[UserService, NotificationService],
  imports: [
    LucideAngularModule,
    MatMenu,
    MatMenuItem,
    NgForOf,
    NgIf,
    RouterLink,
    MatMenuTrigger,
    IconsModule
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit, OnDestroy{

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

  logout(): void {
    this.userService.logout();
  }

}
