import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TorneosService } from 'src/app/services/torneos.service';

@Component({
  selector: 'app-modal-reservas-torneo',
  templateUrl: './modal-reservas-torneo.component.html',
  styleUrls: ['./modal-reservas-torneo.component.scss', '../modal.component.scss']
})
export class ModalReservasTorneoComponent {
  @Output() closeModalReservaTorneo: EventEmitter<any> = new EventEmitter();
  @Input()ModalReservaTorneo:boolean = false;
  @Input() Torneo:any;
  @Input() dataReservas:any;
  public coche:string = ''
  public equipo:string = ''

  constructor( private _torneoService: TorneosService){}
  closeModal(){
    this.closeModalReservaTorneo.emit(false)
  }
  changeValueCoche(element:any){
    this.coche = element.target.value
    }
  changeValueEquipo(element:any){
    this.equipo = element.target.value
  }
  Inscribir(item:any){
    let coche = '';
    let equipo = '';
    if(item.idCumple  === 1 && item.reservaSelectCoche === 0){
      coche= item.idCochePred
    }
    if(item.idCumple  === 1 && item.reservaSelectCoche === 1){
      coche= this.coche
    }
    if(item.idCumple  === 1 && item.reservaSelectEquipo === 0){
      equipo= item.idEquipoPred
    }
    if(item.idCumple  === 1 && item.reservaSelectEquipo === 1){
      equipo= this.equipo
    }
    const data ={
      idInscripcion:item.idInscripcion,
      idNombreDivision: item.id,
      idCoche: coche,
      idEquipo: equipo,
      idCategoriaPiloto: item.idCatPred,
      idTipoPiloto: item.idTipoPred,
      noCarreraInicial:item.CarreraInicial,
      puntosIniciales:0,
    }
    console.log(data)
    this._torneoService.insertReserva(data).subscribe(res => {
      if(res.ok) {
        alert('Inscripción Exitosa');
        this.closeModal()
      }
    })
  }
}
