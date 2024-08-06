import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) { }

  getAllArtists(){
    return this.http.get<any>(`${this.backendUrl}/api/artists`);
  }

}
