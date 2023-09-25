import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { paices,  ciudades, timeZone } from '../data/data.pais-ciudad';
const urlBase = `${environment.url}pais/`;
@Injectable({
  providedIn: 'root'
})
export class PaisCiudadService {

  constructor(private http: HttpClient) { }

  getPaices () {
    return this.http.get(urlBase).pipe(
      map((resp:any) => resp)
    );
  }

  getPaisById( id:number) {
    return paices.filter(p => p.id === id);
  }

  getCiudades(id: number) {
    const city = ciudades.filter( c => c.id_pais === id);
    return city;
  }

  getTimeZone(){
    return timeZone
  }
}
