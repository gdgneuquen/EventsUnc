import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../providers/auth.service';

import * as firebase from 'firebase/app';
import * as moment from 'moment';
//materialize
import {MdDatepickerModule} from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
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
  zonaAula: string = '';
  numberHora: any[];
  tipoDeActividad: FirebaseListObservable<any[]>;
  estadoActividad: FirebaseListObservable<any[]>;
  tipoAct: string = '';
  estadoAct: string = '';
  aulasFire:FirebaseListObservable<any[]>;
  periodos = ['Evento Único', 'Primer cuatrimestre', 'Segundo cuatrimestre'];
  periodo: any[];
  dias: any[];
  
  chk_lun  = false;
  chk_ma  = false;
  chk_mi  = false;
  chk_ju  = false;
  chk_vi  = false;
  chk_sa  = false;
  chk_do  = false;
 // dias = [ this.chk_lun, this.chk_ma, this.chk_mi, this.chk_ju, this.chk_vi, this.chk_sa, this.chk_do];//creo el arreglo de días
  // aulas = ['Grado', 'Post Grado', 'Evento'];
  //aulas debería traerse desde la db pero no lo logro no se que pasa
  aulas:FirebaseListObservable<any[]>;


  //Comprueba si hay un usuario logueado
  estaLogueado:boolean=false;

  constructor(
    public af: AngularFireDatabase,
    private router: Router,
    private authService : AuthService){

    this.actividades = af.list('/actividades', { query: { limitToLast: 50 } });
    //aulas debería traerse desde la db pero no lo logro no se que pasa
    this.aulas = af.list('/aula', { query: { limitToLast: 50 } });
    this.estadoActividad = af.list('/estado');
    this.tipoDeActividad = af.list('/tipo');
    this.numberHora = this.Horario();
  }

  onSelect(key): void {
   this.selectedActividad = key;
  }

  isUserLoggedIn(){
   return this.authService.loggedIn;
  }
/**checkSemana, checkMes, checkCuatrimestre, descripcion,
      horaFin, horaInicio, nombre, tipoAct, estadoAct, zonaAula,  pickerDesde, pickerHasta */
  Send(
    chk_lun: string, chk_ma: string, chk_mi: string, chk_ju: string, chk_vi: string, chk_sa: string, chk_do: string,
    periodo:string, descripcion: string,  horaFin: string,  horaInicio: string,   nombre: string,  tipoAct: string, 
    estadoAct: string,  zonaAula: string, pickerDesde: MdDatepickerModule, pickerHasta: MdDatepickerModule) {

         var dias = [  chk_lun,  chk_ma, chk_mi, chk_ju, chk_vi, chk_sa, chk_do];//creo el arreglo de días

      if (pickerDesde == undefined) {
         pickerDesde = false;
      }
      if (pickerHasta == undefined) {
         pickerHasta = false;
      }
      if( horaInicio == "" || horaFin == "" || descripcion == "" || nombre == "" || tipoAct == "" || zonaAula == ""){
          alert("Por favor complete todos los campos obligatorios")
      } else { 
          this.actividades.push({  dias: dias,       
          periodo: periodo, descripcion: descripcion, horaFin: horaFin,    
          horaInicio: horaInicio,   nombre: nombre,
          tipoActividad: tipoAct,   estadoActividad: estadoAct,
          zonaAula: zonaAula,
          pickerDesde: pickerDesde,      pickerHasta: pickerHasta

      });
       this.router.navigate(['/main']);  
      }
  }
 myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  Delete(key): void {
      this.actividades.remove( key);
      this.msgVal = '';
  }

  verActividadMongo(_id: string): void {
   this.router.navigate(['actividadesDetail', _id]);
  }

  updateActividadMongo(msg: string, key): void {
    this.actividades.update( key, {alert: msg});

  }

  goToMain(){
    this.router.navigate(['/main']);
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
