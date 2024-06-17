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

  getGroup(id: number){
    return this.http.get<any>(`${this.baseGroupUrl}/get-group/${id}`);
  }

  addContentToGroup(contentId: number, groupId: number){
    const params = new HttpParams()
      .set('contentId', contentId.toString())
      .set('groupId', groupId.toString());
    return this.http.post(`${this.baseGroupUrl}/add-content-to-group`, null, {params});
  }

  getAllExceptMyAndPublicGroups(){
    return this.http.get<any>(`${this.baseGroupUrl}/all-except-my-and-public-groups`);
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

  getMusicsFromPublicGroup(){
    return this.http.get<any>(`${this.baseGroupUrl}/all-musics-from-public-group`);
  }

  getVideosFromPublicGroup(){
    return this.http.get<any>(`${this.baseGroupUrl}/all-videos-from-public-group`);
  }

  requestToJoinGroup(groupId: number){
    const params = new HttpParams()
      .set('groupId', groupId.toString());

    return this.http.post(`${this.baseGroupUrl}/request-to-join-group`, null, {params});
  }

  getAllRequestsByGroupId(id: number){
    return this.http.get<any>(`${this.baseGroupUrl}/get-all-requests/${id}`)
  }

  acceptRequestToJoinGroup(id: number){
    const params = new HttpParams().set('id', id.toString());

    return this.http.put<any>(`${this.baseGroupUrl}/accept-request-to-join-group`, null, {params});
  }

  rejectRequestToJoinGroup(id: number){
    const params = new HttpParams().set('id', id.toString());

    return this.http.put<any>(`${this.baseGroupUrl}/reject-request-to-join-group`, null, {params});
  }

  updateUserToOwner(userId: number, groupId: number){
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('groupId', groupId.toString());
    return this.http.put<any>(`${this.baseGroupUrl}/update-user-to-owner`, null, {params});
  }

  updateUserToEditor(userId: number, groupId: number){
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('groupId', groupId.toString());
    return this.http.put<any>(`${this.baseGroupUrl}/update-user-to-editor`, null, {params});
  }

  isOwner(id:number){
    const params = new HttpParams().set('groupId', id.toString());
    return this.http.get<any>(`${this.baseGroupUrl}/is-owner`, {params});
  }

  isGroupOwner(id:number){
    const params = new HttpParams().set('groupId', id.toString());
    return this.http.get<any>(`${this.baseGroupUrl}/is-group-owner`, {params});
  }

  isEditor(id:number){
    const params = new HttpParams().set('groupId', id.toString());
    return this.http.get<any>(`${this.baseGroupUrl}/is-editor`, {params});
  }

  isNormal(id:number){
    const params = new HttpParams().set('groupId', id.toString());
    return this.http.get<any>(`${this.baseGroupUrl}/is-normal`, {params});
  }


}
