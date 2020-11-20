import { Logger } from 'src/app/services/logger';
import { Injectable } from '@angular/core';
import { ParticipantJourney } from '../base-journey/participant-journey';
import { SubmitService } from '../base-journey/services/submit.service';

@Injectable()
export class RepresentativeJourney extends ParticipantJourney {
    journeyName = 'Representative';

    constructor(protected submitService: SubmitService, protected logger: Logger) {
        super(submitService, logger);
    }
}
