import { Component, Input, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-reportes-cerrados',
  templateUrl: './reportes-cerrados.component.html',
  styleUrls: ['./reportes-cerrados.component.scss']
})
export class ReportesCerradosComponent implements OnInit {
  /**modales */
  public modalResultados:boolean = false;
  public modalReportes:boolean = false;
  public modalInfoReglasTorneo:boolean = false;
  /**tablas */
  public datosInformacionGeneral: any[] = [];
  public fechaCarrera: any;
  @Input() reporte: any;

  constructor(private consultasService: ConsultasService){}

  ngOnInit(): void {
    this.fechaCarrera = new Date(this.reporte.Fecha);
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
  salirmodal(){
    this.modalInfoReglasTorneo = false
  }
}
