import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TorneosService } from 'src/app/services/torneos.service';

@Component({
  selector: 'app-modal-info-torneo',
  templateUrl: './modal-info-torneo.component.html',
  styleUrls: ['./modal-info-torneo.component.scss', '../modal.component.scss']
})
export class ModalInfoTorneoComponent {

  public tab1:boolean = true;
  public tab2:boolean = false;

  @Output() closeModalInfoTorneo: EventEmitter<any> = new EventEmitter();
  @Input()ModalInfoTorneo:boolean = false;
  @Input() Torneo:any;
  public inscritos:any=[]
  constructor( private _torneoService: TorneosService){}
  closeModal(){
    this.tab('tab1Torneo')
    this.closeModalInfoTorneo.emit(false)
  }

  tab(tab:string):void {
    switch (tab) {
      case 'tab1Torneo':
        this.tab1 = true
        this.tab2 = false
      break;
      case 'tab2Torneo':
        this._torneoService.getInscritosTorneos(this.Torneo.idTorneo).subscribe(data=> {
          if(data.ok){
            this.inscritos = data.inscritos;
            console.log(this.inscritos)
          }
        })
        this.tab1 = false
        this.tab2 = true
      break;
    }
  }
}
