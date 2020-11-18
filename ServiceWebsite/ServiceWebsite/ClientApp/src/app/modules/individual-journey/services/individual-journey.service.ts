import { Injectable } from '@angular/core';
import { SessionStorage } from '../../shared/services/session-storage';
import { ParticipantSuitabilityModel } from '../../base-journey/participant-suitability.model';
import { ParticipantJourneyService } from '../../base-journey/services/participnt-journey.service';

@Injectable()
export class IndividualJourneyService extends ParticipantJourneyService {
    constructor() {
        super();
        this.cache = new SessionStorage<ParticipantSuitabilityModel>('INDIVIDUALJOURNEY_MODEL');
    }
}
