import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ContentService} from "../../services/content.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

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

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit(): void {
    this.contentService.getAllContent().subscribe(data => {
      this.contents = data;
      console.log(data);
      this.loadImages();
    });
  }

  play(id: number) {
    this.router.navigate(['/play', id]);
  }

  loadImages(): void {
    this.contents.forEach(music => {
      this.getImage(music.id);
    });
  }


  getImage(id: number): void {
    this.contentService.getImage(id).subscribe({
      next: (response) => {
        this.imageUrls[id] = window.URL.createObjectURL(response);
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
