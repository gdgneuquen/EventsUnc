import { AuthService } from '../providers/auth.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
//import 'rxjs/add/observable/throw';//Para trabajar con los observables desde rxjs
//import 'rxjs/add/operator/catch';//para poder tomar cosas
//import 'rxjs/add/operator/toPromise';

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
  actividades: FirebaseListObservable<any[]>;
  items: any; // AUX to filter actividades
  msgVal: string = ''; //mensaje de entrada del form
  selectedActividad: string = '';
  test: any;
  constructor(private authService: AuthService, public af: AngularFireDatabase, private router: Router) {

  }

  ngOnInit() {
    this.getActivities();
    //      this.actividades.push({ horario: "8:00 a 9:00"});
  }
  isUserLoggedIn() {
    return this.authService.loggedIn;
  }

  getActivities() {
    this.actividades = this.af.list('/actividades');
    this.actividades.subscribe( snapshot => {
      this.items = snapshot;
    });
  }

  deleteActivity(key): void {
    //alert("la Fecha inicio y hora inicio tienen que estar llenas");
    if (confirm("Esta seguro que desea borrar el evento?")) {
      this.actividades.remove(key);
      this.msgVal = '';
    }
  }

  modificarActivity(key) {
    this.router.navigate(['/modEvento', key]);
  }

  searchActivities(ev: any) {
    // Reset items back to all of the items
    this.getActivities();
    // set val to the value of the searchbar
    let val = ev;
    // if the value is an empty string don't filter the items. This filter items by descripcion or nombre properties
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.descripcion.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

}
