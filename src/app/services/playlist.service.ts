import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  addPlaylist(playlist: any, contentIds: number[]){
    const params = new HttpParams().set('contentIds', contentIds.toString())
    return this.http.post(`${this.backendUrl}/api/playlists`, playlist, {params, observe: "response"});
  }

  getAllPlaylistsByUserId(){
    return this.http.get<any>(`${this.backendUrl}/api/playlists/user`);
  }

  getAllPublicPlaylists(){
    return this.http.get<any>(`${this.backendUrl}/api/playlists/public`)
  }

  getPlaylistById(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/playlists/${id}`);
  }

  deletePlaylist(id: number){
    return this.http.delete(`${this.backendUrl}/api/playlists/${id}`);
  }

  addContentToPlaylist(contentId: number, playlistIds: number[]){
    const params = new HttpParams()
      .set('contentId', contentId.toString())
      .set('playlistIds', playlistIds.toString());
    return this.http.post<any>(`${this.backendUrl}/api/playlists/content`, null, {params, observe: 'response'});
  }

  allPlaylist(){
    return this.http.get<any>(`${this.backendUrl}/api/playlists`);
  }

}
