import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { ComisariosService } from 'src/app/services/comisarios.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-reportes-pendientes-lideres',
  templateUrl: './reportes-pendientes-lideres.component.html',
  styleUrls: ['./reportes-pendientes-lideres.component.scss'],
})
export class ReportesPendientesLideresComponent implements OnInit {
  public filas:any[]=[];
  public concepto:string = '';
  public usuario:Usuario;
  public datosResultados:boolean = false;
  public ModalConceptosSanciones:boolean = false;
  public modalReportes:boolean = false;
  public reportes:any[]=[];
  public conceptos:any[] = [];
  public form: FormGroup;
  public sanciones:any[] = [];
  public pilotosInvolucrados:any[] = [];
  public sancionesSelect:any[] = [];
  public gravedadesSelect:any[] = [];
  public reporte:any;
  public datosInformacionGeneral: any[] = [];
  public reglamentos: any[] = [];
  public sancionPiloto = {
    idReporte:null,
    idPiloto:null,
    pilotos: {}
  }
  public pilotoInvolucrado:string = '';
  constructor(
    private fb: FormBuilder,
    private _comisariosService: ComisariosService,
    private _pilotoService: PilotosService,
    private consultasService: ConsultasService,
    private _consultasService: ConsultasService,
    private _comisariosServices:ComisariosService
  ) {
    this.usuario = _pilotoService.piloto;
    this.sancionPiloto.idPiloto = this.usuario.imprimeId()
    this.form = this.fb.group({
      concepto:[''],
      idSancion:[''],
      involucrados:[''],
      idGravedad:[''],
    })
  }
  ngOnInit(): void {
    
    this.reportesPendientes()

  }
  reportesPendientes(){
    this._comisariosService.pestannaConceptosReportesPendientesLideres(this.usuario.imprimeId()).subscribe(respuesta => {
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
  openModal(reporte:any){
    this.conceptos = []
    this.sanciones = []
    this.reglamentos = []
    this.datosInformacionGeneral = []
    this.sancionPiloto.idReporte = reporte.idReporte
    
    this._comisariosServices.getConceptos(reporte.idReporte).subscribe( response => {
      if(response.ok){
        this.conceptos = response.resultados
      }
    });
    this._comisariosServices.getSanciones(reporte.idReporte).subscribe( response => {
      if(response.ok){
        this.sanciones = response.resultados
      }
    })
    this.reporte = reporte;
    this.consultasService.getTblaModalInformacionGeneral(reporte.idReporte).subscribe(result=> {
      if(result.ok){
        this.datosInformacionGeneral = result.response;
        console.log(this.datosInformacionGeneral)
      }
    })
    this._comisariosServices.getPilotosInvolucrados(reporte.idReporte).subscribe(result => {
      if(result.ok){
        this.pilotosInvolucrados = result.resultados
      }
    })
    
    this.getSanciones()
    this. getTablaSanciones()
    setTimeout(() => {
      this.ModalConceptosSanciones = true;
    }, 1000);
  }
  getTablaSanciones(){
    this._comisariosService.getTablaSanciones().subscribe(tabla => {
      if(tabla.ok){
        this.reglamentos = tabla.resultados
      }
    })
  }
  retornaFecha(fecha:Date): Date {
    return new Date(fecha)
  }
  getGrvgavedades(target:any){
    this.getGravedades(target.value)
  }
  getSanciones() {
    this._comisariosService.getSancionPropuesta().subscribe( result => {
      if(result.ok) {
        this.sancionesSelect = result.resultados
      }
    })
  }
  getGravedades(id:string) {
    this._comisariosService.getGravedad(id).subscribe( result => {
      if(result.ok) {
        console.log(this.gravedadesSelect)
        this.gravedadesSelect.push(result.resultados)
      }
    })
  }
  saveform( itekm:any){
    this.filas.forEach((fila:any, index:number) => {
      this.filas[index].idInvolucrado = parseFloat(fila.idInvolucrado)
      this.filas[index].idSancion = parseFloat(fila.idSancion)
      this.filas[index].idGravedad = parseFloat(fila.idGravedad)
      this.filas[index].idReporte = this.sancionPiloto.idReporte
    })
    this.sancionPiloto.pilotos = this.filas;
    if(this.concepto != ''){
    const data = {
      idConcepto: this.reporte.idConcepto,
      concepto: this.concepto,
      idReporte: this.sancionPiloto.idReporte,
      idPiloto: this.sancionPiloto.idPiloto,
      pilotos: this.sancionPiloto.pilotos,
    }
    console.log(data)
    this._comisariosService.updateConceptos(data).subscribe(data => {
      if(data.ok){
        alert(data.msg);
        this.reportesPendientes()
        this.closeModal()
        
      }
    }, err => {
      console.log(err)
    })
    
  } else {
      alert('El concepto es requerido')
    }
  }
  closeModal(){
    this.ModalConceptosSanciones = false;
    this.datosInformacionGeneral=[];
    this.conceptos = []
    this.sanciones = []
    this.reporte ={}
    this.form.setValue({
      concepto:[''],
      idSancion:[''],
      involucrados:[''],
      idGravedad:[''],
    })
    this.filas= []
    this.concepto = ''
    this.gravedadesSelect = []
  }

  agregarFila() {
    const nuevaFila = {
      idInvolucrado:null,
      idSancion:null,
      idGravedad:null,
      idReporte:null
    };

    this.filas.push(nuevaFila);
  }
  agregarInvolucrado(){
     const data ={ 
      idPiloto: parseFloat(this.pilotoInvolucrado), 
      idReporte:this.sancionPiloto.idReporte 
    };
    this._comisariosServices.insertInvolucrado(data).subscribe(data => {
      if(data.ok) {
        alert('Registro guardado');
        this.pilotoInvolucrado = ''
      }
    })
  }
}
