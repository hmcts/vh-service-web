import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isAuthenticated = false;

  constructor(private adalSvc: AdalService) {
    this.isAuthenticated = this.adalSvc.userInfo.authenticated;
  }

  ngOnInit() {
    if (this.isAuthenticated) {
      this.adalSvc.logOut();
    }
  }
}
