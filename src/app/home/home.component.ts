import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tab: String = 'users';

  constructor(public router: Router) {
  }

  ngOnInit() {
  }

  goTo(tab) {
    this.tab = tab;
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
