import { Component, Input } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';
import * as moment from 'moment';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-reportes-en-proceso',
  templateUrl: './reportes-en-proceso.component.html',
  styleUrls: ['./reportes-en-proceso.component.scss']
})
export class ReportesEnProcesoComponent {
/**modales */
public modalResultados:boolean = false;
public modalReportes:boolean = false;
public btnReportes:boolean = false;
public modalApelaciones:boolean = false;
public modalInfoReglasTorneo:boolean = false;
public contadorFechaFinReportes: any;
public fechaFinReportes: any;
/**tablas */
public datosInformacionGeneral: any[] = [];
  @Input() reporte: any;
  public fechaCarrera: any;

  public ApelarAclarar = this.fb.group({
    apelacionyapcaracion :[''],
    LinkEvidencia  :['']
  });
  constructor(private consultasService: ConsultasService,  private fb: FormBuilder){}

  ngOnInit(): void {
    this.calculoFecha();
    this.fechaCarrera = new Date(this.reporte.Fecha);
    this.fechaFinReportes = new Date(this.reporte.finApelaciones);
    setInterval((a: any) => {
      if(this.btnReportes ){ 
        this.contadorFecha(this.fechaFinReportes);
      }
    }, 1000);
  }
  openModalResultados(id:string){
    this.modalResultados = true;
  }
  openModalReportes(id:string){
    this.consultasService.getTblaModalInformacionGeneral(id).subscribe(result=> {
      if(result.ok){
        this.modalReportes = true;
        this.datosInformacionGeneral = result.response;
      }
    })
  }
  retornaFecha(fecha:Date): Date {
    return new Date(fecha)
  }

  public calculoFecha(): void {
    const fechaActual = moment(); // Obtener fecha y hora actual

    const fechaInicioReportes = moment(this.reporte.inicioReportes);
    const fechaFinoReportes = moment(this.reporte.finApelaciones);

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
    this.contadorFechaFinReportes = response;

    
    return response;
  }

  Guardar(){
    const data = {
      idInvolucradoSancion :this.reporte.idInvolucrado,
      descargo :this.ApelarAclarar.value.apelacionyapcaracion,
      linkEvidencia: this.ApelarAclarar.value.LinkEvidencia
    }
    this.consultasService.InsertApelacionAclaracion(data).subscribe(data => {
      if(data.ok) {
        alert('Apelación / aclaración Guardada');
        this.modalApelaciones = false
      }
    })
  }
  salirmodal(){
    this.modalInfoReglasTorneo = false
  }
}
