import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {LucideAngularModule} from "lucide-angular";
import {NgForOf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {AddFriendComponent} from "../modal/add-friend/add-friend.component";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-friend',
  standalone: true,
  providers: [GroupService],
  imports: [
    NavbarComponent,
    SidebarComponent,
    RouterLink,
    FooterComponent,
    LucideAngularModule,
    NgForOf
  ],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent implements OnInit{

  friends: any[] = [];

  constructor(private groupService: GroupService, private modal: MatDialog) {
  }

  ngOnInit(): void {
    this.groupService.getAllMyFriends().subscribe(response =>{
      this.friends = response;
    })

  }

  openFriendModal(): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '450px',
      height: '400px',
      data: {
        title: 'Amigos',
        component: AddFriendComponent,
        componentData: {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



}
