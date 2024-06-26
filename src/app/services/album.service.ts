import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private backendUrl = environment.backendUrl;
  private baseAlbumUrl = 'http://localhost:8080/api/album';

  constructor(private http: HttpClient) { }

  getAllAlbums(){
    return this.http.get<any>(`${this.backendUrl}/api/album/all`);
  }


  displayCover(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/api/album/cover/${id}`, { responseType: 'blob' });
  }

  criticiseAlbum(criticiseForm: any, albumId: number){
    const params = new HttpParams()
      .set('albumId', albumId.toString());
    return this.http.post(`${this.backendUrl}/api/album/criticise-album`, criticiseForm, {params})
  }

  getAlbum(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/album/album/${id}`);
  }

  getAlbumReviews(id:number){
    return this.http.get<any>(`${this.backendUrl}/api/album/album-review/${id}`);
  }

  getAlbumReviewOverall(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/album/album-review-overall/${id}`);
  }

  getAlbumMusic(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/album/album-music/${id}`);
  }
}
