import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHearingsComponent } from './about-hearings.component';
import { IndividualJourney } from '../individual-journey';

describe('AboutHearingsComponent', () => {
  let component: AboutHearingsComponent;
  let fixture: ComponentFixture<AboutHearingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutHearingsComponent ],
      providers: [ IndividualJourney ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutHearingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
