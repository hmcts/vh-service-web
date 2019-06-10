import { HearingDetails } from './hearing-details';
import { HearingService } from './hearing.service';
import { Injectable } from '@angular/core';
import { SessionStorage } from '../../shared/services/session-storage';

@Injectable()
export class CachedHearingService implements HearingService {
    private readonly cache: SessionStorage<HearingDetails>;

    constructor(private service: HearingService) {
        this.cache = new SessionStorage<HearingDetails>('CURRENT_HEARING');
    }

    async getHearing(id: string): Promise<HearingDetails> {
        return this.getCached(id) || await this.getFromService(id);
    }

    private async getFromService(id: string): Promise<HearingDetails> {
        const details = await this.service.getHearing(id);
        this.cache.set(details);
        return details;
    }

    private getCached(id: string): HearingDetails {
        const cached = this.cache.get();
        if (cached && cached.id === id) {
            return cached;
        }

        this.cache.clear();
        return null;
    }
}
