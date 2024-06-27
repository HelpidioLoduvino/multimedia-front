import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {filter, map, Observable} from "rxjs";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  uploadMusic(music: any, group: string, musicFile: File, imageFile: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('music', new Blob([JSON.stringify(music)], { type: 'application/json' }));
    formData.append('musicFile', musicFile);
    formData.append('imageFile', imageFile);
    const params = new HttpParams()
      .set('group', group.toString());

    return this.http.post<any>(`${this.backendUrl}/api/music/upload`, formData, {params})
  }

  uploadVideo(video: any, group: string, videoFile: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('video', new Blob([JSON.stringify(video)], { type: 'application/json'}));
    formData.append('videoFile', videoFile);
    const params = new HttpParams()
      .set('group', group.toString());
    return this.http.post<any>(`${this.backendUrl}/api/video/upload`, formData, {params});
  }

  getAllContent() {
    return this.http.get<any>(`${this.backendUrl}/api/content/all-contents-by-user-id`);
  }

  getContentById(id: number) {
    return this.http.get<any>(`${this.backendUrl}/api/content/${id}`);
  }

  streamContent(contentId: number): string{
    return `${this.backendUrl}/api/content/stream-content/${contentId}`;
  }

  displayCover(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/api/music/cover/${id}`, { responseType: 'blob' });
  }

  search(query: string){
    const params = new HttpParams().set('query', query.toString());
    return this.http.get<any>(`${this.backendUrl}/api/content/search`, {params});
  }

  allContents(){
    return this.http.get<any>(`${this.backendUrl}/api/music/all`);
  }

}
