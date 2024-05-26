import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private baseMusicUrl = 'http://localhost:8080/api/music';
  private baseVideoUrl = 'http://localhost:8080/api/video';
  private baseContentUrl = 'http://localhost:8080/api/content';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient, private router: Router) { }

  uploadMusic(music: any, musicFile: File, imageFile: File): Observable<any>{

    const formData: FormData = new FormData();
    formData.append('music', new Blob([JSON.stringify(music)], { type: 'application/json' }));
    formData.append('musicFile', musicFile);
    formData.append('imageFile', imageFile);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.post<any>(`${this.baseMusicUrl}/upload`, formData, {headers})
  }

  getAllContent(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<any[]>(`${this.baseContentUrl}/all`, { headers });
  }

  getContentById(id: number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<any>(`${this.baseContentUrl}/${id}`, {headers});
  }

  playContent(id: number): Observable<Blob>{

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.get(`${this.baseContentUrl}/play/${id}`, { headers, responseType: 'blob' })
  }

  getImage(id: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return this.http.get(`${this.baseMusicUrl}/display/${id}`, { headers, responseType: 'blob' });
  }

  uploadVideo(video: any, videoFile: File){
    const formData: FormData = new FormData();
    formData.append('video', new Blob([JSON.stringify(video)], { type: 'application/json'}));
    formData.append('videoFile', videoFile);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.post<any>(`${this.baseVideoUrl}/upload`, formData, {headers});
  }

}
