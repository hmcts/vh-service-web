import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorage } from './session-storage';
import { Hearing } from '../models/hearing.model';
import { HearingResponse } from '../models/hearing-response.model';
import { ErrorService } from './error.service';

// Loads hearing details for the first available hearing
@Injectable()
export class HearingService {

  private apiUrl = '/api/hearings/next';
  hearing: Hearing;

  constructor(
    private sessionStorage: SessionStorage,
    private errorService: ErrorService,
    private httpClient: HttpClient
  ) {
  }

  async getNextHearingDetails(): Promise<Hearing> {
    if (this.hearing != null) {
      return this.hearing;
    }

    try {
      this.hearing = await this.getUpcomingHearing();
      return this.hearing;
    } catch (err) {
      this.errorService.handleError(err);
    }
  }

  private async getUpcomingHearing(): Promise<Hearing> {
    const response = await this.httpClient.get<HearingResponse>(this.apiUrl).toPromise();
    const hearing = new Hearing();
    hearing.id = response.id;
    hearing.case = response.caseName;
    hearing.caseNumber = response.caseNumber;
    return hearing;
  }
}
