import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(fechaObjetivo: Date): any {
    return setInterval(this.calculaContador(fechaObjetivo),1000)
  }
calculaContador(fechaObjetivo:Date):string{
  const fechaActual = new Date();
  const diferenciaTiempo = fechaObjetivo.getTime() - fechaActual.getTime();
  const segundosRestantes = Math.floor(diferenciaTiempo / 1000);
  const minutosRestantes = Math.floor(segundosRestantes / 60);
  const horasRestantes = Math.floor(minutosRestantes / 60);
  const diasRestantes = Math.floor(horasRestantes / 24);
  let response ='';
  if(diasRestantes === 0) {
    if (diasRestantes < 0 && minutosRestantes < 0 && horasRestantes < 0){
      response  = ''
    }
    response = `${horasRestantes % 24} : ${minutosRestantes % 60} : ${segundosRestantes % 60}`
  } else {
    if (diasRestantes < 0 && minutosRestantes < 0 && horasRestantes < 0){
      response  = ''
    }
    response = `${diasRestantes} Días ${horasRestantes % 24} : ${minutosRestantes % 60} : ${segundosRestantes % 60}`

  }
  return response;
}
  
}
