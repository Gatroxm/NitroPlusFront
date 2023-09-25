import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
const urlBase = `${environment.url}apoyo/`;
@Injectable({
  providedIn: 'root'
})
export class ApoyanosService {

  constructor(private http: HttpClient) {}

  public getApoyanosNitro(){
    const url = `${urlBase}nitro`;

    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public getTiendaOficial(){
    const url = `${urlBase}tienda-oficial`;

    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
}
