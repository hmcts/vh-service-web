import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { ExploreVideoHearingComponent } from './explore-video-hearing.component';
import { DeviceType } from '../../../base-journey/services/device-type';
import { ContinuableComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { IndividualJourney } from '../../individual-journey';

const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);

describe('ExploreVideoHearingComponent', () => {
  let journey: IndividualJourney;

  beforeEach(() => {
    journey = jasmine.createSpyObj<IndividualJourney>(['next']);
  });

  it('can proceed on pressing continue', () => {
    const fixture = IndividualJourneyComponentTestBed.createComponent({
      component: ExploreVideoHearingComponent,
      providers: [ { provide: DeviceType, useValue: deviceType }],
      journey: journey
    });

    const test = new ContinuableComponentFixture(fixture);
    test.submitIsClicked();
    expect(journey.next).toHaveBeenCalled();
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
