import { Injectable } from '@angular/core';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {Evento} from "app/commons/evento.model";


@Injectable()
export class FirebaseconnectionService {
  periodos = ['Evento Único', 'Primer cuatrimestre', 'Segundo cuatrimestre'];
  /*
    aulas: FirebaseListObservable<any[]>;
    actividades: FirebaseListObservable<any[]>;
    tiposDeActividades: FirebaseListObservable<any[]>;
    estadoActividades: FirebaseListObservable<any[]>;
    evento: FirebaseObjectObservable<any>;
  */

  constructor(private af: AngularFireDatabase) { }

  getListActividades(): FirebaseListObservable<any[]> {
    return this.af.list('/actividades');
  }

  getListAulas(limit: number = 50): FirebaseListObservable<any[]> {
    return this.af.list('/aula', { query: { limitToLast: limit } });
  }

  getListEstados(): FirebaseListObservable<any[]> {
    return this.af.list('/estado');
  }

  getListPeriodos(): string[] {
    return this.periodos;
  }

  getListTiposActividades(): FirebaseListObservable<any[]> {
    return this.af.list('/tipo');
  }

  getActividadByKey(key: string, options: any): FirebaseObjectObservable<any> {
    return this.af.object('/actividades/' + key, options);
  }

  /*
  getActividadByKey(key: string, options: any): FirebaseObjectObservable<any> {
    return this.af.object('/actividades/' + key, options);
  }

  */
  updateActividadByKey(key: string, actividad: Evento) {
    const item = this.af.object('/actividades/' + key);
    item.set(actividad);
  }

  removeActividadByKey(key: string) {
    const item = this.af.object('/actividades/' + key);
    item.remove();
  }

  getHorario() {
    let arr = [], i, j;
    for (i = 7; i < 24; i++) {
      for ( j = 0; j < 4; j++) {
        arr.push(i + ':' + (j === 0 ? '00' : 15 * j) );
      }
    }
    return arr;
  }
}
