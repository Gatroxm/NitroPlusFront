import { Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PilotosService } from 'src/app/services/pilotos.service';
import Swal from 'sweetalert2'
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  public formSumitted = false;

  public loginForm = this.fb.group({
    /**admin@nitrocolombia.com - 5678*/
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.minLength(3), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [true]
  });

  constructor(
     private _router: Router,
     private fb: FormBuilder,
     private _pilotosService: PilotosService
     ) { }
  ngOnInit(): void {
    if(localStorage.getItem('login')){
      localStorage.removeItem('login')
    }
    if(localStorage.getItem('userNitroPlus')){
      localStorage.removeItem('userNitroPlus')
    }
  }
  
  ngSubmit(){
    if(this.loginForm.valid){
        if( this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value || '');
        }else {
          localStorage.removeItem('email');
        }
        const data = {
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        }
        this._pilotosService.logIn(data).
        subscribe( (res:any) => {
          if(res.ok){
            localStorage.setItem('userNitroPlus', JSON.stringify(res.piloto));
            localStorage.setItem('login', 'OK')
            this._router.navigateByUrl('/dashboard')
          } else {
            alert('El correo o la contraseña no son validos, revise sus credenciales')
          }
        }, (err) => {
          alert('El correo o la contraseña no son validos, revise sus credenciales')
        })
    }else {

      alert('Todos los campos del formulario son requeridos')
    }

  }
}
