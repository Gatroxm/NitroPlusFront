import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { PilotosService } from './pilotos.service';
const urlBase = `${environment.url}simuladores/`;
@Injectable({
  providedIn: 'root'
})
export class SimuladoresService {

  public usuario:Usuario;
  constructor( private http: HttpClient,private _pilotoService: PilotosService) {
    this.usuario = _pilotoService.piloto;
  }

  public getSimuladores() {

    const url = urlBase;

    return this.http.get(url).pipe(
      map((response:any) => response)
    )

  }

  public getIdentificadoresById(id:number) {
    const url = `${urlBase}identificadores/${id}`;

    return this.http.get(url).pipe(
      map((response:any) => response)
    )

  }

  public createIndicador(indicador:any){
    const url = `${urlBase}/indicador`;
    return this.http.post(url, indicador).pipe(
      map((response:any) => response)
    )
  }

  public updateIndicadorStatus(data:any){
    const url = `${urlBase}/indicador`;
    return this.http.put(url, data).pipe(
      map((response:any) => response)
    )
  }

}
