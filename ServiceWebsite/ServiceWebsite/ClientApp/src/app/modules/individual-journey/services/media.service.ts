export abstract class MediaService {
  abstract getStream(): Promise<MediaStream>;
  abstract stopStream(): void;
  /**
     * Requests access to camera and microphone.
     * Will return true if access is allowed or false if media access could not be granted.
     */
  abstract requestAccess(): Promise<boolean>;
}
