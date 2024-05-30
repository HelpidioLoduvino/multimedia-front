import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PlaylistService} from "../../services/playlist.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {AddPlaylistComponent} from "../add-playlist/add-playlist.component";
import {AddContentToPlaylistComponent} from "../add-content-to-playlist/add-content-to-playlist.component";

@Component({
  selector: 'app-playlist',
  standalone: true,
  providers: [PlaylistService],
  imports: [
    FooterComponent,
    NavbarComponent,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit{

  playlist: any = {};
  playlistId!: number

  constructor(private playlistService: PlaylistService,
              private route: ActivatedRoute,
              private modal: MatDialog
  ) {}



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playlistId = params['id'];
      this.getPlaylistBydId(this.playlistId);
    });
  }

  openAddContentModal(): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '350px',
      data: {
        title: 'Adicionar Conteúdo',
        component: AddContentToPlaylistComponent,
        componentData: {  }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getPlaylistBydId(id: number){
    this.playlistService.getPlaylistById(id).subscribe({
      next: (response) => {
        this.playlist = response;
        console.log("Sucesso");
      }, error: (error) => {
        console.log("Playlist nao encontrada");
      }
    });

  }


}
