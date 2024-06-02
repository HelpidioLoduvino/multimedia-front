import {Component, Inject, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-content-share-group',
  standalone: true,
  providers: [GroupService],
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './content-share-group.component.html',
  styleUrl: './content-share-group.component.css'
})
export class ContentShareGroupComponent implements OnInit{

  allMyGroups: any[] = [];
  contentId!: number;

  constructor(
    private groupService: GroupService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toast: MatSnackBar
    ) {
      this.contentId = data.componentData.contentId;
  }

  ngOnInit(): void {
    console.log("Id Conteudo" + this.contentId);
    this.groupService.getAllMyGroups().subscribe({
      next: (response) => {
        this.allMyGroups = response.body;
      }, error: (error) =>{
        console.error("Error finding groups", error);
      }
    })
  }

  onSubmit(groupId: number){
    this.groupService.addContentToGroup(this.contentId, groupId).subscribe({
      next: (response) => {
        console.log("ID CONTEUDOOOO: " + this.contentId);
        this.toast.open("Conteúdo Adicionado Com Sucesso", 'Fechar', {
          duration: 3000, panelClass: ['success']
        });
        console.log("Content added Successfully");
      }, error: (error) =>{
        this.toast.open("Erro ao adicionar Conteúdo no Grupo", 'Fechar', {
          duration: 3000, panelClass: ['error']
        });
        console.error("Error adding Content To Group");
      }
    })
  }

}
