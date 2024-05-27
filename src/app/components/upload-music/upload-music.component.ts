import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ContentService} from "../../services/content.service";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-upload-music',
  standalone: true,
  providers: [ContentService],
  imports: [
    NavbarComponent,
    SidebarComponent,
    ReactiveFormsModule,
    MatStep,
    MatFormField,
    MatInput,
    MatStepLabel,
    MatButton,
    MatStepperPrevious,
    MatStepperNext,
    MatStepper,
    FormsModule
  ],
  templateUrl: './upload-music.component.html',
  styleUrl: './upload-music.component.css'
})
export class UploadMusicComponent{

  music: any = {
    title: '',
    lyric: '',
    musicRelease: {
      musicReleaseName: '',
      musicReleaseDescription: '',
      releaseType: '',
      releaseDate: '',
      cover: '',
    },
    genre: { name: '' },
    author: {
      artistName: '',
      label: {
        labelName: ''
      },
      band: {
        bandName: '',
        history: '',
        start: '',
        end: ''
      },
    },
    features: [],
    songwriters: []
  };
  path!: File;
  cover!: File;
  features: string = '';
  songwriters: string = '';
  currentYear: number;

  constructor(
    private formBuilder: FormBuilder,
    private contentService: ContentService,
    private snackBar: MatSnackBar ) {
    this.currentYear = new Date().getFullYear();
  }


  onMusicFileChange(event: any) {
    if(event.target.files.length > 0){
      this.path = event.target.files[0];
    }
  }

  onImageFileChange(event: any) {
    if(event.target.files.length > 0){
      this.cover = event.target.files[0];
    }
  }

  onSubmit() {
    this.music.features = this.features.split(',').map(feature => ({ artistName: feature.trim() }));
    this.music.songwriters = this.songwriters.split(',').map(writer => ({ artistName: writer.trim() }));
    if( this.cover && this.path){
      this.contentService.uploadMusic(this.music, this.path, this.cover).subscribe({
        next: (response) => {
          console.log('Upload successful', response);
        },
        error: (error) => {
          console.log("Upload failed");
        }
      })
    } else {
      console.error('music and cover are required');
    }
  }


}
