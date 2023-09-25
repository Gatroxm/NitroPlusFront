import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const rutes: Routes = [
  { path:'', redirectTo:'/login', pathMatch:'full'}, 
  { path:'**', component:NopagefoundComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(rutes, { useHash: true }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
