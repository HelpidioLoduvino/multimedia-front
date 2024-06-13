import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-request-to-enter',
  standalone: true,
  providers: [GroupService],
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './request-to-enter.component.html',
  styleUrl: './request-to-enter.component.css'
})
export class RequestToEnterComponent implements OnInit{

  allGroupsExceptMyAndPublic: any[] = [];

  constructor(
    private groupService: GroupService,
  ) {
  }

  ngOnInit(): void {
    this.groupService.getAllExceptMyAndPublicGroups().subscribe({
      next: (response) => {
        this.allGroupsExceptMyAndPublic = response.body;
      }, error: (error) => {
        console.error("Erro ao recuperar Grupos", error);
      }
    });
  }

  onSubmit(groupId: number){
    this.groupService.requestToJoinGroup(groupId).subscribe({
      next: (response) =>{
        console.log("Sucesso", response);
      }, error: (error) => {
        console.error("Erro ao fazer pedido", error);
      }
    })
  }

}
