import {Component, Inject, OnInit} from '@angular/core';
import { ContentService } from "../../services/content.service";
import { NgForOf } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { PlaylistService } from "../../services/playlist.service";
import {FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, FormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

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
  selectedPlaylistId!: number;
  contentId!: number;

  constructor(
    private contentService: ContentService,
    private playlistService: PlaylistService,
    @Inject(MAT_DIALOG_DATA) public data: any
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

  onCheckboxChange(event: Event): void {
    const radio = event.target as HTMLInputElement;
    this.selectedPlaylistId = +radio.value;
  }

  onSubmit(): void {
    if (this.selectedPlaylistId) {
      const playlistId = this.selectedPlaylistId;
      this.playlistService.addContentToPlaylist(this.contentId, playlistId).subscribe({
        next: (response) => {
          window.location.reload();
          console.log("Sucesso", response);
        },
        error: (error) => {
          console.error("Erro ao adicionar conteúdo na playlist", error);
        }
      });
    } else {
      console.error("Nenhum conteúdo selecionado!");
    }
  }
}
