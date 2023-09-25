import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { PilotosService } from 'src/app/services/pilotos.service';
import { SimuladoresService } from 'src/app/services/simuladores.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-simuladores-by-piloto',
  templateUrl: './simuladores-by-piloto.component.html',
  styleUrls: ['./simuladores-by-piloto.component.scss']
})
export class SimuladoresByPilotoComponent implements OnInit, OnDestroy {

  private sub:any = null;
  public Simuladores:any[]=[]
  public usuario:Usuario;
  constructor(private _simuladoresServices: SimuladoresService,private _pilotoService: PilotosService){
    
    this.usuario = _pilotoService.piloto;
  }
  ngOnDestroy(): void {
    this.Simuladores=[];
    this.sub.unsubscribe()
  }
  ngOnInit(): void {
    
      this.getIdentificadores(this.usuario.imprimeId())

  }

  getIdentificadores(id:number){
    this.sub = this._simuladoresServices.getIdentificadoresById(id).subscribe((resp:any) => {
      this.Simuladores=[]
      if(resp.ok) {
        this.Simuladores = resp.simuladores
      }
    })
  }

  update(simulador:any){
    let estado = 0;
    if(simulador.idEstado === 0){
      estado=1
    }
    const data = {
      id:simulador.id,
      estado
    }
    this._simuladoresServices.updateIndicadorStatus(data).subscribe((resp:any) => {
      Swal.fire(resp.msg)
    })
  }
}
