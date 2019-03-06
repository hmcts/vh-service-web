import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4';
import { ChecklistSessionService } from '../services/checklist-session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  isAuthenticated = false;

  constructor(private adalSvc: AdalService,
    private checklistSession: ChecklistSessionService) {
    this.isAuthenticated = this.adalSvc.userInfo.authenticated;
  }

  ngOnInit() {
    if (this.isAuthenticated) {
      this.checklistSession.clearCheckList();
      this.adalSvc.logOut();
    }
  }
}
