import { Component, OnInit } from '@angular/core';
import { ApoyanosService } from 'src/app/services/apoyanos.service';

@Component({
  selector: 'app-nitro',
  templateUrl: './nitro.component.html',
  styleUrls: ['./nitro.component.scss']
})
export class NitroComponent implements OnInit {
  public CardsApoyanos:any[]= [];
  public infoModal:any;
  public modalApoyanos:boolean = false;
  constructor(private _apoyanosService:ApoyanosService){}
  ngOnInit(): void {

    this._apoyanosService.getApoyanosNitro().subscribe( resp => {
      if(resp.ok) {
        this.CardsApoyanos = resp.resultados;
        console.log(this.CardsApoyanos)
      }
    });
   
  }

  openModalApoyanos(info:any){
    this.modalApoyanos = true;
    this.infoModal = info;
  }
  closeModal() {
    this.modalApoyanos = false
  }
}
