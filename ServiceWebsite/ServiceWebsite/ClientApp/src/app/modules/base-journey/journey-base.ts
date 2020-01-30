import { EventEmitter } from '@angular/core';
import { JourneyStep } from './journey-step';

export abstract class JourneyBase {
    readonly redirect: EventEmitter<JourneyStep>;
    abstract journeyName: string;
    /**
    * Sets the journey to a specific step. This can be used when navigating to a specific step in the journey.
    * @param position The step to jump to
    */
    abstract jumpTo(position: JourneyStep): void;

    abstract startAt(step: JourneyStep): void;

    abstract goto(step: JourneyStep): void;

    abstract submitQuestionnaire(): Promise<void>;
}
