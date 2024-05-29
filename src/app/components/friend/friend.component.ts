import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-friend',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterLink,
    FooterComponent
  ],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent {

}
