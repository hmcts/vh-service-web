import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  printPage() {
    try {
        document.execCommand('print', false, null);
    }
    catch (e) {
        window.print();
    }
}
}
