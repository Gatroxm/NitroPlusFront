import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/services/consultas.service';
import { MandosService } from 'src/app/services/mandos.service';
import { PaisCiudadService } from 'src/app/services/pais-ciudad.service';
import { PilotosService } from 'src/app/services/pilotos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public profileFrom: FormGroup;
  public changePassword: FormGroup;
  public imgTemp:any = '';
  public user:any;
  public formSumitted = false;

  paices:any;
  ciudades:any[] = [];
  mandos:any[] = []
  timeZones:any[] = [];
  btnEnviaFoto:boolean = false;
  constructor( 
    private fb: FormBuilder,
    private _paisCiudad: PaisCiudadService,
    private _pilotosService: PilotosService,
    private _consultasService: ConsultasService,
    private _mandosService: MandosService,) {
    this.user = _pilotosService.piloto
    this.changePassword = this.fb.group({
      correoElectronico: [this.user.correoElectronico],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });

    this.profileFrom = this.fb.group({
      nombre: [this.user.nombre],
      apellido: [this.user.apellido],
      email: [this.user.correoElectronico, [Validators.required, Validators.minLength(3), Validators.email]],
      fechaN: [this.user.fechaNacimiento],
      pais: [this.user.idNacionalidad,Validators.required],
      idPaisResidencia: [this.user.idPaisResidencia,Validators.required],
      departamento: [this.user.departamento,Validators.required],
      ciudad: [this.user.ciudad,Validators.required],
      canal_facebook: [this.user.canal_facebook],
      canal_twitch: [this.user.canal_twitch],
      canal_youtube: [this.user.canal_youtube],
      instagram: [this.user.instagram],
      resena: [this.user.resena],
      DISCORD_ID: [this.user.discordId],
      TIPO_MANDO: [this.user.idMando, [Validators.required]],
      whatsapp: [this.user.whatsapp, ],
    });
    this._paisCiudad.getPaices().subscribe( resp => {
      if(resp.ok) {
        this.paices = resp.paices;
      }
    });
    this._mandosService.getMandos().subscribe( resp => {
      this.mandos = resp.mandos;
    })    
    this._consultasService.getSimuladores(this.user.imprimeId()).subscribe( resp => {
    }, err => {
    })
  }
  actualizarPerfil(){
    if(this.profileFrom.valid ){
      const data = {
        id: this.user.id,
        nombre: this.profileFrom.value.nombre,
        apellido : this.profileFrom.value.apellido,
        idEstado: 1,
        fechaNacimiento:this.profileFrom.value.fechaN,
        idNacionalidad: parseFloat(this.profileFrom.value.pais),
        ciudad: this.profileFrom.value.ciudad,
        canal_youtube: this.profileFrom.value.canal_youtube,
        canal_twitch: this.profileFrom.value.canal_twitch,
        canal_facebook: this.profileFrom.value.canal_facebook,
        instagram: this.profileFrom.value.instagram,
        departamento: this.profileFrom.value.departamento,
        idPaisResidencia: parseFloat(this.profileFrom.value.idPaisResidencia),
        resena: this.profileFrom.value.resena,
        correoElectronico: this.profileFrom.value.email,
        whatsapp : this.profileFrom.value.whatsapp,
        idMando  : parseFloat(this.profileFrom.value.TIPO_MANDO),
        discordId  : this.profileFrom.value.DISCORD_ID,
    }
    // return
    this._pilotosService.updatePiloto(data).subscribe(data => {
      Swal.fire(data.msg)
      if(data.ok) {
        this._pilotosService.getPiloto(this.user.id).subscribe(respuesta => {
          localStorage.setItem('userNitroPlus', JSON.stringify(respuesta.piloto));
        })
      }
    })
  }
}

  ngOnInit(): void {
    this.ciudades = this._paisCiudad.getCiudades(parseFloat(this.user.pais));
    if(localStorage.getItem('estandar') === 'ok'){
      this.btnEnviaFoto = true;
    }
  }

  actualizarPassword(){
    this.formSumitted = true;
    if(this.changePassword.valid && !this.contrasenasNoValidas()){
      const data = {
        id: this.user.id,
        correoElectronico: this.changePassword.value.correoElectronico ,
        password: this.changePassword.value.password
      }
      this._pilotosService.changePassword(data).subscribe(data => {
        Swal.fire(data.msg)
      });
    } 
  }

  contrasenasNoValidas(): boolean{
    const pass1 = this.changePassword.get('password')?.value;
    const pass2 = this.changePassword.get('password2')?.value;
    if( (pass1 !== pass2) &&  this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }
  aceptaWhatsapp(aceptaWhatsapp:any){
    let update =  {
      id: this.user.id,
      aceptaWhatsapp: aceptaWhatsapp.target.checked?1:0
    } 
    this._pilotosService.AceptaWhatsapp(update).subscribe(data =>{
      if(data.ok){
        console.log(data)
      }
    })
  }
  aceptaCorreos(aceptaCorreos:any){
    
    let update =  {
      id: this.user.id,
      aceptaCorreos: aceptaCorreos.target.checked?1:0
    } 
    this._pilotosService.AceptaCorreos(update).subscribe(data =>{
      if(data.ok){
        console.log(data)
      }
    })
  }
}
