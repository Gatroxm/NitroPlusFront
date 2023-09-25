import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisCiudadService } from 'src/app/services/pais-ciudad.service';
import { PilotosService } from 'src/app/services/pilotos.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-actualiza-datos',
  templateUrl: './actualiza-datos.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class ActualizaDatosComponent implements OnInit {
  public formSumitted = false;
public noCorreo = true;
  

  public piloto = {
    PK_ID_PILOTO: '',
    email: '',
    password: '',
    password2: '',
    nombre: '',
    DISCORD_ID: '',
    zona_horaria: '',
    whatsapp: '',
    ACTIVO: 1,
    terminos: false,
  };

  public registerForm = this.fb.group({
    email: [
      this.piloto.email,
      [Validators.required, Validators.minLength(3), Validators.email],
    ],
    password: [
      this.piloto.password,
      [Validators.required, Validators.minLength(3)],
    ],
    password2: [
      this.piloto.password2,
      [Validators.required, Validators.minLength(3)],
    ],
    nombre: [this.piloto.nombre, Validators.required],
    DISCORD_ID: [this.piloto.DISCORD_ID, [Validators.required]],
    whatsapp: [
      this.piloto.whatsapp,
      [Validators.required, Validators.minLength(10)],
    ],
    ACTIVO: [this.piloto.ACTIVO],
    PK_ID_PILOTO: [this.piloto.PK_ID_PILOTO],
    terminos: [this.piloto.terminos, [Validators.required]],
  });
  banner: string =
    'https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg';
  img: string = '';
  pilotosNoActivos: any[] = [];
  timeZones: any[] = [];
  imageSource: any;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _pilotosService: PilotosService,
    private _paisCiudad: PaisCiudadService,
    private http: HttpClient
  ) {
    this.timeZones = this._paisCiudad.getTimeZone();
  }
  ngOnInit() {
    if (localStorage.getItem('login')) {
      localStorage.removeItem('login');
    }
    if (localStorage.getItem('userNitroPlus')) {
      localStorage.removeItem('userNitroPlus');
    }
    this.getPilotosDesActivados('');
  }

  crearUsuario(): void {
    this.formSumitted = true;
    if(this.registerForm.value.terminos){
      if(this.registerForm.value.email === ''){
        alert('El correo es requerido');
        return;
      }
      if(this.registerForm.value.password !== ''){

        if(this.registerForm.value.password !== this.registerForm.value.password2){
          alert('Las contraseñas no son iguales');
          return;
        }
      } else {
        alert('Se requiere una contraseña');
        return
      }
      
    const data = {
      whatsapp: this.registerForm.value.whatsapp,
      useremail: this.registerForm.value.email,
      DISCORD_ID: this.registerForm.value.DISCORD_ID,
      password: this.registerForm.value.password,
      PK_ID_PILOTO: this.registerForm.value.PK_ID_PILOTO,
    };

    this._pilotosService
      .updatePilotoInActivo(data)
      .subscribe((response: any) => {
        alert(response.msg);
        if (response.ok) {
          this._router.navigateByUrl('/login');
        }
      });
    }else {
      alert('debe aceptar los términos y condiciones');
    }
  }

  getPilotosDesActivados(param: string) {
    this._pilotosService
      .getPilotosDesActivados(param)
      .subscribe((response: any) => {
        if (response.ok) {
          this.pilotosNoActivos = response.pilotos;
        }
      });
  }

  openModalNombres() {
    const modalNombres = document.getElementById('modalNombres');
    modalNombres?.classList.add('show');
  }

  onKeyUp(val: any) {
    this.getPilotosDesActivados(val.value);
  }
  selectPiloto(piloto: any) {
    console.log(piloto);
    this.noCorreo = false
    this.registerForm.setValue({
      email: '',
      password: '',
      password2: '',
      nombre: piloto.nombreCorto,
      DISCORD_ID: piloto.discordId ? piloto.discordId : '',
      whatsapp: piloto.whatsapp ? piloto.whatsapp : '',
      ACTIVO: 1,
      PK_ID_PILOTO: piloto.id,
      terminos: false,
    });
    const modalNombres = document.getElementById('modalNombres');
    modalNombres?.classList.remove('show');
  }

  closed(){
    const modalNombres = document.getElementById('modalNombres');
    modalNombres?.classList.remove('show');
  }
}
