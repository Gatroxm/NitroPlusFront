import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LicenciasService } from 'src/app/services/licencias.service';

@Component({
  selector: 'app-licencias',
  templateUrl: './licencias.component.html',
  styleUrls: ['./licencias.component.scss']
})
export class LicenciasComponent implements OnInit {

  public tablaLicenciasCalendario:any[] = []
  public tablaTiemposClasificacion:any[] = []

  @Input () licencias:any;
  @Input () piloto:any;
  @Output() openModalComoObtnerLicencias: EventEmitter<any> = new EventEmitter();
  @Output() openModalCalendarioLicencias: EventEmitter<any> = new EventEmitter();
  constructor(private _licenciasService: LicenciasService){}
  ngOnInit(): void {
    
  }
 

  
  
  
  openModalLicencias(){
   
    this.openModalComoObtnerLicencias.emit({
      modal:true,
      licencia: this.licencias
    })
  }
  
  openCalendario(){
    this._licenciasService.getCalendarioLicencias(this.licencias.idClasificatorio).subscribe( resp =>{
      if(resp.ok) {
        this.tablaLicenciasCalendario = resp.calendario
      }
    })
    this._licenciasService.getTiemposActuales(this.piloto.imprimeId(), this.licencias.idClasificatorio).subscribe( resp =>{
    // this._licenciasService.getTiemposActuales('27', '2').subscribe( resp =>{
      if(resp.ok) {
        this.tablaTiemposClasificacion = resp.tiempos
      
      }
    });
    setTimeout(() => {
      
      this.openModalCalendarioLicencias.emit({
        modal:true,
        licencia: this.licencias,
        tablaLicenciasCalendario: this.tablaLicenciasCalendario,
        tablaTiemposClasificacion: this.tablaTiemposClasificacion
      })
    }, 1000);

  }

}
