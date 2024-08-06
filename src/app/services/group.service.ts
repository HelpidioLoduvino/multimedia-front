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
    return this.http.post(`${this.backendUrl}/api/groups`, createGroup);
  }

  getGroup(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/groups/${id}`);
  }

  getPublicGroup(){
    return this.http.get<any>(`${this.backendUrl}/api/groups/public`, {observe: 'response'});
  }

  addContentToGroup(contentId: number, groupId: number[]){
    const params = new HttpParams()
      .set('contentId', contentId.toString())
      .set('groupId', groupId.toString());
    return this.http.post(`${this.backendUrl}/api/groups/content`, null, {params, observe: "response"});
  }

  getAllExceptMyAndPublicGroups(){
    return this.http.get<any>(`${this.backendUrl}/api/groups/others`);
  }

  getAllMyGroupsOrPublicGroups(){
    return this.http.get<any>(`${this.backendUrl}/api/groups/mine`);
  }

  getAllMyGroups(){
    return this.http.get<any>(`${this.backendUrl}/api/groups/user`);
  }

  getAllMyFriends(){
    return this.http.get<any>(`${this.backendUrl}/api/groups/friends`);
  }

  getAllUsersByGroupId(groupId: number){
    return this.http.get<any>(`${this.backendUrl}/api/groups/users/${groupId}`);
  }

  requestToJoinGroup(groupId: number){
    const params = new HttpParams()
      .set('groupId', groupId.toString());

    return this.http.post(`${this.backendUrl}/api/groups/request`, null, {params});
  }

  getAllRequestsByGroupId(id: number){
    return this.http.get<any>(`${this.backendUrl}/api/groups/requests/${id}`)
  }

  acceptRequestToJoinGroup(id: number){
    const params = new HttpParams().set('id', id.toString());

    return this.http.put<any>(`${this.backendUrl}/api/groups/accept-request`, null, {params});
  }

  rejectRequestToJoinGroup(id: number){
    const params = new HttpParams().set('id', id.toString());

    return this.http.put<any>(`${this.backendUrl}/api/groups/reject-request`, null, {params});
  }

  updateUserToOwner(userId: number, groupId: number){
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('groupId', groupId.toString());
    return this.http.put<any>(`${this.backendUrl}/api/groups/owner`, null, {params});
  }

  updateUserToEditor(userId: number, groupId: number){
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('groupId', groupId.toString());
    return this.http.put<any>(`${this.backendUrl}/api/groups/editor`, null, {params});
  }

  isOwnerOrEditor(groupId: number){
    return this.http.get<any>(`${this.backendUrl}/api/groups/owner-or-editor/${groupId}`);
  }


  isOwner(groupId: number){
    return this.http.get<any>(`${this.backendUrl}/api/groups/owner/${groupId}`);
  }

}
