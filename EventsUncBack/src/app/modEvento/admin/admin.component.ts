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
  numberHora = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0];
  numberMinuto = [0,5,10,15,20,25,30,35,40,45,50,55];
  tipoDeActividad = ['Grado', 'Post Grado', 'Evento'];
 // aulas = ['Grado', 'Post Grado', 'Evento'];
  //aulas debería traerse desde la db pero no lo logro no se que pasa
  aulas:FirebaseListObservable<any[]>; 


  //Comprueba si hay un usuario logueado
  estaLogueado:boolean=false;

  constructor(
    public afAuth: AngularFireAuth, 
    public af: AngularFireDatabase,
    private router: Router,){
      
    this.actividades = af.list('/actividades', { query: { limitToLast: 50 } });    
      //aulas debería traerse desde la db pero no lo logro no se que pasa
    this.aulas = af.list('/aula', { query: { limitToLast: 50 } });

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

  Send(
    descripcion: string,   horaFin: string,
    minutoFin: string,     horaInicio: string,
    minutoInicio: string,  nombre: string,
    tipoActividad: string, estadoActividad: string,
    zonaAula: string ) {

      if( horaInicio == null || minutoInicio == null || horaFin == null ||  minutoFin == null){
          alert("la Fecha inicio y hora inicio tienen que estar llennas")
      }else{
        var horaIniS = horaInicio +':'+ minutoInicio;
        var horaFinS = horaFin +':'+ minutoFin;

        this.actividades.push({
        descripcion: descripcion,     horaFin: horaFinS,
        horaInicio: horaIniS,         nombre: nombre,
        tipoActividad: tipoActividad, estadoActividad: estadoActividad,  
        zonaAula: zonaAula});
        this.router.navigate(['/main']);  
      }
  }

  Delete(key):void {
      this.actividades.remove( key);
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