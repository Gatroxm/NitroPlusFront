import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { ComisariosService } from 'src/app/services/comisarios.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-reportes-pendientes',
  templateUrl: './reportes-pendientes.component.html',
  styleUrls: ['./reportes-pendientes.component.scss']
})
export class ReportesPendientesComponent implements OnInit {
  public usuario:Usuario;
  public reportes:any[]=[];
  public sanciones:any[]=[];
  public gravedades:any[]=[];
  public reglamentos:any[]=[];
  public datosResultados:boolean = false
  public tab1:boolean = false
  public tab2:boolean = false
  public modalReportes:boolean = false;
  public datosInformacionGeneral: any[] = [];
  public form: FormGroup;
  public reporte:any;
  constructor(
    private fb: FormBuilder,
    private _comisariosService:ComisariosService,
    private _pilotoService: PilotosService,
    private consultasService: ConsultasService
    ){
      this.usuario = _pilotoService.piloto;
      this.form = this.fb.group({
        concepto:[''],
        idSancion:[''],
        idGravedad:[''],
      })
    }
  ngOnInit(): void {
    this.reportesPendientes()
    this.getSanciones()
    this.getTablaSanciones()
  }
  reportesPendientes() {
    this._comisariosService.getReportesPendientesRevisores(this.usuario.imprimeId()).subscribe(respuesta => {
      if(respuesta.ok){
        this.reportes = respuesta.resultados;
        this.datosResultados = true
      } else {
        this.datosResultados = false
      }
    }, err=> {
      this.datosResultados = false
    })
  }
  retornaFecha(fecha:Date): Date {
    return new Date(fecha)
  }
  getGrvgavedades(target:any){
    this.getGravedades(target.value)
    this.reportesPendientes()
  }
  getSanciones() {
    this._comisariosService.getSancionPropuesta().subscribe( result => {
      if(result.ok) {
        this.sanciones = result.resultados
      }
    })
  }
  getTablaSanciones(){
    this._comisariosService.getTablaSanciones().subscribe(tabla => {
      if(tabla.ok){
        this.reglamentos = tabla.resultados
      }
    })
  }
  getGravedades(id:string) {
    this._comisariosService.getGravedad(id).subscribe( result => {
      if(result.ok) {
        this.gravedades = result.resultados
        console.log(result)
      }
    })
  }
  openModal(reporte:any){

    this.reporte = reporte;
    this.consultasService.getTblaModalInformacionGeneral(reporte.idReporte).subscribe(result=> {
      if(result.ok){
        this.modalReportes = true;
        this.datosInformacionGeneral = result.response;
        console.log(result.response)
      }
    })
  }
  closeModal(){
    this.modalReportes = false;
    this.datosInformacionGeneral=[];
    this.reporte ={}
    this.form.setValue({
      concepto:[''],
      idSancion:[''],
      involucrados:[''],
      idGravedad:[''],
    })
    this.reportesPendientes()
  }


  saveform(){
    const data = {
      idConcepto: this.reporte.idConcepto,
      concepto: this.form.value.concepto,
      idSancion: this.form.value.idSancion,
      idGravedad: this.form.value.idGravedad,
    }
    this._comisariosService.updateConceptos(data).subscribe(data => {
      if(data.ok){
        this.reportesPendientes()
        alert(data.msg);
        this.closeModal()
      }
    })
    console.log("Saving form...", data)
  }
}
