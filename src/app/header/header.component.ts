import { AuthService } from '../providers/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService) { }

  isUserLoggedIn(){
     return this.authService.loggedIn;
  }

  ngOnInit() {
  }

}
