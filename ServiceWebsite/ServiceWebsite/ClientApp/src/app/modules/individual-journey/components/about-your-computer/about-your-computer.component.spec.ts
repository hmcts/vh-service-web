import { AboutYourComputerComponent } from './about-your-computer.component';
import { ComponentFixture } from '@angular/core/testing';

import configureTestBedFor from '../individual-base-component/component-test-bed';

describe('AboutYourComputerComponent', () => {
  let component: AboutYourComputerComponent;
  let fixture: ComponentFixture<AboutYourComputerComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(AboutYourComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
