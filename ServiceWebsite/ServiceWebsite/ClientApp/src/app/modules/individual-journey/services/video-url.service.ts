export abstract class VideoUrlService {
    /**
     * Example video displaying the judge and other participant
     */
    abstract inHearingExampleVideo: string;

    /**
     * Example video displaying the judge as they would see themselves
     */
    abstract judgeSelfViewVideo: string;

    /**
     * Example video displaying a second participant in the hearing aside
     */
    abstract otherParticipantExampleVideo: string;
}
