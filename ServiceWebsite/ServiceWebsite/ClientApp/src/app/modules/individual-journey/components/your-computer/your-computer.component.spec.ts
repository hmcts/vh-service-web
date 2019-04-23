import { ComponentFixture } from '@angular/core/testing';

import configureTestBedFor from '../individual-base-component/component-test-bed';
import { YourComputerComponent } from './your-computer.component';


describe('YourComputerComponent', () => {
  let component: YourComputerComponent;
  let fixture: ComponentFixture<YourComputerComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(YourComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
