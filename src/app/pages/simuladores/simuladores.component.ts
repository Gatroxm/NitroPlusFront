import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SimuladoresService } from 'src/app/services/simuladores.service';

@Component({
  selector: 'app-simuladores',
  templateUrl: './simuladores.component.html',
  styleUrls: ['./simuladores.component.scss']
})
export class SimuladoresComponent {

  public Simuladores:any[] = [];

  public modalShow:boolean = false;
  public modalShowInformacion:boolean = false;

  public CreateIdentificador = {
    simulador: {
      nombre: 'Assetto Corsa Competizione',
      plataforma: 'STEAM',
      codigo: 'Steam ID (Largo)'
    },
    idPiloto: '1422',
    idSimCodPlataforma: '',
    idSimPiloto: '',
  }

  public informacion = {
    descripcion:'',
    pasos: '',
    imagen: '',
    restricciones: ''
  }

  public user:any;

  constructor(private _simuladoresServices: SimuladoresService,private _router: Router){
    this.user = JSON.parse( localStorage.getItem('userNitroPlus') || '')
    this._simuladoresServices.getSimuladores().subscribe( (resp:any) => {

      if(resp.ok) {
        this.Simuladores = resp.simuladores
      }

    });
    

  }

  openModal(simulador:any) {
    this.CreateIdentificador.simulador.nombre = simulador.sim;
    this.CreateIdentificador.simulador.plataforma = simulador.plat;
    this.CreateIdentificador.simulador.codigo = simulador.cod;
    this.CreateIdentificador.idPiloto = this.user.id;
    this.CreateIdentificador.idSimCodPlataforma = simulador.id;
    this.CreateIdentificador.idSimPiloto = "";
    this.modalShow = true;

  }

  openModalInfo(simulador:any) {

    this.modalShowInformacion = true

    this.informacion.descripcion = simulador.descripcion;
    this.informacion.pasos = simulador.instrucciones;
    this.informacion.imagen = simulador.imgGuia;
    this.informacion.restricciones = simulador.restricciones;

  }

  guardar(){
    const data = {
      idPiloto: this.CreateIdentificador.idPiloto,
      idSimCodPlataforma: this.CreateIdentificador.idSimCodPlataforma,
      idSimPiloto: this.CreateIdentificador.idSimPiloto
    }
    this._simuladoresServices.createIndicador(data).subscribe(resp => {
      if(resp.ok){
        this._router.navigateByUrl('/dashboard/simulators/identiti')
      } else {
        alert('Error'+resp.msg)
      }
    })
  }

}
