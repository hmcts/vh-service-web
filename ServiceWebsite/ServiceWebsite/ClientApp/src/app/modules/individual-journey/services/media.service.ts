export abstract class MediaService {
    abstract getStream(): Promise<MediaStream>;
}
