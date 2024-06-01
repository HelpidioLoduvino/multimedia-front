import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {GroupService} from "../../../services/group.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal.component";
import {RequestToEnterComponent} from "../request-to-enter/request-to-enter.component";

@Component({
  selector: 'app-create-group',
  standalone: true,
  providers: [GroupService],
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent implements OnInit{

  createGroup!: FormGroup

  constructor(
    private groupService: GroupService,
    private fb: FormBuilder,
    private toast: MatSnackBar,
    private modal: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.createGroup = this.fb.group({
        groupName: ['', Validators.required],
        groupStatus: ['Privado', Validators.required]
    });
  }

  openModal(){
    const dialogRef = this.modal.open(ModalComponent, {
      width: '350px',
      height: '310px',
      data: {
        title: 'Grupos',
        component: RequestToEnterComponent,
        componentData: {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSubmit(){
    if(this.createGroup.valid){
      this.groupService.createGroup(this.createGroup.value).subscribe({
        next: (response) => {
          this.createGroup.reset();
          window.location.reload();
        }, error: (error) => {
          this.toast.open('Grupo não criado!', 'Fechar', {
            duration: 3000, panelClass: ['snackbar-error']
          });
        }
      })
    }else {
      this.toast.open('Formulário Inválido!', 'Fechar', {
        duration: 3000, panelClass: ['snackbar-error']
      });
    }
  }

}
