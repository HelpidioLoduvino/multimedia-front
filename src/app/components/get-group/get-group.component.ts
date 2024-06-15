import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {ContentService} from "../../services/content.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-get-group',
  standalone: true,
  providers: [GroupService, ContentService],
  imports: [
    NavbarComponent,
    NgForOf,
    MatMenu,
    MatMenuItem,
    NgIf,
    RouterLink,
    FooterComponent,
    MatMenuTrigger,
    NgOptimizedImage
  ],
  templateUrl: './get-group.component.html',
  styleUrl: './get-group.component.css'
})
export class GetGroupComponent implements OnInit{

  contents: any[] = [];
  groupId!: number;
  images: any[] = [];
  imageUrls: { [key: number]: string } = {};

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private sanitizer: DomSanitizer
    ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.groupId = params['id'];
      if(this.groupId){
        this.getAllContentsByGroupId(this.groupId);
        this.loadImages(this.groupId);
      }
    });
  }

  getAllContentsByGroupId(id: number){
    this.groupService.getAllContentsByGroupId(id).subscribe({
      next: (response) => {
        this.contents = response.body;
      }, error: (error) =>{
        console.error("Erro ao recuperar conteúdos", error);
      }
    })
  }

  play(id: number) {
    this.router.navigate(['/play', id]);
  }


  loadImages(id: number): void {
    this.groupService.getAllContentsByGroupId(id).subscribe({
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
