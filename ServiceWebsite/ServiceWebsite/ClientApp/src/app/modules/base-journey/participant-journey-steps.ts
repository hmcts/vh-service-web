import { JourneyStep } from './journey-step';

export class ParticipantJourneySteps {
    static readonly NotStarted = new JourneyStep('NotStarted');
    static readonly CheckingVideoHearing = new JourneyStep('CheckingVideoHearing');
    static readonly ThankYou = new JourneyStep('ThankYou');
    static readonly GotoVideoApp = new JourneyStep('GotoVideoApp');

    static GetAll(): JourneyStep[] {
        return [this.CheckingVideoHearing];
    }
}
