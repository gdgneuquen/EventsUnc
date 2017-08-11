import { forEach } from '@angular/router/src/utils/collection';
import { Component, Input, NgZone, OnInit  } from '@angular/core';
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
import {MdDatepickerModule, DateAdapter} from '@angular/material';
import { MdDatepicker, MdDatepickerInputEvent } from '@angular/material';

export class DiasSemana {
  id: string;
  name: string;
  value: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit  {
   diasSemana: DiasSemana[] = [
    { id: 'chk_lun', name: 'Lunes', value: false },
    { id: 'chk_ma', name: 'Martes', value: false  },
    { id: 'chk_mi', name: 'Miercoles', value: false  },
    { id: 'chk_ju', name: 'Jueves', value: false  },
    { id: 'chk_vi', name: 'Viernes', value: false  },
    { id: 'chk_sa', name: 'Sabado', value: false  },
    { id: 'chk_do', name: 'Domingo', value: false  }
  ];

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  hoy = moment().locale('es').format('LLLL');

  actividades: FirebaseListObservable<any[]>; //actividades es tipo any para poder recibir todo lo que le trae el servicio
  msgVal: string = ''; //mensaje de entrada del form
  selectedActividad: string = '';
  descripcion: string = '';
  horaFin: string = '';
  horaInicio: string = '';
  //fechaFin:MdDatepicker<Date> ;
  //fechaInicio:MdDatepicker<Date> ;
  nombre: string = '';
  zonaAula: string = '';
  numberHora: any[];
  tipoDeActividad: FirebaseListObservable<any[]>;
  estadoActividad: FirebaseListObservable<any[]>;
  tipoAct: string = '';
  estadoAct: string = '';
  aulasFire:FirebaseListObservable<any[]>;
  periodos = ['Evento Único', 'Primer cuatrimestre', 'Segundo cuatrimestre'];
  periodo: string = '';

  chk_lun  = false;
  chk_ma  = false;
  chk_mi  = false;
  chk_ju  = false;
  chk_vi  = false;
  chk_sa  = false;
  chk_do  = false;
  //pickerDesde = moment().locale('es').format('DD/MM/YYYY');
  //pickerHasta = moment().locale('es').format('DD/MM/YYYY');
 // aulas = ['Grado', 'Post Grado', 'Evento'];
  //aulas debería traerse desde la db pero no lo logro no se que pasa
  aulas:FirebaseListObservable<any[]>;
  diasSelected: DiasSemana[];

  //Comprueba si hay un usuario logueado
  estaLogueado:boolean=false;

  constructor(
    public af: AngularFireDatabase,
    private router: Router,
    private authService : AuthService,
    private dateAdapter: DateAdapter<Date>){}


  ngOnInit(){
    this.actividades = this.af.list('/actividades', { query: { limitToLast: 50 } });
    //aulas debería traerse desde la db pero no lo logro no se que pasa
    this.aulas = this.af.list('/aula', { query: { limitToLast: 50 } });
    this.estadoActividad = this.af.list('/estado');
    this.tipoDeActividad = this.af.list('/tipo');
    this.numberHora = this.Horario();
    this.dateAdapter.setLocale('es-ar');

  }

  onSelect(key): void {
   this.selectedActividad = key;
  }

  isUserLoggedIn(){
   return this.authService.loggedIn;
  }

  getDataFormat(e: MdDatepickerInputEvent<Date>){
   //manage event
  }
/**checkSemana, checkMes, checkCuatrimestre, descripcion,
      horaFin, horaInicio, nombre, tipoAct, estadoAct, zonaAula,  pickerDesde, pickerHasta */
  Send(
    chk_lun: boolean, chk_ma: boolean, chk_mi: boolean, chk_ju: boolean, chk_vi: boolean,
    chk_sa: boolean, chk_do: boolean,
    periodo:string, descripcion: string,
    horaFin: string,  horaInicio: string,   nombre: string,  tipoAct: string,
    estadoAct: string, zonaAula: string,
    pickerDesde: MdDatepicker<Date>, pickerHasta: MdDatepicker<Date>) {

      var dias = [  chk_lun,  chk_ma, chk_mi, chk_ju, chk_vi, chk_sa, chk_do];//creo el arreglo de días
      //console.log("dias", moment(pickerDesde._selected).locale('es').format('DD/MM/YYYY'));
      //console.log("dias", moment(pickerHasta._selected).locale('es').format('YYYY-MM-DD'));

      if( horaInicio == "" || horaFin == "" || descripcion == "" || nombre == "" || tipoAct == "" || zonaAula == ""){
          alert("Por favor complete todos los campos obligatorios")
      } else {
          this.actividades.push({
          dias: dias,
          periodo: periodo, descripcion: descripcion, horaFin: horaFin,
          horaInicio: horaInicio,   nombre: nombre,
          tipoActividad: tipoAct,   estadoActividad: estadoAct,
          zonaAula: zonaAula,
          pickerDesde: moment(pickerDesde._selected).locale('es').format('YYYY-MM-DD'),
          pickerHasta: moment(pickerHasta._selected).locale('es').format('YYYY-MM-DD')

      });
        this.goToMain();
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


}
