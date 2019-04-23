import { ComponentFixture } from '@angular/core/testing';

import { AboutHearingsComponent } from './about-hearings.component';
import configureTestBedFor from '../individual-base-component/component-test-bed';

describe('AboutHearingsComponent', () => {
  let component: AboutHearingsComponent;
  let fixture: ComponentFixture<AboutHearingsComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(AboutHearingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
