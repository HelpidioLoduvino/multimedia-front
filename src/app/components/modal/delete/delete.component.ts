import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../../services/user.service";
import {response} from "express";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  id!: number

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private toast: MatSnackBar
              ) {
    this.id = data.componentData.id
  }

  delete(){
    this.userService.delete(this.id).subscribe(response=>{
      if(response.ok){
        this.toast.open("Usuário apagado com Sucesso", 'Fechar', {
          duration: 2000, panelClass: ['success']
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }

}
