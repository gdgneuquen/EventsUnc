import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
//FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EventoComponent } from './evento/evento.component';
import { AdminComponent } from './admin/admin.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
 
import { routing }from'./app-router.module';
import { AuthService } from './providers/auth.service';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
 


//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';



export const firebaseConfig = {
     apiKey: "AIzaSyATyRktSqq_zEPiX4Yj8B8wZuWEh2I3cfs",
    authDomain: "faeatest.firebaseapp.com",
    databaseURL: "https://faeatest.firebaseio.com",
    projectId: "faeatest",
    storageBucket: "faeatest.appspot.com",
    messagingSenderId: "869582996123"
};

@NgModule({
  declarations: [
    AppComponent,
    EventoComponent,
    AdminComponent,
    NotificacionesComponent,
    MainComponent,//Pag. inicial admin, puede modificar items en pantalla
    HeaderComponent //header

  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
