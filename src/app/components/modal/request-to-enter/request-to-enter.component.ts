import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-request-to-enter',
  standalone: true,
  providers: [GroupService],
  imports: [
    NgForOf
  ],
  templateUrl: './request-to-enter.component.html',
  styleUrl: './request-to-enter.component.css'
})
export class RequestToEnterComponent implements OnInit{

  allGroupsExceptPublic: any[] = [];

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.groupService.getAllGroupsExceptPublic().subscribe({
      next: (response) => {
        this.allGroupsExceptPublic = response.body;
      }, error: (error) => {
        console.error("Erro ao recuperar Grupos");
      }
    })
  }

}
