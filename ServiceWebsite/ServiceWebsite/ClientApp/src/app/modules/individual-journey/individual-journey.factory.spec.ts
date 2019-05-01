import { SuitabilityService } from './services/suitability.service';
import { IndividualJourneyFactory } from './individual-journey.factory';
import { IndividualJourney, IndividualJourneySteps } from './individual-journey';
import { MutableIndividualSuitabilityModel } from './mutable-individual-suitability.model';
import { IndividualSuitabilityModel, Hearing, HasAccessToCamera } from './individual-suitability.model';

describe('IndividualJourneyFactory', () => {
    const client = jasmine.createSpyObj<SuitabilityService>(['getAllSuitabilityAnswers']);
    const journey = new IndividualJourney(new MutableIndividualSuitabilityModel());
    let  factory: IndividualJourneyFactory;

    beforeEach(() => {
        client.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));
        factory = new IndividualJourneyFactory(journey, client);
    });

    it('returns the journey provided by the module', async () => {
        const result = await factory.create();
        expect(result).toBe(journey);
    });

    const getSuitabilityModelForHearingTomorrowAt = (hearingId: string, hour: number) => {
        const model = new MutableIndividualSuitabilityModel();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(hour);
        model.hearing = new Hearing(hearingId, tomorrow);
        return model;
    };

    it('returns a journey with the first upcoming hearing', async () => {
        const models: IndividualSuitabilityModel[] = [
            getSuitabilityModelForHearingTomorrowAt('id1', 12),
            getSuitabilityModelForHearingTomorrowAt('id2', 14),
        ];
        client.getAllSuitabilityAnswers.and.returnValue(Promise.resolve(models));

        const createdJourney = await factory.create() as IndividualJourney;
        expect(createdJourney.model.hearing.id).toBe('id1');
    });

    it('returns a journey that will start by redirecting to video app', async () => {
        // given we have no hearings
        client.getAllSuitabilityAnswers.and.returnValue(Promise.resolve([]));

        // and we listen to the steps
        let step: IndividualJourneySteps;
        journey.redirect.subscribe((redirected: IndividualJourneySteps) => step = redirected);

        // when we start the journey
        const createdJourney = await factory.create() as IndividualJourney;
        createdJourney.begin();

        // then we should be redirected to videoapp
        expect(IndividualJourneySteps[step]).toBe(IndividualJourneySteps[IndividualJourneySteps.GotoVideoApp]);
    });

    it('returns any completed journey', async () => {
        // given two models
        const models = [
            getSuitabilityModelForHearingTomorrowAt('incomplete', 12),
            getSuitabilityModelForHearingTomorrowAt('complete', 12),
        ];

        // where the latter is completed
        const completed = models[0];
        completed.aboutYou.answer = false;
        completed.consent.answer = true;
        completed.room = false;
        completed.internet = false;
        completed.interpreter = false;
        completed.camera = HasAccessToCamera.Yes;

        // given we have no hearings
        client.getAllSuitabilityAnswers.and.returnValue(Promise.resolve(models));

        // and we listen to the steps
        let step: IndividualJourneySteps;
        journey.redirect.subscribe((redirected: IndividualJourneySteps) => step = redirected);

        // when we start the journey
        const createdJourney = await factory.create() as IndividualJourney;
        createdJourney.begin();

        // the journey should be for the completed hearing
        expect(createdJourney.model.hearing.id).toBe(completed.hearing.id);
    });

    it('handles individual users', () => {
        expect(factory.handles('Individual')).toBeTruthy();
    });
});
