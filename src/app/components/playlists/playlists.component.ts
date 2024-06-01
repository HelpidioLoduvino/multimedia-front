import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {AddPlaylistComponent} from "../modal/add-playlist/add-playlist.component";
import {PlaylistService} from "../../services/playlist.service";
import {NgForOf, NgIf} from "@angular/common";
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
    FooterComponent,
    NgIf
  ],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})
export class PlaylistsComponent implements OnInit{

  myPlaylists: any[] = [];
  publicPlaylists: any[] = [];

  constructor(public dialog: MatDialog,
              private playlistService: PlaylistService,
              private router: Router
              ) {}

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
    this.playlistService.getAllPlaylistsByUserId().subscribe({
      next: (response) => {
        this.myPlaylists = response.body;
      }, error: (error) => {
        console.error("Erro ao recuperar playlists");
      }
    });

    this.playlistService.getAllPublicPlaylists().subscribe({
      next: (response) => {
        this.publicPlaylists = response.body;
      }, error: (error) => {
        console.error("Erro ao recuperar playlists");
      }
    });

  }

  getPlaylistById(id: number) {
    this.router.navigate(['/playlist', id]);
  }

}
