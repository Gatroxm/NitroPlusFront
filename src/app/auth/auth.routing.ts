import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActualizaDatosComponent } from './actualiza-datos/actualiza-datos.component';

const routes: Routes = [
    { path: 'login', component:LoginComponent},
    { path: 'register', component:RegisterComponent},
    { path: 'actualiza-datos', component:ActualizaDatosComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
