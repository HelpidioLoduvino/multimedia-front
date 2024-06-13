import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private baseAlbumUrl = 'http://localhost:8080/api/album';

  constructor(private http: HttpClient) { }

  getAllAlbums(){
    return this.http.get<any>(`${this.baseAlbumUrl}/all`);
  }


  displayCover(id: number): Observable<Blob> {
    return this.http.get(`${this.baseAlbumUrl}/cover/${id}`, { responseType: 'blob' });
  }

  criticiseAlbum(criticiseForm: any, albumId: number){
    const params = new HttpParams()
      .set('albumId', albumId.toString());
    return this.http.post(`${this.baseAlbumUrl}/criticise-album`, criticiseForm, {params})
  }
}
