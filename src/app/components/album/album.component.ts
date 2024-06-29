import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {AlbumService} from "../../services/album.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {DomSanitizer} from "@angular/platform-browser";
import {FooterComponent} from "../footer/footer.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {Router, RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {CriticiseComponent} from "../modal/criticise/criticise.component";
import {LucideAngularModule} from "lucide-angular";
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-album',
  standalone: true,
  providers: [AlbumService],
  imports: [
    NavbarComponent,
    NgForOf,
    NgOptimizedImage,
    FooterComponent,
    MatMenu,
    MatMenuItem,
    RouterLink,
    MatMenuTrigger,
    LucideAngularModule,
    AdminNavbarComponent,
    NgIf
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit{

  albums: any[] = [];
  imageUrls: { [key: number]: string } = {};

  constructor(private albumService: AlbumService,
              private sanitizer: DomSanitizer,
              private modal: MatDialog,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe(response=>{
      this.albums = response;
      this.loadImages();
    })
  }

  loadImages(): void {
    this.albums.forEach(album => {
      this.displayCover(album.id);
    });
  }

  displayCover(id: number): void {
    this.albumService.displayCover(id).subscribe(response=>{
      const url = window.URL.createObjectURL(response);
      this.imageUrls[id] = <string>this.sanitizer.bypassSecurityTrustUrl(url);
    });
  }

  albumInfo(id: number){
    this.router.navigate(['/album', id]);
  }

  openDialog(albumId: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '350px',
      height: '350px',
      data: {
        title: 'Crítica',
        component: CriticiseComponent,
        componentData: { albumId: albumId}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
