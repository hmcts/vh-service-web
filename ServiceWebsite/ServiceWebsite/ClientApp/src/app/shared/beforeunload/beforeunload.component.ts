import { Component,  HostListener,  } from '@angular/core';
import { ChecklistSessionService } from '../../services/checklist-session.service';
@Component({
  selector: 'app-beforeunload',
  template: ''
})
export class BeforeunloadComponent {

  constructor(private checklistSessionService: ChecklistSessionService) { }

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander($event: any) {
      if (this.checklistSessionService.isChecklistInStorage()) {
        // show default confirmation popup of browser to leave page.
        $event.preventDefault();
        $event.returnValue = 'save'; // return value should not be empty to show browser leave popup
      }
    }
}
