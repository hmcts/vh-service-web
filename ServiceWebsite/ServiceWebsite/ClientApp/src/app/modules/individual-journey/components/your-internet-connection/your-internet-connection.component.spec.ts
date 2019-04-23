import { ComponentFixture } from '@angular/core/testing';

import configureTestBedFor from '../individual-base-component/component-test-bed';
import { YourInternetConnectionComponent } from './your-internet-connection.component';


describe('YourInternetConnectionComponent', () => {
  let component: YourInternetConnectionComponent;
  let fixture: ComponentFixture<YourInternetConnectionComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(YourInternetConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
