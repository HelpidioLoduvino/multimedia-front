import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {NavbarComponent} from "../navbar/navbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ContentService} from "../../services/content.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-content-info',
  standalone: true,
    providers: [ContentService],
  imports: [
    FormsModule,
    MatStep,
    MatStepLabel,
    MatStepper,
    NavbarComponent,
    SidebarComponent,
    NgIf,
    RouterLink,
    NgForOf
  ],
  templateUrl: './content-info.component.html',
  styleUrl: './content-info.component.css'
})
export class ContentInfoComponent implements OnInit{

  content: any = {};
  contendId: number | undefined;

  constructor(
    private contentService: ContentService,
    private activeRoute: ActivatedRoute,
    private route: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.contendId = +params['id'];
      if(this.contendId){
        this.getContent(this.contendId);
      }
    })
  }

  bandInfo(id: number){
    this.route.navigate(['/band-info', id]);
  }

  getContent(id: number){
    this.contentService.getContentById(id).subscribe({
      next: (response) =>{
        this.content = response;
        console.log(response);
      }, error: (error) => {
        console.error("Erro ao carregar música", error);
      }
    })
  }

}
