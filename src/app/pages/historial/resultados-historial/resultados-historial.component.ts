import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HistorialService } from 'src/app/services/historial.service';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-resultados-historial',
  templateUrl: './resultados-historial.component.html',
  styleUrls: ['./resultados-historial.component.scss']
})
export class ResultadosHistorialComponent implements OnInit {


  public usuario: Usuario;
  public resultados:any = []
  constructor(private _historialService: HistorialService, private _pilotoService: PilotosService){
    this.usuario = this._pilotoService.piloto;
  }
  ngOnInit(): void {
    this.cargaResultados();
  }


  cargaResultados(){
    this._historialService.getReslutadosHostorial(this.usuario.imprimeId()).subscribe( res =>{
      if(res.ok){
        this.resultados = res.respuesta;
      }
    })
  }

  retornaFecha(fecha:Date): Date {
    return new Date(fecha)
  }
}
