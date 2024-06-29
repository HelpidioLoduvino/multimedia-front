import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {ContentService} from "../../services/content.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {UserService} from "../../services/user.service";
import {LucideAngularModule} from "lucide-angular";
import {DomSanitizer} from "@angular/platform-browser";
import {AlbumService} from "../../services/album.service";
import {PlaylistService} from "../../services/playlist.service";
import {Router} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RadioService} from "../../services/radio.service";

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    AdminNavbarComponent,
    NgForOf,
    LucideAngularModule,
    NgIf,
    NgOptimizedImage,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit{

  contents: any[] = [];
  users: any[] = [];
  albums: any[] = [];
  playlists: any[] = [];
  radios: any[] = [];
  image: any = {};
  imageUrls: { [key: number]: string } = {};

  constructor(private contentService: ContentService,
              private userService: UserService,
              private albumService: AlbumService,
              private playlistService: PlaylistService,
              private radioService: RadioService,
              private router: Router,
              private sanitizer: DomSanitizer,
              ) {
  }

  ngOnInit(): void {
    this.contentService.adminContents().subscribe(response=>{
      this.contents = response;
      this.loadImages();
    });

    this.userService.allClients().subscribe(response=>{
      this.users = response;
    });

    this.albumService.getAllAlbums().subscribe(response=>{
      this.albums = response;
    });

    this.playlistService.allPlaylist().subscribe(response=>{
      this.playlists = response
    });

    this.radios = this.radioService.getRadioStations();

  }

  getDaysSinceRegistration(createdAt: string): number {
    const currentDate = new Date();
    const registrationDate = new Date(createdAt);
    currentDate.setHours(0, 0, 0, 0);
    registrationDate.setHours(0, 0, 0, 0);
    const timeDifference = currentDate.getTime() - registrationDate.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24));
  }

  delete(id: number){

  }

  play(id: number) {
    this.router.navigate(['/play', id]);
  }

  contentInfo(id:number){
    this.router.navigate(['/content-info', id]);
  }

  albumInfo(id: number){
    this.router.navigate(['/album', id]);
  }

  getPlaylistById(id: number) {
    this.router.navigate(['/playlist', id]);
  }

  loadImages(): void {
    const contents = this.contents
    const contentIds = contents.map((content: { id: any; }) => content.id);
    contentIds.forEach((id: number) =>{
      this.displayCover(id);
    })
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

  isMusic(mimetype: string){
    return mimetype.startsWith("audio");
  }

  isVideo(mimetype: string){
    return mimetype.startsWith("video");
  }


}
