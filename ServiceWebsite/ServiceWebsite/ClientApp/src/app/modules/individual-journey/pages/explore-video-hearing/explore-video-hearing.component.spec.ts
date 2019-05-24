import { CanCreateComponent } from '../individual-base-component/component-test-bed.spec';
import { ExploreVideoHearingComponent } from './explore-video-hearing.component';
import { DeviceType } from '../../services/device-type';
import { TestModuleMetadata } from '@angular/core/testing';
import { IndividualStepsOrderFactory } from '../../individual-steps-order.factory';
import { IndividualJourney } from '../../individual-journey';

const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);

describe('ExploreVideoHearingComponent', () => {
  it('can be created', () => {
    CanCreateComponent(ExploreVideoHearingComponent, (configuration: TestModuleMetadata) => {
      configuration.providers.push({ provide: DeviceType, useValue: deviceType });
    });
  });

  it('should detect device is mobile phone', () => {
    deviceType.isMobile.and.returnValue(true);
    const individualStepsOrderFactory = new IndividualStepsOrderFactory(deviceType);
    const journey = new IndividualJourney(individualStepsOrderFactory);
    const component = new ExploreVideoHearingComponent(journey, deviceType);

    expect(component.isMobile).toBeTruthy();
  });
  it('should detect device is not mobile phone', () => {
    deviceType.isMobile.and.returnValue(false);
    const individualStepsOrderFactory = new IndividualStepsOrderFactory(deviceType);
    const journey = new IndividualJourney(individualStepsOrderFactory);
    const component = new ExploreVideoHearingComponent(journey, deviceType);

    expect(component.isMobile).toBeFalsy();
  });
});
