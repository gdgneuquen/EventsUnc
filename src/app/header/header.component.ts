import { AuthService } from '../providers/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchText: string;
  @Output() searchEmit = new EventEmitter();

  constructor(private authService: AuthService) {

  }

  isUserLoggedIn(){
     return this.authService.loggedIn;
  }

  ngOnInit() {
  }

  searchTextToParent() {
    this.searchEmit.emit(this.searchText);
  }

}
