import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TorneosService } from 'src/app/services/torneos.service';

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.scss']
})
export class TorneosComponent implements OnInit {
  @Input() Torneo:any;
  @Input() Piloto:any;

  @Output() openModalInfoTorneoEmiter: EventEmitter<any> = new EventEmitter();
  @Output() openModalInscribeteToeneoEmiter: EventEmitter<any> = new EventEmitter();
  @Output() openModalReservaTorneoEmiter: EventEmitter<any> = new EventEmitter();
  constructor(private _torneoService: TorneosService){}
  public pilotosIdSim:any[]=[]
  public coches:any[]=[]
  public equipoInicial:any[]=[]
  public respuestas:any[]=[]
  public resennas:any[]=[]
  public pregunta:any={}
  public FormInscripcion:any={}
  ngOnInit(): void {
    this._torneoService.slectidentificadorPilotoSim(this.Piloto.imprimeId(), this.Torneo.idTorneo).subscribe(data=> {
      if(data.ok){
        this.pilotosIdSim = data.listado
      }
     })
     this._torneoService.selectIdCocheInicial(this.Torneo.idTorneo).subscribe( resp => {
      if(resp.ok){
        this.coches = resp.listado
      }
     })
     this._torneoService.selectIdEquipoInicial(this.Torneo.idTorneo).subscribe( resp => {
      if(resp.ok){
        this.equipoInicial = resp.listado
      }
     })
     this._torneoService.pregunta(this.Torneo.idTorneo).subscribe( resp => {
      if(resp.ok){
        this.pregunta = resp.listado
      }
     })
     this._torneoService.respuestasTipoUno(this.Torneo.idTorneo).subscribe( resp => {
      if(resp.ok){
        this.respuestas = resp.listado
      }
     });
     this._torneoService.getFormInscripcion(this.Torneo.idTorneo).subscribe( resp => {
      if(resp.ok){
        this.FormInscripcion = resp.FormInscripcion
      }
     })
     this._torneoService.getListadoReserva(this.Piloto.imprimeId(), this.Torneo.idTorneo).subscribe( resp => {
      if(resp.ok){
        this.resennas = resp.listado
      }
     })
  }

  openModalInfoTorneo(){
    this.openModalInfoTorneoEmiter.emit({
      modal:true,
      torneo:this.Torneo
    })
  }
  openModalInscribete(){
    this.openModalInscribeteToeneoEmiter.emit({
      modal:true,
      torneo:this.Torneo,
      pilotosIdSim: this.pilotosIdSim,
      coches: this.coches,
      equipoInicial: this.equipoInicial,
      pregunta: this.pregunta,
      respuestas: this.respuestas,
      FormInscripcion: this.FormInscripcion,
    });
  }
  openModalReserva(){
    this.openModalReservaTorneoEmiter.emit({
      modal:true,
      torneo:this.Torneo,
      coches: this.coches,
      equipoInicial: this.equipoInicial,
      resennas: this.resennas
    });
  }
}
