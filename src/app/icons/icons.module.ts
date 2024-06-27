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
  GalleryVerticalEnd
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
  GalleryVerticalEnd
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick(icons)
  ],

})
export class IconsModule { }
