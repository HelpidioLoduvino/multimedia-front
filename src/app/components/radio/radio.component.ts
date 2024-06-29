import {Component, OnInit} from '@angular/core';
import {RadioService} from "../../services/radio.service";
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    NavbarComponent,
    NgIf,
    FooterComponent,
    NgForOf
  ],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css'
})
export class RadioComponent implements OnInit{

  radios: any[] = [];
  isAdmin = localStorage.getItem('userRole');

  constructor(private radioService: RadioService) {
  }

  ngOnInit(): void {
    this.radios = this.radioService.getRadioStations();
  }

}
