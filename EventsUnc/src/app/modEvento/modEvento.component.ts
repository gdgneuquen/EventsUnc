import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';

import { RouterModule, Router, ActivatedRoute, Params} from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import * as moment from 'moment';

import { AuthService } from '../providers/auth.service';

//materialize
import {MdDatepickerModule} from '@angular/material';

@Component({
  selector: 'modevent-app',
  templateUrl: './modEvento.component.html',
  styleUrls: ['./modEvento.component.css']
})
export class modEvento implements OnInit {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  hoy=moment().locale('es').format('LLLL');

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
  tiposDeActividad: FirebaseListObservable<any[]>;
  estadoActividad: FirebaseListObservable<any[]>;
  aulasFire:FirebaseListObservable<any[]>;
  evento: FirebaseObjectObservable<any>;
  id: any; //id recibido
  periodos = ['Evento Único', 'Primer cuatrimestre', 'Segundo cuatrimestre'];
  periodo:  string = '';
 //aulas debería traerse desde la db pero no lo logro no se que pasa
  aulas:FirebaseListObservable<any[]>;


  //Comprueba si hay un usuario logueado
  estaLogueado:boolean=false;

  constructor(
    private authService: AuthService,
    public af: AngularFireDatabase,
    private router: Router,
    private rout: ActivatedRoute){
    this.id = this.rout.snapshot.params['_id'];//tomo el id que viene por parámetro
    //busco el evento puntual en base al id

    this.evento = af.object('/actividades/'+this.id);


    this.actividades = af.list('/actividades');
    //aulas debería traerse desde la db pero no lo logro no se que pasa
    this.aulas = af.list('/aula', { query: { limitToLast: 50 } });
    this.estadoActividad = af.list('/estado');
    this.tiposDeActividad = af.list('/tipo');
    this.numberHora = this.Horario();
  }

  isUserLoggedIn(){
     return this.authService.loggedIn;
  }

  onSelect(key): void {
   this.selectedActividad = key;
  }
 
  login() { this.authService.loginWithGoogle();
           this.estaLogueado=true;}

  loginAnonymous() { this.authService.loginAnonymous(); 
                    this.estaLogueado=true;}
    
  logout() { this.authService.logout(); 
            this.estaLogueado=false;}
//Send(id, pediodo, descripcion, horaFin, horaInicio, nombre, tipoAct, estadoAct, zonaAula,  pickerDesde, pickerHasta
  Send(key,
     periodo:string, descripcion: string,  
    horaFin: string,  horaInicio: string,   nombre: string,  tipoAct: string, estadoAct: string,
    zonaAula: string, pickerDesde: MdDatepickerModule, pickerHasta: MdDatepickerModule) {
      
   
        this.actividades.update(this.id , 
          {descripcion: descripcion, estadoActividad: estadoAct, horaFin: horaFin,    
          horaInicio: horaInicio,   nombre: nombre,periodo: periodo,
          pickerDesde: pickerDesde, pickerHasta: pickerHasta, tipoActividad: tipoAct,   
          zonaAula: zonaAula});
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

  ngOnInit(){

  }
}
