import { UserMediaService } from './user-media.service';
import { MediaService } from './media.service';
import { LoggerService } from 'src/app/services/logger.service';

describe('UserMediaService', () => {
    it('should return the media stream', async () => {
        const logger = jasmine.createSpyObj<LoggerService>(['error']);
        const userMediaService = new UserMediaService(logger);
        const stream = await userMediaService.getStream();
        expect(stream).not.toBeNull();
        userMediaService.stopStream();
    });

    it('should return media access request successfull', async () => {
        const logger = jasmine.createSpyObj<LoggerService>(['error']);
        const userMediaService = new UserMediaService(logger);
        const result = await userMediaService.requestAccess();
        expect(result).not.toBeNull();
        expect(result).toBeTruthy();
        userMediaService.stopStream();
    });
});
