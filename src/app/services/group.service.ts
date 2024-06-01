import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseGroupUrl = 'http://localhost:8080/api/group';

  constructor(private http: HttpClient) { }

  getPublicGroup(){
    return this.http.get<any>(`${this.baseGroupUrl}/public`);
  }

  createGroup(createGroup: any){
    return this.http.post(`${this.baseGroupUrl}/create`, createGroup);
  }

  addContentToGroup(id1: number, id2: number){
    return this.http.post(`${this.baseGroupUrl}/add-content-to-group`, {id1, id2});
  }

  getAllGroupsExceptPublic(){
    return this.http.get<any>(`${this.baseGroupUrl}/all-except-public`);
  }

  getAllMyGroups(){
    return this.http.get<any>(`${this.baseGroupUrl}/all-my-groups`);
  }

}
