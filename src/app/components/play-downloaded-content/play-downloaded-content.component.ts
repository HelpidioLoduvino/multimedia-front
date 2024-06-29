import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {DownloadService} from "../../services/download.service";
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";

@Component({
  selector: 'app-play-downloaded-content',
  standalone: true,
  providers: [DownloadService],
    imports: [
        NgIf,
        NavbarComponent,
        FooterComponent,
        NgForOf,
        RouterLinkActive,
        AdminNavbarComponent
    ],
  templateUrl: './play-downloaded-content.component.html',
  styleUrl: './play-downloaded-content.component.css'
})
export class PlayDownloadedContentComponent implements OnInit{

  contentUrl!: string;
  contentList: any[] = [];
  isAudio!: boolean;
  isAdmin = localStorage.getItem('userRole');

  constructor(private router: ActivatedRoute, private downloadService: DownloadService, private route: Router) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.contentUrl = params['path'];
        this.isAudio = this.contentUrl.endsWith('.mp3');
    });

    const userId = localStorage.getItem('id')!;

    this.downloadService.getDownloadedContents(userId).subscribe(response=>{
      this.contentList = response;
      console.log(this.contentList)
    });
  }

  playDownloaded(path: string){
    this.route.navigate(['/play-downloaded', path]);
  }

}
