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
    ShowDetailsStubComponent,
  ]
})
export class ComponentStubModule {

}
