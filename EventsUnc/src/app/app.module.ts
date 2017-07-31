import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { routing }from'./app-router.module';
//FORMS
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { AppComponent } from './app.component';
import { EventoComponent } from './evento/evento.component';
import { AdminComponent } from './admin/admin.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import {modEvento}from'./modEvento/modEvento.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthService } from './providers/auth.service';
import {PageNotFoundComponent} from './notfound/page.not.found.component';
import { OrderModule } from 'ngx-order-pipe';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//materialize
import {MdDatepickerModule, MdNativeDateModule, MdCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule} from '@angular/material';
import {MdInputModule} from '@angular/material';
import { DatepickerModule } from 'angular2-material-datepicker'

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
    HeaderComponent,
    modEvento,
    PageNotFoundComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    OrderModule,
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserAnimationsModule, MdDatepickerModule, DatepickerModule,
     MdButtonModule, MdNativeDateModule, MdInputModule,MdCheckboxModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
