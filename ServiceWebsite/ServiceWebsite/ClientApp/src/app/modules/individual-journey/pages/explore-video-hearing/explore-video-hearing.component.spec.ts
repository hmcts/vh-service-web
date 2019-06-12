import { IndividualJourneyComponentTestBed, IndividualJourneyStubs } from '../individual-base-component/individual-component-test-bed.spec';
import { ExploreVideoHearingComponent } from './explore-video-hearing.component';
import { DeviceType } from '../../services/device-type';

const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);

describe('ExploreVideoHearingComponent', () => {
  const journey = IndividualJourneyStubs.default;

  it('can be created', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: ExploreVideoHearingComponent,
      providers: [ { provide: DeviceType, useValue: deviceType }]
    });
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should detect device is mobile phone', () => {
    deviceType.isMobile.and.returnValue(true);
    const component = new ExploreVideoHearingComponent(journey, deviceType);

    expect(component.isMobile).toBeTruthy();
  });

  it('should detect device is not mobile phone', () => {
    deviceType.isMobile.and.returnValue(false);
    const component = new ExploreVideoHearingComponent(journey, deviceType);

    expect(component.isMobile).toBeFalsy();
  });
});
