import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const urlBase = `${environment.url}mandos/`;
@Injectable({
  providedIn: 'root'
})
export class MandosService {

  constructor(private _http:HttpClient) { }

  public getMandos(){ 

    return this._http.get(urlBase).pipe(
      map((response:any) => response)
    )

  }
}
