import { HearingDetailsHeaderComponent } from './hearing-details-header.component';
import { HearingDetails } from '../services/hearing-details';
import { TestBed } from '@angular/core/testing';

describe('HearingDetailsHeaderComponent', () => {
  // const hearing = new HearingDetails('case name', 'case number', new Date(2029, 4, 3, 12, 30));
  // let component: HearingDetailsHeaderComponent;

  beforeAll(() => {
    TestBed.configureTestingModule({
      declarations: [
        HearingDetailsHeaderComponent
      ],
      providers: [
      ]
    }).compileComponents();
  });

  it('should map details from current hearing', () => {
    //component = new HearingDetailsHeaderComponent(hearing);

    // expect(component.caseName).toBe(hearing.caseName);
    // expect(component.caseNumber).toBe(hearing.caseNumber);
    // expect(component.scheduledDateTime).toBe(hearing.scheduledDateTime);
  });
});
