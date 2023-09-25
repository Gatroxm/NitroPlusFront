import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { Usuario } from 'src/app/models/usuario.model';
import { ConsultasService } from 'src/app/services/consultas.service';
import { PilotosService } from 'src/app/services/pilotos.service';
@Component({
  selector: 'app-proximas-fechas',
  templateUrl: './proximas-fechas.component.html',
  styleUrls: ['./proximas-fechas.component.scss']
})
export class ProximasFechasComponent {
  @Input() carreras:any;
  btnReportes:boolean = false;
  modalReportes:boolean = false;
  modalInfoReglasTorneo:boolean = false;
  modalConfirmaciones:boolean = false;
  tab1:boolean = false;
  tab2:boolean = false;
  LiveCam:boolean = false;
  public confirma:boolean = false
public noconfirma:boolean = false
public questoin:boolean = false
public mesnaje:string = ""
  fechaCarrera:any;
  fechaFinReportes:any;
  contadorFechaFinReportes:any;
  public tablaConfirmados:any[]=[];
  link:boolean = false;
  usuario:Usuario;
  public data:any ={
    idPerfil:2,
    idPiloto:'',
    idCalendario:'',
    linkCamara:''
  }
  constructor(private consultasService: ConsultasService, private piloto:PilotosService){
    this.usuario = piloto.piloto;
  }
  ngOnInit(): void {
    this.data.idCalendario = this.carreras.idCalendario
    this.calculoFecha()
    this.fechaCarrera = new Date(this.carreras.Fecha);
    this.fechaFinReportes = new Date(this.carreras.CierreConfirmacion);
    if(this.carreras.host?.includes('http')){
      this.link = true;
    } else {
      this.link = false;
    }
    setInterval((a: any) => {
      if(this.btnReportes ){ 
        this.contadorFecha(this.fechaFinReportes);
      }
    }, 1000);
    this.tab('enviaTuCam')
    this.confirmarAsustenciaIcno()
  }

  confirmarAsustenciaIcno(){
    this.consultasService.getConfirmacion(this.carreras.idCalendario, this.usuario.imprimeId()).subscribe( resp=> {
      console.log(resp)
      if(resp.ok){
        switch (resp.resultados.estaConfirmado) {
          case 1:
            this.confirma = true
            this.noconfirma = false
            this.questoin = false
            break;
          case 0:
            this.noconfirma = true
            this.confirma = false
            this.questoin = false
          break;
          case 3:
            this.questoin = true
            this.confirma = false
            this.noconfirma = false
          break;
        }
        this.mesnaje = resp.resultados.Mensaje
      }
    })
  }

  public calculoFecha(): void {
    const fechaActual = moment(); // Obtener fecha y hora actual

    const fechaInicioReportes = moment(this.carreras.inicioConfirmacion);
    const fechaFinoReportes = moment(this.carreras.CierreConfirmacion);


    if (fechaActual.isBetween(fechaInicioReportes, fechaFinoReportes)) {
      this.btnReportes = true;
    } else {
      this.btnReportes = false;
    }
  }
  contadorFecha(fecha: any): string {
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
      response = `${horasRestantes % 24} H : ${minutosRestantes % 60} M : ${segundosRestantes % 60} S`;
    } else {
      if (diasRestantes < 0 && minutosRestantes < 0 && horasRestantes < 0) {
        response = '';
      }
      response = `${diasRestantes} D : ${horasRestantes % 24} H : ${
        minutosRestantes % 60
      } M : ${segundosRestantes % 60} S`;
    }
    this.contadorFechaFinReportes = response;

    
    return response;
  }

  retornaFecha(fecha:Date): Date {
    return new Date(fecha)
  }

  confirmar(estado:number){

    const data = {
      idDivision: this.carreras.idDivision,
      idCalendario: this.carreras.idCalendario,
      idCategoriaPiloto: this.carreras.idCategoriaPiloto,
      idTipoPiloto:this.carreras.idTipoPiloto,
      idPiloto: this.carreras.idPiloto,
      idCoche:this.carreras.idCoche,
      idEquipo: this.carreras.idEquipo,
      estaConfirmado: estado
    }
    this.consultasService.confirmacion(data).subscribe( resp => {
      if(resp.ok){
        alert('Confirmación actualizada')
        this.modalConfirmaciones = false;
        this.confirmarAsustenciaIcno()
      }
    })
  }
  openTablaConfirmados(id:string){
    this.consultasService.getTblaconfirmados(id).subscribe( results =>{
      if(results.ok){
        this.modalReportes = true;
        this.tablaConfirmados = results.resultados
      }
    })
  }
  salirmodal(){
    this.modalInfoReglasTorneo = false
  }
  tab(tab:string):void {
    let preview = document.getElementById('Preview-tab')
    let enviaTuCam = document.getElementById('enviaTuCam-tab')
    switch (tab) {
      case 'enviaTuCam':
        this.tab1 = true
        this.tab2 = false
        preview?.classList.remove('active')
        enviaTuCam?.classList.add('active')
        break;
      case 'Preview':
          this.tab1 = false
          this.tab2 = true
          preview?.classList.add('active')
          enviaTuCam?.classList.remove('active')
      break;
    }
  }
  guardarTb_camaras_transmisiones(){
    const data  = {
      idPerfil:1,
      idPiloto:this.usuario.imprimeId(),
      idCalendario:this.data.idCalendario,
      linkCamara:this.data.linkCamara
    };
    this.consultasService.insetb_camaras_transmisiones(data).subscribe( resp=> {
      if(resp.ok){
        // this.LiveCam = false
        console.log(resp)
        this.tab('Preview')
        setTimeout(() => {
          this.crearIframe(`${data.linkCamara}&autoplay=true`)
          
        }, 1000);
      }
    })
    console.log(data)
  }
  crearIframe(link:string){
    var link = link
    let iframe = document.createElement('iframe');
    iframe.setAttribute("src", link);
    iframe.setAttribute("class", 'embed-responsive-item');
    iframe.setAttribute("allow", 'autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;');
    const div = document.getElementById("video") || null;
    div?.appendChild(iframe)
  }
}

