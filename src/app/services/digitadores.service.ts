import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
const urlBase = `${environment.url}digitadores/`;

@Injectable({
  providedIn: 'root'
})
export class DigitadoresService {
  
  constructor(private http: HttpClient,) {
  }

  getTornesoDigitadores(id:number) {
    const url = `${urlBase}torneos-digitadores/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  getPosiscionesDigitadores() {
    const url = `${urlBase}posiciones-digitadores`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  getPilotosDigitadores(id:number) {
    const url = `${urlBase}piloto-digitadores/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  getCocheDigitadores(id:number) {
    const url = `${urlBase}coche-digitadores/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  getEquipoDigitadores(id:number) {
    const url = `${urlBase}equipo-digitadores/${id}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
  createRegistrosMasivosTblResultados(data:any){
    const url = `${urlBase}insert-resultados`;
    return this.http.post(url, data).pipe(
      map((response:any) => response)
    )
  }

}
