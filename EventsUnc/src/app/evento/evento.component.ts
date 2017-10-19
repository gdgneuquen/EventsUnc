 
import { Component, NgZone, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
/*import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Subject'*/

import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../providers/auth.service';

import * as firebase from 'firebase/app';
import * as moment from 'moment';
import {FirebaseconnectionService} from "../providers/firebaseconnection.service";
import {Evento, IEvento} from "../commons/evento.model";
import {serialize} from "@angular/compiler/src/i18n/serializers/xml_helper";
import {ArrayObservable} from "rxjs/observable/ArrayObservable";
// import { actividad, aula, estado, tipo, zona } from '../commons/events.interface';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  tablaResponsiva = true;

  //Relacionado al plugin momentjs:
  horaActual = moment().locale('es').format('LT');
  hoy = moment().locale('es').format('LLLL');//fecha
  dia = moment().locale('es').format('dddd');//dia de la semana

  //Relacionado al plugin ngx-order-pipe. Hay que agregarlo a imports en app.module.ts
  order = "actividad.pickerDesde";
  reverse = true;

  //Relacionado a angularfire2
  items: FirebaseListObservable<any[]>;
  actividades = [];

  //actividades es tipo any para poder recibir todo lo que le trae el servicio

  constructor(
    private authService: AuthService,
    private afService: FirebaseconnectionService,
    private router: Router) {}

  ngOnInit() {
    this.getActividades();
  }

  isUserLoggedIn() {
     return this.authService.loggedIn;
   }

  getActividades() {
    this.items = this.afService.getListActividadesWithOptions(
      {
        query: {
          limitToLast: 50,
          orderByChild: 'pickerDesde'
        }
      }
    );
    this.items.subscribe(snapshots => {
        this.actividades = [], // reset por la subscripcion
        snapshots.forEach(snapshot =>
          this.filterCurrentActivity(new Evento(
            null,
            snapshot.descripcion,
            snapshot.dias,
            snapshot.horaFin,
            snapshot.horaInicio,
            snapshot.nombre,
            snapshot.pickerDesde,
            snapshot.pickerHasta,
            snapshot.estadoActividad,
            snapshot.tipoActividad,
            snapshot.zonaAula,
            snapshot.periodo
          ))
      )
    });
  }
  
  // filtrar actividad de esta semana y de hoy
  // controlar que sea valido, que este dentro de la semana vigente, que sea dia actual
  // que no vencio (en horas) y que este en el array de dias seleccionados
  filterCurrentActivity(actividad: Evento) {
    // evento que esta en la semana actual, y que sea hoy
    if ( this.belongsToWeek(actividad) //&& this.belongsToToday(actividad)
        &&  this.isEventValid(actividad)) {
        this.actividades.push(actividad);
    }
  }
  //que la fecha de hoy este entre la fecha y hora disponible del la actividad
  belongsToWeek(actividad: Evento) {
    return moment().locale('es').isBetween(moment(actividad.pickerDesde+"T"+actividad.horaInicio, moment.ISO_8601).locale('es'), moment(actividad.pickerHasta+"T"+actividad.horaFin, moment.ISO_8601).locale('es'));
  }

  belongsToToday(actividad: Evento) {
    const currentFromDayFrom = moment(actividad.pickerDesde).locale('es');
    const currentFromDayTo = moment(actividad.pickerHasta).locale('es');
    return moment().locale('es').diff(currentFromDayFrom ,'days') === 0 || moment().locale('es').diff(currentFromDayTo ,'days') === 0;
  }
  // Controlar el dia seleccionado en array y la hora vencida
  isEventValid(actividad: Evento) {
    // moment('9999-99-99').locale('es').weekday();  muestra dias 0-6
    // moment('9999-99-99').locale('es').isoWeekday();  muestra dias 1-7
    console.log(moment(actividad.horaInicio));
    return actividad.dias[moment().locale('es').weekday()]
          && moment().locale('es').format('HH:mm') >= actividad.horaInicio
          //actividad.horaFin
          && moment().locale('es').format('HH:mm') <= actividad.horaFin;
          //&& moment().locale('es').format('HH:mm') <= "12:00";
          //actividad.horaFin
  }

  // esta funcion estaba pensada paracambiar el fondo por uno mas llamativo de la actividad en curso.
  estaEnCurso(actividad: Evento) {
    // TODO: implementar funcion.
  }

}
 
