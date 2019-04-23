import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreVideoHearingComponent } from './explore-video-hearing.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('ExploreVideoHearingComponent', () => {
  let component: ExploreVideoHearingComponent;
  let fixture: ComponentFixture<ExploreVideoHearingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreVideoHearingComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreVideoHearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
