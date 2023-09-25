import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  @Input() resultado: any;
  public btnReportes: boolean = false;
  public btnRepeticiones: boolean = false;
  public modalPosiciones: boolean = false;
  public modalListadoRepeticiones: boolean = false;
  public fechaFinReportes: any;
  public fechaFinRepeticiones: any;
  public fechaCarrera: any;
  public contadorFechaFinReportes: string = '';
  public imgModalCarrera: string = '';
  public enlaceModalCarrera: string = '';
  public contadorFechaFinRepeticiones: string = '';
  public modalResultadosPosicionesReportes: boolean = false;
  public modalReportes: boolean = false;
  public modalFrichaCarrera: boolean = false;
  public modalRepeticiones: boolean = false;
  public modalInfoReglasTorneo: boolean = false;
  public ModaltablaReportesDeLaFecha: boolean = false;
  public noResult: boolean = false;
  public tblResultados:any[] =[];
  public tblPosiciones:any[] =[];
  public listadoPilotosParticipantes:any[] =[];
  public resultadosReportesDeLaFecha:any[] =[];
  public listadoRepeticioness:any[] =[];
  constructor(private consultasService: ConsultasService, private fb: FormBuilder){}
  public Repeticion = this.fb.group({
    hora:[],
    minuto:[],
    segundo:[],
    link:[],
    observaciones:[]
  });
  public Reportar = this.fb.group({
    noVuelta :[''],
    idPilotoDenunciado:[''],
    descripcion :[''],
    evidencia  :['']
  });
  ngOnInit(): void {
    this.calculoFecha();
    this. getListadoPilotosParticipantes();
    this.fechaFinReportes = new Date(this.resultado.finReportes);
    this.fechaFinRepeticiones = new Date(this.resultado.FinRepeticiones);
    this.fechaCarrera = new Date(this.resultado.Fecha);
    setInterval((a: any) => {
      if(this.btnReportes ){ 
        this.contadorFecha(this.fechaFinReportes, 'reportes');
      }
      if(this.btnRepeticiones){
        this.contadorFecha(this.fechaFinRepeticiones, 'repeticiones');
      }
    }, 1000);
  }

  public getListadoPilotosParticipantes() {
    this.consultasService.getListadoPilotosParticipantes(this.resultado.idCalendario).subscribe( resp => {
      if(resp.ok){
        this.listadoPilotosParticipantes = resp.pilotosParticipantes
      }
    })
  }

  public calculoFecha(): void {
    const fechaActual = moment(); // Obtener fecha y hora actual

    const fechaInicioReportes = moment(this.resultado.inicioReportes);
    const fechaFinoReportes = moment(this.resultado.finReportes);

    const fechaFinRepeticiones = moment(this.resultado.FinRepeticiones);

    if (fechaActual.isBetween(fechaInicioReportes, fechaFinoReportes)) {
      this.btnReportes = true;
    } else {
      this.btnReportes = false;
    }

    if (fechaActual.isBefore(fechaFinRepeticiones)) {
      this.btnRepeticiones = true;
    }
  }

  contadorFecha(fecha: any, tipo: any): string {
    const fechaActual = new Date();
    const diferenciaTiempo = fecha.getTime() - fechaActual.getTime();
    const segundosRestantes = Math.floor(diferenciaTiempo / 1000);
    const minutosRestantes = Math.floor(segundosRestantes / 60);
    const horasRestantes = Math.floor(minutosRestantes / 60);
    const diasRestantes = Math.floor(horasRestantes / 24);
    let response = '';
    if (diasRestantes === 0) {
      if (diasRestantes < 0 && minutosRestantes < 0 && horasRestantes < 0) {
        response = '';
      }
      response = `${horasRestantes % 24} H : ${minutosRestantes % 60} M : ${
        segundosRestantes % 60
      } S`;
    } else {
      if (diasRestantes < 0 && minutosRestantes < 0 && horasRestantes < 0) {
        response = '';
      }
      response = `${diasRestantes} D : ${horasRestantes % 24} H : ${
        minutosRestantes % 60
      } M : ${segundosRestantes % 60} S`;
    }
    switch (tipo) {
      case 'reportes':
        this.contadorFechaFinReportes = response;
        break;
      case 'repeticiones':
        this.contadorFechaFinRepeticiones = response;
        break;
    }
    
    return response;
  }

  getTablaResultados(id:string){
    this.consultasService.getTablaResultados(id).subscribe( result => {
      if(result.ok){
        this.tblResultados  = result.resultados
        this.noResult = false
      } else {
        this.noResult = false

      }
    }, err=> {
      this.noResult = true
    })
  }

  ngSubmit(){
    const data  = {
      idPiloto: this.resultado.idPiloto,
      idCalendario: this.resultado.idCalendario,
      hora: this.Repeticion.value.hora ? this.Repeticion.value.hora: 0,
      minuto: this.Repeticion.value.minuto ? this.Repeticion.value.minuto: 0,
      segundo: this.Repeticion.value.segundo ? this.Repeticion.value.segundo: 0,
      link_video:  this.Repeticion.value.link,
      observaciones:  this.Repeticion.value.observaciones,
      segBanderaVerde: 0
    }
    data.segBanderaVerde = (data.hora * 3600)+(data.minuto*60)+(data.segundo)
    this.consultasService.insertRepeticiones(data).subscribe( response=> {
      if(response.ok){
        alert('Repetición Guardada')
        this.modalRepeticiones = false;
      }
    })
  }

  getTablaPosiciones(id:string){
    

    this.consultasService.getTablaPosiciones(id).subscribe( result => {
      if(result.ok){
        this.tblPosiciones  = result.posiciones
        this.noResult = false
      } else {
        this.noResult = false

      
      }
    }, err=> {
      this.noResult = true
    })
  }

  ngSubmitReportar(){
    const data = {
      idDivision:this.resultado.idDivision,
      idCalendario:this.resultado.idCalendario,
      idPiloto :this.resultado.idPiloto,
      idPilotoDenunciado:this.Reportar.value.idPilotoDenunciado,
      descripcion: this.Reportar.value.descripcion,
      evidencia :this.Reportar.value.evidencia,
      noVuelta :this.Reportar.value.noVuelta,
    }
    this.consultasService.GuardadoReporte(data).subscribe( res =>{
      if(res.ok){
        alert('Reporte Creado');
        this.modalReportes = false
      }
    })
  }

  public openTableRepeticiones(id:string){
    this.consultasService.getTblaRepeticiones(id).subscribe( response=> {
      if(response.ok){
        this.listadoRepeticioness = response.Reportes;
        this.modalListadoRepeticiones = true;
      }
    })
  }
  salirmodal(){
    this.modalInfoReglasTorneo = false;
  }
  OpenmodalFichaCarrera(){
    this.modalFrichaCarrera = true
    this.imgModalCarrera=`https://multimedia.nitrosimracing.com.co/plantillasphp/fichacarrera.php?&id_calendario=${this.resultado.idCalendario}&id_piloto=${this.resultado.idPiloto}&id_descarga=N`
    this.enlaceModalCarrera=`https://multimedia.nitrosimracing.com.co/plantillasphp/fichacarrera.php?&id_calendario=${this.resultado.idCalendario}&id_piloto=${this.resultado.idPiloto}&id_descarga=Y`
  }
  openModlaReportesDeLaFecha(id:any){ 

    this.consultasService.ModaltablaReportesDeLaFecha(id).subscribe( response => {
      if(response.ok){
        this.resultadosReportesDeLaFecha = response.resultados
        this.noResult = false
      } else {
        this.noResult = false

      }
    }, err=> {
      this.noResult = true
    })
  }

  tab(id: string): void {
    const divs = document.querySelectorAll('.tabs_pestanas');
    const divSeklected = document.getElementById(id)
    divs.forEach( element => {
      element.classList.remove('active')
    });
    divSeklected?.classList.add('active');
    if(id === 'resultados'){
      this.getTablaResultados(this.resultado.idCalendario)
    }
    if(id === 'Reportes'){
     this.openModlaReportesDeLaFecha(this.resultado.idCalendario)
    }
    if(id === 'posiciones'){
      this.getTablaPosiciones(this.resultado.idCalendario)
    }
  }
  openModalMasInformacion(){
    this.tab('resultados');
    this.modalResultadosPosicionesReportes = true
  }
}
