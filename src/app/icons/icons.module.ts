import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Home,
  Menu,
  UsersRound,
  ListMusic,
  Radio,
  Disc,
  MicVocal,
  Bell,
  CircleUserRound,
  CirclePlus,
  CircleChevronDown,
  Plus,
  Eye,
  EyeOff,
  Download,
  Share,
  UserRound,
  UserRoundPlus,
  GalleryVerticalEnd, Play, Pause, Trash2
} from 'lucide-angular';


const icons = {
  Home,
  Menu,
  UsersRound,
  ListMusic,
  Radio,
  Disc,
  MicVocal,
  Bell,
  CircleUserRound,
  CirclePlus,
  CircleChevronDown,
  Plus,
  Eye,
  EyeOff,
  Download,
  Share,
  UserRound,
  UserRoundPlus,
  GalleryVerticalEnd,
  Trash2
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick(icons)
  ],

})
export class IconsModule { }
