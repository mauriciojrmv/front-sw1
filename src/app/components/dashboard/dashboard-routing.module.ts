import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEventosComponent } from './list-eventos/list-eventos.component';
import { ProfileComponent } from './profile/profile.component';
import { MyphotosComponent } from './myphotos/myphotos.component';
import { EventofotosComponent } from './eventofotos/eventofotos.component';
import { AddeventosComponent } from './addeventos/addeventos.component';
import { DashboardComponent } from './dashboard.component';
import { PagophotographerComponent } from './pagophotographer/pagophotographer.component';
import { PagoorganizerComponent } from './pagoorganizer/pagoorganizer.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';

const routes: Routes = [
  {
    path : 'dashboard', component:DashboardComponent, children:[
      { path: '', redirectTo: 'eventos', pathMatch: 'full' },
      { path: 'eventos', component: ListEventosComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'myphotos', component: MyphotosComponent },
      { path: 'eventofotos/:id', component: EventofotosComponent },
      { path: 'crearEvento', component: AddeventosComponent },
      { path: 'pago-fotografo/:precio', component: PagophotographerComponent },
      { path: 'pago-organizador/:precio', component: PagoorganizerComponent },
      { path: 'confirmar/:id', component: ConfirmarComponent },
      { path: '**', redirectTo: 'eventos', pathMatch: 'full' },   
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
