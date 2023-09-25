import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ConsultasService } from 'src/app/services/consultas.service';
import { LocutoresService } from 'src/app/services/locutores.service';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-locutores',
  templateUrl: './locutores.component.html',
  styleUrls: ['./locutores.component.scss']
})
export class LocutoresComponent implements OnInit {

  public locutores:any = []
  public selectCarreras:any = []
  public selectPilotosPUno:any = []
  public selectPilotosPDos:any = []
  public overlay:any = []
  public cams:any = []
  public mensajes:any = []
  public data:any ={
    idPerfil:1,
    idPiloto:'',
    idCalendario:'',
    linkCamara:''
  }
  tab1:boolean = false;
  tab2:boolean = false;
  Paneltransmision:boolean = false;
  LiveCam:boolean = false;
  usuario:Usuario;
  idSala='';
  linkCamara='';
  idCALENDARIO='';
  itemSelectedSala:any ={};
  formOverlay = {
    idSala:'',
    idPiloto:'',
    idMensaje:'',
    personalizadoPiloto:'',
    personalizadoEquipo:'',
  }
  constructor( private _locutoresServices: LocutoresService,private consultasService: ConsultasService, private piloto:PilotosService){
    this.usuario = piloto.piloto;
  }
  ngOnInit(): void {

    this.tab('calendario')
    this.cargaInfo()
    this._locutoresServices.SelectorCarreraLocutores().subscribe( resp => {
      if(resp.ok){
        this.selectCarreras = resp.respuesta
      }
    })

  }
  cargaInfo(){
    this._locutoresServices.gettablaLocutores().subscribe( resp => {
      if(resp.ok){
        this.locutores = resp.respuesta
      }
    })
  }
  tab(tab:string):void {
    let preview = document.getElementById('Preview-tab')
    let enviaTuCam = document.getElementById('enviaTuCam-tab')
    switch (tab) {
      case 'calendario':
        this.tab1 = true
        this.tab2 = false
        preview?.classList.remove('active')
        enviaTuCam?.classList.add('active')
      break;
      case 'Preview':
        this.tab1 = false
        this.tab2 = true
        preview?.classList.add('active')
          enviaTuCam?.classList.remove('active')
      break;
    }
  }
  guardarTb_camaras_transmisiones(){
    const data  = {
      idPerfil:1,
      idPiloto:this.usuario.imprimeId(),
      idCalendario:this.data.idCalendario,
      linkCamara:this.data.linkCamara
    };
    this.consultasService.insetb_camaras_transmisiones(data).subscribe( resp=> {
      if(resp.ok){
        this.tab('Preview')
        setTimeout(() => {
          this.crearIframe(`${data.linkCamara}&autoplay=true`)
          
          this.idCALENDARIO = '';
        }, 1000);
      }
    })
    console.log(this.data)
  }
  retornaFecha(fecha:Date): Date {
    return new Date(fecha)
  }

  cambiaSelect(element:any, data:any){
    const datos = {
      id: data.id,
      idCalendario: parseFloat(element.value)
    }
    this.idCALENDARIO = element.value
    this._locutoresServices.updateSala(datos).subscribe( resp => {
      if(resp.ok) {
        this.cargaInfo()
        alert('Sala actualizada')
      }
    })
  }

  crearIframe(link:string){
    var link = link
    let iframe = document.createElement('iframe');
    iframe.setAttribute("src", link);
    iframe.setAttribute("class", 'embed-responsive-item');
    iframe.setAttribute("allow", 'autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;');
    const div = document.getElementById("video") || null;
    div?.appendChild(iframe)
  }
  createIframeDinaic(idContent:string,idSala:string, Link:string){
    const link = `${Link}?id_sala=${idSala}`
    let iframe = document.createElement('iframe');
    iframe.setAttribute("src", link);
    iframe.setAttribute("class", 'embed-responsive-item');
    iframe.setAttribute("allow", 'autoplay;camera;microphone;fullscreen;picture-in-picture;display-capture;midi;geolocation;');
    const div:any = document.getElementById(`${idContent}-Iframe`);
    console.log(div)
    div.innerHTML   = ''
    // div.textContent    = ''
    div.appendChild(iframe)
  }
  openModalLIveCam(item:any){
    this.tab('calendario')
    this.LiveCam = true
    this.data  = {
      idPerfil:2,
      idPiloto:this.usuario.imprimeId(),
      idCalendario:this.idCALENDARIO,
      linkCamara:this.data.linkCamara
    };
    console.log(this.data)
  }
  limpiarsalatransmision(id:any){
    this._locutoresServices.limpiarsalatransmision(id).subscribe(data =>{
      if(data.ok){
        this.cargaInfo()
        alert('sala limpiada');
      }
    })
  }
  openModalPanelTramision(item:any){
    this.Paneltransmision = true;
    this.itemSelectedSala = item;
    console.log(item)
    setTimeout(() => {
      
      this.createIframeDinaic('p-modal',item.id, `https://multimedia.nitrosimracing.com.co/plantillasphp/transmisiones/master/imagencompartida.php`)
      this.tabPestanas('p-overlay', item)
    }, 100);
  }

  cargaSElectPesntanaUno(id: number, idCalendario:string){
    if(id === 1) {
      this._locutoresServices.SelectPOverlayRequiereConfirmacion(idCalendario).subscribe( resp => {
        if(resp.ok) {
          this.selectPilotosPUno = resp.respuesta
          console.log(this.selectPilotosPUno)
        }
      });
    } else if (id === 0) {
      this._locutoresServices.SelectPOverlayNoRequiereConfirmacion(idCalendario).subscribe( resp => {
        if(resp.ok) {
          this.selectPilotosPUno = resp.respuesta
          console.log(this.selectPilotosPUno)
        }
      });
    }
    this._locutoresServices.SelectorMensaje().subscribe( resp => {
      if(resp.ok) {
        this.mensajes = resp.respuesta
      }
    })
  }

  tabPestanas(id:string, data:any = {}) {
    const divs = document.querySelectorAll('.tabs_pestanas');
    const divSeklected = document.getElementById(id)
    divs.forEach( element => {
      element.classList.remove('active')
    });
    divSeklected?.classList.add('active');
    const url = `https://multimedia.nitrosimracing.com.co/plantillasphp/transmisiones/master/`
    switch (id) {
      case 'p-overlay':
        this._locutoresServices.pestanaOverlays(data.id).subscribe( resp => {
          if(resp.ok) {
            this.overlay = resp.respuesta
          }
        });
        this.cargaSElectPesntanaUno(data.requiereConfirmacion, data.idCalendario)
        break;
      case 'p-cams':
        this.cargaSElectPesntanaDos()
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}livecamsfecha.php`)
        break;
      case 'p-botonera':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}botonera.php`)
        break;
      case 'p-OBS':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}controlobs.php`)
        break;
      case 'p-liveTiming':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}livetiming.php`)
        break;
      case 'p-entry':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}parrilla.php`)
        break;
      case 'p-qualy':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}qualyresult.php`)
        break;
      case 'p-result':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}raceresult.php`)
        break;
      case 'p-tp':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}tablaposiciones.php`)
        break;
      case 'p-cal':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}calendario.php`)
        break;
      case 'p-votos':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}pilotodia.php`)
        break;
      case 'p-wiki':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}wiki.php`)
        break;
      case 'p-chat':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}chatenvivo.php`)
        break;
      case 'p-aux-1':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}aux1.php`)
        break;
      case 'p-aux-2':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}aux2.php`)
        break;
      case 'p-aux-3':
        this.createIframeDinaic(id,this.itemSelectedSala.id, `${url}aux3.php`)
        break;
    
      default:
        break;
    }
  }

  changePiloto(target:any, item:any){

      const data = {
        id: item.id,
        idPiloto: target.value
      }
      this._locutoresServices.updatetTb_overlay_transmisiones(data).subscribe(data =>{
        if(data.ok){
          alert(data.msg)
        }
      })

  }

  cargaSElectPesntanaDos(){
    this._locutoresServices.getTablaCams(this.itemSelectedSala.id).subscribe( resp => {
      if(resp.ok){
        this.cams = resp.respuesta
      }
    });
    this._locutoresServices.selectTablaCams(this.itemSelectedSala.idCalendario).subscribe( resp => {
      if(resp.ok){
        this.selectPilotosPDos = resp.respuesta
      }
    })
  }

  guardaRegistro(value:any, caso:string){
    let data:any = {
      id: this.itemSelectedSala.id,
      linkChat:this.itemSelectedSala.linkChat?this.itemSelectedSala.linkChat:'',
      linkTransmision:this.itemSelectedSala.linkTransmision?this.itemSelectedSala.linkTransmision:'',
      linkLiveTiming1:this.itemSelectedSala.linkLiveTiming1?this.itemSelectedSala.linkLiveTiming1:'',
      linkLiveTiming2:this.itemSelectedSala.linkLiveTiming2?this.itemSelectedSala.linkLiveTiming2:'',
      linkBotonera:this.itemSelectedSala.linkBotonera?this.itemSelectedSala.linkBotonera:'',
      linkObsControl:this.itemSelectedSala.linkObsControl?this.itemSelectedSala.linkObsControl:'',
      linkCamaraCompartida:this.itemSelectedSala.linkCamaraCompartida?this.itemSelectedSala.linkCamaraCompartida:'',
    }
    switch (caso) {
    case 'linkChat':
      
      this.itemSelectedSala.linkChat = value
      data.linkChat = value
      break;
    case 'linkTransmision':
      this.itemSelectedSala.linkTransmision = value
      data.linkTransmision = value

      break;
    case 'linkLiveTiming1':
      this.itemSelectedSala.linkLiveTiming1 = value
      data.linkLiveTiming1 = value

      break;
    case 'linkLiveTiming2':
      this.itemSelectedSala.linkLiveTiming2 = value
      data.linkLiveTiming2 = value

      break;
    case 'linkBotonera':
      this.itemSelectedSala.linkBotonera = value
      data.linkBotonera = value

      break;
    case 'linkObsControl':
      this.itemSelectedSala.linkObsControl = value
      data.linkObsControl = value

      break;
    case 'linkCamaraCompartida':
      this.itemSelectedSala.linkCamaraCompartida = value
      data.linkCamaraCompartida = value
      break;
    }
    this._locutoresServices.updatetb_salas_transmision(data).subscribe(resp => {
      if(resp.ok){
        alert('campo actualizado');
        this.cargaInfo()
      }
    });
  }

  GuardarOverlayFrom(){
  this.formOverlay.idSala =  this.itemSelectedSala.id
    console.log('Guardar Overlay From', this.formOverlay)
  }
}
