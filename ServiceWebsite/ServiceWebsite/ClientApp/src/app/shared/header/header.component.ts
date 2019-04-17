import { Component, OnInit, Input } from '@angular/core';
import { TopMenuItems } from '../refData/topMenuItems';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  topMenuItems = [];

  @Input() loggedIn: boolean;

  constructor(private router: Router) {
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
    this.router.navigate(['/logout']);
  }
}
