import { Component, Input, NgZone, OnInit  } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AuthService } from '../providers/auth.service';
import { FirebaseconnectionService } from '../providers/firebaseconnection.service';
import { Evento } from "../commons/evento.model";

import * as firebase from 'firebase/app';
import * as moment from 'moment';
//materialize
import { MdDatepickerModule, DateAdapter } from '@angular/material';
import { MdDatepicker } from '@angular/material';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit  {

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  hoy = moment().locale('es').format('DD/M/YYYY');

  actividades: FirebaseListObservable<any[]>;
  numberHora: any[];
  tiposDeActividades: FirebaseListObservable<any[]>;
  estadoActividades: FirebaseListObservable<any[]>;
  evento: FirebaseObjectObservable<any>;
  eventoObject = new Evento();
  id: any; // id recibido
  periodos: string[];
  aulas: FirebaseListObservable<any[]>;
  msgVal: string = ''; //mensaje de entrada del form

  constructor(
    private authService: AuthService,
    private afService: FirebaseconnectionService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>) { }

  ngOnInit() {
    this.eventoObject = new Evento('', '', [false,false,false,false,false,false,false], '', '', '', '', '', '', '', '', '');
    this.actividades = this.afService.getListActividades();
    this.aulas = this.afService.getListAulas(50);
    this.estadoActividades = this.afService.getListEstados();
    this.tiposDeActividades = this.afService.getListTiposActividades();
    this.numberHora = this.afService.getHorario();
    this.periodos = this.afService.getListPeriodos();
    this.dateAdapter.setLocale('es-ar');

  }

  onSelect(key): void {
   // this.selectedActividad = key;
  }

  isUserLoggedIn() {
   return this.authService.loggedIn;
  }

  getDataFormat(e: Event) {
    console.log(e.target);
   // manage event
  }

  SendEvento(eventoSend: Evento) {
    // TODO: hacer contrl de error y validaciones
    if ( eventoSend.horaInicio === "" || eventoSend.horaFin === "" ||
        eventoSend.descripcion === "" || eventoSend.nombre === "" ||
        eventoSend.tipoActividad === "" || eventoSend.zonaAula === "") {
      alert("Por favor complete todos los campos obligatorios");
      return false;
    }
    eventoSend.pickerDesde = moment(eventoSend.pickerDesde).locale('es').format('YYYY-MM-DD');
    eventoSend.pickerHasta = moment(eventoSend.pickerHasta).locale('es').format('YYYY-MM-DD');
    // check undefined && false
    let dias = [(eventoSend.chk_lun == true),
      (eventoSend.chk_ma == true),
        (eventoSend.chk_mi == true),
          (eventoSend.chk_ju == true),
            (eventoSend.chk_vi == true),
              (eventoSend.chk_sa == true),
                (eventoSend.chk_do == true)];//creo el arreglo de días
    eventoSend.dias = dias;
    this.afService.addActividad(eventoSend);
    this.goToMain();
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  goToMain() {
    this.router.navigate(['/main']);
  }
}
