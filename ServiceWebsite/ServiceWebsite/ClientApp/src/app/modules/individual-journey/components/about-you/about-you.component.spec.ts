import { ComponentFixture } from '@angular/core/testing';

import { ConfigureTestBedFor } from '../individual-base-component/component-test-bed';
import { AboutYouComponent } from './about-you.component';

describe('AboutYouComponent', () => {
  let component: AboutYouComponent;
  let fixture: ComponentFixture<AboutYouComponent>;

  beforeEach(() => {
    fixture = ConfigureTestBedFor(AboutYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
