import { AboutYourComputerComponent } from './about-your-computer.component';
import { ComponentFixture } from '@angular/core/testing';

import { ConfigureTestBedFor } from '../individual-base-component/component-test-bed';

describe('AboutYourComputerComponent', () => {
  let component: AboutYourComputerComponent;
  let fixture: ComponentFixture<AboutYourComputerComponent>;

  beforeEach(() => {
    fixture = ConfigureTestBedFor(AboutYourComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
