import {Component, Inject, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-content-to-group',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './add-content-to-group.component.html',
  styleUrl: './add-content-to-group.component.css'
})
export class AddContentToGroupComponent implements OnInit{

  contentId!: number;
  groups: any[] = [];
  selectedGroups: number[] = [];

  constructor(private groupService: GroupService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast: MatSnackBar
  )
  {
    this.contentId = data.componentData.contentId;
  }

  ngOnInit(): void {
    this.groupService.getAllMyGroups().subscribe(response=>{
      this.groups = response.body;
    });
  }


  onCheckboxChange(groupId: number, event: any) {
    if (event.target.checked) {
      this.selectedGroups.push(groupId);
    } else {
      this.selectedGroups = this.selectedGroups.filter(id => id !== groupId);
    }
  }

  onSubmit(){
    this.groupService.addContentToGroup(this.contentId, this.selectedGroups).subscribe(response=>{
      if(response.ok){
        this.toast.open("Conteúdo partilhado com sucesso!", 'Fechar', {
          duration: 2000
        });
      }
    });
  }

}
