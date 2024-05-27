import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ContentService} from "../../services/content.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";

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
    private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.contentService.getAllContent().subscribe(data => {
      this.contents = data;
      this.loadImages();
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
