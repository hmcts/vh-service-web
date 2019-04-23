import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCourtBuildingComponent } from './explore-court-building.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('ExploreCourtBuildingComponent', () => {
  let component: ExploreCourtBuildingComponent;
  let fixture: ComponentFixture<ExploreCourtBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreCourtBuildingComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreCourtBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
