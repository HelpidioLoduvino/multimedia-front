import {Component, OnInit} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {ContentService} from "../../services/content.service";
import {NgForOf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-add-playlist',
  standalone: true,
  providers: [ContentService],
  imports: [
    MatStepper,
    MatStep,
    MatStepLabel,
    NgForOf
  ],
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.css'
})
export class AddPlaylistComponent implements OnInit{

  contents: any[] = [];

  constructor(private contentService: ContentService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.contentService.getAllContent().subscribe(data => {
      this.contents = data;
    });
  }

}
