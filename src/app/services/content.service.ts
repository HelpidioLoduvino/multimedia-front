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

    return this.http.post<any>(`${this.backendUrl}/api/musics`, formData, {params})
  }

  uploadVideo(video: any, group: string, videoFile: File): Observable<any>{
    const formData: FormData = new FormData();
    formData.append('video', new Blob([JSON.stringify(video)], { type: 'application/json'}));
    formData.append('videoFile', videoFile);
    const params = new HttpParams()
      .set('group', group.toString());
    return this.http.post<any>(`${this.backendUrl}/api/videos`, formData, {params});
  }

  getAllContent() {
    return this.http.get<any>(`${this.backendUrl}/api/contents/user`);
  }

  getContentById(id: number) {
    return this.http.get<any>(`${this.backendUrl}/api/contents/${id}`);
  }

  streamContent(contentId: number): string{
    return `${this.backendUrl}/api/contents/stream/${contentId}`;
  }

  displayCover(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/api/musics/cover/${id}`, { responseType: 'blob' });
  }

  search(query: string){
    const params = new HttpParams().set('query', query.toString());
    return this.http.get<any>(`${this.backendUrl}/api/contents/search`, {params});
  }

  allContents(){
    return this.http.get<any>(`${this.backendUrl}/api/musics`);
  }

  adminContents(){
    return this.http.get<any>(`${this.backendUrl}/api/contents`);
  }

}
