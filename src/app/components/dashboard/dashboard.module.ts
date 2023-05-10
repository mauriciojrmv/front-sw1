import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListEventosComponent } from './list-eventos/list-eventos.component';
import { ProfileComponent } from './profile/profile.component';
import { MyphotosComponent } from './myphotos/myphotos.component';
import { EventofotosComponent } from './eventofotos/eventofotos.component';
import { AddeventosComponent } from './addeventos/addeventos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagophotographerComponent } from './pagophotographer/pagophotographer.component';
import { PagoorganizerComponent } from './pagoorganizer/pagoorganizer.component';
import { ConfirmarComponent } from './confirmar/confirmar.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    ListEventosComponent,
    ProfileComponent,
    MyphotosComponent,
    EventofotosComponent,
    AddeventosComponent,
    PagophotographerComponent,
    PagoorganizerComponent,
    ConfirmarComponent,
    FilterPipe,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ]
})
export class DashboardModule { }
