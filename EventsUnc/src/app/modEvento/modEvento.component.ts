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
    key: any;
    // actividades es tipo any para poder recibir todo lo que le trae el servicio
    actividades: FirebaseListObservable<any[]>;
    // mensaje de entrada del form
    msgVal: string = '';
    selectedActividad: string = '';
    descripcion: string = '';
    horaFin: string = '';
    horaInicio: string = '';
    nombre: string = '';
    tipoActividad: string = '';
    zonaAula: string = '';
    numberHora: any[];
    dias: any[];
    tiposDeActividades: FirebaseListObservable<any[]>;
    estadoActividades: FirebaseListObservable<any[]>;
    estadoActividad: string = '';
    evento: FirebaseObjectObservable<any>;// Evento>; //Observable<Evento>;//
    eventoObject: Evento;
    id: any; // id recibido
    periodos;
    periodo:  string = '';
    pickerDesde: string = '';
    pickerHasta: string = '';
    // aulas debería traerse desde la db pero no lo logro no se que pasa
    aulas: FirebaseListObservable<any[]>;
    chk_lun  = false;
    chk_ma  = false;
    chk_mi  = false;
    chk_ju  = false;
    chk_vi  = false;
    chk_sa  = false;
    chk_do  = false;
    changeDetected = false;

    constructor(
      private authService: AuthService,
      private afService: FirebaseconnectionService,
      private router: Router,
      private route: ActivatedRoute) { }

    ngDoCheck() {

      //console.log('ngDoCheck');
      /*
      if (this.eventoObject !== undefined){
        console.log(this.eventoObject.horaInicio == this.horaInicio);
      }
      */
    }
    // changes: SimpleChanges
    OnChanges(changeRecord: SimpleChanges) {
      console.log('OnChanges');
      console.log(changeRecord);
      console.log(this.eventoObject);
    }

    OnDestroy() {
      console.log('OnDestroy');
    }

    ngOnInit() {
      this.id = this.route.snapshot.params['_id'];
      console.log(this.route.snapshot.params['_id']);
      // console.log(this.afService.getActividadByKey(this.route.snapshot.params['_id'], { preserveSnapshot: true }));
      // this.route.snapshot.params['_id']
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
            moment(snapshot.val().pickerDesde).locale('es').format('YYYY-MM-DD'),
            moment(snapshot.val().pickerHasta).locale('es').format('YYYY-MM-DD'),
            // snapshot.val().pickerDesde,
            // snapshot.val().pickerHasta,
            snapshot.val().estadoActividad,
            snapshot.val().tipoActividad,
            snapshot.val().zonaAula,
            snapshot.val().periodo
          )
          },
        () => console.log('error'),
        () => console.log('completed!')
      );

      /*
      if (this.params.has('_id')) {
        // tomo el id que viene por parámetro
        this.id = this.params.get('_id');
        this.evento = this.afService.getActividadByKey( this.id, { preserveSnapshot: true });
        // busco el evento puntual en base al id
        const evento$ = this.afService.getActividadByKey( this.id, { preserveSnapshot: true });
        evento$.subscribe(
          snapshot => {
            console.log(snapshot)
              this.horaInicio = snapshot.val().horaInicio,
              this.horaFin = snapshot.val().horaInicio,
              this.pickerDesde = moment(snapshot.val().pickerDesde).locale('es').format('DD/MM/YYYY'),
              this.pickerHasta = moment(snapshot.val().pickerHasta).locale('es').format('DD/MM/YYYY'),
              this.dias = snapshot.val().dias,
              this.chk_lun  = this.dias[0],
              this.chk_ma  = this.dias[1],
              this.chk_mi  = this.dias[2],
              this.chk_ju  = this.dias[3],
              this.chk_vi  = this.dias[4],
              this.chk_sa  = this.dias[5],
              this.chk_do  = this.dias[6],
              this.periodo = snapshot.val().periodo
              this.tipoActividad = snapshot.val().tipoActividad,
              this.descripcion = snapshot.val().descripcion,
              this.nombre = snapshot.val().nombre,
              this.zonaAula = snapshot.val().zonaAula,
              this.estadoActividad = snapshot.val().estadoActividad
          },
          () => console.log('error'),
          () => console.log('completed!')
        );
      }
      */

      this.actividades = this.afService.getListActividades();
      this.aulas = this.afService.getListAulas(50);
      this.estadoActividades = this.afService.getListEstados();
      this.tiposDeActividades = this.afService.getListTiposActividades();
      this.numberHora = this.afService.getHorario();
      this.periodos = this.afService.getListPeriodos();
    }

      /*
    onSubmit(eventoSend:Evento){
      console.log("submit ", eventoSend);
    }
    */
    isUserLoggedIn() {
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

    SendEvento(eventoSend: Evento) {
      console.log('key', eventoSend.$key);
      console.log('submit', eventoSend);
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
    goToMain() {
      this.router.navigate(['/main']);
    }

    Delete(key): void {
        this.actividades.remove( key);
        this.msgVal = '';
    }

    updateActividadMongo(msg: string, key): void {
      this.actividades.update( key, {alert: msg});

    }
  }
