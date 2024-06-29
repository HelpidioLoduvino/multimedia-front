import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {AlbumService} from "../../services/album.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-album-info',
  standalone: true,
  providers: [AlbumService],
  imports: [
    NavbarComponent,
    FooterComponent,
    NgIf,
    NgOptimizedImage,
    NgForOf,
    AdminNavbarComponent
  ],
  templateUrl: './album-info.component.html',
  styleUrl: './album-info.component.css'
})
export class AlbumInfoComponent implements OnInit{

  album: any = {};
  albumReviews: any[] = [];
  albumMusic: any[] = [];
  albumId!: number;
  reviewOverall: any = {};
  imageUrl: { [key: number]: string } = {};
  isAdmin = localStorage.getItem('userRole');

  constructor(private albumService: AlbumService,
              private router: ActivatedRoute,
              private sanitizer: DomSanitizer
              ) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params=>{
      this.albumId = params['id'];
      if(this.albumId){
        this.getAlbum(this.albumId);
        this.displayCover(this.albumId);
        this.getAlbumReviews(this.albumId);
        this.getAlbumReviewOverall(this.albumId);
        this.getAlbumMusic(this.albumId);
      }
    })
  }

  getAlbum(id: number){
    this.albumService.getAlbum(id).subscribe(response=>{
      this.album = response;
    })
  }

  displayCover(id: number): void {
    this.albumService.displayCover(id).subscribe(response=>{
      const url = window.URL.createObjectURL(response);
      this.imageUrl[id] = <string>this.sanitizer.bypassSecurityTrustUrl(url);
    });
  }

  getAlbumReviews(id: number){
    this.albumService.getAlbumReviews(id).subscribe(response=>{
      this.albumReviews = response;
    });
  }

  getAlbumReviewOverall(id: number){
    this.albumService.getAlbumReviewOverall(id).subscribe(response=>{
      this.reviewOverall = response;
    });
  }

  getAlbumMusic(id: number){
    this.albumService.getAlbumMusic(id).subscribe(response=>{
      this.albumMusic = response;
      console.log(this.albumMusic);
    });
  }

}
