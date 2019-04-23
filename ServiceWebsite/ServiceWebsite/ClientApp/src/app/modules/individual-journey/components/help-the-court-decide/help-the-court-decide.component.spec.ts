import { HelpTheCourtDecideComponent } from './help-the-court-decide.component';
import { ComponentFixture } from '@angular/core/testing';

import configureTestBedFor from '../individual-base-component/component-test-bed';

describe('HelpTheCourtDecideComponent', () => {
  let component: HelpTheCourtDecideComponent;
  let fixture: ComponentFixture<HelpTheCourtDecideComponent>;

  beforeEach(() => {
    fixture = configureTestBedFor(HelpTheCourtDecideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
