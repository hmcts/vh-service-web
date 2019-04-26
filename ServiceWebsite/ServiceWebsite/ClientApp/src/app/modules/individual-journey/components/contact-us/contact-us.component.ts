import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../shared/constants';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styles: []
})
export class ContactUsComponent implements OnInit {
  showTextDetails = false;
  contactUsEmail: string;
  constructor() {
    this.contactUsEmail = Constants.ContactUsEmail;
   }

  ngOnInit() {
  }

  showContactDetails() {
    this.showTextDetails = !this.showTextDetails;
  }

}
