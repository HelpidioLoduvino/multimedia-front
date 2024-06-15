import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {filter, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private baseMusicUrl = 'http://localhost:8080/api/music';
  private baseVideoUrl = 'http://localhost:8080/api/video';
  private baseContentUrl = 'http://localhost:8080/api/content';

  constructor(private http: HttpClient, private router: Router) { }

  uploadMusic(music: any, group: string, musicFile: File, imageFile: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('music', new Blob([JSON.stringify(music)], { type: 'application/json' }));
    formData.append('musicFile', musicFile);
    formData.append('imageFile', imageFile);
    const params = new HttpParams()
      .set('group', group.toString());

    return this.http.post<any>(`${this.baseMusicUrl}/upload`, formData, {params})
  }

  uploadVideo(video: any, group: string, videoFile: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('video', new Blob([JSON.stringify(video)], { type: 'application/json'}));
    formData.append('videoFile', videoFile);
    const params = new HttpParams()
      .set('group', group.toString());
    return this.http.post<any>(`${this.baseVideoUrl}/upload`, formData, {params});
  }

  getAllContent() {
    return this.http.get<any>(`${this.baseContentUrl}/all-contents-by-user-id`);
  }

  getContentById(id: number) {
    return this.http.get<any>(`${this.baseContentUrl}/${id}`);
  }

  streamContent(contentId: number): string{
    return `${this.baseContentUrl}/stream-content/${contentId}`;
  }

  displayCover(id: number): Observable<Blob> {

    return this.http.get(`${this.baseMusicUrl}/cover/${id}`, { responseType: 'blob' });
  }

}
