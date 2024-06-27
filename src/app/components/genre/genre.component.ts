import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {ContentService} from "../../services/content.service";
import {NgForOf} from "@angular/common";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-genre',
  standalone: true,
  providers: [ContentService],
  imports: [
    NavbarComponent,
    NgForOf,
    FooterComponent
  ],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent implements OnInit{

  genres: any[] = [];

  constructor(private contentService: ContentService) {
  }

  ngOnInit(): void {
    this.contentService.allContents().subscribe(response=>{
      this.genres = response;
    })
  }

}
