import { Injectable } from '@angular/core';
import { SessionStorage } from '../../shared/services/session-storage';
import { Hearing, SelfTestAnswers } from '../../base-journey/participant-suitability.model';
import { IndividualSuitabilityModel } from '../individual-suitability.model';

@Injectable()
export class IndividualJourneyService {
    private readonly cache: SessionStorage<IndividualSuitabilityModel>;

    constructor() {
        this.cache = new SessionStorage<IndividualSuitabilityModel>('INDIVIDUALJOURNEY_MODEL');
    }

    get(): IndividualSuitabilityModel {
        const response = this.cache.get();

        if (response === null) {
            return null;
        }

        /*
      Need to create a new object here even though the cache will return a deserialised object,
      the problem is that this returned object from that cache looses any methods available on the class.
      In this case the "isUpcoming()" was not available
    */
        const model = new IndividualSuitabilityModel();
        model.participantId = response.participantId;
        model.hearing = new Hearing(
            response.hearing.id,
            new Date(response.hearing.scheduleDateTime),
            null,
            null,
            response.hearing.questionnaireNotRequired
        );
        model.selfTest = new SelfTestAnswers(response.selfTest);

        return model;
    }

    set(model: IndividualSuitabilityModel): void {
        this.cache.set(model);
    }
}
