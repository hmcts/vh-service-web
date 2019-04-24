import { IndividualJourney } from './individual-journey';

export abstract class ComponentBase {
    constructor(protected readonly journey: IndividualJourney) {}

    fail(): void {
        this.journey.fail();
    }

    continue(): void {
        this.journey.next();
    }
}
