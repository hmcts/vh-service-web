export abstract class MediaAccessService {
    /**
     * Requests access to camera and microphone.
     * Will return true if access is allowed or false if media access could not be granted.
     */
    abstract requestAccess(): Promise<boolean>;
}
