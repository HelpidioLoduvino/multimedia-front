import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ContentService} from "../../services/content.service";
import {FooterComponent} from "../footer/footer.component";
import {NgForOf, NgIf} from "@angular/common";
import {GroupService} from "../../services/group.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";


@Component({
  selector: 'app-upload-video',
  standalone: true,
    providers: [ContentService, GroupService],
  imports: [
    FormsModule,
    MatStep,
    MatStepLabel,
    MatStepper,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    NgForOf,
    AdminNavbarComponent,
    NgIf
  ],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.css'
})
export class UploadVideoComponent implements OnInit{

  video: any = {
    title: '',
    description: '',
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
    features: []
  };
  selectedGroupName: string = '';
  path!: File;
  features: string = '';
  currentYear: number;
  groups: any[] = [];
  isAdmin = localStorage.getItem('userRole');

  constructor(private contentService: ContentService,
              private groupService: GroupService,
              private router: Router,
              private snackBar: MatSnackBar
              ) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.groupService.getAllMyGroups().subscribe(response=>{
      this.groups = response.body;
    });
  }


  onVideoFileChange(event: any) {
    if(event.target.files.length > 0){
      this.path = event.target.files[0];
    }
  }

  onSubmit(){
    this.video.features = this.features.split(',').map(feature => ({ artistName: feature.trim() }));
    if(this.path){
      this.contentService.uploadVideo(this.video, this.selectedGroupName, this.path).subscribe({
        next: (response) => {
          this.router.navigate(["/home"]).then(r => {
            this.snackBar.open("Vídeo Carregada com Sucesso", 'Fechar', {
              duration: 3000,
              panelClass: ['snackbar-success']
            });
          });
        }, error: (error) =>{
          console.error("Video upload failed!");
        }
      })
    } else {
      console.error("Video file is required!")
    }
  }

}
