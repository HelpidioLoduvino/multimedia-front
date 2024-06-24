import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {GroupService} from "../../services/group.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {ContentService} from "../../services/content.service";
import {DomSanitizer} from "@angular/platform-browser";
import {FooterComponent} from "../footer/footer.component";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {RequestListComponent} from "../modal/request-list/request-list.component";
import {ListGroupUserComponent} from "../modal/list-group-user/list-group-user.component";
import {LucideAngularModule} from "lucide-angular";

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
    NgOptimizedImage,
    LucideAngularModule
  ],
  templateUrl: './get-group.component.html',
  styleUrl: './get-group.component.css'
})
export class GetGroupComponent implements OnInit{

  group: any = {};
  groupId!: number;
  images: any[] = [];
  imageUrls: { [key: number]: string } = {};

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private sanitizer: DomSanitizer,
    private modal: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.groupId = params['id'];
      if(this.groupId){
        this.getGroup(this.groupId);
      }
    });
  }

  getGroup(id: number){
    this.groupService.getGroup(id).subscribe(response=>{
      this.group = response;
      const contents = this.group.contents
      const contentIds = contents.map((content: { id: any; }) => content.id);
      contentIds.forEach((id: number) =>{
        this.displayCover(id);
      })
    });
  }

  addMember(groupId: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '450px',
      height: '400px',
      data: {
        title: 'Adicionar Membro',
        component: RequestListComponent,
        componentData: {groupId: groupId}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  listMembers(groupId: number){
    const dialogRef = this.modal.open(ModalComponent, {
      width: '450px',
      height: '400px',
      data: {
        title: 'Listar Membros',
        component: ListGroupUserComponent,
        componentData: {groupId: groupId}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  play(id: number) {
    this.router.navigate(['/play', id]);
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
    return mimetype.startsWith("audio");
  }

  isVideo(mimetype: string): boolean {
    return mimetype.startsWith("video")
  }

}
