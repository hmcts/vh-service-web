import { JourneyBase } from 'src/app/modules/base-journey/journey-base';
import { HearingDetailsHeaderComponent } from './hearing-details-header.component';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LongDatetimePipe } from '../../shared/date-time.pipe';
import { Hearing } from '../../base-journey/participant-suitability.model';
import { HearingDetails } from '../../representative-journey/services/hearing-details';
import { HearingService } from '../../representative-journey/services/hearing.service';
import { MutableRepresentativeSuitabilityModel } from '../../representative-journey/mutable-representative-suitability.model';
import { RepresentativeJourney } from '../../representative-journey/representative-journey';
import { LongDatePipe } from '../../shared/date.pipe';

describe('HearingDetailsHeaderComponent', () => {
  const hearing = new HearingDetails('id', 'case name', 'case number', 'case type', new Date(2029, 4, 3, 12, 30));
  let hearingService: jasmine.SpyObj<HearingService>;
  let component: HearingDetailsHeaderComponent;

  beforeAll(() => {
    hearingService = jasmine.createSpyObj<HearingService>(['getHearing']);
    hearingService.getHearing.and.returnValue(Promise.resolve(hearing));

    const model = new MutableRepresentativeSuitabilityModel();
    model.hearing = new Hearing('id');
    const journey = {
      ...jasmine.createSpyObj<RepresentativeJourney>(['startAt']),
      model: model
    };

    TestBed.configureTestingModule({
      declarations: [
        LongDatetimePipe,
        LongDatePipe,
        HearingDetailsHeaderComponent
      ],
      providers: [
        { provide: HearingService, useValue: hearingService },
        { provide: RepresentativeJourney, useValue: journey }
      ]
    }).compileComponents();

    component = TestBed.createComponent(HearingDetailsHeaderComponent).componentInstance;
  });

  it('should map details from current hearing and be loaded afterwards', fakeAsync(() => {
    expect(component.loaded).toBe(false);
    component.ngOnInit();
    tick();
    expect(component.loaded).toBe(true);
    expect(component.caseName).toBe(hearing.caseName);
    expect(component.caseNumber).toBe(hearing.caseNumber);
    expect(component.caseType).toBe(hearing.caseType);
  }));
});
