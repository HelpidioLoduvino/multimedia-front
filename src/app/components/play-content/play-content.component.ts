import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ContentService} from "../../services/content.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-play-content',
  standalone: true,
  providers: [ContentService],
  imports: [HttpClientModule, NgIf, NavbarComponent, NgForOf, RouterLink, SidebarComponent, FormsModule],
  templateUrl: './play-content.component.html',
  styleUrl: './play-content.component.css'
})
export class PlayContentComponent implements OnInit, AfterViewInit{

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;
  contendId: number | undefined;
  audioUrl: string | undefined;
  content: any;
  imageUrl: { [key: number]: string } = {};
  currentTime: string = '0:00';
  seekValue: number = 0;
  audioDuration: number = 0;
  isPlaying: boolean = false;

  constructor(private contentService: ContentService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contendId = +params['id'];
      if (this.contendId) {
        this.playContent(this.contendId);
        this.getContent(this.contendId);
        this.getImage(this.contendId);
      }
    });
  }


  ngAfterViewInit(): void {
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.addEventListener('timeupdate', () => {
        this.updateTime();
      });

      this.audioPlayer.nativeElement.addEventListener('loadedmetadata', () => {
        this.onLoad();
      });

    }
  }

  getContent(id: number){
    this.contentService.getContentById(id).subscribe({
      next: (response) =>{
        this.content = response;
      }, error: (error) => {
        console.error("Erro ao carregar música", error);
      }
    })
  }

  playContent(id: number) {
    this.contentService.playContent(id).subscribe({
      next: (response) => {
        this.audioUrl = window.URL.createObjectURL(response);
        this.onLoad();
      },
      error: (error) => {
        console.error('Error playing music', error);
      }
    });
  }

  getImage(id: number): void {
    this.contentService.getImage(id).subscribe({
      next: (response) => {
        this.imageUrl[id] = window.URL.createObjectURL(response);
      },
      error: (error) => {
        console.error('Error loading image', error);
      }
    });
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  updateTime() {
    this.currentTime = this.formatTime(this.audioPlayer.nativeElement.currentTime);
    this.seekValue = this.audioPlayer.nativeElement.currentTime / this.audioDuration * 100;
  }

  playAudio() {
    if (this.isPlaying) {
      this.pauseAudio();
      this.isPlaying = false;
    } else {
      this.audioPlayer.nativeElement.play();
      this.isPlaying = true;
    }
  }

  pauseAudio() {
    this.audioPlayer.nativeElement.pause();
  }

  seekAudio() {
    this.audioPlayer.nativeElement.currentTime = this.audioDuration * (this.seekValue / 100);
  }

  onLoad() {
    const duration = this.audioPlayer.nativeElement.duration;
    if (!isNaN(duration) && isFinite(duration)) {
      this.audioDuration = duration;
    }
    console.log(this.audioDuration);
  }

  isMusic(path: string): boolean {
    return path.includes('/music/') && path.endsWith('.mp3');
  }

  isVideo(path: string): boolean {
    return path.includes('/video/') && path.endsWith('.mp4');
  }

}
