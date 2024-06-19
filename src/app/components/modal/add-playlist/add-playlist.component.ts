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
  playlistForm!: FormGroup;

  constructor(
    private contentService: ContentService,
    private playlistService: PlaylistService,
    private formBuilder: FormBuilder,
    private toast: MatSnackBar) {}

  ngOnInit(): void {
    this.contentService.getAllContent().subscribe(data => {
      this.contents = data;
    });

    this.playlistForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['Público', Validators.required]
    });
  }

  onSubmit(){
    if(this.playlistForm.valid){
      this.playlistService.addPlaylist(this.playlistForm.value).subscribe({
        next: (response) => {
          console.log("Playlist added successfully!", response);
          this.playlistForm.reset();
          window.location.reload();
        }, error: (error) => {
          this.toast.open("Erro ao criar Playlist!", "Fechar", {
            duration: 3000, panelClass: ['error']
          })
          console.error("Error creating playlist!", error)
        }
      });
    } else {
      this.toast.open("Formulário Inválido!", "Fechar", {
        duration: 3000, panelClass: ['error']
      })
      console.log("Invalid Form!");
    }
  }

}
