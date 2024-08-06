import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  getAllAlbums(){
    return this.http.get<any>(`${this.backendUrl}/api/albums`);
  }


  displayCover(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/api/albums/cover/${id}`, { responseType: 'blob' });
  }

  criticiseAlbum(criticiseForm: any, albumId: number){
    const params = new HttpParams()
      .set('albumId', albumId.toString());
    return this.http.post(`${this.backendUrl}/api/albums/criticise`, criticiseForm, {params})
  }

  getAlbum(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/albums/${id}`);
  }

  getAlbumReviews(id:number){
    return this.http.get<any>(`${this.backendUrl}/api/albums/review/${id}`);
  }

  getAlbumReviewOverall(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/albums/overall/${id}`);
  }

  getAlbumMusic(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/albums/music/${id}`);
  }
}
