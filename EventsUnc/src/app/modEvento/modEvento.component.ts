import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';

import { RouterModule, Router, ActivatedRoute, Params} from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import * as moment from 'moment';

import { AuthService } from '../providers/auth.service';

//materialize
/*
import {MdDatepickerModule, DateAdapter, MdNativeDateModule} from '@angular/material';
import { MdDatepicker, MdDatepickerInputEvent } from '@angular/material';
*/
import { DateAdapter } from '@angular/material';
import {MaterializeAction} from 'angular2-materialize';

import { IEvento, Evento } from '../commons/evento.model';

@Component({
  selector: 'modevent-app',
  templateUrl: './modEvento.component.html',
  styleUrls: ['./modEvento.component.css']
})
export class modEvento implements OnInit {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  hoy=moment().locale('es').format('LLLL');
  // moment().locale('es').format('L');
  // moment().locale('es').format('YYYY-MM-DD'); //formato firebase
  key: any;
  actividades: FirebaseListObservable<any[]>; //actividades es tipo any para poder recibir todo lo que le trae el servicio
  msgVal: string = ''; //mensaje de entrada del form
  selectedActividad: string = '';
  descripcion: string = '';
  horaFin: string = '';
  horaInicio: string = '';
  nombre: string = '';
  tipoAct: string = '';
  zonaAula: string = '';
  numberHora: any[];
  dias: any[];
  tiposDeActividad: FirebaseListObservable<any[]>;
  estadoActividad: FirebaseListObservable<any[]>;
  estadoAct: string = '';
  aulasFire: FirebaseListObservable<any[]>;
  evento: Observable<Evento>;
  eventoObserv:  FirebaseObjectObservable<any>;
  id: any; //id recibido
  periodos = ['Evento Único', 'Primer cuatrimestre', 'Segundo cuatrimestre'];
  periodo:  string = '';
  pickerDesde: string = '';//MdDatepicker<Date>;
  pickerHasta: string = '';//MdDatepicker<Date>;
 //aulas debería traerse desde la db pero no lo logro no se que pasa
  aulas:FirebaseListObservable<any[]>;
  chk_lun  = false;
  chk_ma  = false;
  chk_mi  = false;
  chk_ju  = false;
  chk_vi  = false;
  chk_sa  = false;
  chk_do  = false;

  constructor(
    private authService: AuthService,
    public af: AngularFireDatabase,
    private router: Router,
    private rout: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>){
  }

  ngOnInit(){
    this.id = this.rout.snapshot.params['_id'];//tomo el id que viene por parámetro
    this.actividades = this.af.list('/actividades');
    //aulas debería traerse desde la db pero no lo logro no se que pasa
    this.aulas = this.af.list('/aula', { query: { limitToLast: 50 } });
    this.estadoActividad = this.af.list('/estado');
    this.tiposDeActividad = this.af.list('/tipo');
    this.numberHora = this.Horario();
    this.dateAdapter.setLocale('es-ar');
    //busco el evento puntual en base al id
    //this.evento = this.af.object('/actividades/'+this.id);
    this.eventoObserv =  this.af.object('/actividades/'+this.id, { preserveSnapshot: true });
    this.eventoObserv.subscribe(snapshot => {
      this.evento = snapshot.val(),
      this.dias = snapshot.val().dias,
      this.key = snapshot.key
    });
  }

    /*
  onSubmit(eventoSend:Evento){
    console.log("submit ", eventoSend);
  }
  */
  isUserLoggedIn(){
     return this.authService.loggedIn;
  }
    /*
  getDataFormat(e: MdDatepickerInputEvent<Date>){
   //manage event
  }
  */
  onSelect(key): void {
   this.selectedActividad = key;
  }


//Send(id, pediodo, descripcion, horaFin, horaInicio, nombre, tipoAct, estadoAct, zonaAula,  pickerDesde, pickerHasta
  /*
  Send(key,
     periodo:string, descripcion: string,
    horaFin: string,  horaInicio: string,   nombre: string,  tipoAct: string, estadoAct: string,
    zonaAula: string, pickerDesde: MdDatepickerModule, pickerHasta: MdDatepickerModule) {
      */
  SendEvento(evento : Evento){
    console.log(evento);
  }
  /*
  Send(
    chk_lun: boolean, chk_ma: boolean, chk_mi: boolean, chk_ju: boolean, chk_vi: boolean,
    chk_sa: boolean, chk_do: boolean,
    periodo:string, descripcion: string,
    horaFin: string,  horaInicio: string,   nombre: string,  tipoAct: string,
    estadoAct: string, zonaAula: string,
    pickerDesde: MdDatepicker<Date>, pickerHasta: MdDatepicker<Date>) {

        this.actividades.update(this.id ,
          {descripcion: descripcion, estadoActividad: estadoAct, horaFin: horaFin,
          horaInicio: horaInicio,   nombre: nombre,periodo: periodo,
          pickerDesde: pickerDesde, pickerHasta: pickerHasta, tipoActividad: tipoAct,
          zonaAula: zonaAula});
        this.goToMain();
  }
*/
  goToMain(){
    this.router.navigate(['/main']);
  }

  Delete(key): void {
      this.actividades.remove( key);
      this.msgVal = '';
  }

  updateActividadMongo(msg: string, key): void {
    this.actividades.update( key, {alert: msg});

  }

  Horario(){
    var arr = [], i, j;
    for(i=7; i<24; i++) {
      for(j=0; j<4; j++) {
        arr.push(i + ":" + (j===0 ? "00" : 15*j) );
      }
    }
    return arr;
  }
}
