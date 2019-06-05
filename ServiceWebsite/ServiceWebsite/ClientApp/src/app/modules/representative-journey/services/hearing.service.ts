import { ApiClient } from './../../../services/clients/api-client';
import { HearingDetails } from './hearing-details';
import { Injectable } from '@angular/core';

@Injectable()
export class HearingService {
    constructor(private client: ApiClient) {}

    async getHearing(id: string): Promise<HearingDetails> {
        const hearing = await this.client.getHearingById(id).toPromise();
        return new HearingDetails(hearing.case_name, hearing.case_number, 'civil money', hearing.scheduled_date_time);
    }
}
