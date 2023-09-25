import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
const urlBase = `${environment.url}reportes-comisaros/`;
@Injectable({
  providedIn: 'root'
})
export class ComisariosService {

  constructor(private http: HttpClient) {}


  public getReportesPendientes(id:string){
    const url = `${urlBase}reportes-pendientes/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public getReportesPendientesRevisores(id:string){
    const url = `${urlBase}reportes-pendientes-revisores/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public pestannaConceptosReportesPendientesLideres(id:string){
    const url = `${urlBase}reportes-pendientes-lideres/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }

  public getSancionPropuesta(){
    const url = `${urlBase}sancion-propuesta`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }

  public getGravedad(id:string){
    const url = `${urlBase}gravedad/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }

  public getHistorialReportes(id:string){
    const url = `${urlBase}historial-reportes/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public getConceptos(id:string){
    const url = `${urlBase}conceptos/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public getTablaSanciones(){
    const url = `${urlBase}getTablaSanciones`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public getSanciones(id:string){
    const url = `${urlBase}sanciones/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }

  public updateConceptos(data:any){
    const url = `${urlBase}update-conceptos`;
    return this.http.put(url, data).pipe(
      map((response:any) => response)
    )
  }

  public callAplicarSancion(data:any){
    const url = `${urlBase}call-aplica-sancion`;
    return this.http.post(url, data).pipe(
      map((response:any) => response)
    )
  }
  public getPilotosInvolucrados(id:any){
    const url =`${urlBase}getPilotosInvolucrados/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }

  public insertInvolucrado(data:any){
    const url = `${urlBase}/insertInvolucrado`;
    return this.http.post(url, data).pipe(
      map((response:any) => response)
      );
  }
}
