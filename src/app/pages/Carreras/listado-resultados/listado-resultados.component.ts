import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { DigitadoresService } from 'src/app/services/digitadores.service';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-listado-resultados',
  templateUrl: './listado-resultados.component.html',
  styleUrls: ['./listado-resultados.component.scss']
})
export class ListadoResultadosComponent implements OnInit {
  private piloto:Usuario;
  public ModalDigitadoers:boolean = false;
  public resultados:any[]=[];
  public resultado:any;
  constructor(private _digitadoresServices: DigitadoresService, private _pilotoService: PilotosService){
    this.piloto =  _pilotoService.piloto;
  }
  ngOnInit(): void {
    this.getResultadoDigitadores(this.piloto.imprimeId())
  }

  getResultadoDigitadores(id: number){
    this._digitadoresServices.getTornesoDigitadores(id).subscribe( results => {
      if( results.ok) {
        console.log(results)
        this.resultados = results.respuesta
      }
    }, err => {
      alert('Error al cargar el listado')
    })
  }
  retornaFecha(fecha: Date): Date {
    return new Date(fecha);
  }
  openModalResultados(item:any){

    this.resultado = item;;
    this.ModalDigitadoers = true;
  }
  closeModal(){
    this.ModalDigitadoers = false;
    this.resultado = {}
  }
}
