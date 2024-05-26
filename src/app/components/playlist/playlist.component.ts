import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterLink
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

}
