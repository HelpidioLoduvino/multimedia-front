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
import {Router, RouterLink} from "@angular/router";

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

  allMyGroups: any[] = [];

  constructor(
    private groupService: GroupService,
    private modal: MatDialog,
    private router: Router
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
    this.groupService.getAllMyGroups().subscribe({
      next: (response) => {
        this.allMyGroups = response.body;
        console.log(response.body)
      }, error: (error) => {
        console.error("Erro ao recuperar meus grupos", error);
      }
    })
  }

  openGroup(id: number){
    this.router.navigate(['/group', id]);
  }

}
