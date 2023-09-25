import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-modal-torneo',
  templateUrl: './modal-torneo.component.html',
  styleUrls: ['./modal-torneo.component.scss'],
})
export class ModalTorneoComponent implements OnInit {
  @Input() id: string = '';
  @Output() newItemEvent = new EventEmitter<boolean>();
  public tab1: boolean = true;
  public tab2: boolean = false;
  public tab3: boolean = false;
  public tab4: boolean = false;
  public InfoReglasTorneo: any[] = [];
  public tablaConfirmados: any[] = [];
  public tablaCalendario: any[] = [];
  public tablaSancionados: any[] = [];
  public tablaSistemaDePuntos: any[] = [];
  public tablaRepeticiones: any[] = [];
  public tabla: any[] = [];
  public verIframe = false
  constructor(private consultasService: ConsultasService) {}
  ngOnInit(): void {
    this.consultasService.infoTornesoReglas(this.id).subscribe((resp) => {
      if (resp.ok) {
        this.InfoReglasTorneo = resp.response;
      }
    });
    this.openTablaConfirmados(this.id)
    
  }
  openTablaConfirmados(id:string){
    this.consultasService.getTblaconfirmados(id).subscribe( results =>{
      if(results.ok){
        this.tablaConfirmados = results.resultados
      }
    })
    
    
  }
  tab(id: string): void {
    const divs = document.querySelectorAll('.tabs_pestanas');
    const divSeklected = document.getElementById(id)
    divs.forEach( element => {
      element.classList.remove('active')
    });
    divSeklected?.classList.add('active');
    if(id === 'Sancionados'){
      this.consultasService.getSancionadosMasInfo(this.id).subscribe( respuesta => {
        if(respuesta.ok) {
          console.log(respuesta.resultados)
          this.tablaSancionados = respuesta.resultados
        }
      })
    }
    if(id === 'CalendarioTorneo'){
      this.consultasService.getCalendarioDelTornaoMasInfo(this.id).subscribe( respuesta => {
        if(respuesta.ok) {
          console.log(respuesta.resultados)
          this.tablaCalendario = respuesta.resultados
        }
      })
    }
    if(id === 'sistemaPts'){
      this.consultasService.getSistemaDePuntosMasInfo(this.id).subscribe( respuesta => {
        if(respuesta.ok) {
          console.log(respuesta.resultados)
          this.tablaSistemaDePuntos = respuesta.resultados
        }
      })
    }
    if(id='Repeticiones'){
      this.consultasService.getRepeticiones(this.id).subscribe( respuesta => {
        if(respuesta.ok) {
          console.log(respuesta.resultados)
          this.tablaRepeticiones = respuesta.resultados
        }
      })
    }
  }
  salir() {
    this.newItemEvent.emit(false);
  }
  retornaFecha(fecha: Date): Date {
    return new Date(fecha);
  }

  createIframeDinaic(Link:string,idContent:any){
    let iframe = document.createElement('iframe');
    iframe.setAttribute("src", Link);
    iframe.setAttribute("class", 'embed-responsive-item');
    console.log(iframe);
    const div:any = document.getElementById(`${idContent}-Iframe`);
    div.classList.add("expandido")
    console.log(div)
    div.innerHTML   = ''
    // div.textContent    = ''
    div.appendChild(iframe)
  }
}
