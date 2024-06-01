import {Component, OnInit} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {AddContentToPlaylistComponent} from "../modal/add-content-to-playlist/add-content-to-playlist.component";
import {CreateGroupComponent} from "../modal/create-group/create-group.component";
import {GroupService} from "../../services/group.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-group',
  standalone: true,
  providers: [GroupService],
  imports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    NgIf,
    RouterLink,
    NgForOf
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit{

  publicGroup: any = {};
  allMyGroups: any[] = [];

  constructor(
    private groupService: GroupService,
    private modal: MatDialog,
    ) {}

  openDialog(): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '350px',
      height: '310px',
      data: {
        title: 'Novo Grupo',
        component: CreateGroupComponent,
        componentData: {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit(): void {
    this.groupService.getPublicGroup().subscribe({
      next: (response) => {
        this.publicGroup = response.body;
      }, error: (error) => {
        console.log("Erro ao recuperar Grupo", error);
      }
    });

    this.groupService.getAllMyGroups().subscribe({
      next: (response) => {
        this.allMyGroups = response.body;
      }, error: (error) => {
        console.error("Erro ao recuperar meus grupos", error);
      }
    })
  }

}
