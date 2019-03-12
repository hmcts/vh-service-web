import { Component, NgModule, Input, EventEmitter } from '@angular/core';

@Component({ selector: 'app-back-navigation', template: '' })
export class BackNavigationStubComponent { }

@Component({ selector: 'app-header', template: '' })
export class HeaderStubComponent {
  @Input() loggedIn: boolean;
    get needSaveData() { return new EventEmitter<any>(); }
}

@Component({ selector: 'app-footer', template: '' })
export class FooterStubComponent { }

// tslint:disable-next-line:component-selector
@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent { }

@Component({ selector: 'app-checklist-footer', template: '' })
export class ChecklistFooterStubComponent {
  @Input()
  isUserProfessional = true;
}

@Component({ selector: 'app-checklist-steps', template: '' })
export class ChecklistStepsStubComponent { }

@Component({ selector: 'app-beforeunload', template: '' })
export class BeforeunloadStubComponent { }


@Component({ selector: 'app-show-details', template: '' })
export class ShowDetailsStubComponent {
  @Input()
  detailsTitle = 'Title';

  @Input()
  textArray: Array<string> = [];
}


@NgModule({
  declarations: [
    BackNavigationStubComponent,
    HeaderStubComponent,
    FooterStubComponent,
    RouterOutletStubComponent,
    ChecklistFooterStubComponent,
    ChecklistStepsStubComponent,
    BeforeunloadStubComponent,
    ShowDetailsStubComponent,
  ]
})
export class ComponentStubModule {

}
