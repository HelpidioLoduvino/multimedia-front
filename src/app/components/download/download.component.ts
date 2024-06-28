import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {DownloadService} from "../../services/download.service";
import {NgForOf, NgIf} from "@angular/common";

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
  currentMusic: any = null;
  audio = new Audio();

  constructor(private downloadService: DownloadService) { }

  ngOnInit(): void {
    this.downloadService.getDownloadedContents().subscribe(response=>{
      this.contentList = response;
      console.log(this.contentList)
    })
  }

  playMusic(music: any): void {
    if (this.currentMusic) {
      this.audio.pause();
    }
    this.currentMusic = music;
    this.audio.src = music.path;
    this.audio.load();
    this.audio.play();
  }

}
