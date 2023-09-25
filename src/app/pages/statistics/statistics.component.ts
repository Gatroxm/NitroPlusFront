import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public usuario: Usuario;
  constructor(private _pilotoService: PilotosService){
    this.usuario = this._pilotoService.piloto
  }
  ngOnInit(): void {
    this.crearIframe(`https://multimedia.nitrosimracing.com.co/plantillasphp/panelsimuladores.php?&id_piloto=${this.usuario.imprimeId()}`)
  }

  crearIframe(link:string){
    var link = link
    let iframe = document.createElement('iframe');
    iframe.setAttribute("src", link);
    iframe.setAttribute("class", 'embed-responsive-item');
    const div = document.getElementById("video") || null;
    div?.appendChild(iframe)
  }

}
