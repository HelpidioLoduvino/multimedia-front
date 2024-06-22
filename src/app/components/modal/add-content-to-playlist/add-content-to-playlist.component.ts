import {Component, Inject, OnInit} from '@angular/core';
import { ContentService } from "../../../services/content.service";
import { NgForOf } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { PlaylistService } from "../../../services/playlist.service";
import {FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, FormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-content-to-playlist',
  standalone: true,
  providers: [ContentService, PlaylistService],
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-content-to-playlist.component.html',
  styleUrls: ['./add-content-to-playlist.component.css']
})
export class AddContentToPlaylistComponent implements OnInit {

  playlists: any[] = [];
  selectedPlaylists: number[] = [];
  contentId!: number;

  constructor(
    private contentService: ContentService,
    private playlistService: PlaylistService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: MatSnackBar
  ) {
    this.contentId = data.componentData.contentId;
  }


  ngOnInit(): void {
    this.playlistService.getAllPlaylistsByUserId().subscribe({
      next: (response) => {
        this.playlists = response.body;
      },
      error: (error) => {
        console.error("Erro ao carregar conteúdos", error);
      }
    });

  }

  onCheckboxChange(playlistId: number, event: any) {
    if (event.target.checked) {
      this.selectedPlaylists.push(playlistId);
    } else {
      this.selectedPlaylists = this.selectedPlaylists.filter(id => id !== playlistId);
    }
  }

  onSubmit(){
    this.playlistService.addContentToPlaylist(this.contentId, this.selectedPlaylists).subscribe(response =>{
      if(response.ok){
        this.toast.open("Conteúdo adicionado!", 'Fechar', {
          duration: 2000, panelClass: ['success']
        });
      } else {
        this.toast.open("Falha ao adicionar conteúdo na playlist!", 'Fechar', {
          duration: 2000, panelClass: ['error']
        });
      }
    });
  }

}
