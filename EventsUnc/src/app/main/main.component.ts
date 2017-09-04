import { AuthService } from '../providers/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
import 'rxjs/add/operator/catch';//para poder tomar cosas
import 'rxjs/add/operator/toPromise';

import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  hoy = moment().locale('es').format('LLLL');
  //actividades es tipo any para poder recibir todo lo que le trae el servicio
  actividades:FirebaseListObservable<any[]>;
  msgVal: string = ''; //mensaje de entrada del form
  selectedActividad: string = '';

  constructor(
    private authService: AuthService,
    public af: AngularFireDatabase,
    private router: Router){}

  ngOnInit(){
    this.actividades = this.af.list('/actividades', { query: { limitToLast: 50 } });
    //      this.actividades.push({ horario: "8:00 a 9:00"});
  }
  isUserLoggedIn(){
     return this.authService.loggedIn;
  }

  Delete(key):void {
      //alert("la Fecha inicio y hora inicio tienen que estar llennas");
      if(confirm("Esta seguro que desea borrar el evento?")) {
        this.actividades.remove( key);
        this.msgVal = '';
      }
  }

  modEvento(key){
    this.router.navigate(['/modEvento', key]);
  }

}
