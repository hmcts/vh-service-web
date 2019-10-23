import { ComponentFixture } from '@angular/core/testing';
import { IndividualJourneyComponentTestBed } from '../individual-base-component/individual-component-test-bed.spec';
import { ExploreVideoHearingComponent } from './explore-video-hearing.component';
import { DeviceType } from '../../../base-journey/services/device-type';
import { ContinuableComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { IndividualJourney } from '../../individual-journey';
import { IndividualJourneySteps } from '../../individual-journey-steps';
import { BackNavigationStubComponent } from '../../../../testing/stubs/back-navigation-stub';

describe('ExploreVideoHearingComponent', () => {
    let journey: IndividualJourney;
    let fixture: ComponentFixture<ExploreVideoHearingComponent>;
    let deviceType: jasmine.SpyObj<DeviceType>;

    beforeEach(() => {
        journey = jasmine.createSpyObj<IndividualJourney>(['goto']);
        deviceType = jasmine.createSpyObj<DeviceType>(['isMobile', 'isTablet']);

        fixture = IndividualJourneyComponentTestBed.createComponent({
            component: ExploreVideoHearingComponent,
            declarations: [BackNavigationStubComponent],
            providers: [{ provide: DeviceType, useValue: deviceType }],
            journey: journey
        });
    });

    it(`goes straight to ${IndividualJourneySteps.HearingAsParticipant} on mobile`, () => {
        deviceType.isMobile.and.returnValue(true);
        const test = new ContinuableComponentFixture(fixture);
        test.submitIsClicked();
        expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.HearingAsParticipant);
    });

    it(`goes to ${IndividualJourneySteps.AccessToCameraAndMicrophone} on desktop`, () => {
        deviceType.isMobile.and.returnValue(false);
        const test = new ContinuableComponentFixture(fixture);
        test.submitIsClicked();
        expect(journey.goto).toHaveBeenCalledWith(IndividualJourneySteps.AccessToCameraAndMicrophone);
    });
});
