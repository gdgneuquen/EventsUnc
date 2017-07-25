import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import * as moment from 'moment';
import { actividad, aula, estado, tipo, zona } from '../commons/events.interface';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  hoy=moment().locale('es').format('LLLL');

  user: Observable<firebase.User>;
  actividades:FirebaseListObservable<any[]>; //actividades es tipo any para poder recibir todo lo que le trae el servicio
  msgVal: string = ''; //mensaje de entrada del form
  selectedActividad: string = '';
  descripcion: string = '';
  horaFin: string = '';
  horaInicio: string = '';
  nombre: string = '';
  estadoActividad: string = '';
  tipoActividad: string = '';
  zonaAula: string = '';


  //Comprueba si hay un usuario logueado
  estaLogueado:boolean=false;

  constructor(
    public afAuth: AngularFireAuth, 
    public af: AngularFireDatabase,
    private router: Router,){
    this.actividades = af.list('/actividades', { query: { limitToLast: 50 } });
    this.user = this.afAuth.authState;  
    this.estaLogueado=this.user?true:false;
    
    

  }

  onSelect(key): void {
   this.selectedActividad = key;
  }
  
  login() { this.afAuth.auth.signInAnonymously(); 
  this.estaLogueado=true;}

  logout() { this.afAuth.auth.signOut(); 
  this.estaLogueado=false;}

  Send( descripcion: string,     horaFin: string,
        horaInicio: string,      nombre: string,
        tipoActividad: string, estadoActividad: string, 
        zonaAula: string ) {
    this.actividades.push({ 
      descripcion: descripcion,          horaFin: horaFin,
      horaInicio: horaInicio,            nombre: nombre,
      tipoActividad: tipoActividad, estadoActividad: estadoActividad,  
      zonaAula: zonaAula});

    this.descripcion = '';
    this.horaFin = '';
    this.horaInicio = '';
    this.nombre = '';
    this.estadoActividad = '';
    this.tipoActividad = '';
    this.zonaAula = '';

  }

  Delete(key):void {
      this.actividades.remove( key);
      this.msgVal = '';
  }

  atenderActividadMongo(key):void{
    this.actividades.update( key, {estado: 3});
    this.msgVal = '';
  }
  
  rechazarActividadMongo(key):void{     
    this.actividades.update( key, {estado: 1});
    this.msgVal = '';
  }

  verActividadMongo(_id: string): void {

   // this.router.navigate(['/actividadesDetail', _id]);    
  }

  updateActividadMongo(msg: string, key):void{    
    this.actividades.update( key, {alert: msg});

  }

  ngOnInit(){
    
    }
}