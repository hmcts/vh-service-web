import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { TopMenuItems } from '../refData/topMenuItems';
import { Router } from '@angular/router';
import { ChecklistSessionService } from '../../services/checklist-session.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  topMenuItems = [];
  $needSaveData: EventEmitter<any>;
  @Input() loggedIn: boolean;

  constructor(private router: Router, private checklistSessionService: ChecklistSessionService) {
    this.$needSaveData = new EventEmitter<any>();
  }

  selectMenuItem(indexOfItem: number) {
    for (const item of this.topMenuItems) {
      item.active = false;
    }
    this.topMenuItems[indexOfItem].active = true;
    this.router.navigate([this.topMenuItems[indexOfItem].url]);
  }

  ngOnInit() {
    this.topMenuItems = TopMenuItems;
  }

  logout() {
    if (this.checklistSessionService.isChecklistInStorage()) {
       this.$needSaveData.emit();
    } else {
      this.router.navigate(['/logout']);
    }
  }

  get needSaveData() {
    return this.$needSaveData;
  }
}
