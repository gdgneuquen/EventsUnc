import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { routing } from './app-router.module';
//FORMS
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { AppComponent } from './app.component';
import { EventoComponent } from './evento/evento.component';
import { AdminComponent } from './admin/admin.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { modEvento } from './modEvento/modEvento.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthService } from './providers/auth.service';
import { FirebaseconnectionService } from './providers/firebaseconnection.service';
import { PageNotFoundComponent} from './notfound/page.not.found.component';
import { OrderModule } from 'ngx-order-pipe';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//materialize
import { MaterialModule, MdDatepickerModule, MdNativeDateModule , MdCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule} from '@angular/material';
import {MdInputModule, MdSelectModule} from '@angular/material';
import { MaterializeModule } from 'angular2-materialize';


export const firebaseConfig = {
  /*
    apiKey: "AIzaSyDDdH4sytAHwcS72AYm9hhk99aO-C4E3FQ",
    authDomain: "unctest-176a0.firebaseapp.com",
    databaseURL: "https://unctest-176a0.firebaseio.com",
    projectId: "unctest-176a0",
    storageBucket: "unctest-176a0.appspot.com",
    messagingSenderId: "736583010741"
    */
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
    MaterialModule, BrowserAnimationsModule, MdDatepickerModule,
     MdButtonModule, MdNativeDateModule, MdInputModule, MdCheckboxModule,
     MdSelectModule, MaterializeModule
  ],
  providers: [AuthService, FirebaseconnectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
