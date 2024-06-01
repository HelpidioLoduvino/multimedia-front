import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PlaylistService} from "../../services/playlist.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {AddContentToPlaylistComponent} from "../modal/add-content-to-playlist/add-content-to-playlist.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {ContentService} from "../../services/content.service";
import {DomSanitizer} from "@angular/platform-browser";
import {
  AddMoreContentToPlaylistComponent
} from "../modal/add-more-content-to-playlist/add-more-content-to-playlist.component";

@Component({
  selector: 'app-playlist',
  standalone: true,
  providers: [PlaylistService, ContentService],
  imports: [
    FooterComponent,
    NavbarComponent,
    NgForOf,
    RouterLink,
    NgIf,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit{

  playlists: any[] = [];
  images: any[] = [];
  imageUrls: { [key: number]: string } = {};
  playlistId!: number

  constructor(private playlistService: PlaylistService,
              private route: ActivatedRoute,
              private modal: MatDialog,
              private contentService: ContentService,
              private sanitizer: DomSanitizer,
              private router: Router
  ) {}



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playlistId = params['id'];
      this.getPlaylistBydId(this.playlistId);
      this.loadImages(this.playlistId);
    });
  }

  openDialog(contentId: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '350px',
      height: '300px',
      data: {
        title: 'Guardar Vídeo Em...',
        component: AddContentToPlaylistComponent,
        componentData: { contentId: contentId}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openAddContentModal(id: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '350px',
      data: {
        title: 'Adicionar Conteúdo',
        component: AddMoreContentToPlaylistComponent,
        componentData: { id: id }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getPlaylistBydId(id: number){
    this.playlistService.getPlaylistById(id).subscribe({
      next: (response) => {
        this.playlists = response.body;
      }, error: (error) => {
        console.log("Playlist nao encontrada");
      }
    });

  }

  play(id: number) {
    this.router.navigate(['/play', id]);
  }

  contentInfo(id:number){
    this.router.navigate(['/content-info', id]);
  }

  loadImages(id: number): void {
    this.playlistService.getPlaylistById(id).subscribe({
      next: (response) => {
        this.images = response.body;
        this.images.forEach(image => {
          this.displayCover(image.content.id);
        });
      }
    });
  }


  displayCover(id: number): void {
    this.contentService.displayCover(id).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        this.imageUrls[id] = <string>this.sanitizer.bypassSecurityTrustUrl(url);
      },
      error: (error) => {
        console.error('Error loading image', error);
      }
    });
  }

  isMusic(path: string): boolean {
    return path.includes('/music/') && path.endsWith('.mp3');
  }

  isVideo(path: string): boolean {
    return path.includes('/video/') && path.endsWith('.mp4');
  }


}
