import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AsccountSettingsComponent } from './asccount-settings/asccount-settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
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
import { ListadoResultadosComponent } from './Carreras/listado-resultados/listado-resultados.component';
import { GiasComponent } from './gias/gias.component';
import { LocutoresComponent } from './locutores/locutores.component';
import { ReportesComponent } from './historial/reportes/reportes.component';
import { ResultadosHistorialComponent } from './historial/resultados-historial/resultados-historial.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component:PagesComponent,
        canActivate:[AuthGuard],
        children: [
          { path: '', component:DashboardComponent, data: {titulo: 'Dashboard'}},
          { path: 'account-settings', component:AsccountSettingsComponent, data: {titulo: 'Account Settings'}},
          { path: 'perfil', component:PerfilComponent, data: {titulo: 'Mi Perfil'}},
          { path: 'report-status', component:ReportStatusComponent, data: {titulo: 'Estado de Reportes'}},
          { path: 'subscription-status', component:SubscriptionStatusComponent, data: {titulo: 'Estado de la Suscrripción'}},
          { path: 'simulators', component:SimuladoresComponent, data: {titulo: 'Simuladores'}},
          { path: 'simulators/identiti', component:SimuladoresByPilotoComponent, data: {titulo: 'Simuladores - Identificadores'}},
          { path: 'statistics', component:StatisticsComponent, data: {titulo: 'Panel Estadístico'}},
          { path: 'communiques', component:ComunicadosComponent, data: {titulo: 'Comunicados'}},
          { path: 'guias', component:GiasComponent, data: {titulo: 'Guias'}},
          { path: 'locutores', component:LocutoresComponent, data: {titulo: 'Locutores'}},
          { path: 'historial/reportes', component:ReportesComponent, data: {titulo: 'Hitorial'}},
          { path: 'historial/resultados', component:ResultadosHistorialComponent, data: {titulo: 'Hitorial'}},
          { path: 'apoyanos/nitro', component:NitroComponent, data: {titulo: 'Apoyanos - Nitro'}},
          { path: 'apoyanos/tienda-oficial', component:TiendaOficialComponent, data: {titulo: 'Apoyanos - Tienda Oficial'}},
          { path: 'comisarios/report-history', component:ReportHistoryComponent, data: {titulo: 'Historial de Reportes'}},
          { path: 'comisarios/reportes-pendientes', component:ReportesPendientesComponent, data: {titulo: 'Reportes Pendientes'}},
          { path: 'comisarios/reportes-pendientes-lideres', component:ReportesPendientesLideresComponent, data: {titulo: 'Reportes Lideres'}},
          { path: 'comisarios/historial', component:HistorialComponent, data: {titulo: 'Historial'}},
          { path: 'carreras/resultados-listado', component:ListadoResultadosComponent, data: {titulo: 'Listado de resultados'}},
        ]
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
