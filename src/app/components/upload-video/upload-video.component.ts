import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ContentService} from "../../services/content.service";

@Component({
  selector: 'app-upload-video',
  standalone: true,
    providers: [ContentService],
    imports: [
        FormsModule,
        MatStep,
        MatStepLabel,
        MatStepper,
        NavbarComponent,
        SidebarComponent
    ],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.css'
})
export class UploadVideoComponent {

  video: any = {
    title: '',
    description: '',
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
    features: []
  };
  path!: File;
  features: string = '';
  currentYear: number;

  constructor(private contentService: ContentService) {
    this.currentYear = new Date().getFullYear();
  }

  onVideoFileChange(event: any) {
    if(event.target.files.length > 0){
      this.path = event.target.files[0];
    }
  }

  onSubmit(){
    this.video.features = this.features.split(',').map(feature => ({ artistName: feature.trim() }));
    if(this.path ){
      this.contentService.uploadVideo(this.video, this.path).subscribe({
        next: (response) => {
          console.log('Upload successful', response);
        }, error: (error) =>{
          console.error("Video upload failed!");
        }
      })
    } else {
      console.error("Video file is required!")
    }
  }

}
