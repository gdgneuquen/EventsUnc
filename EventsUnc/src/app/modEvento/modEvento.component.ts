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

  user: Observable<firebase.User>;
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
    public afAuth: AngularFireAuth, 
    public af: AngularFireDatabase,
    private router: Router,
    private rout: ActivatedRoute,
    private authService : AuthService,){
    this.id = this.rout.snapshot.params['_id'];//tomo el id que viene por parámetro
    //busco el evento puntual en base al id
    
    this.evento = af.object('/actividades/'+this.id);


    this.actividades = af.list('/actividades');    
    //aulas debería traerse desde la db pero no lo logro no se que pasa
    this.aulas = af.list('/aula', { query: { limitToLast: 50 } });
    this.estadoActividad = af.list('/estado');
    this.tiposDeActividad = af.list('/tipo');
    this.user = this.afAuth.authState;  
    this.estaLogueado = this.user?true:false;
    this.numberHora = this.Horario();
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

  Send(
    checkSemana: string, checkMes: string, checkCuatrimestre: string,
    descripcion: string,   horaFin: string, minutoFin: string,     
    horaInicio: string,  minutoInicio: string,  nombre: string,
    tipoAct: string, estadoActividad: string,
    zonaAula: string, pickerDesde: string, pickerHasta: string) {

      if( horaInicio == null || horaFin == null ){
          alert("la Fecha inicio y hora inicio tienen que estar llennas")
      }else{
   
        this.actividades.push({checkSemana: checkSemana, checkMes: checkMes, checkCuatrimestre: checkCuatrimestre,
        descripcion: descripcion,  horaFin: horaFin,
        horaInicio: horaInicio,    nombre: nombre,
        tipoActividad:tipoAct ,    estadoActividad: estadoActividad,  
        zonaAula: zonaAula,        desde: pickerDesde, hasta: pickerHasta});
        this.router.navigate(['/main']);  
      }
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
