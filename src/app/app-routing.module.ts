import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//GUARD
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
//COMPONENTES
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },//Inicio
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', 
  component: DashboardComponent,
  loadChildren:() => import('./components/dashboard/dashboard.module')
  .then(m => m.DashboardModule),
  ...canActivate( () => redirectUnauthorizedTo(['/login']))
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },                       //redirigir a una pagina 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
