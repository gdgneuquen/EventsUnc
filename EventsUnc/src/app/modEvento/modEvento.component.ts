  import {Component, Input, NgZone, OnDestroy, OnChanges, OnInit, DoCheck, ViewChild, SimpleChanges} from '@angular/core';
  import { RouterModule, Router} from '@angular/router';
  import { ActivatedRoute, ParamMap } from '@angular/router';
  import { FormBuilder } from '@angular/forms';
  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/throw'; // Para trabajar con los observables desde rxjs
  import 'rxjs/add/operator/catch'; // para poder tomar cosas
  import 'rxjs/add/operator/toPromise';
  import 'rxjs/add/operator/take';
  import 'rxjs/add/operator/switchMap';


  import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

  import * as moment from 'moment';

  import { AuthService } from '../providers/auth.service';
  import { FirebaseconnectionService } from '../providers/firebaseconnection.service';
  import {Evento} from "../commons/evento.model";
  
  //materialize
  import { MdDatepickerModule, DateAdapter } from '@angular/material';
  import { MdDatepicker } from '@angular/material';

  @Component({
    selector: 'modevent-app',
    templateUrl: './modEvento.component.html',
    styleUrls: ['./modEvento.component.css']
  })

  export class modEvento implements OnInit {
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    hoy = moment().locale('es').format('LLLL');
    // moment().locale('es').format('L');
    // moment().locale('es').format('YYYY-MM-DD'); //formato firebase
    // actividades es tipo any para poder recibir todo lo que le trae el servicio
    actividades: FirebaseListObservable<any[]>;
    numberHora: any[];
    tiposDeActividades: FirebaseListObservable<any[]>;
    estadoActividades: FirebaseListObservable<any[]>;
    evento: FirebaseObjectObservable<any>;
    eventoObject: Evento;
    id: any; // id recibido
    periodos: string[];
    aulas: FirebaseListObservable<any[]>;

    constructor(
      private authService: AuthService,
      private afService: FirebaseconnectionService,
      private router: Router,
      private route: ActivatedRoute,
      private dateAdapter: DateAdapter<Date>) { }

    ngOnInit() {
      this.id = this.route.snapshot.params['_id'];
      this.afService.getActividadByKey(this.id, { preserveSnapshot: true })
        .subscribe(snapshot => {
          this.evento = snapshot,
          this.eventoObject = new Evento(
            this.id,
            snapshot.val().descripcion,
            snapshot.val().dias,
            snapshot.val().horaFin,
            snapshot.val().horaInicio,
            snapshot.val().nombre,
            snapshot.val().pickerDesde,//moment(snapshot.val().pickerDesde).locale('es').format('DD/MM/YYYY'),
            snapshot.val().pickerHasta,//moment(snapshot.val().pickerHasta).locale('es').format('DD/MM/YYYY'),
            snapshot.val().estadoActividad,
            snapshot.val().tipoActividad,
            snapshot.val().zonaAula,
            snapshot.val().periodo
          )
          },
        () => console.log('error'),
        () => console.log('completed!')
      );
      this.actividades = this.afService.getListActividades();
      this.aulas = this.afService.getListAulas(50);
      this.estadoActividades = this.afService.getListEstados();
      this.tiposDeActividades = this.afService.getListTiposActividades();
      this.numberHora = this.afService.getHorario();
      this.periodos = this.afService.getListPeriodos();
      this.dateAdapter.setLocale('es-ar');
    }

    isUserLoggedIn() {
       return this.authService.loggedIn;
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
      eventoSend.pickerHasta = moment(eventoSend.pickerHasta).locale('es').format('YYYY-MM-DD'),
      this.afService.updateActividadByKey(this.id, eventoSend);
      this.goToMain();
    }
    goToMain() {
      this.router.navigate(['/main']);
    }
  }
