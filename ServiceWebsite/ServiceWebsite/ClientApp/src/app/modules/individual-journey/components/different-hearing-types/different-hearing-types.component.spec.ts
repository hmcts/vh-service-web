import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferentHearingTypesComponent } from './different-hearing-types.component';
import { IndividualLocalisation } from '../../services/individual-localisation';

describe('DifferentHearingTypesComponent', () => {
  let component: DifferentHearingTypesComponent;
  let fixture: ComponentFixture<DifferentHearingTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DifferentHearingTypesComponent ],
      providers: [
        IndividualLocalisation
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DifferentHearingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
