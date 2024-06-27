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
import {AddContentToPlaylistComponent} from "../modal/add-content-to-playlist/add-content-to-playlist.component";
import {GroupService} from "../../services/group.service";
import {LucideAngularModule} from "lucide-angular";
import {AddContentToGroupComponent} from "../modal/add-content-to-group/add-content-to-group.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
  providers: [ContentService, GroupService],
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
    LucideAngularModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  content: any = {};
  searchContent!: string;
  results: any[] = [];
  image: any = {};
  imageUrls: { [key: number]: string } = {};

  constructor(
    private contentService: ContentService,
    private groupService: GroupService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private modal: MatDialog) {}

  ngOnInit(): void {
    this.groupService.getPublicGroup().subscribe(response=>{
      if(response.ok){
        this.content = response.body;
      }
      this.loadImages();
    });
  }
  saveToPlaylist(contentId: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '350px',
      height: '300px',
      data: {
        title: 'Guardar Conteúdo Em...',
        component: AddContentToPlaylistComponent,
        componentData: { contentId: contentId}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addToGroup(contentId: number){
    const dialogRef = this.modal.open(ModalComponent, {
      width: '350px',
      height: '300px',
      data: {
        title: 'Meus Grupos',
        component: AddContentToGroupComponent,
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
    const contents = this.content.contents
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

  search(){
    this.contentService.search(this.searchContent).subscribe(response=>{
      this.results = response;
    });
  }

  isMusic(mimetype: string){
    return mimetype.startsWith("audio");
  }

  isVideo(mimetype: string){
    return mimetype.startsWith("video");
  }

}
