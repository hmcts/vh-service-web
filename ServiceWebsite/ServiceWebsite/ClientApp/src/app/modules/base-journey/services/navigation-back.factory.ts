export interface NavigationBackFactory {

  /** Checks if the factory applies to users of the given type
   * @param userType Type of user that the factory supplies navigation back for
   */
  handles(userType: string): boolean;

  /** Subscribe to router event */
  subscribeToEvent(): void;
}
