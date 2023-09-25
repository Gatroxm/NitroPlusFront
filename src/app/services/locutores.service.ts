import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
const urlBase = `${environment.url}locutores/`;

@Injectable({
  providedIn: 'root'
})
export class LocutoresService {

  constructor(private http: HttpClient) {}

  public gettablaLocutores() {
    const url = `${urlBase}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public SelectorCarreraLocutores() {
    const url = `${urlBase}slecector-carrera-locutores`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public limpiarsalatransmision(id:string) {
    const url = `${urlBase}limpiarsalatransmision/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public pestanaOverlays(id:string) {
    const url = `${urlBase}pestanaOverlays/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public SelectPOverlayRequiereConfirmacion(id:string) {
    const url = `${urlBase}SelectPOverlayRequiereConfirmacion/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public SelectorMensaje() {
    const url = `${urlBase}SelectorMensaje`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public SelectPOverlayNoRequiereConfirmacion(id:string) {
    const url = `${urlBase}SelectPOverlayNoRequiereConfirmacion/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public getTablaCams(id:string) {
    const url = `${urlBase}getTablaCams/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public selectTablaCams(id:string) {
    const url = `${urlBase}selectTablaCams/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public updateSala(data:any) {
    const url = `${urlBase}updateSala`;
    return this.http.put(url, data).pipe(
      map((response:any) => response)
    )
  }
  public updatetTb_overlay_transmisiones(data:any) {
    const url = `${urlBase}updatetTb_overlay_transmisiones`;
    return this.http.put(url, data).pipe(
      map((response:any) => response)
    )
  }
  public updatetb_salas_transmision(data:any) {
    const url = `${urlBase}updatetb_salas_transmision`;
    return this.http.put(url, data).pipe(
      map((response:any) => response)
    )
  }
}
