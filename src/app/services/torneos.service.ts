import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
const urlBase = `${environment.url}torneo/`;

@Injectable({
  providedIn: 'root'
})
export class TorneosService {

  constructor(private http: HttpClient) {}

  public getInscritosTorneos(id: string ){
    const url = `${urlBase}tabla-inscritos/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getFormInscripcion(id: string ){
    const url = `${urlBase}tabla-form-torneos/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public slectidentificadorPilotoSim(idPiloto: string,idTorneo: string  ){
    const url = `${urlBase}lista-form-torneos/${idPiloto}/${idTorneo}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public getListadoReserva(idPiloto: string,idTorneo: string  ){
    const url = `${urlBase}lista-form-reservas/${idPiloto}/${idTorneo}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public selectIdCocheInicial(idTorneo: string  ){
    const url = `${urlBase}lista-coches-form-torneos/${idTorneo}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public selectIdEquipoInicial(idTorneo: string  ){
    const url = `${urlBase}lista-equipo-form-torneos/${idTorneo}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public pregunta(idTorneo: string  ){
    const url = `${urlBase}pregunta/${idTorneo}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public respuestasTipoUno(idTorneo: string  ){
    const url = `${urlBase}respuesta/${idTorneo}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }
  public insertInscription(data: any  ){
    const url = `${urlBase}insert-inscripcion`;
    return this.http.post(url, data).pipe(
      map((resp:any)=>resp)
    )
  }
  public insertReserva(data: any  ){
    const url = `${urlBase}insert-reserva`;
    return this.http.post(url, data).pipe(
      map((resp:any)=>resp)
    )
  }
}
