import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
const urlBase = `${environment.url}licencias/`;

@Injectable({
  providedIn: 'root'
})
export class LicenciasService {

  constructor(private http: HttpClient) {}

  public getCalendarioLicencias(id:string) {
    const url = `${urlBase}calendario/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }

  public getTorneos(id:string) {
    const url = `${urlBase}torneos/${id}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }

  public getTiemposActuales(ididPiloto:string, idClasificacion:string) {
    const url = `${urlBase}tiempos-actuales/${ididPiloto}/${idClasificacion}`;
    return this.http.get(url).pipe(
      map((resp:any)=>resp)
    )
  }

  public InsertInscripcion(data:any) {
    const url = `${urlBase}inscripcion`;
    return this.http.post(url,data).pipe(
      map((resp:any)=>resp)
    )
  }
}
