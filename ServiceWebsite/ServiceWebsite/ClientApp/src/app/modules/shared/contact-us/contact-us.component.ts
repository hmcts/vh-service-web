import { BaseAccordionComponent } from './../base-accordion-component';
import { Component } from '@angular/core';
import { Constants } from '../constants';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styles: []
})
export class ContactUsComponent extends BaseAccordionComponent {
  readonly contactUsEmail = Constants.ContactUsEmail;
}
