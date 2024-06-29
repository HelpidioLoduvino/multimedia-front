import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PlaylistService} from "../../services/playlist.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {AddContentToPlaylistComponent} from "../modal/add-content-to-playlist/add-content-to-playlist.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {ContentService} from "../../services/content.service";
import {DomSanitizer} from "@angular/platform-browser";
import {LucideAngularModule} from "lucide-angular";
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";

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
    MatMenuTrigger,
    NgOptimizedImage,
    LucideAngularModule,
    AdminNavbarComponent
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit{

  playlist: any = {};
  image: any = {};
  imageUrls: { [key: number]: string } = {};
  playlistId!: number
  isAdmin = localStorage.getItem('userRole');


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

  getPlaylistBydId(id: number){
    this.playlistService.getPlaylistById(id).subscribe({
      next: (response) => {
        this.playlist = response;
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
        this.image = response;
        const contents = this.image.contents;
        const contentIds = contents.map((content: { id: any; }) => content.id);
        contentIds.forEach((id: number) => {
          this.displayCover(id);
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

  isMusic(mimetype: string): boolean {
    return mimetype.startsWith('audio');
  }

  isVideo(mimetype: string): boolean {
    return mimetype.startsWith('video');
  }


}
