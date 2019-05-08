import { VideoFiles } from './video-files';

export abstract class VideoUrlService {

   abstract getVideoFileUrl(videofile: VideoFiles): string;
}
