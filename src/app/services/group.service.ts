import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseGroupUrl = 'http://localhost:8080/api/group';

  constructor(private http: HttpClient) { }

  createGroup(createGroup: any){
    return this.http.post(`${this.baseGroupUrl}/create`, createGroup);
  }

  addContentToGroup(contentId: number, groupId: number){
    const params = new HttpParams()
      .set('contentId', contentId.toString())
      .set('groupId', groupId.toString());
    return this.http.post(`${this.baseGroupUrl}/add-content-to-group`, null, {params});
  }

  getAllGroupsExceptPublic(){
    return this.http.get<any>(`${this.baseGroupUrl}/all-except-public`);
  }

  getAllMyGroups(){
    return this.http.get<any>(`${this.baseGroupUrl}/all-my-groups`);
  }

  getAllContentsByGroupId(groupId: number){
    return this.http.get<any>(`${this.baseGroupUrl}/all-contents-by-group-id/${groupId}`);
  }

  getAllUsersByGroupId(groupId: number){
    return this.http.get<any>(`${this.baseGroupUrl}/all-users-by-group-id/${groupId}`);
  }

}
