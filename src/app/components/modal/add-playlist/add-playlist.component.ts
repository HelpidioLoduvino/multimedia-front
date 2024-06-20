import {Component, OnInit} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {ContentService} from "../../../services/content.service";
import {NgForOf} from "@angular/common";
import {PlaylistService} from "../../../services/playlist.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-playlist',
  standalone: true,
  providers: [ContentService, PlaylistService],
  imports: [
    MatStepper,
    MatStep,
    MatStepLabel,
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.css'
})
export class AddPlaylistComponent implements OnInit{

  contents: any[] = [];
  selectedContents: number[] = [];
  name: string = '';
  status: string = '';

  constructor(
    private contentService: ContentService,
    private playlistService: PlaylistService,
    private toast: MatSnackBar) {}

  ngOnInit(): void {
    this.contentService.getAllContent().subscribe(data => {
      this.contents = data.body;
    });
  }

  onCheckboxChange(contentId: number, event: any) {
    if (event.target.checked) {
      this.selectedContents.push(contentId);
    } else {
      this.selectedContents = this.selectedContents.filter(id => id !== contentId);
    }
  }

  submitPlaylist(){
    const  playlist = {
      name: this.name,
      status: this.status,
    };

    this.playlistService.addPlaylist(playlist, this.selectedContents).subscribe(response=>{
      if(response.ok){
        this.toast.open("Playlist adicionada com sucesso",'Fechar', {
          duration: 2000, panelClass: ['success']
        });
      } else {
        this.toast.open("Erro ao adicionar Playlist!",'Fechar', {
          duration: 2000, panelClass: ['error']
        });
      }
    });
  }


}
