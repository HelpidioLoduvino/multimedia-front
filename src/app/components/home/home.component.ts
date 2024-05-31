import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ContentService} from "../../services/content.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {FooterComponent} from "../footer/footer.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {AddPlaylistComponent} from "../add-playlist/add-playlist.component";
import {AddContentToPlaylistComponent} from "../add-content-to-playlist/add-content-to-playlist.component";

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [ContentService],
  imports: [
    NavbarComponent,
    SidebarComponent,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    RouterLink,
    FooterComponent,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  contents: any[] = [];
  imageUrls: { [key: number]: string } = {};

  constructor(
    private contentService: ContentService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private modal: MatDialog) {}

  ngOnInit(): void {
    this.contentService.getAllContent().subscribe(data => {
      this.contents = data;
      this.loadImages();
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

  play(id: number) {
    this.router.navigate(['/play', id]);
  }

  contentInfo(id:number){
    this.router.navigate(['/content-info', id]);
  }

  loadImages(): void {
    this.contents.forEach(content => {
      this.displayCover(content.id);
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
