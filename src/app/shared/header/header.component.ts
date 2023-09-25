import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, retry } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { ComunicadosService } from 'src/app/services/comunicados.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { PilotosService } from 'src/app/services/pilotos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuario:Usuario;
  // public countComunicatorSubscribe: Subscription;
  constructor(
    private _router: Router,
    private _pilotoService: PilotosService,
    private _notificacionesServices:NotificacionesService,
    private _comunicadosServices:ComunicadosService
    ) {
      this.usuario = _pilotoService.piloto;
      if(this.usuario.id===undefined){
        this._router.navigateByUrl('/login')
      }
    }

  logo:boolean = true;
  foto: string = ''
  public notificaciones:any[]=[];
  public modalNotification:boolean = false;
  public noleidos:number = 0
  public notificacionView:any= {
    id:'',
    Icono:'',
    nombre:'',
    texto:'',
    esleido:0,
    fechaCreacion:''
  } 
  ngOnInit(): void {
    this.getFoto()
    this.getNotificaciones()
    setInterval( () =>{
      this.getComunicadosNoLeidos()
    }, 10000);
  }
  logout(): void {
    this._router.navigateByUrl('/login')
  }
  
  getComunicadosNoLeidos(){
    this._comunicadosServices.getComunicadosNoLeidos(this.usuario.imprimeId()).subscribe(comunicados =>{
      if(comunicados.ok) {
        this.noleidos = comunicados.comunicados
      }
    })
  }

  clickBurgerMenu(){
    const body  = document.body;
    body.dispatchEvent(new Event('resize'));
    if(body.classList.contains('mini-sidebar')){
      body.classList.remove("mini-sidebar");
      this.logo = true;
    }else {
      this.logo = false;
      body.classList.add("mini-sidebar");
    }
  }

  getFoto() {
    this._pilotoService.getFotoPiloto(this.usuario.imprimeId()).subscribe( (resp:any) => {
      this.foto = resp.foto;
      if (resp.foto.includes('Estandar.png')){
        localStorage.setItem('estandar','ok')
      } else {
        if(localStorage.getItem('estandar') == 'ok'){
          localStorage.removeItem('estandar')
        }
      }
    })
  }

  getNotificaciones(){
    this._notificacionesServices.getNotificaciones(this.usuario.imprimeId()).subscribe( (resp:any) => {
      if(resp.ok){
        const noti:any=[]
        resp.notificaciones.forEach( (element:any)=> {
          if(element.esleido === 0){ 
            noti.push(element)
          }
        })
        this.notificaciones = noti;
      }
    })
  }
  viewNotificacion(notificacion:any){
    this.notificacionView = notificacion;
    this.modalNotification = true
  }
  leido(){
    this._notificacionesServices.updateNotification(this.notificacionView.id, this.notificacionView).subscribe( (resp:any) => {

      if(resp.ok){
        
        this.getNotificaciones();
        this.notificacionView  ={
          id:'',
          Icono:'',
          nombre:'',
          texto:'',
          esleido:0,
          fechaCreacion:''
        } 
      } else {
        alert(resp.msg)
      }
this.modalNotification = false
    })
  }

  noleidosColor(): Boolean {
    if(this.noleidos >0) {
      return true
    }else {
      return false
    }
  }

}
