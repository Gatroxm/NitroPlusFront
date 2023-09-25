import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {
  @Input() title: string ='';
  @Input() imageUrl: string = '';
  @Input() imageUrlBandera: string = '';
  @Input() imageUrlPatrocinio: string = '';
  @Input() imageUrlPlataforma: string = '';
}
