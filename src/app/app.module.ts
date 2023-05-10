import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//formularios
import { ReactiveFormsModule } from '@angular/forms';

//componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

//firebase
import { environment } from '../environments/environment';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage,getStorage } from '@angular/fire/storage'
import { provideAuth,getAuth } from '@angular/fire/auth';
import { SlidebarComponent } from './pages/slidebar/slidebar.component';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './components/shared/shared.module';

//animaciones de notificaciones

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SlidebarComponent,
  ],
  imports: [
    DashboardModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth())
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
