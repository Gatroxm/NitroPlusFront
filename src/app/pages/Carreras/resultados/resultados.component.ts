import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { DigitadoresService } from 'src/app/services/digitadores.service';

@Component({
  selector: 'app-resultados-digitadores',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  @Input() resultados:any;
  public filas:any[]=[];
  @ViewChild('formDirective') formDirective: any;
  @Output() closeModalResultados: EventEmitter<any> = new EventEmitter();
  public posiciones:any = []
  public pilotos:any = []
  public coche:any = []
  public equipo:any = []
  public pilotoSelected:any;

  constructor(private _digitadoresServices: DigitadoresService) {

   
  }

  getPosiscionesDigitadores(){
    this._digitadoresServices.getPosiscionesDigitadores().subscribe(data=> {
      if(data.ok){
        this.posiciones = data.respuesta
      }
      console.log("getPosiscionesDigitadores",data)
    })
  }
  getPilotosDigitadores(id:any){
    this._digitadoresServices.getPilotosDigitadores(id).subscribe(data=> {
      console.log("getPilotosDigitadores",data)
      if(data.ok){
        this.pilotos = data.respuesta
      }
    })
  }
  getCocheDigitadores(id:any){
    this._digitadoresServices.getCocheDigitadores(id).subscribe(data=> {
      console.log("getCocheDigitadores",data)
      if(data.ok){
        this.coche = data.respuesta
      }
    })
  }
  getEquipoDigitadores(id:any){
    console.log('data')
    this._digitadoresServices.getEquipoDigitadores(id).subscribe(data=> {
      console.log("getEquipoDigitadores",data)
      if(data.ok){
        this.equipo = data.respuesta
      }
    }, err =>{
      console.log(err)
    })
  }
  ngOnInit() {
    this.getPosiscionesDigitadores()
    this.getPilotosDigitadores(this.resultados.idCalendario)
    this.getCocheDigitadores(this.resultados.idTorneo)
    this.getEquipoDigitadores(this.resultados.idTorneo)

  }

  changuePiloto(item:any, i:number){
    console.log(item)
    this.filas[i].piloto = item
  }
  agregarFila() {
    const nuevaFila = {
      idPosicion:'',
      idPiloto:'',
      idCoche:'',
      idEquipoSim:'11',
      numeroVueltas:'',
      tiempoTotal:'',
      diferencia:'',
      mejorVuelta:'',
      tiempoQualy:'',
      paradasBoxes:'',
      PosSalida:'',
      Obsevaciones:'',
      posGanadas:'',
      idRegExt:'',
      idCalendario:'',
      idNombreDivision:'',
      idSimulador:'',
      idSimVersion:'',
      idCategoriaELO:'',
      idDivision:'',
      idInscripcion:''
    };

    this.filas.push(nuevaFila);
  }

  eliminarFila(index: number) {
    this.filas.splice(index, 1);
  }

  capturarInformacion() {
    this.filas.forEach((fila:any, index:number) => {

      this.pilotos.forEach((element:any) => {
        if(element.idPiloto == fila.idPiloto){
          this.filas[index].idDivision = element.idDivisionPiloto
          this.filas[index].idInscripcion = element.IdInscripcion;
          this.filas[index].idPiloto = parseFloat(element.idPiloto);
        }
      });
      this.filas[index].idPosicion = parseFloat(fila.idPosicion);
      this.filas[index].idCoche = parseFloat(fila.idCoche);
      this.filas[index].numeroVueltas = parseFloat(fila.numeroVueltas);
      this.filas[index].posSalida = parseFloat(fila.posSalida);
      this.filas[index].paradasBoxes = parseFloat(fila.paradasBoxes);
      this.filas[index].tiempoTotal = this.convertirAMilisegundos(fila.tiempoTotal);
      this.filas[index].diferencia = this.convertirAMilisegundos(fila.diferencia);
      this.filas[index].mejorVuelta = this.convertirAMilisegundos(fila.mejorVuelta);
      this.filas[index].tiempoQualy = this.convertirAMilisegundos(fila.tiempoQualy);
      this.filas[index].idCalendario = this.resultados.idCalendario;
      this.filas[index].idCategoriaELO = this.resultados.idCategoriaELO;
      this.filas[index].idNombreDivision = this.resultados.idDivision;
      this.filas[index].idRegExt = null;
      this.filas[index].idSimVersion = this.resultados.idSimVersion;
      this.filas[index].idSimulador = this.resultados.idSimulador;
      this.filas[index].posGanadas = null;
    });
    console.log(this.filas)
    this._digitadoresServices.createRegistrosMasivosTblResultados(this.filas).subscribe( response => {
      if(response.ok) {
        this.filas = []
        this.closeModalResultados.emit(false);
      }
    }, err => {
        this.filas = []
        this.closeModalResultados.emit(false);
    });
  }

  convertirAMilisegundos(x:any) {
    x = x.padStart(9, "0")
    // 00 4441521
    const arrrX = x.split('');
    const milisegundosArr = arrrX.slice(-3);
    const segundosArr = arrrX.slice(-5, -4) +arrrX.slice(-4,-3) 
    const minutosArr = arrrX.slice(-7,-6) + arrrX.slice(-6,-5) 
    const horasArr = arrrX.slice(0,-7);
    let hora= '';
    let milisegundos= '';
    horasArr.forEach((element:any)=> {
      hora += element
    });
    milisegundosArr.forEach((element:any)=> {
      milisegundos += element
    });
    const data =( parseFloat(hora) *3600000) + (parseFloat(minutosArr) * 60000) + (parseFloat(segundosArr) * 1000) + parseFloat(milisegundos)
    return data
  }
   
}
