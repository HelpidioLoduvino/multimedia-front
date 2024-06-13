import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlbumService} from "../../../services/album.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-criticise',
  standalone: true,
  providers: [AlbumService],
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './criticise.component.html',
  styleUrl: './criticise.component.css'
})
export class CriticiseComponent implements OnInit{

  criticiseForm!: FormGroup;
  albumId!: number;
  maxCharacters: number = 300;
  charactersRemaining: number = this.maxCharacters;

  constructor(private albumService: AlbumService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private toast: MatSnackBar
              ) {
    this.albumId = data.componentData.albumId;
  }

  ngOnInit(): void {
    this.criticiseForm = this.formBuilder.group({
      rating: [0],
      overview: ['', Validators.required]
    });

    // @ts-ignore
    this.criticiseForm.get('overview').valueChanges.subscribe(value => {
      this.onTextChange();
    });
  }

  get rating() {
    return this.criticiseForm.get('rating');
  }

  onTextChange(): void {
    // @ts-ignore
    const bodyTextLength = this.criticiseForm.get('overview').value.length;
    this.charactersRemaining = this.maxCharacters - bodyTextLength;
  }

  onSubmit(){
    if(this.criticiseForm.valid){
      this.albumService.criticiseAlbum(this.criticiseForm.value, this.albumId).subscribe(response=>{
        console.log(response);
        this.criticiseForm.reset();
        this.toast.open("Crítica enviada com sucesso", 'Fechar', {
          duration: 3000, panelClass: ["success"]
        });
      });
    } else {
      this.toast.open("Campo(s) Inválido(s)", 'Fechar', {
        duration: 3000, panelClass: ["error"]
      });
    }
  }

}
