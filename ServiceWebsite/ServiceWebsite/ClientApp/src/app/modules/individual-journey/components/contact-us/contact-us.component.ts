import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styles: []
})
export class ContactUsComponent implements OnInit {
  showTextDetails: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  showContactUsDetails() {
    this.showTextDetails = !this.showTextDetails;
  }

}
