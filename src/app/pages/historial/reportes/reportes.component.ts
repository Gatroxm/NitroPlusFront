import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ComisariosService } from 'src/app/services/comisarios.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { HistorialService } from 'src/app/services/historial.service';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  public reportes: any = [];
  public conceptos:any[] = [];
  public sanciones:any[] = [];
  public reporte: any = {};
  public usuario: Usuario;
  public modal: boolean = false;
  public ModalConceptosSanciones:boolean=false;
  public datosInformacionGeneral: any[] = [];
  constructor(private consultasService:ConsultasService, private historialServices: HistorialService, private _pilotoService: PilotosService, private _comisariosServices: ComisariosService) {
    this.usuario = _pilotoService.piloto;
  }
  ngOnInit(): void {
    this.getReportesHostorial(this.usuario.imprimeId())
  }

  getReportesHostorial(id: string){
    this.historialServices.getReportesHostorial(id).subscribe( resp=> {
      if(resp.ok) {
        console.log(resp)
        this.reportes = resp.respuesta
      }
    })
  }

  openModalConceptosSanciones(reporte:any){
    
    this.conceptos = []
    this.sanciones = []
    this.datosInformacionGeneral = []
    
    this._comisariosServices.getConceptos(reporte.ReporteNo).subscribe( response => {
      if(response.ok){
        this.conceptos = response.resultados
        console.log(this.conceptos);
      }
    });
    this._comisariosServices.getSanciones(reporte.ReporteNo).subscribe( response => {
      if(response.ok){
        this.sanciones = response.resultados
        console.log(this.sanciones);
      }
    })
    this.consultasService.getTblaModalInformacionGeneral(reporte.ReporteNo).subscribe(result=> {
      if(result.ok){
        this.datosInformacionGeneral = result.response;
        console.log(result.response)
      }
    })
    this.reporte = reporte;
    setTimeout(() => {
      
      this.ModalConceptosSanciones= true;
    }, 1000);
  }
  retornaFecha(fecha:Date): Date {
    return new Date(fecha)
  }
}
