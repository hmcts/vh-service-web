import { IndividualJourney } from './individual-journey';

export abstract class ComponentBase {
    constructor(protected readonly journey: IndividualJourney) {}

    continue(): void {
        this.journey.next();
    }
}
