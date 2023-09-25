import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
const urlBase = `${environment.url}comunicados/`;
const usuario = JSON.parse(localStorage.getItem('userNitroPlus') || '{}');
@Injectable({
  providedIn: 'root'
})
export class ComunicadosService {
  constructor(private http: HttpClient) {
  }

  public getComunicados(id:number){
    const url = `${urlBase}/${id}`;

    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public getComunicadosNoLeidos(id:number){
    const url = `${urlBase}comunicados-no-leidos/${id}`;

    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  public PutComunicado(data:any){
    const url = `${urlBase}`;

    return this.http.put(url, data).pipe(
      map((response:any) => response)
    )
  }
}
