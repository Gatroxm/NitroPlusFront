import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PilotosService } from 'src/app/services/pilotos.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any;
  foto: string = '';
  constructor(
    private _sideBarService: SidebarService,
    private _router: Router,
    private _pilotoService: PilotosService
  ) {
    this.menuItems = this._sideBarService.menu;
  }
  user: any;
  public comisariosRevisores: boolean = true;
  public digitadores: boolean = true;
  public locutores: boolean = true;
  public comisariosLideres: boolean = true;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userNitroPlus') || '');
    this.getFoto();
      this._pilotoService.getRoles(this.user.id).subscribe((response) => {
        if (response.ok) {
          if (response.rol.length > 0) {
            const rol5 = response.rol.filter((rol:any) => rol.idRol === 5);
            const rol6 = response.rol.filter((rol:any) => rol.idRol === 6);
            const rol7 = response.rol.filter((rol:any) => rol.idRol === 7);
            const rol8 = response.rol.filter((rol:any) => rol.idRol === 8);
            if( rol5.length <= 0 ){
              this.comisariosRevisores = false;
            }
            if( rol6.length <= 0 ){
              this.comisariosLideres = false;
            }
            if( rol7.length <= 0 ){
              this.digitadores = false;
            }
            if( rol8.length <= 0 ){
              this.locutores = false;
            }
          }
        }
        console.log(response);
      });
  }

  logout(): void {
    this._router.navigateByUrl('/login');
  }
  getFoto() {
    this._pilotoService.getFotoPiloto(this.user.id).subscribe((resp: any) => {
      this.foto = resp.foto;
    });
  }
}
