import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AsccountSettingsComponent } from './asccount-settings/asccount-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ComponentsModule } from '../components/components.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ReportStatusComponent } from './report-status/report-status.component';
import { ReportHistoryComponent } from './report-history/report-history.component';
import { SubscriptionStatusComponent } from './subscription-status/subscription-status.component';
import { SimuladoresComponent } from './simuladores/simuladores.component';
import { SimuladoresByPilotoComponent } from './simuladores/simuladores-by-piloto.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ComunicadosComponent } from './comunicados/comunicados.component';
import { NitroComponent } from './Apoyanos/nitro/nitro.component';
import { TiendaOficialComponent } from './Apoyanos/tienda-oficial/tienda-oficial.component';
import { ReportesPendientesComponent } from './Comisarios/reportes-pendientes/reportes-pendientes.component';
import { HistorialComponent } from './Comisarios/historial/historial.component';
import { ReportesPendientesLideresComponent } from './Comisarios/reportes-pendientes-lideres/reportes-pendientes-lideres.component';
import { ResultadosComponent } from './Carreras/resultados/resultados.component';
import { ListadoResultadosComponent } from './Carreras/listado-resultados/listado-resultados.component';
import { GiasComponent } from './gias/gias.component';
import { LocutoresComponent } from './locutores/locutores.component';
import { ReportesComponent } from './historial/reportes/reportes.component';
import { ResultadosHistorialComponent } from './historial/resultados-historial/resultados-historial.component';
@NgModule({
  declarations: [ 
    DashboardComponent,
    PagesComponent,
    AsccountSettingsComponent,
    PerfilComponent,
    NopagefoundComponent,
    ReportStatusComponent,
    ReportHistoryComponent,
    SubscriptionStatusComponent,
    SimuladoresComponent,
    SimuladoresByPilotoComponent,
    StatisticsComponent,
    ComunicadosComponent,
    NitroComponent,
    TiendaOficialComponent,
    ReportesPendientesComponent,
    HistorialComponent,
    ReportesPendientesLideresComponent,
    ResultadosComponent,
    ListadoResultadosComponent,
    GiasComponent,
    LocutoresComponent,
    ReportesComponent,
    ResultadosHistorialComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AsccountSettingsComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
