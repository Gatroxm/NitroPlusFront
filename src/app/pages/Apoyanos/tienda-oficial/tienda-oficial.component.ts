import { Component, OnInit } from '@angular/core';
import { ApoyanosService } from 'src/app/services/apoyanos.service';

@Component({
  selector: 'app-tienda-oficial',
  templateUrl: './tienda-oficial.component.html',
  styleUrls: ['./tienda-oficial.component.scss']
})
export class TiendaOficialComponent implements OnInit {
  public CardsApoyanos:any[]= [];
  public infoModal:any;
  public modalApoyanos:boolean = false;
  constructor(private _apoyanosService:ApoyanosService){}
  ngOnInit(): void {

    this._apoyanosService.getTiendaOficial().subscribe( resp => {
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
