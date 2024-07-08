import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  createGroup(createGroup: any){
    return this.http.post(`${this.backendUrl}/api/group/create`, createGroup);
  }

  getGroup(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/group/get-group/${id}`);
  }

  getPublicGroup(){
    return this.http.get<any>(`${this.backendUrl}/api/group/get-public-group`, {observe: 'response'});
  }

  addContentToGroup(contentId: number, groupId: number[]){
    const params = new HttpParams()
      .set('contentId', contentId.toString())
      .set('groupId', groupId.toString());
    return this.http.post(`${this.backendUrl}/api/group/add-content-to-group`, null, {params, observe: "response"});
  }

  getAllExceptMyAndPublicGroups(){
    return this.http.get<any>(`${this.backendUrl}/api/group/all-except-my-and-public-groups`);
  }

  getAllMyGroups(){
    return this.http.get<any>(`${this.backendUrl}/api/group/all-my-groups`);
  }

  getAllMyFriends(){
    return this.http.get<any>(`${this.backendUrl}/api/group/get-all-my-friends`);
  }

  getAllContentsByGroupId(groupId: number){
    return this.http.get<any>(`${this.backendUrl}/api/group/all-contents-by-group-id/${groupId}`);
  }

  getAllUsersByGroupId(groupId: number){
    return this.http.get<any>(`${this.backendUrl}/api/group/all-users-by-group-id/${groupId}`);
  }

  getMusicsFromPublicGroup(){
    return this.http.get<any>(`${this.backendUrl}/api/group/all-musics-from-public-group`);
  }

  getVideosFromPublicGroup(){
    return this.http.get<any>(`${this.backendUrl}/api/group/all-videos-from-public-group`);
  }

  requestToJoinGroup(groupId: number){
    const params = new HttpParams()
      .set('groupId', groupId.toString());

    return this.http.post(`${this.backendUrl}/api/group/request-to-join-group`, null, {params});
  }

  getAllRequestsByGroupId(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/group/get-all-requests/${id}`)
  }

  acceptRequestToJoinGroup(id: number){
    const params = new HttpParams().set('id', id.toString());

    return this.http.put<any>(`${this.backendUrl}/api/group/accept-request-to-join-group`, null, {params});
  }

  rejectRequestToJoinGroup(id: number){
    const params = new HttpParams().set('id', id.toString());

    return this.http.put<any>(`${this.backendUrl}/api/group/reject-request-to-join-group`, null, {params});
  }

  updateUserToOwner(userId: number, groupId: number){
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('groupId', groupId.toString());
    return this.http.put<any>(`${this.backendUrl}/api/group/update-user-to-owner`, null, {params});
  }

  updateUserToEditor(userId: number, groupId: number){
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('groupId', groupId.toString());
    return this.http.put<any>(`${this.backendUrl}/api/group/update-user-to-editor`, null, {params});
  }

  isOwnerOrEditor(groupId: number){
    return this.http.get<any>(`${this.backendUrl}/api/group/is-owner-or-editor/${groupId}`);
  }


  isOwner(groupId: number){
    return this.http.get<any>(`${this.backendUrl}/api/group/is-owner/${groupId}`);
  }

}
