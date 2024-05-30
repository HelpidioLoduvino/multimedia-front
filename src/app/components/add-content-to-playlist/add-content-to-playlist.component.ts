import {Component, OnInit} from '@angular/core';
import {ContentService} from "../../services/content.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-add-content-to-playlist',
  standalone: true,
  providers: [ContentService],
  imports: [
    NgForOf
  ],
  templateUrl: './add-content-to-playlist.component.html',
  styleUrl: './add-content-to-playlist.component.css'
})
export class AddContentToPlaylistComponent implements OnInit{

  contents: any[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.getAllContent().subscribe({
      next: (response) => {
        this.contents = response;
      }, error: (error) => {
        console.error("Erro ao carregas conteúdos");
      }
    })
  }

}
