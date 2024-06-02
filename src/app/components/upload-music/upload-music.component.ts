import {Component} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ContentService} from "../../services/content.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FooterComponent} from "../footer/footer.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {ContentShareGroupComponent} from "../modal/content-share-group/content-share-group.component";


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
    FormsModule,
    FooterComponent
  ],
  templateUrl: './upload-music.component.html',
  styleUrl: './upload-music.component.css'
})
export class UploadMusicComponent{

  music: any = {
    title: '',
    lyric: '',
    contentStatus: '',
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
  groups: any[] = [];

  constructor(
    private contentService: ContentService,
    private snackBar: MatSnackBar,
    private modal: MatDialog
  ) {
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
          console.log("Id do Conteudo:" + response.body.id);
          const contentId:number = response.body.id;
          const dialogRef = this.modal.open(ModalComponent, {
            width: '350px',
            height: '310px',
            data: {
              title: 'Partilhar Com:',
              component: ContentShareGroupComponent,
              componentData: {contentId: contentId}
            }
          });

          dialogRef.afterClosed().subscribe(result => {
          });
        },
        error: (error) => {
          console.log("Upload failed", error);
        }
      })
    } else {
      console.error('music and cover are required');
    }
  }


}
