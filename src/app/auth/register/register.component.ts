import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisCiudadService } from 'src/app/services/pais-ciudad.service';
import { PilotosService } from 'src/app/services/pilotos.service';
// import swal from 'sweetalert';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent implements OnInit {
  /**
   * nombre
   * apellido
   * correo
   * fech nacimiento
   * pais
   * departamento
   * ciudad
   * reseña
   * discord
   */
  public formSumitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      password2: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      fechaN: [''],
      pais: ['', Validators.required],
      paisResidencia: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      resena: [''],
      DISCORD_ID: [''],
      whatsapp: [''],
      terminos: [false, [Validators.required]],
    },
    {
      validators: this.passwordsIgauales('password', 'password2'),
    }
  );
  banner: string =
    'https://images.genius.com/2326b69829d58232a2521f09333da1b3.1000x1000x1.jpg';
  paices: any;
  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _paisCiudad: PaisCiudadService,
    private _pilotoService: PilotosService
  ) {
    this._paisCiudad.getPaices().subscribe((resp) => {
      if (resp.ok) {
        this.paices = resp.paices;
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('login')) {
      localStorage.removeItem('login');
    }
    if (localStorage.getItem('userNitroPlus')) {
      localStorage.removeItem('userNitroPlus');
    }
  }

  crearUsuario(): void {
    this.formSumitted = true;
    if (!this.registerForm.value.terminos) {
        alert('debe aceptar los términos y condiciones');
      return;
    } else {
      const data = {
        nombre: this.registerForm.value.nombre,
        apellido: this.registerForm.value.apellido,
        nombreCorto: '',
        idEstado: 1,
        fechaNacimiento: this.registerForm.value.fechaN,
        idNacionalidad: parseFloat(this.registerForm.value.pais),
        ciudad: this.registerForm.value.ciudad,
        departamento: this.registerForm.value.departamento,
        idPaisResidencia: parseFloat(this.registerForm.value.paisResidencia),
        resena: this.registerForm.value.resena,
        correoElectronico: this.registerForm.value.email,
        password: this.registerForm.value.password,
        whatsapp: this.registerForm.value.whatsapp,
        created_at: new Date().getDate(),
        update_at: new Date().getDate(),
        idMando: 1,
        discordId: '',
        nombreDiscord: '',
        canal_twitch: '',
        canal_facebook: '',
        canal_youtube: '',
        aceptaCondiciones: this.registerForm.value.terminos ? 1 : 0,
      };
      this._pilotoService.registerPiloto(data).subscribe((resp: any) => {
        if (resp.ok) {
          localStorage.setItem('userNitroPlus', JSON.stringify(resp.piloto));
          localStorage.setItem('login', 'OK');
          this._router.navigateByUrl('/dashboard');
        } else {
          alert(resp.msn);
        }
      });
    }
  }

  handleFileInput(elemnt: any): void {
    this.getBase64(elemnt.files[0]).then((data: any) => {
      this.banner = data;
    });
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIgauales(pas1: string, pas2: string) {
    return (formGroup: FormGroup) => {
      const passControl1 = formGroup.get(pas1);
      const passControl2 = formGroup.get(pas2);
      if (passControl1 === passControl2) {
        passControl2?.setErrors(null);
      } else {
        passControl2?.setErrors({ noEsIgual: true });
      }
    };
  }

  contrasenasNoValidas(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass1 !== pass2 && this.formSumitted) {
      return true;
    } else {
      return false;
    }
  }
}
