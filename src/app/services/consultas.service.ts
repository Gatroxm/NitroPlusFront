import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { PilotosService } from './pilotos.service';
const urlBase = `${environment.url}consultas/`;
const urlBasecard = `${environment.url}cards/`;
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  private piloto:Usuario;
  constructor(private http: HttpClient, private _pilotoService: PilotosService) {
    this.piloto =  _pilotoService.piloto;
  }

  public async getConsultas(id:number){
    const urlParticipaciones = `${urlBase}participaciones/${id}`;
    const urlVictorias= `${urlBase}victorias/${id}`;
    const [participaciones,Victorias]:any = await  Promise.all([
      this.http.get(urlParticipaciones).pipe( map((resp:any)=>resp.Participaciones[0])),
      this.http.get(urlVictorias).pipe( map((resp:any)=>resp.Victorias[0]))
    ])
    return [
      participaciones,
      Victorias,
    ]
  }

  public getProximasCarreras(id:string){
    const url = `${urlBase}ProximasCarreras/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }

  public getUltimosResultados(id:string) {
    const url = `${urlBase}UltimosResultados/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public gteUltimosReportesEnProceso(id:string) {
    const url = `${urlBase}UltimosReportesResibidos/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getUltimosReportesCerrados(desde:number,id:string) {
    const url = `${urlBase}UltimosReportesEnviados/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }

  public getSimuladores(id:string) {
    const url = `${urlBase}simuladores/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }

  public getLicencias(id:string){
    const url = `${urlBase}licencias/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getReportes(id:string){
    const url = `${urlBase}reportes/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getRepeticiones(id:string){
    const url = `${urlBase}getRepeticiones/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }

  public getResultados(id:string){
    const url = `${urlBase}resultados/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }

  public getTablaResultados(id:string){
    const url = `${urlBasecard}tabla-reultados/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getTablaPosiciones(id:string){
    const url = `${urlBasecard}tabla-posiciones/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getListadoPilotosParticipantes(id:string){
    const url = `${urlBasecard}listado-pilotos-participantes/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }

  public insertRepeticiones(data:any){
    const url = `${urlBasecard}insert-repeticiones`;
    return this.http.post(url,data).pipe(
      map((resp:any)=>resp)
    )
  }
  public GuardadoReporte(data:any){
    const url = `${urlBasecard}insert-reporte`;
    return this.http.post(url,data).pipe(
      map((resp:any)=>resp)
    )
  }
  public getTblaRepeticiones(id:string){
    const url = `${urlBasecard}/tabla-repeticiones/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getTblaModalInformacionGeneral(id:string){
    const url = `${urlBasecard}/modal-informacion-generla/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getTblaconfirmados(id:string){
    const url = `${urlBasecard}/tabla-confirmados/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getConfirmacion(idCalendario:string,id:string){
    const url = `${urlBasecard}/getConfirmacion/${idCalendario}/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public InsertApelacionAclaracion(data:any){
    const url = `${urlBasecard}/apelaciones`;
    return this.http.post(url, data).pipe(
      map((resp:any)=>resp)
    )
  }
  public confirmacion(data:any){
    const url = `${urlBasecard}/confirmacion`;
    return this.http.post(url, data).pipe(
      map((resp:any)=>resp)
    )
  }
  public infoTornesoReglas(id:string){
    const url = `${urlBasecard}/infoTorneo/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public ModaltablaReportesDeLaFecha(id:string){
    const url = `${urlBasecard}modal-reportes-dela-fecha/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public insetb_camaras_transmisiones(data:any){
    const url = `${urlBasecard}insetb_camaras_transmisiones`;
    return this.http.post(url, data).pipe(
      map((resp:any)=>resp)
    )
  }


  public getSancionadosMasInfo(id:string){
    const url = `${urlBasecard}getSancionadosMasInfo/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getCalendarioDelTornaoMasInfo(id:string){
    const url = `${urlBasecard}getCalendarioDelTornaoMasInfo/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getSistemaDePuntosMasInfo(id:string){
    const url = `${urlBasecard}getSistemaDePuntosMasInfo/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
}
