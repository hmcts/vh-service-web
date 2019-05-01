export abstract class JourneyBase {
    /**
     * Fails the current step, navigating to a failure drop off point or error page
     */
    abstract fail(): void;

    /**
     * Progresses the journey to the next step
     */
    abstract next(): void;
}
