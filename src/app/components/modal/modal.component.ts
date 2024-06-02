import {Component, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {NgComponentOutlet} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgComponentOutlet
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
