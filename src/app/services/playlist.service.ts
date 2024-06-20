import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private basePlaylistUrl = 'http://localhost:8080/api/playlist';

  constructor(private http: HttpClient) { }

  addPlaylist(playlist: any, contentIds: number[]){
    const params = new HttpParams().set('contentIds', contentIds.toString())
    return this.http.post(`${this.basePlaylistUrl}/add`, playlist, {params, observe: "response"});
  }


  getAllPlaylistsByUserId(){
    return this.http.get<any>(`${this.basePlaylistUrl}/user-playlists`);
  }

  getAllPublicPlaylists(){
    return this.http.get<any>(`${this.basePlaylistUrl}/public-playlists`)
  }

  getPlaylistById(id: number){
    return this.http.get<any>(`${this.basePlaylistUrl}/playlist/${id}`);
  }

  deletePlaylist(id: number){
    return this.http.delete(`${this.basePlaylistUrl}/delete/${id}`);
  }

  addContentToPlaylist(contentId: number, playlistId: number){
    return this.http.post<any>(`${this.basePlaylistUrl}/add-content-to-playlist`, {contentId, playlistId});
  }

}
