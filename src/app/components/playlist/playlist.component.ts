import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {AddPlaylistComponent} from "../add-playlist/add-playlist.component";
import {PlaylistService} from "../../services/playlist.service";
import {NgForOf} from "@angular/common";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-playlist',
  standalone: true,
  providers: [PlaylistService],
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterLink,
    MatButton,
    NgForOf,
    FooterComponent
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit{

  playlists: any[] = [];

  constructor(public dialog: MatDialog, private playlistService: PlaylistService) {}

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

  ngOnInit(): void {
    this.playlistService.getAllPlaylist().subscribe({
      next: (response) => {
        this.playlists = response;
      }, error: (error) => {
        console.error("Erro ao recuperar playlists");
      }
    })
  }
}
