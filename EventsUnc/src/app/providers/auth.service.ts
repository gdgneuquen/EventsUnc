import { FirebaseApp } from 'angularfire2/app';
import { any } from 'codelyzer/util/function';
import * as firebase from 'firebase/app';
import { Component, Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuthModule, AngularFireAuth, FirebaseAuthStateObservable } from 'angularfire2/auth';


@Injectable()
export class AuthService {
  public user: Observable<firebase.User>;
  public loggedIn: boolean=false;


  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(firebaseUser =>
      {
        //console.log('onAuthStateChanged');
        //console.log('isUserLoggedIn',this.afAuth.auth.currentUser);
        if(firebaseUser){
          //console.log('firebaseUser',firebaseUser);
          this.user = firebaseUser;
          this.loggedIn = true;
        }else{
          console.log('not logged in');
          this.user = null;
          this.loggedIn = false;
        }
      }
    );
  }



  isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Logs in the user
   * @returns {firebase.Promise<FirebaseAuthState>}
   */
  loginWithGoogle() : firebase.Promise<any> {
    var provider = new firebase.auth.GoogleAuthProvider();
    //TODO: no se agrega aca vez por que lo previene desde la configuracion de firebase
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({prompt: 'select_account'});

    return this.afAuth.auth.signInWithPopup(provider)
      .then(function(googleUser) {
        //console.log('Google Auth Response', googleUser);
        // This gives you a Google Access Token.
        var token = googleUser.credential.accessToken;
        // The signed-in user info.
        var user = googleUser.user;
        console.log('Google token', token);
        console.log('Google user', user);
        //TODO con el token recibido ver si hay que  mandarlo en cada peticion o si ya lo maneja firebase
        //leer mas eso
    }).catch(function(error) {
      console.log(error); // "auth/internal-error"  , etc
      // An error happened.
      // Handle Errors here.
    });

  }

  loginWithEmail(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('loginWithEmail Auth Response', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  loginAnonymous() {
    return this.afAuth.auth.signInAnonymously().then(function(result){
      console.log('Anonymous Auth Response', result);
    }).catch(function(error) {
      console.log(error);
      // Handle Errors here.
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(function() {
      console.log('Sign-out successful.');
    }, function(error) {
       console.log('Error Sign-out.');
    });
  }

  getUser() {
     if (this.afAuth.auth.currentUser != null) {
      this.afAuth.auth.currentUser.providerData.forEach(function (profile) {
        console.log("  Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Photo URL: "+profile.photoURL);
      });
    }
    return this.afAuth.authState;
  }

}
