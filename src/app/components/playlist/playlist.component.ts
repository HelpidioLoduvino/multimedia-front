import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {AddPlaylistComponent} from "../add-playlist/add-playlist.component";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterLink,
    MatButton
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      height: '350px',
      data: {
        title: 'Adicionar Playlist',
        component: AddPlaylistComponent,
        componentData: {  }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
