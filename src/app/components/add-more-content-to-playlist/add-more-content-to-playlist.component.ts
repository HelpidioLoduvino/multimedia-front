import {Component, Inject, OnInit} from '@angular/core';
import {PlaylistService} from "../../services/playlist.service";
import {ContentService} from "../../services/content.service";
import {NgForOf} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-more-content-to-playlist',
  standalone: true,
  providers: [PlaylistService, ContentService],
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './add-more-content-to-playlist.component.html',
  styleUrl: './add-more-content-to-playlist.component.css'
})
export class AddMoreContentToPlaylistComponent implements OnInit{

  contents: any[] = [];
  selectedContentId!: number;
  playlistId!: number;

  constructor(
    private playlistService: PlaylistService,
    private contentService: ContentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.playlistId = data.componentData.id;
  }

  ngOnInit(): void {
    this.contentService.getAllContent().subscribe({
      next: (response) => {
        this.contents = response;
      }, error: (error) => {
        console.error("Erro ao recuperar Conteudos");
      }
    })
  }

  onCheckboxChange(event: Event): void {
    const radio = event.target as HTMLInputElement;
    this.selectedContentId = +radio.value;
  }

  onSubmit(){
    if(this.selectedContentId){
      this.playlistService.addContentToPlaylist(this.selectedContentId, this.playlistId).subscribe({
        next: (response) =>{
          window.location.reload();
          console.log("Sucesso", response);
        }, error: (error) =>{
          console.error("Erro ao fazer upload", error);
        }
      })
    } else {
      console.error("Conteudo nao encontrado");
    }
  }

}
