import { Injectable } from '@angular/core';

@Injectable()
export class PrintService {

  constructor() {
  }

  printPage(elementId: string) {
    const originalContent = document.body.innerHTML;
    const printContent = elementId ? document.getElementById(elementId).innerHTML : originalContent;
    document.body.innerHTML = printContent;

    print();

    document.body.innerHTML = originalContent;
  }

  print() {
    try {
      if (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
        window.print();
      } else {
        document.execCommand('print', false, null);
      }
    } catch (e) {
      window.print();
    }
  }
}
