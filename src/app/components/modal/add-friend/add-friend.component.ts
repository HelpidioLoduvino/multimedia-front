import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {NgForOf} from "@angular/common";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-add-friend',
  standalone: true,
  providers: [UserService],
  imports: [
    NgForOf,
    LucideAngularModule
  ],
  templateUrl: './add-friend.component.html',
  styleUrl: './add-friend.component.css'
})
export class AddFriendComponent implements OnInit{

  askToBeFriend: any[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.allClients().subscribe(response =>{
      this.askToBeFriend = response
    });
  }

}
