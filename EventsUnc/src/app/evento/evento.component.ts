import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject'

import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../providers/auth.service';

import * as firebase from 'firebase/app';
import * as moment from 'moment';
import * as _ from 'lodash';

import {Evento} from "../commons/evento.model"

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent  implements OnInit {

  tablaResponsiva = true;

  //Relacionado al plugin momentjs:
  horaActual = moment().locale('es').format('LT');
  hoy = moment().locale('es').format('L');//fecha corta
  filtroDia = moment().locale('es').format('YYYY-MM-DD'); //formato firebase
  dia = moment().locale('es').format('dddd');//dia de la semana

  //Relacionado a angularfire2
   actividades: FirebaseListObservable<any[]>; //actividades es tipo any para poder recibir todo lo que le trae el servicio
    
  constructor( 
    public af: AngularFireDatabase,
   // public ev: Evento
  ) {}
/*
//--datos para filtrar
  /// unwrapped arrays from firebase
  actividades: any;
  filteredActividades: any;
  /// filter-able properties
  family:     string;
  weight:     number;
  endangered: boolean;
  /// Active filter rules
  filters = {}
 

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  } 
  */

  ngOnInit(): void {

    this.getActividades();

    this.actividades.subscribe(items => {
      // items is an array
      this.actividades.forEach(actividades => {
          console.log('actividades:', actividades);
      });      
  });

  }

  getActividades(){
      //En otro componente los valores de query no deben tener orderByChild:'fechaInicio', equalTo:hoy, sino 'startAt'.
      //this.actividades = this.af.list('/actividades');

    this.actividades = this.af.list('/actividades',
      {
        query: {
          orderByChild: 'pickerDesde',
          limitToFirst: (3)
        }
      });
  }
  //esta funcion estaba pensada paracambiar el fondo por uno mas llamativo de la actividad en curso.
  estaEnCurso(horaInicio, horaFin) {
    // TODO: implementar funcion.
  }

}
