import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TorneosService } from 'src/app/services/torneos.service';

@Component({
  selector: 'app-modal-isncribete-torneo',
  templateUrl: './modal-isncribete-torneo.component.html',
  styleUrls: ['./modal-isncribete-torneo.component.scss', '../modal.component.scss']
})
export class ModalIsncribeteTorneoComponent implements OnInit {

  @Output() closeModalInscribeteTorneo: EventEmitter<any> = new EventEmitter();
  @Input()ModalInscribeteTorneo:boolean = false;
  @Input() Torneo:any;
  @Input() Piloto:any;
  @Input() data:any;
  public formInscribete = this.fb.group({
    idCocheInicial :[''],
    idEquipoInicial :[''],
    idPilotoIdSim :[''],
    noParticipacion :[''],
    observaciones :[''],
    idRespuesta :[''],
    respuestaPersonalizada :[''],
  });

  constructor( private _torneoService: TorneosService, private fb: FormBuilder){}
  ngOnInit(): void {
    console.log(this.data)
  
  }
  closeModal(){
    this.closeModalInscribeteTorneo.emit(false)
  }

  Guardar(){
    const data = {
      idEstadoInscripcion : 1,
      idPiloto: this.Piloto.id,
      idTorneo:this.Torneo.idTorneo,
      idCocheInicial: this.formInscribete.value.idCocheInicial ? this.formInscribete.value.idCocheInicial: null,
      idEquipoInicial : this.formInscribete.value.idEquipoInicial ? this.formInscribete.value.idEquipoInicial: null,
      idPilotoIdSim : this.formInscribete.value.idPilotoIdSim,
      noParticipacion : this.formInscribete.value.noParticipacion ? this.formInscribete.value.noParticipacion: '',
      observaciones : this.formInscribete.value.observaciones ? this.formInscribete.value.observaciones: '',
      idRespuesta : this.formInscribete.value.idRespuesta ? this.formInscribete.value.idRespuesta: '',
      respuestaPersonalizada : this.formInscribete.value.respuestaPersonalizada ? this.formInscribete.value.respuestaPersonalizada: '',
      DivisionPredeterminada : this.data.FormInscripcion.DivisionPredeterminada,
      idCochePred: this.data.FormInscripcion.idCochePred,
      idCategoriaPiloto: this.data.FormInscripcion.idCatPred,
      idTipoPiloto:this.data.FormInscripcion.idTipoPred,
      idEquipoPred:this.data.FormInscripcion.idEquipoPred,
    }
    console.log(this.data.FormInscripcion);
    console.log(data);
    this._torneoService.insertInscription(data).subscribe(data => {
      if(data.ok) {
        alert('Inscripción realizada');
        this.closeModal()
      }
    });
  }
}
