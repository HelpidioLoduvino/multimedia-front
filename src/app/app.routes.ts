import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {GroupComponent} from "./components/group/group.component";
import {PlaylistsComponent} from "./components/playlists/playlists.component";
import {FriendComponent} from "./components/friend/friend.component";
import {LoginComponent} from "./components/login/login.component";
import {UploadMusicComponent} from "./components/upload-music/upload-music.component";
import {PlayContentComponent} from "./components/play-content/play-content.component";
import {UploadVideoComponent} from "./components/upload-video/upload-video.component";
import {ContentInfoComponent} from "./components/content-info/content-info.component";
import {RegisterComponent} from "./components/register/register.component";
import {PlaylistComponent} from "./components/playlist/playlist.component";
import {GetGroupComponent} from "./components/get-group/get-group.component";
import {ArtistComponent} from "./components/artist/artist.component";
import {AlbumComponent} from "./components/album/album.component";
import {AlbumInfoComponent} from "./components/album-info/album-info.component";
import {GenreComponent} from "./components/genre/genre.component";
import {DownloadComponent} from "./components/download/download.component";
import {PlayDownloadedContentComponent} from "./components/play-downloaded-content/play-downloaded-content.component";
import {AdminHomeComponent} from "./components/admin-home/admin-home.component";
import {RadioComponent} from "./components/radio/radio.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'groups', component: GroupComponent},
  {path: 'group/:id', component: GetGroupComponent},
  {path: 'playlists', component: PlaylistsComponent},
  {path: 'playlist/:id', component: PlaylistComponent},
  {path: 'friends', component: FriendComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'upload-music', component: UploadMusicComponent},
  {path: 'upload-video', component: UploadVideoComponent},
  {path: 'play/:id', component: PlayContentComponent},
  {path: 'content-info/:id', component: ContentInfoComponent},
  {path: 'artists', component: ArtistComponent},
  {path: 'albums', component:  AlbumComponent},
  {path: 'album/:id', component: AlbumInfoComponent},
  {path: 'genre', component: GenreComponent},
  {path: 'downloads', component: DownloadComponent},
  {path: 'play-downloaded/:path', component: PlayDownloadedContentComponent},
  {path: 'admin-home', component: AdminHomeComponent},
  {path: 'radio', component: RadioComponent}
];
