import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsBoxComponent } from './stats-box/stats-box.component';
import { NextDateComponent } from './next-date/next-date.component';
import { ProximasFechasComponent } from './cards/proximas-fechas/proximas-fechas.component';
import { InscripcionesComponent } from './cards/inscripciones/inscripciones.component';
import { ResultadosComponent } from './cards/resultados/resultados.component';
import { ReportesEnProcesoComponent } from './cards/reportes-en-proceso/reportes-en-proceso.component';
import { ReportesCerradosComponent } from './cards/reportes-cerrados/reportes-cerrados.component';
import { CountdownPipe } from '../pipes/countdown.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalTorneoComponent } from './modal-torneo/modal-torneo.component';
import { LicenciasComponent } from './cards/licencias/licencias.component';
import { TorneosComponent } from './cards/torneos/torneos.component';
import { ModalComoobtenerLicenciasComponent } from './modales/modal-comoobtener-licencias/modal-comoobtener-licencias.component';
import { ModalCalendarioLicenciasComponent } from './modales/modal-calendario-licencias/modal-calendario-licencias.component';
import { ModalInfoTorneoComponent } from './modales/modal-info-torneo/modal-info-torneo.component';
import { ModalIsncribeteTorneoComponent } from './modales/modal-isncribete-torneo/modal-isncribete-torneo.component';
import { ModalReservasTorneoComponent } from './modales/modal-reservas-torneo/modal-reservas-torneo.component';

const components = [
  StatsBoxComponent,
  NextDateComponent,
  ProximasFechasComponent,
  InscripcionesComponent,
  ResultadosComponent,
  ReportesEnProcesoComponent,
  ReportesCerradosComponent,
  LicenciasComponent,
  ModalTorneoComponent,
  TorneosComponent
];
const modales = [
  ModalComoobtenerLicenciasComponent,
  ModalCalendarioLicenciasComponent,
  ModalInfoTorneoComponent,
  ModalIsncribeteTorneoComponent,
  ModalReservasTorneoComponent
]

@NgModule({
  declarations: [CountdownPipe,components, modales ],
  exports: [components,modales],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
