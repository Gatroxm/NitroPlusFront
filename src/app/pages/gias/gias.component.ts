import { Component, OnInit } from '@angular/core';
import { GuiasService } from 'src/app/services/guias.service';

@Component({
  selector: 'app-gias',
  templateUrl: './gias.component.html',
  styleUrls: ['./gias.component.scss'],
})
export class GiasComponent implements OnInit {
  public guias: any = [];
  public openModal:boolean = false;
  public guia: any;
  constructor(private _guiasServices: GuiasService) {}
  ngOnInit(): void {
    this._guiasServices.getGias().subscribe((resp:  any) => {
      if (resp.ok) {
        this.guias = resp.respuesta;
      }
    });
  }
  openModalGuias(item:any){
    this.guia = item;
    this.openModal = true;
  }
  closeModal(){
    this.guia = {};
    this.openModal = false;
  }
}
