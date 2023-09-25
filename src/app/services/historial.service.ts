import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
const urlBase = `${environment.url}historial/`;

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  constructor(private http: HttpClient) {}

  public getReportesHostorial(id:string) {
    const url = `${urlBase}historial-reportes/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public getReslutadosHostorial(id:string) {
    const url = `${urlBase}historial-resultados/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
}
