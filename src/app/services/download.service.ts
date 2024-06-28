import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private backendUrl = environment.backendUrl;
  private expressUrl = environment.expressUrl;

  constructor(private http: HttpClient) { }

  downloadContent(contentId: number){
    return this.http.get(`${this.backendUrl}/api/content/download/` + contentId, {responseType: 'blob'});
  }

  getDownloadedContents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.expressUrl}/api/contents`);
  }

}
