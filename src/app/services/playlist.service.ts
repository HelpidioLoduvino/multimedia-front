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

  getAllPlaylistsByUserId(){
    return this.http.get<any>(`${this.basePlaylistUrl}/user-playlists`);
  }

  getAllPublicPlaylists(){
    return this.http.get<any>(`${this.basePlaylistUrl}/public-playlists`)
  }

  getPlaylistById(id: number){
    return this.http.get<any>(`${this.basePlaylistUrl}/${id}`);
  }

  deletePlaylist(id: number){
    return this.http.delete(`${this.basePlaylistUrl}/delete/${id}`);
  }

  addContentToPlaylist(contentId: number, playlistId: number){
    return this.http.post<any>(`${this.basePlaylistUrl}/add-content-to-playlist`, {contentId, playlistId});
  }

}
