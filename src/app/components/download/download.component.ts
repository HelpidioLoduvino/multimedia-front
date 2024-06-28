import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {DownloadService} from "../../services/download.service";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-download',
  standalone: true,
  providers: [DownloadService],
  imports: [
    NavbarComponent,
    FooterComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent implements OnInit{

  contentList: any[] = [];

  constructor(private downloadService: DownloadService, private router: Router) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('id')!;
    this.downloadService.getDownloadedContents(userId).subscribe(response=>{
      this.contentList = response;
    })
  }

  playDownloaded(path: string){
    this.router.navigate(['/play-downloaded', path]);
  }

}
