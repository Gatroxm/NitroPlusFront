import {
  LOCALE_ID,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ConsultasService } from 'src/app/services/consultas.service';
import { PilotosService } from 'src/app/services/pilotos.service';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { LicenciasService } from 'src/app/services/licencias.service';
registerLocaleData(localeEs, 'es');
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  // @ViewChild('sliderContainer') sliderContainer: ElementRef = new ElementRef('sliderContainer');
  @ViewChild('sliderContainer2') sliderContainer2: ElementRef = new ElementRef(
    'sliderContainer2'
  );
  @ViewChild('sliderContainer3') sliderContainer3: ElementRef = new ElementRef(
    'sliderContainer3'
  );
  @ViewChild('sliderContainer4') sliderContainer4: ElementRef = new ElementRef(
    'sliderContainer4'
  );
  @ViewChild('sliderContainer5') sliderContainer5: ElementRef = new ElementRef(
    'sliderContainer5'
  );
  @ViewChild('contentlicencias') contentlicencias: ElementRef = new ElementRef(
    'contentlicencias'
  );
  @ViewChild('sliderContainer7') sliderContainer7: ElementRef = new ElementRef('sliderContainer7');
  constructor(
    private _consultasService: ConsultasService,
    private _pilotoService: PilotosService,
    private _licenciasService: LicenciasService
  ) {
    this.usuario = _pilotoService.piloto;
  }

  listadoFechas: boolean = true;
  listadoResultados: boolean = false;
  listadoReportesProceso: boolean = true;
  listadoReportesEnviados: boolean = false;
  listadoResulatados: boolean = true;
  itemSelected: any = {};
  carreras: any[] = [];
  resultados: any[] = [];

  /**inicio licencias */
  public licencias: any[] = [];
  public licenciaModalcomoObtener: any[] = [];
  public tablaLicenciasCalendario: any[] = [];
  public tablaTiemposClasificacion: any[] = [];
  public licenciaModalCalendarioLicencias: any[] = [];
  public modalcomoobtberlicencias:boolean = false
  public ModalcalendarioLicencias:boolean = false
  public ListadoLicencias: boolean = true;
  /**fin licencias */
  //**Torneo */
  public Torneos: any[] = [];
  public torneo: any[] = [];
  public ModalInfoTorneo = false;
  public ModalInscribeteTorneo = false;
  public ModalReservaTorneo = false;
  public ListadoTorneos: boolean = true;
  public reportes: any[] = [];
  public reportesEnProceso: any[] = [];
  public dataTorneo:any={};
  public dataReservas:any={};
  public ListadoReportes: boolean = true;

  private sub1: any;
  private sub2: any;
  private sub3: any;

  ultimosResultados: any[] = [];
  user: any;

  ngOnInit(): void {
    this.getProximasCarreras(this.usuario.imprimeId());
    this.getTorneos(this.usuario.imprimeId());
    // this.getLicencias('27');
    this.getLicencias(this.usuario.imprimeId());
    this.getReportes(this.usuario.imprimeId());
    this.getResultados(this.usuario.imprimeId());
    this.getReportesEnProceso(this.usuario.imprimeId());
  }

  getTorneos(id: string) {
    this._licenciasService.getTorneos(id).subscribe((resp: any) => {
      console.log(resp)
      if (resp.ok) {
        this.Torneos = resp.torneos;
        if(this.Torneos.length > 0) {
          
          this.ListadoTorneos = true;
        }else {
          this.ListadoTorneos = false;
        }
      } else {
        this.ListadoTorneos = false;
      }
    },(err) => {
      this.ListadoTorneos = false;
    });
  }

  getReportesEnProceso(id: string) {
    this._consultasService
      .gteUltimosReportesEnProceso(id)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.listadoReportesProceso = true;
          this.reportesEnProceso = resp.ultimosReportesEnProceso;
        } else {
          this.listadoReportesProceso = false;
        }
      },(err) => {
        this.listadoReportesProceso = false;
      });
  }
  getProximasCarreras(id: string) {
    this.sub1 = this._consultasService
      .getProximasCarreras(id)
      .subscribe((response: any) => {
        if (response.ok) {
          if (response.carreras) {
            this.listadoFechas = true;
            this.carreras = response.top5Carreras;
          } else {
            this.listadoFechas = false;
          }
        }
      },(err) => {
        this.listadoFechas = false;
      });
  }

  getLicencias(id: string) {
    this.sub2 = this._consultasService
      .getLicencias(id)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.ListadoLicencias = true;
          this.licencias = resp.Licencias;
        } else {
          this.ListadoLicencias = false;
        }
      },(err) => {
        this.ListadoLicencias = false;
      });
  }
  getReportes(id: string) {
    this.sub3 = this._consultasService
      .getReportes(id)
      .subscribe((resp: any) => {
        if (resp.ok) {
          this.ListadoReportes = true;
          this.reportes = resp.Reportes;
        } else {
          this.ListadoReportes = false;
        }
      },(err) => {
        this.ListadoReportes = false;
      });
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
  verResultado(resultado: any) {
    this.itemSelected = {};
    const resultados = document.getElementById('resultados');
    resultados?.classList.add('show');
    this.itemSelected = resultado;
  }

  close(valor: string) {
    const element = document.getElementById(valor);
    element?.classList.remove('show');
  }

  getResultados(id: string) {
    this._consultasService.getResultados(id).subscribe((resp: any) => {
      if (resp.ok) {
        this.resultados = resp.resultados;
        this.listadoResulatados = true;
      } else {
        this.listadoResulatados = false;
      }
    }, (err) => {
      this.listadoResulatados = false;
    });
  }
  ngAfterViewInit() {
    console.log(this.contentlicencias);
    // this.silder(this.sliderContainer.nativeElement);
    this.silder(this.sliderContainer2.nativeElement);
    this.silder(this.sliderContainer3.nativeElement);
    this.silder(this.sliderContainer4.nativeElement);
    this.silder(this.sliderContainer5.nativeElement);
    this.silder(this.contentlicencias.nativeElement);
    this.silder(this.sliderContainer7.nativeElement);
  }
  silder(content: any) {
    const container = content;
    const slides = container.querySelectorAll('.slide');

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    container.addEventListener('mousedown', (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.classList.add('active');
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 3;
      container.scrollLeft = scrollLeft - walk;
    });

    // Prevent text selection during dragging
    container.addEventListener('selectstart', (e: any) => e.preventDefault());

    // Auto-scroll to the nearest card when the user stops dragging
    container.addEventListener('mouseup', () => {
      const center = container.scrollLeft + container.offsetWidth / 2;
      const closest: any = Array.from(slides).reduce((prev: any, curr: any) =>
        Math.abs(curr.offsetLeft - center) < Math.abs(prev.offsetLeft - center)
          ? curr
          : prev
      );
      closest.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /**Licencias */
  openmodallicencias($event:any){
    this.modalcomoobtberlicencias= true;
    this.licenciaModalcomoObtener = $event.licencia
  }
  openmodallicenciasCalendario($event:any){
    this.ModalcalendarioLicencias = true
  this.tablaLicenciasCalendario = $event.tablaLicenciasCalendario
  this.tablaTiemposClasificacion = $event.tablaTiemposClasificacion
  this.licenciaModalCalendarioLicencias = $event.licencia
  }

  openModalInfoTorneo($event:any){
    this.ModalInfoTorneo = true;
    this.torneo = $event.torneo
  }
  openModalInscribeteTorneo($event:any){
    this.ModalInscribeteTorneo = true;
    this.torneo = $event.torneo
    this.dataTorneo.pilotosIdSim = $event.pilotosIdSim
    this.dataTorneo.coches = $event.coches
    this.dataTorneo.equipoInicial = $event.equipoInicial
    this.dataTorneo.pregunta = $event.pregunta
    this.dataTorneo.respuestas = $event.respuestas
    this.dataTorneo.FormInscripcion = $event.FormInscripcion
  }
  penModalReservaTorneo($event:any){
    this.ModalReservaTorneo = true;
    this.torneo = $event.torneo
    this.dataReservas.coches= $event.coches,
    this.dataReservas.equipoInicial= $event.equipoInicial,
    this.dataReservas.resennas= $event.resennas
  }
  closeModalTorneoInscripcion(){
    this.getTorneos(this.usuario.imprimeId());
    this.getProximasCarreras(this.usuario.imprimeId());
    this.ModalInscribeteTorneo=false;
  }
  closeModaltorneoReserva(){
    this.getTorneos(this.usuario.imprimeId());
    this.getProximasCarreras(this.usuario.imprimeId());
    this.ModalReservaTorneo=false
  }
}
