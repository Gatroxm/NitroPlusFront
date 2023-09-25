import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ComisariosService } from 'src/app/services/comisarios.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.scss']
})
export class ReportHistoryComponent {
  public usuario:Usuario;
  public conceptos:any[] = [];
  public sanciones:any[] = [];
  public reportesCerrados:any[] = [];
  public reportesEnProceso:any[] = [];
  public desde:number=0;
  public reporteCerrado:any;
  public modalReporteCerrado:boolean=false;
  public ModalConceptosSanciones:boolean=false;
  public datosInformacionGeneral: any[] = [];
  public reporte:any;
  constructor(private consultasService: ConsultasService,private _consultasService: ConsultasService,private _pilotoService: PilotosService, private _comisariosServices:ComisariosService){
    this.usuario = _pilotoService.piloto;
    this.getReportesEnProceso();

    // this.getReportesCerrados()
  }

  getReportesEnProceso(){

    this._comisariosServices.getHistorialReportes(this.usuario.imprimeId()).subscribe( (resp:any) => {
      if(resp.ok){
        this.reportesEnProceso = resp.resultados
      }
    })

  }

  getReportesCerrados(desde:number = 0) {
    this._consultasService.getUltimosReportesCerrados(desde,this.usuario.imprimeId()).subscribe( (resp:any) => {
      if(resp.ok === true) {
        this.reportesCerrados = resp.ultimosReportesCerrados;
      }
      
    })
  }

  netBak(pag:number) {
    this.desde  = this.desde + pag
    if(this.desde < 0) {
      this.desde = 0
    }
    this.getReportesCerrados(this.desde)

  }

  openDetalleReporteCerrado(reporte: any){
    this.reporteCerrado = reporte;
    this.modalReporteCerrado = true;
  }
  openModalConceptosSanciones(reporte:any){
    this.conceptos = []
    this.sanciones = []
    this.datosInformacionGeneral = []
    this.reporte = reporte
    this._comisariosServices.getConceptos(reporte.idReporte).subscribe( response => {
      if(response.ok){
        this.conceptos = response.resultados
        console.log(this.conceptos);
      }
    });
    this._comisariosServices.getSanciones(reporte.idReporte).subscribe( response => {
      if(response.ok){
        this.sanciones = response.resultados
        console.log(this.sanciones);
      }
    })
    this.consultasService.getTblaModalInformacionGeneral(reporte.idReporte).subscribe(result=> {
      if(result.ok){
        this.datosInformacionGeneral = result.response;
        console.log(result.response)
      }
    })
    setTimeout(() => {
      
      this.ModalConceptosSanciones= true;
    }, 1000);
  }
  retornaFecha(fecha:Date): Date {
    return new Date(fecha)
  }
}
