import { Component, Input } from '@angular/core';
var moment = require('moment');
@Component({
  selector: 'app-next-date',
  templateUrl: './next-date.component.html',
  styleUrls: ['./next-date.component.scss']
})
export class NextDateComponent {
  constructor() {}
  @Input() carrera:any = {
    Logo: "",
    fechaHoraCarrera: "",
    Torneo: "",
    Division: "",
    Evento: "",
    linkOficial: null
  }
  transformarFecha() {
      const fechaAnalizada = moment.parseZone(this.carrera.fechaHoraCarrera);
    const fechaZonaHoraria = fechaAnalizada.format('LLL');
    return fechaZonaHoraria;
  }
}
