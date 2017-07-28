import * as firebase from 'firebase/app';
import { Component, Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  loginWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    // User tries to sign in to Google.
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      //TODO: consultar a esteban que pasa con las credenciales, si agrega cada vez

  }

  loginAnonymous() {
    return this.afAuth.auth.signInAnonymously();
  }


  logout() {
    return this.afAuth.auth.signOut();
  }
}
