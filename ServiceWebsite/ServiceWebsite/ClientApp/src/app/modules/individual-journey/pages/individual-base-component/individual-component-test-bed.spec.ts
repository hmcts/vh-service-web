import { JourneyStep } from '../../../base-journey/journey-step';
import { ParticipantJourneySteps } from '../../../base-journey/participant-journey-steps';
import { ComponentFixture } from '@angular/core/testing';

import { IndividualJourney } from '../../individual-journey';
import { Hearing } from '../../../base-journey/participant-suitability.model';
import { DeviceType } from '../../../base-journey/services/device-type';
import { ParticipantSuitabilityModel } from '../../../base-journey/participant-suitability.model';

import {
    JourneyComponentTestBed,
    ComponentTestBedConfiguration
} from 'src/app/modules/base-journey/components/journey-component-test-bed.spec';
import { LongDatetimePipe } from 'src/app/modules/shared/date-time.pipe';
import { ContinuableComponentFixture } from 'src/app/modules/base-journey/components/suitability-choice-component-fixture.spec';
import { SubmitService } from '../../../base-journey/services/submit.service';
import { TestLogger } from 'src/app/services/logger.spec';
import { LongDatePipe } from 'src/app/modules/shared/date.pipe';

export interface IndividualComponentTestBedConfiguration<TComponent> extends ComponentTestBedConfiguration<TComponent> {
    journey?: IndividualJourney;
}

export class CommonIndividualComponentTests {
    static goesToStepWhenButtonIsPressed<TComponent>(step: JourneyStep, config: ComponentTestBedConfiguration<TComponent>) {
        const journey = jasmine.createSpyObj<IndividualJourney>(['goto']);
        const fixture = IndividualJourneyComponentTestBed.createComponent({
            component: config.component,
            providers: config.providers,
            imports: config.imports,
            declarations: config.declarations,
            journey: journey
        });

        fixture.detectChanges();
        new ContinuableComponentFixture(fixture).submitIsClicked();
        expect(journey.goto).toHaveBeenCalledWith(step);
    }
}

export class IndividualJourneyStubs {
    public static get default(): IndividualJourney {
        const deviceType = jasmine.createSpyObj<DeviceType>(['isMobile']);
        deviceType.isMobile.and.returnValue(false);
        let submitService: jasmine.SpyObj<SubmitService>;
        submitService = jasmine.createSpyObj<SubmitService>(['submit']);
        const journey = new IndividualJourney(submitService, TestLogger);
        journey.forSuitabilityAnswers([IndividualJourneyStubs.model]);
        journey.startAt(ParticipantJourneySteps.CheckingVideoHearing);
        return journey;
    }

    public static get model(): ParticipantSuitabilityModel {
        const journeyModel = new ParticipantSuitabilityModel();
        journeyModel.hearing = new Hearing('hearingId', new Date(2099, 1, 1, 12, 0));
        return journeyModel;
    }

    public static get journeySpy(): jasmine.SpyObj<IndividualJourney> {
        return {
            model: IndividualJourneyStubs.model,
            ...jasmine.createSpyObj<IndividualJourney>(['next', 'goto', 'submitQuestionnaire'])
        } as jasmine.SpyObj<IndividualJourney>;
    }
}

export class IndividualJourneyComponentTestBed {
    static createComponent<TComponent>(config: IndividualComponentTestBedConfiguration<TComponent>): ComponentFixture<TComponent> {
        return new JourneyComponentTestBed().createComponent({
            component: config.component,
            declarations: [LongDatetimePipe, LongDatePipe, ...(config.declarations || [])],
            providers: [
                { provide: IndividualJourney, useValue: config.journey || IndividualJourneyStubs.default },
                ...(config.providers || [])
            ],
            imports: config.imports
        });
    }
}
