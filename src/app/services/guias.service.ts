import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
const urlBase = `${environment.url}guias/`;
@Injectable({
  providedIn: 'root'
})
export class GuiasService {

  constructor(private http: HttpClient) {}

  public getGias() {
    const url = `${urlBase}`;
    return this.http.get(url).pipe(
      map((response:any) => response)
    )
  }
}
