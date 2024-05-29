import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private basePlaylistUrl = 'http://localhost:8080/api/playlist';

  constructor(private http: HttpClient) { }

  addPlaylist(playlist: any){
    return this.http.post<any>(`${this.basePlaylistUrl}/add`, playlist);
  }

  getAllPlaylist(){
    return this.http.get<any[]>(`${this.basePlaylistUrl}/all`);
  }

  deletePlaylist(id: number){
    return this.http.delete(`${this.basePlaylistUrl}/delete/${id}`);
  }

}
