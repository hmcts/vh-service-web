import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import "rxjs/add/operator/filter";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls:["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  hideContactUsLink: boolean = false;

  constructor(private router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        this.hideContactUs();
      });
  }

  ngOnInit() {
    this.hideContactUs();
  }

  hideContactUs() {
    this.hideContactUsLink = this.router.url === "/contact-us";
  }
}
