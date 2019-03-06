import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocaleResources } from '../shared/resources/locale-resources';
import { CONFIG } from '../shared/config';


@Component({
  selector: 'app-confirmation-signout-popup',
  templateUrl: './confirmation-signout-popup.component.html',
  styleUrls: ['./confirmation-signout-popup.component.css']
})
export class ConfirmationSignoutPopupComponent implements OnInit {
  @Output() continueAnswers: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelAnswers: EventEmitter<any> = new EventEmitter<any>();
  localeResources: any;

  constructor() {
    this.localeResources = LocaleResources[CONFIG.Locale];
  }

  ngOnInit() {
  }

  continue() {
    this.continueAnswers.emit();
  }

  cancel() {
    this.cancelAnswers.emit();
  }
}
