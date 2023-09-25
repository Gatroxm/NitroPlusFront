import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario.model';
import { ComunicadosService } from 'src/app/services/comunicados.service';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styleUrls: ['./comunicados.component.scss']
})
export class ComunicadosComponent {
  public comunicados:any[]=[];
  public usuario:Usuario;
  public modalComunicados:boolean = false;
  public comunicadoView:any= {}
  pdfSrc: SafeResourceUrl={};
  constructor(private sanitizer: DomSanitizer,private _comunicadosServices: ComunicadosService, private _pilotoService: PilotosService){
    this.usuario = _pilotoService.piloto;
    this.getComunicados(this.usuario.imprimeId())
  }

  getComunicados(id:number){
    this._comunicadosServices.getComunicados(id).subscribe( (resp:any) => {
      if(resp.ok){
        this.comunicados = resp.comunicados;
        
      }
    })
  }
  viewComunicado(comunicado:any){
    
    this.modalComunicados = true;
    this.comunicadoView = {}
    this.comunicadoView = comunicado;
    if(comunicado.leido === 0){
      const data = { idPiloto:this.usuario.imprimeId(), idComunicado:comunicado.id }
      this._comunicadosServices.PutComunicado(data).subscribe(data =>{
        if(data.ok){
          this.getComunicados(this.usuario.imprimeId())
        }
      })
    }
  }
  public leido(id:number):Boolean{
    if(id === 0){
      return true;
    }else {
      return false
    }
  }
}
