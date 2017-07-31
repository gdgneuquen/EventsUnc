//import { MaterializeAction } from 'angular2-materialize/dist';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  //providers:  [ AuthService ]
})
export class AuthenticationComponent implements OnInit {
  modalActions:any;

  constructor(private authService: AuthService,
              private router: Router) { }


  ngOnInit() {
    //this.modalActions = new EventEmitter<string|MaterializeAction>();
  }
  /*
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }
  */
  login() {
    return this.authService.loginWithGoogle()
    .catch(function(error) {
      //mostrar error en modal
      console.log(error);
    });
  }

  loginAnonymous() {
    return this.authService.loginAnonymous();
  }
  isUserLoggedIn(){
    return this.authService.loggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
