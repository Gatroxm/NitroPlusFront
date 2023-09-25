import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario.model';
const urlBase = `${environment.url}pilotos/`;
const urlBaseRoles = `${environment.url}rol/`;
@Injectable({
  providedIn: 'root'
})
export class PilotosService {

  public piloto:Usuario = new Usuario();
  constructor(private _http:HttpClient) { }

  get id():string { 
    return this.piloto.id; 
  }

  public getPiloto(id:number){
    const url = `${urlBase}${id}`; 
    return this._http.get(url).pipe(
      map((response:any) => response))
  }


  public logIn(data:any) {
    const url = `${urlBase}login`;
    return this._http.post(url, data).pipe(
      map((response:any) => {
        const {id, nombre, apellido,nombreCorto, idEstado, fechaNacimiento, idNacionalidad, instagram, ciudad, departamento, idPaisResidencia, resena, correoElectronico, password, whatsapp, create_at, update_at, idMando, discordId, nombreDiscord, canal_twitch, canal_facebook, canal_youtube,
          aceptaCondiciones, aceptaWhatsapp,aceptaCorreos } = response.piloto
        this.piloto = new Usuario(id, nombre, apellido,nombreCorto, idEstado, fechaNacimiento, idNacionalidad, instagram, ciudad, departamento, idPaisResidencia, resena, correoElectronico, password, whatsapp, create_at, update_at, idMando, discordId, nombreDiscord, canal_twitch, canal_facebook, canal_youtube,
          aceptaCondiciones, aceptaWhatsapp,aceptaCorreos);
         return response
      })
    );
  }

  public getPilotosDesActivados(param:string = '') {
    const url = `${urlBase}in-activos?param=${param}`;
    return this._http.get(url).pipe(
      map((response:any) => response))
  }

  public updatePilotoInActivo(data:any) {
    const url = `${urlBase}register-update`;
    return this._http.put(url, data).pipe(
      map((response:any) => response))
  }
  public changePassword(data:any) {
    const url = `${urlBase}changue-parword`;
    return this._http.put(url, data).pipe(
      map((response:any) => response))
  }

  public registerPiloto(data:any) {
    const url = `${urlBase}register`;
    return this._http.post(url, data).pipe(
      map((response:any) => response))
  }
  public updatePiloto(data:any) {
    const url = `${urlBase}edit`;
    return this._http.put(url, data).pipe(
      map((response:any) => response))
  }

  public getFotoPiloto(id:number) {
    const url = `${urlBase}/imagen/${id}`;
    return this._http.get(url).pipe(
      map((response:any) => response))
  }

  getRoles(id:string) {
    const url = `${urlBaseRoles}rol-piloto/${id}`;
    return this._http.get(url).pipe(
      map((response:any) => response))
  }

  AceptaCorreos(data:any) {
    const url = `${urlBase}AceptaCorreos`;
    return this._http.put(url, data).pipe(
      map((response:any) => response))
  }
  AceptaWhatsapp(data:any) {
    const url = `${urlBase}AceptaWhatsapp`;
    return this._http.put(url, data).pipe(
      map((response:any) => response))
  }

}
