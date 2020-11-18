import { Injectable } from '@angular/core';
import { SubmitService } from '../base-journey/services/submit.service';
import { Logger } from 'src/app/services/logger';
import { ParticipantJourney } from '../base-journey/participant-journey';

@Injectable()
export class IndividualJourney extends ParticipantJourney {
    journeyName = 'Individual';

    constructor(protected submitService: SubmitService, protected logger: Logger) {
        super(submitService, logger);
    }
}
