import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-comoobtener-licencias',
  templateUrl: './modal-comoobtener-licencias.component.html',
  styleUrls: ['./modal-comoobtener-licencias.component.scss', '../modal.component.scss']
})
export class ModalComoobtenerLicenciasComponent {
  
  @Input() ModalComoObtenerLicencias:boolean = false;
  @Input() licencias:any;
  @Output() closeModalComoObtenerLicencias: EventEmitter<any> = new EventEmitter();
  closeModal(){
    this.closeModalComoObtenerLicencias.emit(false)
  }

}
