import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {GroupComponent} from "./components/group/group.component";
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {FriendComponent} from "./components/friend/friend.component";
import {LoginComponent} from "./components/login/login.component";
import {UploadMusicComponent} from "./components/upload-music/upload-music.component";
import {PlayContentComponent} from "./components/play-content/play-content.component";
import {UploadVideoComponent} from "./components/upload-video/upload-video.component";
import {ContentInfoComponent} from "./components/content-info/content-info.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'groups', component: GroupComponent},
  {path: 'playlists', component: PlaylistComponent},
  {path: 'friends', component: FriendComponent},
  {path: 'login', component: LoginComponent},
  {path: 'upload-music', component: UploadMusicComponent},
  {path: 'upload-video', component: UploadVideoComponent},
  {path: 'play/:id', component: PlayContentComponent},
  {path: 'content-info/:id', component: ContentInfoComponent}
];
