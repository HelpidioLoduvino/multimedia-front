import {Component, Inject, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-request-list',
  standalone: true,
  providers: [UserService, GroupService],
  imports: [
    NgForOf
  ],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit{

  requests: any[] = [];
  users: any[] = [];
  groupId!: number;

  constructor(private groupService: GroupService,
              private toast: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService
  ) {
    this.groupId = data.componentData.groupId;
  }

  ngOnInit(): void {
    this.groupService.getAllRequestsByGroupId(this.groupId).subscribe(response=>{
      this.requests = response;
    });

    this.userService.allClients().subscribe(response=>{
      this.users = response;
    });
  }

  acceptRequest(id: number){
    this.groupService.acceptRequestToJoinGroup(id).subscribe( response=>{
      this.toast.open("Pedido Aceite", 'Fechar', {
        duration: 2000, panelClass: ['success']
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
  }

  rejectRequest(id: number){
    this.groupService.rejectRequestToJoinGroup(id).subscribe(response=>{
      this.toast.open("Pedido Negado", 'Fechar', {
        duration: 3000, panelClass: ['success']
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
  }

}
