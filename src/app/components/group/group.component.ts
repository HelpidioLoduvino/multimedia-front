import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {

}
