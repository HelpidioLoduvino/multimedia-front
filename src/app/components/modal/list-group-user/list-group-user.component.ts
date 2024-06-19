import {Component, Inject, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForOf, NgIf} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-list-group-user',
  standalone: true,
  providers: [GroupService],
  imports: [
    NgForOf,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgIf
  ],
  templateUrl: './list-group-user.component.html',
  styleUrl: './list-group-user.component.css'
})
export class ListGroupUserComponent implements OnInit{

  members: any = {};
  groupId!: number;

  constructor(private groupService: GroupService,@Inject(MAT_DIALOG_DATA) public data: any, private toast: MatSnackBar) {
    this.groupId = data.componentData.groupId;
  }

  ngOnInit(): void {
    this.groupService.getAllUsersByGroupId(this.groupId).subscribe(response=>{
      this.members = response;
      console.log(response)
    });
  }

  setOwner(userId: number, groupId: number){
    this.groupService.updateUserToOwner(userId, groupId).subscribe(response=>{
      this.toast.open("Utilizador Promovido Para Owner", 'Fechar', {
        duration: 2000, panelClass: ['success']
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

  setEditor(userId: number, groupId: number){
    this.groupService.updateUserToEditor(userId, groupId).subscribe(response=>{
      this.toast.open("Utilizador Promovido Para Editor", 'Fechar', {
        duration: 2000, panelClass: ['success']
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  }

}
