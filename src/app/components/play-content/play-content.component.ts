import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ContentService} from "../../services/content.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FormsModule} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-play-content',
  standalone: true,
  providers: [ContentService],
  imports: [HttpClientModule, NgIf, NavbarComponent, NgForOf, RouterLink, SidebarComponent, FormsModule, NgClass],
  templateUrl: './play-content.component.html',
  styleUrl: './play-content.component.css'
})
export class PlayContentComponent implements OnInit, AfterViewInit{

  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef;
  contendId: number | undefined;
  contentUrl: SafeUrl | undefined;
  content: any = {};
  imageUrl: { [key: number]: string } = {};
  currentTime: string = '0:00';
  seekValue: number = 0;
  mediaDuration: number = 0;
  isPlaying: boolean = true;

  constructor(
    private contentService: ContentService,
    private route: ActivatedRoute,
    private sanitize: DomSanitizer) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contendId = +params['id'];
      if (this.contendId) {
        this.displayCover(this.contendId);
        this.playContent(this.contendId);
        this.getContent(this.contendId);
      }
    });
  }


  ngAfterViewInit(): void {
    if (this.audioPlayer) {
      this.addEventListeners(this.audioPlayer);
    }

    if (this.videoPlayer) {
      this.addEventListeners(this.videoPlayer);
    }
  }

  private addEventListeners(player: ElementRef): void {
    if (player) {
      player.nativeElement.addEventListener('timeupdate', () => {
        this.updateTime(player);
      });

      player.nativeElement.addEventListener('loadedmetadata', () => {
        this.onLoad(player);
      });

      player.nativeElement.addEventListener('progress', () => {
        this.updateBuffer(player);
      });
    }
  }


  getContent(id: number){
    this.contentService.getContentById(id).subscribe({
      next: (response) =>{
        this.content = response;
      }, error: (error) => {
        console.error("Erro ao carregar conteúdo", error);
      }
    })
  }

  playContent(id: number){
    this.contentService.playContent(id).subscribe((url) =>{
      this.contentUrl = url;
    })
  }


  displayCover(id: number): void {
    this.contentService.displayCover(id).subscribe({
      next: (response) => {
        const url = window.URL.createObjectURL(response);
        this.imageUrl[id] = <string>this.sanitize.bypassSecurityTrustResourceUrl(url);
      },
      error: (error) => {
        console.error('Error loading cover', error);
      }
    });
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  updateTime(player: ElementRef): void {
    this.currentTime = this.formatTime(player.nativeElement.currentTime);
    this.seekValue = player.nativeElement.currentTime / this.mediaDuration * 100;
  }

  playMedia(): void {
    const player = this.getActivePlayer();
    if (player) {
      if (this.isPlaying) {
        this.pauseMedia();
        this.isPlaying = false;
      } else {
        player.nativeElement.play();
        this.isPlaying = true;
      }
    }
  }

  pauseMedia(): void {
    const player = this.getActivePlayer();
    if (player) {
      player.nativeElement.pause();
    }
  }

  seekMedia(): void {
    const player = this.getActivePlayer();
    if (player) {
      player.nativeElement.currentTime = this.mediaDuration * (this.seekValue / 100);
    }
  }

  onLoad(player: ElementRef): void {
    const duration = player.nativeElement.duration;
    if (!isNaN(duration) && isFinite(duration)) {
      this.mediaDuration = duration;
    }
  }

  updateBuffer(player: ElementRef): void {
    const buffered = player.nativeElement.buffered;
    if (buffered.length > 0) {
      const bufferedEnd = buffered.end(buffered.length - 1);
      this.seekValue = (bufferedEnd / this.mediaDuration) * 100;
    }
  }

  private getActivePlayer(): ElementRef | undefined {
    if (this.audioPlayer && this.audioPlayer.nativeElement.readyState > 0) {
      return this.audioPlayer;
    } else if (this.videoPlayer && this.videoPlayer.nativeElement.readyState > 0) {
      return this.videoPlayer;
    }
    return undefined;
  }


  isMusic(mimetype: string): boolean {
    return mimetype.startsWith('audio/');
  }

  isVideo(mimetype: string): boolean {
    return mimetype.startsWith('video/');
  }

}
