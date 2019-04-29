export abstract class JourneyBase {
    /**
     * Returns true if the journey handles the given user type
     */
    abstract handles(userType: string): boolean;

    /**
     * Begins the journey when accessing the site
     */
    abstract begin(): void;

    /**
     * Fails the current step, navigating to a failure drop off point or error page
     */
    abstract fail(): void;

    /**
     * Progresses the journey to the next step
     */
    abstract next(): void;
}
