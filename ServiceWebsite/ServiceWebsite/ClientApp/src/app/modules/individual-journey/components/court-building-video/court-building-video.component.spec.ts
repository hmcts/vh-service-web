import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtBuildingVideoComponent } from './court-building-video.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('CourtBuildingVideoComponent', () => {
  let component: CourtBuildingVideoComponent;
  let fixture: ComponentFixture<CourtBuildingVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourtBuildingVideoComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtBuildingVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
