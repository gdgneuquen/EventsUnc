import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EventoComponent } from './evento/evento.component';
import { AdminComponent } from './admin/admin.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    EventoComponent,
    AdminComponent,
    NotificacionesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
