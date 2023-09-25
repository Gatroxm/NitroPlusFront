import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LicenciasService } from 'src/app/services/licencias.service';

@Component({
  selector: 'app-modal-calendario-licencias',
  templateUrl: './modal-calendario-licencias.component.html',
  styleUrls: ['./modal-calendario-licencias.component.scss', '../modal.component.scss']
})
export class ModalCalendarioLicenciasComponent {

  public tab1:boolean = true;
  public tab2:boolean = false;

  @Input() ModalcalendarioLicencias:boolean = false;
  @Input() tablaLicenciasCalendario:any;
  @Input() tablaTiemposClasificacion:any;
  @Input() licencias:any;
  @Input() piloto:any;
  @Output() closeModalcalendarioLicencias: EventEmitter<any> = new EventEmitter();
  
  constructor(private _licenciasService: LicenciasService){}
  closeModal(){
    this.tab('calendario')
    this.closeModalcalendarioLicencias.emit(false)
  }
  tab(tab:string):void {
    switch (tab) {
      case 'calendario':
        this.tab1 = true
        this.tab2 = false
      break;
      case 'tiemposActuales':
        this.tab1 = false
        this.tab2 = true
      break;
    }
  }
  retornaFecha(fecha:Date): Date {
    return new Date(fecha)
  }
  Asistir(id:string) {
    console.log(this.licencias)
    const data = {
      idCalendario :id,
      idSimPiloto:this.licencias.idSimPiloto,
      idPiloto:this.piloto.imprimeId()
    }
    this._licenciasService.InsertInscripcion(data).subscribe( result => {
      if(result.ok){
        alert('Inscripción realizada');
      }
    })

  }

}
