import { Component, NgZone } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject'

import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { actividad, aula, estado, tipo, zona } from '../commons/events.interface';


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent {
  
  tablaResponsiva = true;

  //Relacionado al plugin momentjs:
  horaActual = moment().locale('es').format('LT');
  hoy = moment().locale('es').format('L');//fecha corta
  dia = moment().locale('es').format('dddd');//dia de la semana

  //Relacionado al plugin ngx-order-pipe. Hay que agregarlo a imports en app.module.ts
  order = "actividad.horaRef";
  reverse = true;

  //Relacionado a angularfire2
  user: Observable<firebase.User>;
  actividades: FirebaseListObservable<any[]>; //actividades es tipo any para poder recibir todo lo que le trae el servicio
  msgVal: string = ''; //mensaje de entrada del form
  selectedActividad: string = '';
  hora=0;

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    private router: Router, ) {
    this.actividades = af.list('/actividades',
      {
        query: {
          limitToLast: 50,
          orderByChild: 'fechaInicio',
          equalTo: this.hoy
        }
      });
      //Es necesario que las actividades tengan un campo fechaInicio para que se muestren las actividades del dia
      //En otro componente los valores de query no deben tener orderByChild:'fechaInicio', equalTo:hoy, sino 'startAt'.
    
    this.user = this.afAuth.authState;
    //      this.actividades.push({ horario: "8:00 a 9:00"});


  }

  //esta funcion estaba pensada paracambiar el fondo por uno mas llamativo de la actividad en curso.
  estaEnCurso(horaInicio, horaFin) {
    // TODO: implementar funcion.
  }

}
