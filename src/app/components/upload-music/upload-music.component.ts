import {Component, OnInit} from '@angular/core';
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
import {NgForOf} from "@angular/common";
import {GroupService} from "../../services/group.service";
import {Router} from "@angular/router";


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
    FooterComponent,
    NgForOf
  ],
  templateUrl: './upload-music.component.html',
  styleUrl: './upload-music.component.css'
})
export class UploadMusicComponent implements OnInit{

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
      name: '',
      label: {
        name: ''
      },

      band: {
        name: '',
        history: '',
        start: '',
        end: ''
      },
    },
    features: [],
    songwriters: []
  };
  selectedGroupName: string = '';
  path!: File;
  cover!: File;
  features: string = '';
  songwriters: string = '';
  currentYear: number;
  groups: any[] = [];

  constructor(
    private contentService: ContentService,
    private snackBar: MatSnackBar,
    private modal: MatDialog,
    private router: Router,
    private groupService: GroupService
  ) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.groupService.getAllMyGroups().subscribe(response=>{
      this.groups = response.body;
    });
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
    this.music.features = this.features.split(',').map(feature => ({ name: feature.trim() }));
    this.music.songwriters = this.songwriters.split(',').map(writer => ({ name: writer.trim() }));
    if( this.cover && this.path){
      this.contentService.uploadMusic(this.music, this.selectedGroupName, this.path, this.cover).subscribe( {
        next: (response) =>{
          this.router.navigate(["/home"]).then(r => {
            this.snackBar.open("Música Carregada com Sucesso", 'Fechar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          });
        }, error: (error) => {
          this.snackBar.open("Erro ao carregar a música", 'Fechar', {
            duration: 1000,
            panelClass: ['snackbar-error']
          });
        }
      });
    } else {
      this.snackBar.open("Campos Nulos!!", 'Fechar', {
        duration: 1000,
        panelClass: ['snackbar-error']
      });
      console.error('music and cover are required');
    }
  }

}
