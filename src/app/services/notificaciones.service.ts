import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { PilotosService } from './pilotos.service';
const urlBase = `${environment.url}notificaciones/`;
@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private piloto:Usuario;
  constructor(private http: HttpClient, private _pilotoService: PilotosService) {
    this.piloto =  _pilotoService.piloto;
  }

  public getNotificaciones(id:string){
    const url = `${urlBase}${id}`;

    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }

  public updateNotification(id:string, notification:any){
    const url = `${urlBase}${id}`;

    return this.http.put(url,notification).pipe(
      map((response:any) => response)
    )
  }
}
