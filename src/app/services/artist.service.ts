import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private baseArtistUrl = 'http://localhost:8080/api/artist';
  constructor(private http: HttpClient) { }

  getAllArtists(){
    return this.http.get<any>(`${this.baseArtistUrl}/all`);
  }

}
