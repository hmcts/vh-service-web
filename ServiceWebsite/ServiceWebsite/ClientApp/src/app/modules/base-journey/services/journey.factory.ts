export interface JourneyFactory {
    /**
     * Begin the journey
     */
    begin(): Promise<void>;

    /**
     * Checks if the factory applies to users of the given type
     * @param userType Type of user to test if the factory supplies journeys for
     */
    handles(userType: string): boolean;
}
