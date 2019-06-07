import { ApiClient, HearingDetailsResponse } from './../../../services/clients/api-client';
import { HearingDetails } from './hearing-details';
import { Injectable } from '@angular/core';

export abstract class HearingService {
    abstract getHearing(id: string): Promise<HearingDetails>;
}

@Injectable()
export class HearingApiService implements HearingService {
    constructor(private client: ApiClient) {}

    async getHearing(id: string): Promise<HearingDetails> {
        const response = await this.client.getHearingById(id).toPromise();
        return this.map(id, response);
    }

    private map(id: string, response: HearingDetailsResponse): HearingDetails {
        return new HearingDetails(
            id,
            response.case_name,
            response.case_number,
            response.case_type,
            response.scheduled_date_time
        );
    }
}
