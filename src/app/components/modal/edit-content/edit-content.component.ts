import {Component, Inject, OnInit} from '@angular/core';
import {ContentService} from "../../../services/content.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-edit-content',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './edit-content.component.html',
  styleUrl: './edit-content.component.css'
})
export class EditContentComponent implements OnInit{

  content: any = {};
  contentId!: number

  constructor(private contentService: ContentService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.contentId = data.componentData.contentId;
  }

  ngOnInit(): void {
    this.contentService.getContentById(this.contentId).subscribe(response=>{
      this.content = response;
      console.log(this.content)
    })
  }

}
