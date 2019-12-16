import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Paths } from '../../../paths';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    hideContactUsLink = false;
    hideLinksForUnsupportedBrowser = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
          this.hideContactUs();
          this.hideLinks();
      });
  }

  ngOnInit() {
    this.hideContactUs();
  }

  hideContactUs() {
    this.hideContactUsLink = this.router.url === '/contact-us';
    }

    hideLinks() {
        this.hideLinksForUnsupportedBrowser = this.router.url === `/${Paths.UnsupportedBrowser}`;
    }
}
