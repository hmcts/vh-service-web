import { Injectable } from '@angular/core';

@Injectable()
export class PrintService {

  constructor() {
  }

  printPage(elementId: string) {
    let originalContent = document.body.innerHTML;
    let printContent = elementId ? document.getElementById(elementId).innerHTML : originalContent;
    document.body.innerHTML = printContent;

    try {
      document.execCommand('print', false, null);
    }
    catch (e) {
      window.print();
    }

    document.body.innerHTML = originalContent;
  }
}
