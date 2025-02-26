import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {ArtistService} from "../../services/artist.service";
import {NgForOf} from "@angular/common";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-artist',
  standalone: true,
  providers: [ArtistService],
  imports: [
    NavbarComponent,
    NgForOf,
    FooterComponent
  ],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css'
})
export class ArtistComponent implements OnInit{

  artists: any[] = [];

  constructor(private artistService: ArtistService) {
  }

  ngOnInit(): void {
    this.artistService.getAllArtists().subscribe(response =>{
      this.artists = response;
    });
  }

}
